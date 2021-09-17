import { CallSite } from "callsites";

export function prettyStack(s: CallSite[]) {
  return s
    .map((i) => {
      const file = (i.getFileName() || "[file unknown]").split("/").slice(-2).join("/");
      const func = i.getFunctionName() || i.getMethodName() || "unknown";
      const line = i.getLineNumber();
      return `\t- ${file}, ${func}()${line ? `, at line ${line}` : ""}`;
    })
    .join("\n");
}
