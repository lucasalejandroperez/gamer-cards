// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

import "hardhat/console.sol";

contract NFT is ERC721URIStorage {
    uint public tokenCount;
    address owner;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    constructor(address _owner) ERC721("Gamer Cards", "ETH") {
        owner = _owner;
    }
    
    function mint(string[] memory _tokenURIS) external returns(uint[] memory) {
        console.log('EEEEENTRO AL MINT');
        console.log('_tokenURIS.length: ', _tokenURIS.length);
        uint[] memory tokenIdsArray = new uint[](_tokenURIS.length);
        for (uint256 i = 0; i < _tokenURIS.length; i++) {
            console.log('ENTRO AL FOOOOOR');
            console.log('msg.sender en el NFT: ', msg.sender);
            tokenCount++;
            _safeMint(msg.sender, tokenCount);
            _setTokenURI(tokenCount, _tokenURIS[i]);
            tokenIdsArray[i] = tokenCount;
        }

        return(tokenIdsArray);
    }
}