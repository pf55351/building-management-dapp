import { useMemo } from "react";
import { ethers } from "ethers";

const useProvider = () => {
  const provider = useMemo(
    () =>
      new ethers.providers.Web3Provider(window.ethereum) ||
      new ethers.providers.getDefaultProvider(),
    []
  );
  return provider;
};

const useContract = (_contractAddress, _abi) => {
  const provider = useProvider();
  const contract = useMemo(
    () => new ethers.Contract(_contractAddress, _abi, provider),
    [_abi, _contractAddress, provider]
  );

  return contract;
};

export { useProvider, useContract };
