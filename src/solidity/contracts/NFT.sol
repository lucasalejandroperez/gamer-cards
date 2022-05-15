// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

import "hardhat/console.sol";

contract NFT is ERC721URIStorage {
    uint public tokenId;
    
    constructor() ERC721("Gamer Cards", "ETH"){}
    
    // TODO: It must be the deployer
    function mint(string[] memory _tokenURIS, address _marketplaceContract) external returns(uint[] memory) {
        uint[] memory tokenIdsArray = new uint[](_tokenURIS.length);
        for (uint256 i = 0; i < _tokenURIS.length; i++) {
            tokenId++;
            _safeMint(msg.sender, tokenId);
            _setTokenURI(tokenId, _tokenURIS[i]);
            tokenIdsArray[i] = tokenId;
            setApprovalForAll(_marketplaceContract, true);
        }
        return(tokenIdsArray);
    }
}