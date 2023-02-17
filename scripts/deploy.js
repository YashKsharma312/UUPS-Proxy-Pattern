const { ethers, upgrades } = require("hardhat");

async function main(){
    console.log("Deploying Logic contract...");
    const Logic = await ethers.getContractFactory("Logic");
    const logic = await upgrades.deployProxy(Logic,[3],{kind:'uups',initializer:'initialize'});
    await logic.deployed();
    console.log("Logic Proxy Contract deployed to : ",logic.address);
    console.log("Logic Contract implementation address is : ",await upgrades.erc1967.getImplementationAddress(logic.address));
    console.log("Deploying LogicV2 contract...");
    const LogicV2 = await ethers.getContractFactory("LogicV2");
    const logicv2 = await upgrades.upgradeProxy(logic.address,LogicV2);
    await logicv2.deployed();
    console.log("LogicV2 Proxy Contract ( Must be Same ) deployed to : ",logicv2.address);
    console.log("LogicV2 Contract implementation address is : ",await upgrades.erc1967.getImplementationAddress(logicv2.address));
}

main();