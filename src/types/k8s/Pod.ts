import { Metadata } from './Metadata';

export interface Pod {
    apiVersion: string;
    kind: string;
    metadata: Metadata;
    spec: Spec;
    status?: Status;
}

interface Spec {
    restartPolicy: string;
    hostIP: string;
    containers: Container[];
}

interface Status {
    hostIP?: string;
    phase?: string;
}

interface Container {
    image: string;
    envFrom: EnvFrom[];
    resources: {
        limits: {
            cpu: string;
            memory: string;
        };
    };
}

interface EnvFrom {
    secretRef: {};
}
