import { Metadata } from './Metadata';

export interface Deploy {
    apiVersion: string;
    kind: string;
    metadata: Metadata;
    spec: Spec;
    status?: Status;
}

export interface Status {
    availableReplicas?: number;
    observedGeneration?: number;
    readyReplicas?: number;
    replicas?: number;
    updatedReplicas?: number;
    conditions?: Condition[];
}

interface Condition {
    lastUpdateTime: string;
    message: string;
    reason: string;
    status: string;
    type: string;
}

interface Spec {
    replicas: number;
    strategy: {
        type: string;
    };
}
