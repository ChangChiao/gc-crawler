import fs from "fs";
import path from "path";

export function saveHtml(url, content) {
  const fileName = url.replace(/[^a-z0-9]/gi, "_") + ".html";
  const outputPath = path.join(process.cwd(), "downloads", fileName);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, content);
}
