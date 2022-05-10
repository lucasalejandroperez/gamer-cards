// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage {
    uint public tokenId;
    constructor() ERC721("Gamer Cards", "ETH"){}
    function mint(string[] memory _tokenURIS) external returns(uint[] memory) {
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