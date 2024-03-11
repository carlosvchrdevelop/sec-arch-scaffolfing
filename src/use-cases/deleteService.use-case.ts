export interface DeleteServiceUseCase {
  exec: (id: string) => void;
}

export interface Props {
  execute: (command: string) => string;
}

export default class DeleteService implements DeleteServiceUseCase {
  private execute: (command: string) => string;

  constructor({ execute }: Props) {
    this.execute = execute;
  }

  exec(id: string): void {
    try {
      const result = this.execute(`microk8s kubectl delete all -l app=${id}`);
    } catch (error) {
      throw new Error(JSON.stringify((error as Error).message));
    }
  }
}
