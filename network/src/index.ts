import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure";

const user = 'karna';

const resourceGroupName = new azure.core.ResourceGroup(`server-rg-${user}`, {
    name: `server-rg-${user}`
}).name;

// Create a network and subnet for all VMs.
const network = new azure.network.VirtualNetwork(`server-network-${user}`, {
    name: `server-network-${user}`,
    resourceGroupName,
    addressSpaces: ["10.0.0.0/16"],
    subnets: [{
        name: "default",
        addressPrefix: "10.0.1.0/24",
    }],
});

// Now allocate a public IP and assign it to our NIC.
const publicIp = new azure.network.PublicIp(`server-ip-${user}`, {
    name: `server-ip-${user}`,
    resourceGroupName,
    allocationMethod: "Dynamic",
});

const networkInterface = new azure.network.NetworkInterface(`server-nic-${user}`, {
    name: `server-nic-${user}`,
    resourceGroupName,
    ipConfigurations: [{
        name: "webserveripcfg",
        subnetId: network.subnets[0].id,
        privateIpAddressAllocation: "Dynamic",
        publicIpAddressId: publicIp.id,
    }],
});

export const networkInterfaceId = networkInterface.id;
export const publicIpAddressId = publicIp.id;
export const publicIpAddressName = publicIp.name;
export const username = user;
export const rgName = resourceGroupName; 
