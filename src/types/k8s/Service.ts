import { Metadata } from './Metadata';
export interface Service {
    apiVersion: string;
    metadata: Metadata;
    spec: Spec;
}

interface Spec {
    clusterIP: string;
    clusterIPs: string[];
    type: string;
    ports: Port[];
}
