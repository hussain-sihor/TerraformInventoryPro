

locals {
  rg_name           = "MY_RG"
  location          = "westus"
  vnet_name         = "MY_VNET"
  sub_name          = "MY_SUB"
  nsg_name          = "MY_NSG"
  prox_name         = "MY_PROX"
  avb_name          = "MY_AVB"
  lbIp_name         = "MY_LBIP"
  lb_name           = "MY_LB"
  backend_pool_name = "MY_BACK_POOL"

  vm_list = {
    vm1 = {
      vm_name    = "MYVM1"
      nic_name   = "MY_NIC1"
      pubIp_name = "MY_PUB1"
    }
    vm2 = {
      vm_name    = "MYVM2"
      nic_name   = "MY_NIC2"
      pubIp_name = "MY_PUB2"
    }
  }
}


resource "azurerm_resource_group" "rg" {
  name     = local.rg_name
  location = local.location
}



resource "azurerm_virtual_network" "vnet" {
  name                = local.vnet_name
  address_space       = ["10.0.0.0/16"]
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
}
resource "azurerm_subnet" "subnet" {
  name                 = local.sub_name
  virtual_network_name = azurerm_virtual_network.vnet.name
  resource_group_name  = azurerm_resource_group.rg.name
  address_prefixes     = ["10.0.2.0/24"]
}



resource "azurerm_public_ip" "pub" {
  for_each            = local.vm_list
  name                = each.value.pubIp_name
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  allocation_method   = "Static"
  sku                 = "Standard"
}



resource "azurerm_network_interface" "nic" {
  for_each            = local.vm_list
  name                = each.value.nic_name
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  ip_configuration {
    name                          = "Internal"
    subnet_id                     = azurerm_subnet.subnet.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.pub[each.key].id
  }
}


resource "azurerm_network_security_group" "nsg" {
  name                = local.nsg_name
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
}

resource "azurerm_network_security_rule" "allowSSH" {
  name                        = "AllowSSH"
  priority                    = 100
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "22"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
  resource_group_name         = azurerm_resource_group.rg.name
  network_security_group_name = azurerm_network_security_group.nsg.name
}

resource "azurerm_network_security_rule" "allowHttp" {
  name                        = "AllowHTTP"
  priority                    = 110
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "5173"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
  resource_group_name         = azurerm_resource_group.rg.name
  network_security_group_name = azurerm_network_security_group.nsg.name
}



resource "azurerm_network_interface_security_group_association" "nic_nsg" {
  for_each                  = local.vm_list
  network_interface_id      = azurerm_network_interface.nic[each.key].id
  network_security_group_id = azurerm_network_security_group.nsg.id
}

resource "azurerm_proximity_placement_group" "placement_group" {
  name                = local.prox_name
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
}

resource "azurerm_availability_set" "availability_set" {
  name                         = local.avb_name
  location                     = azurerm_resource_group.rg.location
  resource_group_name          = azurerm_resource_group.rg.name
  proximity_placement_group_id = azurerm_proximity_placement_group.placement_group.id
}


resource "azurerm_linux_virtual_machine" "vm" {
  for_each                        = local.vm_list
  name                            = each.value.vm_name
  resource_group_name             = azurerm_resource_group.rg.name
  location                        = azurerm_resource_group.rg.location
  size                            = "Standard_DC1ds_v3"
  admin_username                  = "azureadmin"
  disable_password_authentication = false
  admin_password                  = "My@123"
  network_interface_ids           = [azurerm_network_interface.nic[each.key].id]


  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    sku       = "22_04-lts-gen2"
    version   = "latest"
  }

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  availability_set_id          = azurerm_availability_set.availability_set.id
  proximity_placement_group_id = azurerm_proximity_placement_group.placement_group.id
  custom_data                  = base64encode(file("startup_script.yaml"))
}


resource "azurerm_public_ip" "lbpub" {
  name                = local.lbIp_name
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  allocation_method   = "Static"
  sku                 = "Standard"
}

resource "azurerm_lb" "lb" {
  name                = local.lb_name
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  sku                 = "Standard"

  frontend_ip_configuration {
    name                 = "lb-frontend"
    public_ip_address_id = azurerm_public_ip.lbpub.id
  }

}

resource "azurerm_lb_backend_address_pool" "backend_pool" {
  name            = local.backend_pool_name
  loadbalancer_id = azurerm_lb.lb.id
}

resource "azurerm_network_interface_backend_address_pool_association" "nic_lb_assoc" {
  for_each                = local.vm_list
  network_interface_id    = azurerm_network_interface.nic[each.key].id
  ip_configuration_name   = "Internal"
  backend_address_pool_id = azurerm_lb_backend_address_pool.backend_pool.id
}

resource "azurerm_lb_probe" "probe_5173" {
  name            = "probe-5173"
  loadbalancer_id = azurerm_lb.lb.id
  protocol        = "Tcp"
  port            = 5173
}

resource "azurerm_lb_rule" "rule_5173" {
  name                           = "rule-5173"
  loadbalancer_id                = azurerm_lb.lb.id
  protocol                       = "Tcp"
  frontend_port                  = 5173
  backend_port                   = 5173
  frontend_ip_configuration_name = "lb-frontend"
  backend_address_pool_ids       = [azurerm_lb_backend_address_pool.backend_pool.id]
  probe_id                       = azurerm_lb_probe.probe_5173.id
}



# USE NORMAL LINUX INSTEAD OF RED HAT
# GIVE A STARTUP FILE WHICH WILL INSTALL AND RUN DOCKER CONTAINER AND DO DOCKER COMPOSE UP TO CREATE FORNTEND AND BACKEND CONTAINER

