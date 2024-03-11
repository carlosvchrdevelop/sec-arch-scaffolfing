export interface KubernetesRequest<T> {
    apiVersion: string;
    items: T[];
}
