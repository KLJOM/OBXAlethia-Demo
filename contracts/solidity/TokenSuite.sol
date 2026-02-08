// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/ITokenSuite.sol";

contract TokenSuite is ITokenSuite {
  function createERC20(
    string calldata name,
    string calldata symbol,
    uint256 initialSupply,
    address recipient
  ) external pure returns (address) {
    name;
    symbol;
    initialSupply;
    recipient;
    return address(0);
  }

  function createERC721(
    string calldata name,
    string calldata symbol,
    address owner
  ) external pure returns (address) {
    name;
    symbol;
    owner;
    return address(0);
  }

  function createERC1155(
    string calldata uri,
    address owner
  ) external pure returns (address) {
    uri;
    owner;
    return address(0);
  }
}
