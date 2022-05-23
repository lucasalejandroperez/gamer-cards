// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IERC721Mint is IERC721 {
    function mint(string[] memory _tokenURIS) external returns(uint[] memory);
}
