// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IContainerRegistry {
  struct Container {
    address owner;
    string metadataUri;
    uint256 createdAt;
  }

  event ContainerRegistered(bytes32 indexed containerId, address indexed owner, string metadataUri);

  function registerContainer(bytes32 containerId, address owner, string calldata metadataUri) external;
  function getContainer(bytes32 containerId) external view returns (Container memory);
}
