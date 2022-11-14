const { readFileSync, readJSON } = require("fs");
const main = async () => {
  const hre = require("hardhat");

  const artifactPaths = await hre.artifacts.getArtifactPaths();
  for (const artifactPath of artifactPaths) {
    console.log(artifactPath);
    const artifact = JSON.parse(readFileSync(artifactPath));
    console.log(artifact);
  }

  //   const deployments = JSON.parse(
  //     readFileSync("../for3stDeployments/contract-address.json", "utf-8")
  //   );
  //   const artifacts = JSON.parse(
  //     readFileSync("../for3stDeployments/Token.json", "utf-8")
  //   );
  //   console.log(artifacts);
};

const s = () => {
  let fileLines = readFileSync("./scripts/deploy.js", "utf-8").split("\n");

  const mapLines = fileLines.map((line, index) => {
    return {
      line,
      index,
    };
  });

  const deployLines = mapLines.filter((ml) => ml.line.includes("deployed()"));
  console.log(deployLines);

  const factoryLines = mapLines.filter((ml) =>
    ml.line.includes("getContractFactory")
  );

  console.log(factoryLines);

  const tokenNames = factoryLines.map(
    (fl) =>
      fl.line
        .split(" ")
        .filter((t) => t.includes("getContractFactory"))[0]
        .split(`"`)[1]
  );

  const tokens = deployLines.map(
    (dl) =>
      dl.line
        .split(" ")
        .filter((text) => text.includes("deployed()"))[0]
        .split(".")[0]
  );

  const newDeployLines = deployLines.map((dl, i) => {
    return {
      line: dl.line.concat(`\n saveFiles(${tokens[i]}, "${tokenNames[i]}");`),
      index: dl.index,
    };
  });

  console.log(newDeployLines);

  newDeployLines.forEach((ml) => fileLines.splice(ml.index, 1, ml.line));

  const newFile = fileLines.join("\r\n");

  console.log(newFile);
};

s();
