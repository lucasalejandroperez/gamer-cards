// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
// import "./IERC721Mint.sol";
import "./NFT.sol";

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "hardhat/console.sol";

contract Marketplace is ReentrancyGuard {
    // State variables
    address owner;
    address payable public immutable accountOwnerMarketplace;
    address payable public immutable accountGamerOrganization;
    uint public immutable feeMarketplacePercent;
    uint public immutable feeGamerOrganizationPercent;
    uint public immutable feeDiamondPercent;
    uint public immutable feeGoldPercent;
    uint public immutable feeSilverPercent;
    uint public itemCount;
    mapping(uint256 => uint256) public itemCountOfPurchases;

    struct Item {
        uint itemId;
        IERC721 nft;
        uint tokenId;
        uint price;
        string nick;
        string team;
        address payable seller;
        bool onSale;
    }

    struct Level {
        address payable diamond;
        address payable gold;
        address payable silver;
    }

    mapping(uint => Item) public items;
    mapping(uint => Level) public accountsLevels;

    event Offered(
        uint itemId,
        address indexed nft,
        uint[] tokenIds,
        uint[] prices,
        address indexed seller
    );

    event Bought(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller,
        address indexed buyer
    );

    event Published(
        uint itemId,
        uint tokenId,
        uint price,
        address indexed seller
    );

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor(
                address _accountOwnerMarketplace, 
                address _accountGamerOrganization, 
                uint _feeMarketplacePercent, 
                uint _feeGamerOrganizationPercent, 
                uint _feeDiamondPercent,
                uint _feeGoldPercent,
                uint _feeSilverPercent) {
        owner = _accountOwnerMarketplace;
        accountOwnerMarketplace = payable(_accountOwnerMarketplace);
        accountGamerOrganization = payable(_accountGamerOrganization);
        feeMarketplacePercent = _feeMarketplacePercent;
        feeGamerOrganizationPercent = _feeGamerOrganizationPercent;
        feeDiamondPercent = _feeDiamondPercent;
        feeGoldPercent = _feeGoldPercent;
        feeSilverPercent = _feeSilverPercent;
    }

    // Make item to offer on the marketplace
    // Each position of the array in tokensId, must be at the same position in the other array (prices Array)
    function makeItem(IERC721 _nft, address _nftAddress, string[] memory _tokenURIS, uint[] memory _prices, string[] memory _nicks, string[] memory _teams) external onlyOwner nonReentrant {
        require(_tokenURIS.length > 0, "there is no tokens Uris to create");
        //(bool success, bytes memory data) = _nftAddress.delegatecall(abi.encodeWithSignature("mint(string[])", _tokenURIS));
        (bool success, bytes memory data) = _nftAddress.delegatecall(abi.encodeWithSelector(NFT.mint.selector, _tokenURIS));
        require(success, "delegatecall to NFT Contract failed");
        (uint[] memory _tokensId) = abi.decode(data, (uint[]));
        
        //uint[] memory _tokensId = _nft.mint(_tokenURIS);
        console.log('_tokensId.length: ', _tokensId.length);
        console.log('_tokensId[0]: ', _tokensId[0]);
        console.log('_tokensId[1]: ', _tokensId[1]);
        console.log('_tokensId[2]: ', _tokensId[2]);

        for (uint256 i = 0; i < _tokensId.length; i++) {
            require(_prices[i] > 0, "Price must be greater than zero");
            console.log('_tokensId: ', _tokensId[i]);
            // TODO: Validar nick y team vacio

            itemCount++;

            //(bool successTransferFrom, bytes memory dataTransferFrom) = address(_nft).delegatecall(abi.encodeWithSignature("transferFrom(address, address, uint256)", msg.sender, accountOwnerMarketplace, _tokensId[i]));
                //(bool successTransferFrom, bytes memory dataTransferFrom) = address(_nft).delegatecall(abi.encodeWithSelector(ERC721.transferFrom.selector, msg.sender, accountOwnerMarketplace, _tokensId[i]));
                //require(successTransferFrom, "delegatecall to NFT Contract transferFrom failed");
            //(uint[] memory _tokensId) = abi.decode(data, (uint[]));
            console.log('msg.sender en MARKETPLACE: ', msg.sender);
            _nft.transferFrom(msg.sender, accountOwnerMarketplace, _tokensId[i]);

            items[itemCount] = Item(
                itemCount,
                _nft,
                _tokensId[i],
                _prices[i],
                _nicks[i],
                _teams[i],
                accountOwnerMarketplace,
                true
            );
            
        }

        emit Offered(
                itemCount,
                address(_nft),
                _tokensId,
                _prices,
                accountOwnerMarketplace
        );
    }

    // re-publish the item and put it avaiable to sell in the marketplace
    function publishItem(IERC721 _nft, uint _tokenId, uint _price) external nonReentrant {
        require(msg.sender == _nft.ownerOf(_tokenId));
        require(_price > 0, "Price must be greater than zero");

        items[_tokenId].seller = payable(msg.sender);
        items[_tokenId].price = _price;
        items[_tokenId].onSale = true;

        emit Published (
            items[_tokenId].itemId,
            _tokenId,
            _price,
            msg.sender
        );
    }

    function purchaseItem(uint _itemId) external payable nonReentrant {
        uint _totalPrice = getTotalPrice(_itemId);
        require(_itemId > 0 && _itemId <= itemCount, "item doesn't exist");
        require(msg.value >= _totalPrice, "not enough ether to cover item price and market fee");
        require(items[_itemId].onSale == true, "Item isn't on sale");
        require(items[_itemId].seller != msg.sender, "Owners can't buy their own items");

        if (itemCountOfPurchases[_itemId] == 0) {
            accountsLevels[_itemId].diamond = payable(msg.sender);
        }
        else if (itemCountOfPurchases[_itemId] == 1) {
            accountsLevels[_itemId].gold = payable(msg.sender);
        }
        else if (itemCountOfPurchases[_itemId] == 2) {
            accountsLevels[_itemId].silver = payable(msg.sender);
        }

        Item storage item = items[_itemId];

        // pay seller 
        item.seller.transfer(item.price);
        item.onSale = false;
        itemCountOfPurchases[_itemId]++;
        
        // pay fees to organizations
        // TODO: This is not neccesary in the first buy, it will be fixed in the second version
        accountOwnerMarketplace.transfer(getFeePrice(feeMarketplacePercent, item.price));
        accountGamerOrganization.transfer(getFeePrice(feeGamerOrganizationPercent, item.price));

        // pay fees to users
        if (itemCountOfPurchases[_itemId] == 3) { // pay to diamond account (diamond fee)
            accountsLevels[_itemId].diamond.transfer(getFeePrice(feeDiamondPercent, item.price));
        }
        else if (itemCountOfPurchases[_itemId] == 4) { // pay to diamond and gold accounts (gold fee)
            accountsLevels[_itemId].diamond.transfer(getFeePrice(feeGoldPercent, item.price));
            accountsLevels[_itemId].gold.transfer(getFeePrice(feeGoldPercent, item.price));
        }
        else if (itemCountOfPurchases[_itemId] == 5) { // pay to diamond, gold and silver accounts (silver fee)
            accountsLevels[_itemId].diamond.transfer(getFeePrice(feeSilverPercent, item.price));
            accountsLevels[_itemId].gold.transfer(getFeePrice(feeSilverPercent, item.price));
            accountsLevels[_itemId].silver.transfer(getFeePrice(feeSilverPercent, item.price));
        }

        
        item.nft.transferFrom(item.seller, msg.sender, item.tokenId);

        emit Bought(
            _itemId,
            address(item.nft),
            item.tokenId,
            item.price,
            item.seller,
            msg.sender
        );
    }

    function getFeePrice(uint _percent, uint _price) internal pure returns(uint) {
        return ((_percent * _price) / 100);
    }

    function getTotalPrice(uint _itemId) view public returns(uint) {
        uint256 numberOfPurchases = itemCountOfPurchases[_itemId];
        uint256 feeApplied =  feeGamerOrganizationPercent;

        if (numberOfPurchases > 0) {
            feeApplied += feeMarketplacePercent;
        }

        if (numberOfPurchases == 3) { // apply diamond fee
            feeApplied += feeDiamondPercent;
        }
        else if (numberOfPurchases == 4) { // apply gold fee
            feeApplied += feeDiamondPercent + feeGoldPercent;
        }
        else if (numberOfPurchases == 5) { // apply silver fee
            feeApplied += feeDiamondPercent + feeGoldPercent + feeSilverPercent;
        }

        return( ( items[_itemId].price * (100 + feeApplied) ) / 100 );
    }
}