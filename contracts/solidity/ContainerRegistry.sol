// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/IContainerRegistry.sol";

contract ContainerRegistry is IContainerRegistry {
  mapping(bytes32 => Container) private containers;

  function registerContainer(
    bytes32 containerId,
    address owner,
    string calldata metadataUri
  ) external {
    containers[containerId] = Container({
      owner: owner,
      metadataUri: metadataUri,
      createdAt: block.timestamp
    });
    emit ContainerRegistered(containerId, owner, metadataUri);
  }

  function getContainer(bytes32 containerId) external view returns (Container memory) {
    return containers[containerId];
  }
}
