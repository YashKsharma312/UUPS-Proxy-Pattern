const { expect } = require("chai");
const { ethers,upgrades } = require("hardhat");
const { BigNumber, utils } = require("ethers");

describe("UUPS",function(){
    let Impl1;
    let Impl2;
    let Proxy;
    let addr1;

    beforeEach(async function(){
        [addr1]=await ethers.getSigners();
        Impl1=await ethers.getContractFactory("Logic");
        Proxy = await upgrades.deployProxy(Impl1, [1],{initializer:"initialize"});
        Impl2 = await ethers.getContractFactory("LogicV2");
    });

    describe("Test contract", function () {

        it("should add no.", async () => {
            let a=Impl1.attach(Proxy.address);
            await a.connect(addr1).add(2);
            let result = await a.connect(addr1).count();
            console.log(result)
            expect(result).to.equal(3);
          });
        it("should subtract no.", async () => {
            let a=Impl1.attach(Proxy.address);
            await a.connect(addr1).sub(1);
            let result = await a.connect(addr1).count();
            console.log(result)
            expect(result).to.equal(0);
          });
        it("check for upgrade", async () => {
            let Prox= await hre.upgrades.upgradeProxy(Proxy, Impl2);
            let b=Impl2.attach(Prox.address);
            await b.connect(addr1).mul(2);
            let result = await b.connect(addr1).count();
            console.log(result)
            expect(result).to.equal(2);
          });

    })



})