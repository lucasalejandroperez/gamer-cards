// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ERC721URIStorage.sol";
import "./INFT.sol";

import "hardhat/console.sol";

contract NFT is ERC721URIStorage, INFT {
    uint public tokenCount;
    
    constructor(address _owner) ERC721("Gamer Cards", "ETH") {}
    
    function mint(string[] memory _tokenURIS) external override returns(uint[] memory)  {
        uint[] memory tokenIdsArray = new uint[](_tokenURIS.length);
        for (uint256 i = 0; i < _tokenURIS.length; i++) {
            tokenCount++;
            _safeMint(msg.sender, tokenCount);
            _setTokenURI(tokenCount, _tokenURIS[i]);
            tokenIdsArray[i] = tokenCount;
        }

        return(tokenIdsArray);
    }
}