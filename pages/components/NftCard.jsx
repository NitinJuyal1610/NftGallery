import React from "react";
import copy from "copy-to-clipboard";
const NftCard = ({ nft }) => {
  return (
    <div className="w-68 p-4">
      <div className=" object:cover">
        <img src={nft.media[0].gateway} className="rounded-lg" />
      </div>
      <div className="flex flex-col gap-1">
        <h5 className="font-medium text-xl">{nft.title}</h5>
        <p className="text-gray-600">
          {nft.id.tokenId.substr(nft.id.tokenId.length - 4)}
        </p>
        <div className="flex gap-2 items-center justify-center">
          <p className="text-gray-600">{`${nft.contract.address.substr(
            0,
            5
          )}....${nft.contract.address.substr(
            nft.contract.address.length - 4
          )}`}</p>

          <img
            className="h-4"
            src="/copy.png"
            onClick={() => copy(nft.contract.address)}
          />
        </div>

        <div className="flex-grow items-start mt-2 px-3">
          <p className="text-gray-600 text-start">
            {nft.description && nft.description.substr(0, 150)}
          </p>
        </div>

        <div className="p-2">
          <a
            target="_blank"
            className="disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"
            href={`https://etherscan.io/token/${nft.contract.address}`}
          >
            View on Etherscan
          </a>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
