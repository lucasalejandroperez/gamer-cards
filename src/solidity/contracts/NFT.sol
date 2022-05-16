// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

import "hardhat/console.sol";

contract NFT is ERC721URIStorage {
    uint public tokenId;
    address owner;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    constructor(address _owner) ERC721("Gamer Cards", "ETH") {
        owner = _owner;
    }
    
    function mint(string[] memory _tokenURIS) external onlyOwner returns(uint[] memory) {
        uint[] memory tokenIdsArray = new uint[](_tokenURIS.length);
        for (uint256 i = 0; i < _tokenURIS.length; i++) {
            tokenId++;
            _safeMint(msg.sender, tokenId);
            _setTokenURI(tokenId, _tokenURIS[i]);
            tokenIdsArray[i] = tokenId;
        }
        return(tokenIdsArray);
    }
}