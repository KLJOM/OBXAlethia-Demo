from dataclasses import dataclass


@dataclass
class IndexerConfig:
    rpc_url: str
    start_block: int


def run_indexer(config: IndexerConfig) -> None:
    print(f"Indexing from {config.start_block} on {config.rpc_url}")


if __name__ == "__main__":
    run_indexer(IndexerConfig(rpc_url="http://localhost:8545", start_block=0))
