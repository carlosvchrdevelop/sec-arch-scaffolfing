export interface CheckClusterStatusUseCase {
  exec: () => ClusterStatus;
}

export interface Props {
  execute: (cmd: string) => string;
}

export type ClusterStatus = "Error" | "Stopped" | "Started";

export default class CheckClusterStatus implements CheckClusterStatusUseCase {
  private execute;

  constructor({ execute }: Props) {
    this.execute = execute;
  }

  exec() {
    try {
      const res = this.execute("microk8s status").toLocaleLowerCase();

      if (res.includes("microk8s is not running")) return "Stopped";
      if (res.includes("microk8s is running")) return "Started";

      return "Error";
    } catch (error) {
      return "Error";
    }
  }
}
