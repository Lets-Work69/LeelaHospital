const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const rootFolder = "."; // start scanning from current folder
const allowedExt = new Set([".jpg", ".jpeg", ".png"]);

function getAllFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of list) {
    const fullPath = path.join(dir, entry.name);

    // skip node_modules and hidden folders (optional)
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
      results = results.concat(getAllFiles(fullPath));
    } else {
      results.push(fullPath);
    }
  }

  return results;
}

async function convertImages() {
  const allFiles = getAllFiles(rootFolder);
  const imageFiles = allFiles.filter((file) =>
    allowedExt.has(path.extname(file).toLowerCase())
  );

  console.log(`Found ${imageFiles.length} images`);

  for (const inputPath of imageFiles) {
    const ext = path.extname(inputPath);
    const outputPath = path.join(
      path.dirname(inputPath),
      path.basename(inputPath, ext) + ".webp"
    );

    try {
      await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
      console.log(`Converted: ${inputPath} -> ${outputPath}`);
    } catch (err) {
      console.error(`Failed: ${inputPath}`, err.message);
    }
  }

  console.log("Done.");
}

convertImages();