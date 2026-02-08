import { ContainerRegistered } from "../generated/ContainerRegistry/ContainerRegistry";
import { Container } from "../generated/schema";

export function handleContainerRegistered(event: ContainerRegistered): void {
  const entity = new Container(event.params.containerId.toHex());
  entity.owner = event.params.owner;
  entity.metadataUri = event.params.metadataUri;
  entity.createdAt = event.block.timestamp;
  entity.save();
}
