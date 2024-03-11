export interface Resource {
  name: string;
  namespace: string;
  creationTimestamp: string;
  availableReplicas: number;
  observedGeneration: number;
  readyReplicas: number;
  replicas: number;
  updatedReplicas: number;
  clusterIP: string;
  clusterIPs: string[];
  serviceType: string;
  internalPort: string;
  externalPort: string;
  status: string;
  restartPolicy: string;
  ip: string;
  image: string;
  maxMemory: string;
  maxCpu: string;
}
