# StorageBox

StorageBox a simple file storage service.

**Tech Stack**

- Next.js
- React Query
- Uppy with Tus Plugin for resumable file uploads
- Shadcn-ui and Tailwind CSS for components and styling
- Go for the backend with Tus for resumable file uploads
- Postgres (primary database) and Redis (rate limiting)
- Prisma as an ORM
- Grafana, Prometheus for server statistics with node_exporter
- Ansible for automating server provisioning
- Nginx as a reverse proxy
- Docker for containerizing all 7 services

**Services and Their Roles**

- `postgres`: Main database for data storage.
- `redis`: Redis service used for rate limiting.
- `server`: Backend server responsible for application logic.
- `website`: Front-end website for user interaction.
- `node_exporter`: Node Exporter for collecting system-level metrics.
- `prometheus`: Prometheus for storing and monitoring metrics data.
- `grafana`: Grafana for visualizing and analyzing metrics.




## How to Run Locally

**Requirements**

- Docker and Docker Compose: [Installation Instructions](https://docs.docker.com/get-docker/)

To run the project locally, follow these steps:

1. Clone the project: `git clone https://github.com/AlandSleman/StorageBox`

2. Change to the `server/` directory. Copy the contents of the `.env.example` file into a new file named `.env`. Default values will work for running locally.

3. Change to the `website/` directory. Copy the contents of the `.env.example` file into a new file named `.env`. Default values will work for running locally.

4. Run the following command spawn the Docker containers: `docker-compose up`


Make sure to visit `localhost:3000` login with the default credentals`user:admin, pass:admin`, and configure Grafana by following these steps:

- Add the Prometheus data source `Home > Connections > Data sources` The URL would be `http://prometheus:9090`.

- Import the Node Exporter dashboard `Home > Dashboards > Import dashboard` the dashboard ID would be `1860`.

## How to Run on a VPS

**Requirements**

- Ansible: [Installation Instructions](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html)

To run the project on a VPS, follow these steps:

1. Clone the project: `git clone https://github.com/AlandSleman/StorageBox`

2. Change to the `server/` directory. Copy the contents of the `.env.example` file into a new file named `.env`.

3. Change to the `website/` directory. Copy the contents of the `.env.example` file into a new file named `.env`.

4. Change to the `ansible` directory and edit `vars.yml` to your own values. This file is for the Ansible playbook to configure the Nginx reverse proxy.

5. You'll also need to update the Nginx maximum upload limit. The default is 1MB. Refer to [this guide](https://stackoverflow.com/questions/26717013/how-to-edit-nginx-conf-to-increase-file-size-upload) to update the limit.

6. Change to the `ansible/` directory and run the following command to run the Ansible playbook: `ansible-playbook playbook.yml`
   
  This playbook will install the required software, spawn Docker containers, and configure Nginx for you. You may also need to configure your firewall. Please note this playbook has only been tested on Linux(Debian).


## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.


