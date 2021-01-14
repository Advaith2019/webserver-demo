import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure";

export interface VmConfig {
    username: string;
    password: string;
}

const config = new pulumi.Config();
const stack = pulumi.getStack().split('-')[2];
const networkStackRef = new pulumi.StackReference(`network-${stack}`);

export const stackConfig = {
    resourceGroupName: networkStackRef.getOutput('rgName'),
    networkInterfaceId:  networkStackRef.getOutput('networkInterfaceId'),
    publicIpAddressName:  networkStackRef.getOutput('publicIpAddressName'),
    user: networkStackRef.getOutput('username'),
    vmConfig:  config.requireObject<VmConfig>('vm'),
}
