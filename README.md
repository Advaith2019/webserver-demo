# Web Server Using Azure Virtual Machine
This example provisions a Linux web server in an Azure Virtual Machine and assigns a public IP address. 

In this example, Pulumi uses self-managed backend to store state or checkpoint files

## Prerequisite
- Azure CLI 
- Pulumi CLI
- Set up credentials for Pulumi in Azure
- Node.js
- NPM/Yarn
  
## Development Model
### Network Projct
1. Create `network` folder and go inside it
   ```
   mkdir network && cd network
   ```
2. Set up a Pulumi backend based on different enviroments
   ```
   ../scripts/setup.sh <env>
   
   where,
    env - Represents a specific environment (for example, dev)
   ```
3. Log into a backend
   ```
   . ../scripts/init.sh <env>
   
   where,
    env - Represents a specific environment (for example, dev)
   ```
4. Create a Pulumi project
   ```
   ../scripts/project-setup.sh <env>
   
   where,
    env - Represents a specific environment (for example, dev)
   ```
5. To create a Pulumi stack
   ```
   ../scripts/stack-setup.sh <env>
   
   where,
    env - Represents a specific environment (for example, dev)
   ```
### virtual-machine project
1. Create a `virual-machine` folder and get into it
   ```
   mkdir virual-machine && cd virual-machine
   ```
2. Follow the steps from 2-5 as in `network` project
3. Set username and password for virtual machine
   ```
   pulumi config set --path vm:username <username>
   pulumi config set --path vm:password <username>@123 --secret

   where,
    username - Represents a shorter version of your username (for example, karna)
   ```
    
## Deployment Model
1. Get into `network` and log into a self-managed Pulumi backend
   ```
   cd network
   . ../scripts/init.sh <env>
   
   where,
    env - Represents a specific environment (for example, dev)
   ```
2. Select a Pulumi stack and deploy the proposed changes
   ```
   pulumi stack select network-<env>

   where,
    env - Represents a specific environment (for example, dev)

   pulumi up
   ```
3. Get into `virtual-machine`, select a Pulumi stack and deploy the proposed changes
   ```
   cd ../virtual-machine

   pulumi stack select virtual-machine-<env>

   where,
    env - Represents a specific environment (for example, dev)

   pulumi up
   ```
