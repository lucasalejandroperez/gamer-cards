async function main() {
    const [deployer, addr0, addr1, addr2, addr3, addr4, addr5, addr6, addr7, addr8, addr9, addr10] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());
    
    // Get the ContractFactories and Signers here.
    const NFT = await ethers.getContractFactory("NFT");
    const Marketplace = await ethers.getContractFactory("Marketplace");
    // deploy contracts
    const marketplace = await Marketplace.deploy(
      deployer.address, 
      addr10.address, 
      1,
      1,
      3,
      2,
      1
    );
    const nft = await NFT.deploy(
      deployer.address 
    );
    // Save copies of each contracts abi and address to the frontend.
    saveFrontendFiles(marketplace , "Marketplace");
    saveFrontendFiles(nft , "NFT");

    console.log('Marketplace contract address: ', marketplace.address);
    console.log('NFT contract address: ', nft.address);
  }
  
  function saveFrontendFiles(contract, name) {
    const fs = require("fs");
    //const contractsDir = __dirname + "../../frontend/abis";
    const contractsDir = "C:\\Lucas\\React\\Projects\\gamer-cards\\src\\frontend\\abis";
  
    if (!fs.existsSync(contractsDir)) {
      fs.mkdirSync(contractsDir);
    }
  
    fs.writeFileSync(
      contractsDir + `/${name}-address.json`,
      JSON.stringify({ address: contract.address }, undefined, 2)
    );
  
    const contractArtifact = artifacts.readArtifactSync(name);
  
    fs.writeFileSync(
      contractsDir + `/${name}.json`,
      JSON.stringify(contractArtifact, null, 2)
    );
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });