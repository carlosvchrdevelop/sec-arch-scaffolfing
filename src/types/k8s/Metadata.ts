export interface Metadata {
    creationTimestamp: string;
    generateName: string;
    name: string;
    namespace: string;
    labels: {
        app: string;
    };
}
