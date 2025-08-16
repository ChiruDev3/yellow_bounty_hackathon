const hre = require("hardhat");

async function main() {
  console.log("Deploying ERC7824 Bounty Platform...");

  // Deploy Yellow Token first
  const YellowToken = await hre.ethers.getContractFactory("YellowToken");
  const yellowToken = await YellowToken.deploy();
  await yellowToken.waitForDeployment();
  console.log("Yellow Token deployed to:", await yellowToken.getAddress());

  // Deploy Bounty Platform
  const BountyPlatform = await hre.ethers.getContractFactory("BountyPlatform");
  const bountyPlatform = await BountyPlatform.deploy(await yellowToken.getAddress());
  await bountyPlatform.waitForDeployment();
  console.log("Bounty Platform deployed to:", await bountyPlatform.getAddress());

  // Save deployment addresses
  const deploymentInfo = {
    yellowToken: await yellowToken.getAddress(),
    bountyPlatform: await bountyPlatform.getAddress(),
    network: hre.network.name,
    deployer: (await hre.ethers.getSigners())[0].address
  };

  console.log("Deployment Summary:", deploymentInfo);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });