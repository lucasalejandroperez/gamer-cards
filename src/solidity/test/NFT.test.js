const { expect } = require("chai"); 

const toWei = (num) => ethers.utils.parseEther(num.toString());
const fromWei = (num) => ethers.utils.formatEther(num);
const getFeePrice = (percent, price) => ((_percent * _price) / 100);


describe('Tests of NFT contract', () => { 
    let NFT;
    let nft;

    let Marketplace;
    let marketplace;
    //let accountMarketplace = '0x14dc79964da2c08b23698b3d3cc7ca32193d9955'; // Account #7
    //let accountGamerOrganization = '0x23618e81e3f5cdf7f54c3d65f7fbc0abf5b21e8f'; // Account #8
    let feeMarketplacePercent = 1;
    let feeGamerOrganizationPercent = 1;
    let feeDiamondPercent = 3;
    let feeGoldPercent = 2;
    let feeSilverPercent = 1;

    let deployer;
    let addr1;
    let addr2;
    let addr3;
    let addr4;
    let addr5;
    let addr6;
    let addr7;
    let addr8;
    let addr9; //accountMarketplace
    let addr10; //accountGamerOrganization
    let addrs;
    let URIs = ["sample URI1", "Sample URI2", "Sample URI3"];

    beforeEach(async function () {
        // Get the ContractFactories and Signers here.
        NFT = await ethers.getContractFactory("NFT");
        Marketplace = await ethers.getContractFactory("Marketplace");
        [deployer, addr1, addr2, addr3, addr4, addr5, addr6, addr7, addr8, addr9, addr10, ...addrs] = await ethers.getSigners();

        // To deploy our contracts
        nft = await NFT.deploy();
        marketplace = await Marketplace.deploy(addr9.address,
                                                addr10.address,
                                                feeMarketplacePercent,
                                                feeGamerOrganizationPercent,
                                                feeDiamondPercent,
                                                feeGoldPercent,
                                                feeSilverPercent);
    });

    describe('Deployment', () => { 
        it('Should track name and symbol of the NFT Collection', async () => { 
            // This test expects the owner variable stored in the contract to be equal
            // to our Signer's owner.
            const nftName = "Gamer Cards";
            const nftSymbol = "ETH";

            expect(await nft.name()).to.equal(nftName);
            expect(await nft.symbol()).to.equal(nftSymbol);
         });
     });

     describe('Minting NFTs', () => { 
        it('Should track each minted NFT', async () => {
            // addr1 mints 3 NFTs
            await nft.connect(addr1).mint(URIs);

            expect(await nft.tokenId()).to.equal(3);
            expect(await nft.tokenURI(1)).to.equal(URIs[0]);
            expect(await nft.tokenURI(2)).to.equal(URIs[1]);
            expect(await nft.tokenURI(3)).to.equal(URIs[2]);
            expect(await nft.balanceOf(addr1.address)).to.equal(3); 

            // addr2 mints 3 NFTs
            await nft.connect(addr2).mint(URIs);

            expect(await nft.tokenId()).to.equal(6);
            expect(await nft.tokenURI(4)).to.equal(URIs[0]);
            expect(await nft.tokenURI(5)).to.equal(URIs[1]);
            expect(await nft.tokenURI(6)).to.equal(URIs[2]);
            expect(await nft.balanceOf(addr2.address)).to.equal(3); 
        });     
    });

    describe('Making marketplace Items', () => { 
        let tokenIds = [1, 2, 3];
        let prices = [toWei(1), toWei(2), toWei(5)];
        beforeEach(async () => {
            // addr1 mints 3 NFTs
            await nft.connect(deployer).mint(URIs);

            // addr1 approves marketplace to spend nft
            await nft.connect(deployer).setApprovalForAll(marketplace.address, true);
            //await nft.connect(deployer).setApprovalForAll(addr9.address, true);
        });

        it('Should track newly created item, transfer NFT from seller to marketplace and emit Offered event', async () => {
            await expect(marketplace.connect(deployer).makeItem(nft.address, tokenIds, prices))
                    .to.emit(marketplace, "Offered")
                    .withArgs(
                        tokenIds.length,
                        nft.address,
                        tokenIds,
                        prices,
                        addr9.address
                    );
            // TODO: Owner of NFT should now be the marketplace? le cambie a addr9
            expect(await nft.ownerOf(1)).to.equal(addr9.address);
            expect(await nft.ownerOf(2)).to.equal(addr9.address);
            expect(await nft.ownerOf(3)).to.equal(addr9.address);
            
            // Item count should now equal 1
            expect(await marketplace.itemCount()).to.equal(3);

            // Get item from items mapping then check fields to ensure they are correct
            // item 1
            const item1 = await marketplace.items(1);
            expect(item1.itemId).to.equal(1);
            expect(item1.nft).to.equal(nft.address)
            expect(item1.tokenId).to.equal(1);
            expect(item1.price).to.equal(prices[0]);
            expect(item1.onSale).to.equal(true);

            // item 2
            const item2 = await marketplace.items(2);
            expect(item2.itemId).to.equal(2);
            expect(item2.nft).to.equal(nft.address)
            expect(item2.tokenId).to.equal(2);
            expect(item2.price).to.equal(prices[1]);
            expect(item2.onSale).to.equal(true);

            // item 3
            const item3 = await marketplace.items(3);
            expect(item3.itemId).to.equal(3);
            expect(item3.nft).to.equal(nft.address)
            expect(item3.tokenId).to.equal(3);
            expect(item3.price).to.equal(prices[2]);
            expect(item3.onSale).to.equal(true);
        });

        it('Should fail if price is set to zero', async () => {
            let anotherPrices = [toWei(2), toWei(1), toWei(0)];
            await expect(marketplace.connect(deployer).makeItem(nft.address, tokenIds, anotherPrices))
                        .to.be.revertedWith("Price must be greater than zero");
        });

        if('Should fail if prices elements differ from tokens', async () => {
            let anotherPrices = [toWei(2), toWei(1)];
            await expect(marketplace.connect(deployer).makeItem(nft.address, tokenIds, anotherPrices))
                        .to.be.revertedWith("Tokens and prices must have the same amount of elements");
        });
     });

    describe('Purchasing marketplace items', () => { 
        let tokenIds = [1, 2, 3];
        let prices = [ethers.utils.parseEther("1"), ethers.utils.parseEther("2"), ethers.utils.parseEther("5")];
        beforeEach(async () => {
            // deployer mints 3 NFTs
            await nft.connect(deployer).mint(URIs);

            // deployer approves marketplace to spend tokens
            await nft.connect(deployer).setApprovalForAll(marketplace.address, true);

            await expect(marketplace.connect(deployer).makeItem(nft.address, tokenIds, prices))
                    .to.emit(marketplace, "Offered")
                    .withArgs(
                        tokenIds.length,
                        nft.address,
                        tokenIds,
                        prices,
                        addr9.address
                    );
        });

        it('Should pay seller and pay fees to marketplace and GamerOrganization, transfer NFT to buyer and emit Bought event', async () => {
            const marketplaceInitialEthBal = await addr9.getBalance();
            // const buyerInitialEthBal = await addr3.getBalance();
            const gamerOrganizationInitialEthBal = await addr10.getBalance();

            const totalPriceInWei = await marketplace.getTotalPrice(1);

            // TODO: Aca deberia ir addr9?
            //await nft.connect(deployer).setApprovalForAll(addr9.address, true);
            await nft.connect(marketplace).giveResaleApproval(1, addr9.address);

            // addr3 purchase item #1
            await expect(marketplace.connect(addr3).purchaseItem(1, {value: ethers.utils.parseEther("1.02")}))
                    .to.emit(marketplace, "Bought")
                    .withArgs(
                        1,
                        nft.address,
                        1,
                        prices[0],
                        addr9.address,
                        addr3.address
                    );
            
            // const marketplaceFinalEthBal = await addr9.getBalance();
            // console.log('price: ', prices[0]);
            // console.log('marketplaceInitialEthBal: ', marketplaceInitialEthBal);
            // console.log('marketplaceFinalEthBal: ', marketplaceFinalEthBal);
            // // const buyerFinalEthEthBal = await addr3.getBalance();
            // const gamerOrganizationFinalEthBal = await addr10.getBalance();
            // // le tiene que llegar el price al marketplace
            // const sumaMarketplace = marketplaceInitialEthBal.add(ethers.utils.parseEther("1")); // initial + price
            // const sumaMarketplaceConFee = sumaMarketplace.add(ethers.utils.parseEther("0.01")); // initial + price + fee diamond

            // expect(marketplaceFinalEthBal).to.equal(sumaMarketplaceConFee);
            // expect(gamerOrganizationFinalEthBal).to.equal(gamerOrganizationInitialEthBal.add(ethers.utils.parseEther("0.01")));

            // expect(await nft.ownerOf(1)).to.equal(addr3.address);
            // const item = await marketplace.items(1);
            // expect(item.onSale).to.equal(false);
            
        });

        it('Should pay seller, transfer NFT to buyer, pay double fee to marketplace and GamerOrganization', async () => {
            // const marketplaceInitialEthBal = await addr9.getBalance();
            // // const buyerInitialEthBal = await addr3.getBalance();
            // const gamerOrganizationInitialEthBal = await addr10.getBalance();

            // const totalPriceInWei = await marketplace.getTotalPrice(1);
            // // addr3 purchase item #1
            // await expect(marketplace.connect(addr3).purchaseItem(1, {value: ethers.utils.parseEther("1.02")}))
            //         .to.emit(marketplace, "Bought")
            //         .withArgs(
            //             1,
            //             nft.address,
            //             1,
            //             prices[0],
            //             addr9.address,
            //             addr3.address
            //         );

            // await expect(marketplace.connect(addr3).publishItem(nft.address, 1, toWei(2)))
            //             .to.emit(marketplace, "Published")
            //             .withArgs(
            //                 1,
            //                 1,
            //                 toWei(2),
            //                 addr3.address
            //             );
            
            // const item = await marketplace.items(1);
            // await expect(item.onSale).to.equal(true);

            // // addr4 purchase item #1
            // await expect(marketplace.connect(addr4).purchaseItem(1, {value: ethers.utils.parseEther("2.04")}))
            //         .to.emit(marketplace, "Bought")
            //         .withArgs(
            //             1,
            //             nft.address,
            //             1,
            //             toWei(2),
            //             addr3.address,
            //             addr4.address
            //         );
            
            // const marketplaceFinalEthBal = await addr9.getBalance();
            // const gamerOrganizationFinalEthBal = await addr10.getBalance();
            // console.log('price: ', prices[0]);
            // console.log('marketplaceInitialEthBal: ', marketplaceInitialEthBal);
            // console.log('marketplaceFinalEthBal: ', marketplaceFinalEthBal);
            // console.log('gamerOrganizationInitialEthBal: ', gamerOrganizationInitialEthBal);
            // console.log('gamerOrganizationFinalEthBal: ', gamerOrganizationFinalEthBal);
            // expect(marketplaceFinalEthBal).to.equal(
            //                 marketplaceInitialEthBal.add(ethers.utils.parseEther("1")) // initial + price
            //                                         .add(ethers.utils.parseEther("0.01")) // + fee diamond
            //                 )
            // ;
            // expect(gamerOrganizationFinalEthBal).to.equal(
            //                 gamerOrganizationInitialEthBal.add(ethers.utils.parseEther("0.01"))
            //                 );

            // expect(await nft.ownerOf(1)).to.equal(addr3.address);
        });

        // it('Should pay seller, transfer NFT to buyer, pay fee to marketplace, GamerOrganization and diamond buyer and emit Bought event', async () => {
        //     const marketplaceInitialEthBal = await addr9.getBalance();
        //     // const buyerInitialEthBal = await addr3.getBalance();
        //     const gamerOrganizationInitialEthBal = await addr10.getBalance();

        //     const totalPriceInWei = await marketplace.getTotalPrice(1);
        //     // addr3 purchase item #1
        //     await expect(marketplace.connect(addr3).purchaseItem(1, {value: ethers.utils.parseEther("5")}));
        //     // addr4 purchase item #1
        //     await expect(marketplace.connect(addr4).purchaseItem(1, {value: ethers.utils.parseEther("5")})
        //     await expect(marketplace.connect(addr3).purchaseItem(1, {value: ethers.utils.parseEther("5")}))
        //             .to.emit(marketplace, "Bought")
        //             .withArgs(
        //                 1,
        //                 nft.address,
        //                 1,
        //                 prices[0],
        //                 addr9.address,
        //                 addr3.address
        //             );
            
        //     const marketplaceFinalEthBal = await addr9.getBalance();
        //     console.log('price: ', prices[0]);
        //     console.log('marketplaceInitialEthBal: ', marketplaceInitialEthBal);
        //     console.log('marketplaceFinalEthBal: ', marketplaceFinalEthBal);
        //     // const buyerFinalEthEthBal = await addr3.getBalance();
        //     const gamerOrganizationFinalEthBal = await addr10.getBalance();
        //     // le tiene que llegar el price al marketplace
        //     const sumaMarketplace = marketplaceInitialEthBal.add(ethers.utils.parseEther("1")); // initial + price
        //     const sumaMarketplaceConFee = sumaMarketplace.add(ethers.utils.parseEther("0.01")); // initial + price + fee diamond

        //     expect(marketplaceFinalEthBal).to.equal(sumaMarketplaceConFee);
        //     expect(gamerOrganizationFinalEthBal).to.equal(marketplaceInitialEthBal.add(ethers.utils.parseEther("0.01")));

        //     expect(await nft.ownerOf(1)).to.equal(addr3.address);
        // });

        // it('Should pay seller, transfer NFT to buyer, pay fee to diamond and gold buyer and emit Bought event', async () => {
            
        // });

        // it('Should pay seller, transfer NFT to buyer, pay fee to diamond, gold and silver buyer and emit Bought event', async () => {
            
        // });

        
      });

 });