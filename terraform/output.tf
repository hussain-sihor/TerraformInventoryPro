output "vm_public_ips" {
  value = {
    for n, pubIp in azurerm_public_ip.pub :
    n => pubIp.ip_address
  }
}

output "load_balancer_ip" {
  value = azurerm_public_ip.lbpub.ip_address
}
