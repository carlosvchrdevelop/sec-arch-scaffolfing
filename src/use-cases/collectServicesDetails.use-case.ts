import {
  Deploy,
  KubernetesRequest,
  Pod,
  Resource,
  Service,
} from "../types/k8s";

export interface CollectServicesDetailsUseCase {
  exec: (labels: string[]) => Resource[];
}

export interface Props {
  execute: (command: string) => string;
}

export default class CollectServicesDetails
  implements CollectServicesDetailsUseCase
{
  private execute: (command: string) => string;

  constructor({ execute }: Props) {
    this.execute = execute;
  }

  exec(labels: string[]): Resource[] {
    let resources: Resource[] = [];
    if (labels.length === 0) return resources;

    for (let i = 0; i < labels.length; i++) {
      const label = labels[i];
      const resPod = this.execute(
        `microk8s kubectl get pod -o json -l app=${label}`
      );
      const podReq: KubernetesRequest<Pod> = JSON.parse(resPod);
      const pod: Pod = podReq.items[0];

      const resDeploy = this.execute(
        `microk8s kubectl get deploy -o json -l app=${label}`
      );
      const deployReq: KubernetesRequest<Deploy> = JSON.parse(resDeploy);
      const deploy: Deploy = deployReq.items[0];

      const resService = this.execute(
        `microk8s kubectl get svc -o json -l app=${label}`
      );
      const serviceReq: KubernetesRequest<Service> = JSON.parse(resService);
      const service: Service = serviceReq.items[0];

      const resource: Resource = {
        name: deploy.metadata.name,
        namespace: deploy.metadata.namespace,
        creationTimestamp: deploy.metadata.creationTimestamp,
        replicas: deploy?.spec?.replicas ?? 0,
        availableReplicas: deploy?.status?.availableReplicas ?? 0,
        observedGeneration: deploy?.status?.observedGeneration ?? 0,
        readyReplicas: deploy?.status?.readyReplicas ?? 0,
        updatedReplicas: deploy?.status?.updatedReplicas ?? 0,
        clusterIP: service?.spec?.clusterIP ?? "",
        clusterIPs: service?.spec?.clusterIPs ?? "",
        ip: pod?.status?.hostIP ?? "",
        restartPolicy: pod?.spec.restartPolicy ?? "",
        serviceType:
          service?.spec?.type === "ClusterIP" ? "private" : "public" ?? "",
        internalPort:
          (service?.spec?.ports[0]?.targetPort as unknown as string) ?? "",
        externalPort:
          (service?.spec?.ports[0]?.port as unknown as string) ?? "",
        status: pod?.status?.phase ?? "Stopped",
        image: pod?.spec?.containers[0]?.image ?? "",
        maxCpu: pod?.spec?.containers[0]?.resources?.limits?.cpu ?? "",
        maxMemory: pod?.spec?.containers[0]?.resources?.limits?.memory ?? "",
      };
      resources.push(resource);
    }
    return resources;
  }
}
