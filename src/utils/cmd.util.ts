import { execSync } from "child_process";

interface ICMD {
  exec: (cmd: string) => string;
}

export default class CMD implements ICMD {
  exec(cmd: string): string {
    return execSync(cmd).toString().trim();
  }
}
