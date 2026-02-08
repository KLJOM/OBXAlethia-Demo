// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ITokenSuite {
  function createERC20(
    string calldata name,
    string calldata symbol,
    uint256 initialSupply,
    address recipient
  ) external returns (address);

  function createERC721(
    string calldata name,
    string calldata symbol,
    address owner
  ) external returns (address);

  function createERC1155(
    string calldata uri,
    address owner
  ) external returns (address);
}
