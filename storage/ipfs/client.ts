export type StorageReference = {
  cid: string;
  uri: string;
};

export async function storeFile(_bytes: Uint8Array): Promise<StorageReference> {
  return {
    cid: "bafy-placeholder",
    uri: "ipfs://bafy-placeholder"
  };
}
