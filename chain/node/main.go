package main

import "fmt"

type NodeConfig struct {
	NetworkID string
	RPCPort   int
}

type Node struct {
	config NodeConfig
}

func NewNode(config NodeConfig) *Node {
	return &Node{config: config}
}

func (n *Node) Start() {
	fmt.Printf("Starting OBX chain node on port %d (network %s)\n", n.config.RPCPort, n.config.NetworkID)
}

func main() {
	node := NewNode(NodeConfig{NetworkID: "obx-devnet", RPCPort: 8545})
	node.Start()
}
