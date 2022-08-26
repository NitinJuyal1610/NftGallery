import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import NftCard from "./components/NftCard";

const Home = () => {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [nfts, setNfts] = useState([]);
  const [cnt, setCnt] = useState(0);
  const [fetchByCollection, setFetchByCollection] = useState(false);

  const fetchNftsForCollection = async (start) => {
    if (collection.length) {
      var requestOptions = {
        method: "GET",
      };
      const api_key = "A8A1Oo_UTB9IN5oNHfAc2tAxdR4UVwfM";
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&startToken=${start}&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then((data) =>
        data.json()
      );
      console.log(nfts);
      console.log(nfts.nfts.length);
      if (nfts) {
        setNfts(nfts.nfts);
      }
    }
  };

  const fetchNfts = async () => {
    //Get NFTS using alchemy api
    let nfts;
    console.log("fetching nfts");
    const api_key = "AjLihzUYjHiGzQ2DRy8C6ryZHQLO-hND";
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`;
    var requestOptions = {
      method: "GET",
    };
    if (!collection.length) {
      //show all nfts
      const fetchURL = `${baseURL}?owner=${wallet}`;
      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
    } else {
      //filter by collection
      console.log("fetching nfts for collection owned by address");
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
    }

    if (nfts) {
      console.log(nfts);
      setNfts(nfts.ownedNfts);
    }
  };
  return (
    <div className="">
      <Head>
        <title>NftGallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col mt-2 w-full  gap-y-5 items-center justify-center text-center">
        <div className="flex flex-col w-full items-center justify-center gap-y-2 text-center">
          <input
            type="text"
            disabled={fetchByCollection}
            placeholder="Add your wallet address"
            value={fetchByCollection ? " " : wallet}
            className="w-2/5 bg-slate-100 py-2 px-5 text-gray-300 rounded-lg focus:outline-blue-300  disabled-bg-slate-50 disabled-text-gray-50"
            onChange={(e) => setWalletAddress(e.target.value)}
          />
          <input
            value={collection}
            onChange={(e) => {
              setCollectionAddress(e.target.value);
            }}
            className="w-2/5 bg-slate-100 py-2 px-5 text-gray-300 rounded-lg focus:outline-blue-300  disabled-bg-slate-50 disabled-text-gray-50"
            type="text"
            placeholder="Add the collection address"
          />
          <label className="flex gap-5">
            <input
              type="checkbox"
              onChange={(e) => {
                setFetchByCollection(e.target.checked);
              }}
              className="text-gray-600 "
            />
            Fetch for collection
          </label>
          <button
            onClick={() => {
              fetchByCollection ? fetchNftsForCollection(cnt) : fetchNfts();
            }}
            className={
              "disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"
            }
          >
            Lets Rock
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2 p-5 justify-center">
          {nfts.map((nft) => (
            <NftCard nft={nft} />
          ))}
        </div>
        {fetchByCollection && nfts.length > 0 && (
          <div className="mx-auto w-full flex gap-3 items-center justify-center p-2">
            {cnt >= 100 && (
              <button
                onClick={() => {
                  setCnt(cnt - 100);
                  fetchNftsForCollection(cnt - 100);
                }}
                className=" text-white bg-blue-400 py-2 mt-3 rounded-lg w-1/12"
              >
                Back
              </button>
            )}

            {nfts.length >= 100 && (
              <button
                onClick={() => {
                  setCnt(cnt + 100);

                  fetchNftsForCollection(cnt + 100);
                }}
                className="text-white bg-blue-400 py-2 mt-3 rounded-lg w-1/12"
              >
                Next
              </button>
            )}
          </div>
        )}
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <b>Road To Web3</b>
        </a>
      </footer>
    </div>
  );
};

export default Home;
