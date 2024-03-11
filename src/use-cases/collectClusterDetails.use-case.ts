import { Deploy, KubernetesRequest, ResourceNode, Node } from "../types/k8s";

export interface CollectClusterDetailsUseCase {
  exec: () => ResourceNode[];
}

export interface Props {
  execute: (command: string) => string;
}

export default class CollectClusterDetails
  implements CollectClusterDetailsUseCase
{
  private execute: (command: string) => string;

  constructor({ execute }: Props) {
    this.execute = execute;
  }

  exec(): ResourceNode[] {
    const resNode = this.execute(`microk8s kubectl get no -o json`);
    const clusterReq: KubernetesRequest<Node> = JSON.parse(resNode);
    const nodes: Node[] = clusterReq.items;

    const nodeList = nodes.map((node) => {
      return {
        name: node?.metadata?.name ?? "",
        internalIP:
          node.status?.addresses?.find(
            (e) => e.type.toLocaleLowerCase() === "internalip"
          )?.address ?? "",
        hostname:
          node.status?.addresses?.find(
            (e) => e.type.toLocaleLowerCase() === "hostname"
          )?.address ?? "",
        architecture: node.status.nodeInfo?.architecture ?? "",
        operatingSystem: node.status.nodeInfo?.operatingSystem ?? "",
        osImage: node.status.nodeInfo?.osImage ?? "",
        capacity: {
          cpu: node.status?.capacity?.cpu ?? "",
          memory: node.status?.capacity?.memory ?? "",
        },
        allocatable: {
          cpu: node.status?.allocatable?.cpu ?? "",
          memory: node.status?.allocatable?.memory ?? "",
        },
      };
    });

    console.log(nodeList);
    return nodeList;
  }
}
