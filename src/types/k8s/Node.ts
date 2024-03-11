export interface Node {
  metadata: {
    name: string;
  };
  status: NodeStatus;
}

export interface NodeStatus {
  addresses: NodeAddresses[];
  allocatable: NodeSpecs;
  capacity: NodeSpecs;
  nodeInfo: NodeInfo;
}

export interface NodeAddresses {
  address: string;
  type: string;
}

export interface NodeSpecs {
  cpu: string;
  memory: string;
  pods: string;
}

export interface NodeInfo {
  architecture: string;
  operatingSystem: string;
  osImage: string;
}
