const blockchains = [
  "Blockchain 1",
  "Blockchain 2",
  "Blockchain 3",
  "Blockchain 1",
  "Blockchain 1",
];

const calculateHash = (data) => {
  return data + "hash";
};

const getMostRepeatedBlockchain = (blockchains = []) => {
  const blockchainHashes = [];
  blockchains.forEach((i) => {
    blockchainHashes.push(calculateHash(i));
  });

  return blockchains.find(
    (blockchain) =>
      calculateHash(blockchain) ===
      getRepeatingBlockchains(blockchainHashes).find(
        (v) =>
          v.count ===
          Math.max(
            ...getRepeatingBlockchains(blockchainHashes).map((i) => {
              return i.count;
            })
          )
      ).blockchainHash
  );
};

const getRepeatingBlockchains = (array = []) => {
  let blockchainHashCounts = [];
  array.forEach((item) => {
    let temp = {
      blockchainHash: item,
      count: array.filter((v) => v === item).length,
    };
    if (
      blockchainHashCounts.filter(
        (t) => t.blockchainHash === temp.blockchainHash
      ).length === 0
    )
      blockchainHashCounts.push(temp);
  });
  return blockchainHashCounts;
};

console.log(getMostRepeatedBlockchain(blockchains));
