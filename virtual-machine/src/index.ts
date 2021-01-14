import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure";
import * as config from './config';

// Now create the VM, using the resource group and NIC allocated above.
const vm = new azure.compute.VirtualMachine(`server-vm`, {
    resourceGroupName: config.stackConfig.resourceGroupName,
    networkInterfaceIds: [config.stackConfig.networkInterfaceId],
    vmSize: "Standard_A0",
    deleteDataDisksOnTermination: true,
    deleteOsDiskOnTermination: true,
    osProfile: {
        computerName: "hostname",
        adminUsername: config.stackConfig.vmConfig.username,
        adminPassword: config.stackConfig.vmConfig.password,
        customData: `#!/bin/bash\n
echo "Hello, World!" > index.html
nohup python -m SimpleHTTPServer 80 &`,
    },
    osProfileLinuxConfig: {
        disablePasswordAuthentication: false,
    },
    storageOsDisk: {
        createOption: "FromImage",
        name: "myosdisk1",
    },
    storageImageReference: {
        publisher: "canonical",
        offer: "UbuntuServer",
        sku: "16.04-LTS",
        version: "latest",
    },
});

export const publicIpAddress = azure.network.getPublicIP({
    name: `server-ip-karna`,
    resourceGroupName: `server-rg-karna`,
}).then(ip => ip.ipAddress);