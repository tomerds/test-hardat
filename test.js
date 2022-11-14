const main = async () => {
  const { readFileSync, readJSON } = require("fs");
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
  const factoryLine = 'const Token = await ethers.getContractFactory("Token");';
  const tokenName = factoryLine
    .split(" ")
    .filter((t) => t.includes("getContractFactory"))[0]
    .split(`"`)[1];

  console.log(tokenName);
};

s();
