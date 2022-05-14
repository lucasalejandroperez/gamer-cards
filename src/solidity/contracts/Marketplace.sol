// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "hardhat/console.sol";

contract Marketplace is ReentrancyGuard {
    // State variables
    address owner;
    address payable public immutable accountMarketplace;
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
        address payable seller;
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

    constructor(
                address _accountMarketplace, 
                address _accountGamerOrganization, 
                uint _feeMarketplacePercent, 
                uint _feeGamerOrganizationPercent, 
                uint _feeDiamondPercent,
                uint _feeGoldPercent,
                uint _feeSilverPercent) {
        owner = msg.sender;
        accountMarketplace = payable(_accountMarketplace);
        accountGamerOrganization = payable(_accountGamerOrganization);
        feeMarketplacePercent = _feeMarketplacePercent;
        feeGamerOrganizationPercent = _feeGamerOrganizationPercent;
        feeDiamondPercent = _feeDiamondPercent;
        feeGoldPercent = _feeGoldPercent;
        feeSilverPercent = _feeSilverPercent;
    }

    // Make item to offer on the marketplace
    // Each position of the array in tokensId, must be at the same position in the other array (prices Array)
    function makeItem(IERC721 _nft, uint[] memory _tokensId, uint[] memory _prices) external nonReentrant {
        require(_tokensId.length > 0, "There is no tokens to create");
        require(_tokensId.length == _prices.length, "Tokens and prices must have the same amount of elements");

        for (uint256 i = 0; i < _tokensId.length; i++) {
            require(_prices[i] > 0, "Price must be greater than zero");

            itemCount++;

            // TODO: is it neccesary to do this?
            _nft.transferFrom(msg.sender, address(this), _tokensId[i]);

            items[itemCount] = Item(
                itemCount,
                _nft,
                _tokensId[i],
                _prices[i],
                accountMarketplace // TODO: Deberia de ser el accountMarketplace
            );
            
        }

        emit Offered(
                itemCount,
                address(_nft),
                _tokensId,
                _prices,
                accountMarketplace // TODO: Deberia de ser el accountMarketplace
        );
    }

    // re-publish the item and put it avaiable to sell
    function publishItem(IERC721 _nft, uint _tokenId, uint _price) external nonReentrant {
        require(_price > 0, "Price must be greater than zero");

        // TODO: is it neccesary to do this?
        //_nft.transferFrom(msg.sender, address(this), _tokenId);

    }

    // TODO: Falta hacer que la misma persona dueña del token no sea la misma que lo compra
    function purchaseItem(uint _itemId) external payable nonReentrant {
        uint _totalPrice = getTotalPrice(_itemId);
        require(_itemId > 0 && _itemId <= itemCount, "item doesn't exist");
        require(msg.value >= _totalPrice, "not enough ether to cover item price and market fee");

        if (itemCountOfPurchases[_itemId] == 0) {
            console.log('ASIGNO UN DIAMOND: ', msg.sender);
            accountsLevels[_itemId].diamond = payable(msg.sender);
        }
        else if (itemCountOfPurchases[_itemId] == 1) {
            console.log('ASIGNO UN GOLD');
            accountsLevels[_itemId].gold = payable(msg.sender);
        }
        else if (itemCountOfPurchases[_itemId] == 2) {
            console.log('ASIGNO UN SILVER');
            accountsLevels[_itemId].silver = payable(msg.sender);
        }

        Item storage item = items[_itemId];
        
        // pay seller 
        item.seller.transfer(item.price);
        
        // pay fees to organizations
        // TODO: Esto no se deberia a aplicar a la primera compra, ya que el seller es el marketplace
        accountMarketplace.transfer(getFeePrice(feeMarketplacePercent, item.price));
        accountGamerOrganization.transfer(getFeePrice(feeGamerOrganizationPercent, item.price));

        // pay fees to users
        if (itemCountOfPurchases[_itemId] == 3) { // pay to diamond account (diamond fee)
            console.log('SE EJECUTO EL IF DEL DIAMOND');
            accountsLevels[_itemId].diamond.transfer(getFeePrice(feeDiamondPercent, item.price));
        }
        else if (itemCountOfPurchases[_itemId] == 4) { // pay to diamond and gold accounts (gold fee)
            console.log('SE EJECUTO EL IF DEL GOLD');
            accountsLevels[_itemId].diamond.transfer(getFeePrice(feeGoldPercent, item.price));
            accountsLevels[_itemId].gold.transfer(getFeePrice(feeGoldPercent, item.price));
        }
        else if (itemCountOfPurchases[_itemId] == 5) { // pay to diamond, gold and silver accounts (silver fee)
            console.log('SE EJECUTO EL IF DEL SILVER');
            accountsLevels[_itemId].diamond.transfer(getFeePrice(feeSilverPercent, item.price));
            accountsLevels[_itemId].gold.transfer(getFeePrice(feeSilverPercent, item.price));
            accountsLevels[_itemId].silver.transfer(getFeePrice(feeSilverPercent, item.price));
        }

        itemCountOfPurchases[_itemId]++;

        // transfer nft to buyer
        item.nft.transferFrom(address(this), msg.sender, item.tokenId);

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

    // TODO: Deberia de ser internal?
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