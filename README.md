# InventoryPro

## Overview

This repository is created to demonstrate the usage of **Terraform** for deploying this application in a **production-ready** manner. It has three main folders: **frontend**, **backend**, and **terraform**.

The **frontend** contains React + Tailwind CSS code and includes a Dockerfile that builds the frontend and hosts it using **Nginx**.

The **backend** contains Node.js + Express + MongoDB code and includes a Dockerfile that installs all dependencies and creates the backend image.

The **Terraform** code creates **two VMs**, each with its own public IP and rules to allow SSH access. It also creates **one public Load Balancer** in front, which distributes traffic to one of the VMs. All resources are created in **Azure**.

Finally, the repository includes a **docker-compose** file that uses the Dockerfiles to create two containers: **frontend** and **backend**.

---

## Steps

### Clone the repository

### Make necessary changes:

- Update `MONGO_URI` in:

  - the `.env` file
  - the `docker-compose.yaml` file

### Terraform setup

- Navigate to the `terraform` folder
- Run:

  ```bash
  az login
  terraform apply
  ```

- This will create the entire infrastructure.
- The terminal will display:

  - 2 public IP addresses (VMs)
  - 1 Load Balancer public IP address

### VM Setup

For **each VM**:

- Connect via SSH from your local terminal using the password `My@123`:

  ```bash
  ssh azureadmin@<PublicIP>
  ```

- Verify that **Docker** and **Docker Compose** are installed
- Clone the repository or copy it from your local machine
- Run:

  ```bash
  docker compose up -d
  ```

### Verify Deployment

- Visit the **Load Balancer public IP** on port **5173** to verify successful deployment:

  ```
  http://<LB_PUBLIC_IP>:5173
  ```

---

This repository contains **two Dockerfiles** (one for backend and one for frontend) and a **docker-compose file** to automate container creation. Running the docker-compose file will create **three containers**:

- MongoDB
- React frontend
- Node.js backend

**InventoryPro** is a comprehensive inventory management system designed to help businesses efficiently track, manage, and optimize their inventory.

---

## Tech Stack

- **Frontend:** React and Tailwind CSS for a dynamic, responsive, and user-friendly interface
- **Backend:** Express.js for building a fast and efficient API that handles business logic and data management
- **Database:** MongoDB for flexible and scalable data storage, supporting complex inventory structures
- **Cloud Storage:** Cloudinary for managing and optimizing product images, ensuring fast and reliable media handling
- **Deployment:** Complete Azure infrastructure provisioned using Terraform to host the application

---
