import fs from "fs";
import path from "path";

export interface IFileIO {
  writeFile: (folder: string, filename: string, data: string) => void;
  readFile: (folder: string, filename: string) => string;
  existsFolder: (folder: string) => boolean;
  existsFile: (folder: string, filename: string) => boolean;
  createFolder: (folder: string) => void;
  getPath: (folder: string, filename: string) => string;
}

export default class FileIO implements IFileIO {
  writeFile(folder: string, filename: string, data: string) {
    fs.writeFileSync(path.join(folder, filename), data);
  }

  readFile = (folder: string, filename: string): string => {
    const file = fs.readFileSync(path.join(folder, filename));
    return file.toString();
  };

  existsFile = (folder: string, filename: string): boolean => {
    return fs.existsSync(path.join(folder, filename));
  };

  existsFolder = (folder: string): boolean => {
    return fs.existsSync(folder);
  };

  createFolder = (folder: string) => {
    fs.mkdirSync(folder, { recursive: true });
  };

  getPath = (folder: string, filename: string) => {
    return path.join(__dirname, "..", "..", folder, filename);
  };
}
