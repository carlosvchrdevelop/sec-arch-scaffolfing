import { deploymentTemplate } from "../data/deploymentTemplate";

export interface DeployServiceUseCase {
  exec: (opt: Options) => void;
}

export interface Options {
  externalPort: number;
  image: string;
  internalPort: number;
  maxCpu: number;
  maxMemory: number;
  name: string;
  replicas: number;
  serviceType: ServiceType;
  outputFolder: string;
}

export interface FileHandler {
  writeFile: (folder: string, filename: string, data: string) => void;
  readFile: (folder: string, filename: string) => string;
  existsFolder: (folder: string) => boolean;
  existsFile: (folder: string, filename: string) => boolean;
  createFolder: (folder: string) => void;
  getPath: (folder: string, filename: string) => string;
}

export interface Props {
  execute: (command: string) => string;
  fileHandler: FileHandler;
}

export type ServiceType = "public" | "private";

export default class DeployService implements DeployServiceUseCase {
  private execute: (command: string) => string;
  private fileHandler: FileHandler;
  constructor({ execute, fileHandler }: Props) {
    this.execute = execute;
    this.fileHandler = fileHandler;
  }

  exec(options: Options): void {
    const filledTemplate = deploymentTemplate
      .replace(/{cpu}/gi, `${options.maxCpu}m`)
      .replace(/{externalPort}/gi, `${options.externalPort}`)
      .replace(/{image}/gi, options.image)
      .replace(/{internalPort}/gi, `${options.internalPort}`)
      .replace(/{memory}/gi, `${options.maxMemory}Mi`)
      .replace(/{name}/gi, options.name)
      .replace(/{replicas}/gi, `${options.replicas}`)
      .replace(
        /{serviceType}/gi,
        options.serviceType === "public" ? "NodePort" : "ClusterIP"
      );

    if (!this.fileHandler.existsFolder(options.outputFolder)) {
      this.fileHandler.createFolder(options.outputFolder);
    }

    const filename = `${options.name}.yaml`;
    this.fileHandler.writeFile(options.outputFolder, filename, filledTemplate);
    this.execute(
      `kubectl apply -f ${this.fileHandler.getPath(
        options.outputFolder,
        filename
      )}`
    );
  }
}
