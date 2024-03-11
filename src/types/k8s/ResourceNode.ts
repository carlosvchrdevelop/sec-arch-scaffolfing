export interface ResourceNode {
  name: string;
  internalIP: string;
  hostname: string;
  architecture: string;
  operatingSystem: string;
  osImage: string;
  capacity: NodeSpec;
  allocatable: NodeSpec;
}

export interface NodeSpec {
  cpu: string;
  memory: string;
}
