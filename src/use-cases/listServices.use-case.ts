export interface ListServicesUseCase {
  exec: () => string[];
}

export interface Props {
  execute: (command: string) => string;
}

export default class ListServices implements ListServicesUseCase {
  private execute: (command: string) => string;

  constructor({ execute }: Props) {
    this.execute = execute;
  }

  exec(): string[] {
    try {
      const result = this.execute(
        "microk8s kubectl get deployments --selector=app -o jsonpath='{.items[*].metadata.labels.app}'"
      );
      if (result) {
        let labels = result.trim().replace(/["'`]+/g, "");
        return labels.length > 0 ? labels.split(" ") : [];
      }
    } catch (error) {
      throw new Error(JSON.stringify((error as Error).message));
    }

    return [];
  }
}
