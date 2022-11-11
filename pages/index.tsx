import type { NextPage } from "next"
import { useState } from "react"
import { NFTCard } from "./components/nftCard"

const Home: NextPage = () => {
  const [wallet, setWalletAddress] = useState("")
  const [collection, setCollectionAddress] = useState("")
  const [NFTs, setNFTs] = useState([])
  const [fetchForCollection, setFetchForCollection] = useState(false)
  const fetchNFT = async () => {
    let nfts
    console.log("fetching nft")
    const api_key = process.env.NEXT_PUBLIC_API_KEY
    const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTs/`
    let requestOptions = {
      method: "GET",
    }
    if (!collection.length) {
      const fetchURL = `${baseURL}?owner=${wallet}`
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    } else {
      console.log("fetching nfts for collection owned by address")
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    }
    if (nfts) {
      console.log("nfts:", nfts)
      setNFTs(nfts.ownedNfts)
    }
  }

  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      let requestOptions = {
        method: "GET",
      }
      const api_key = process.env.NEXT_PUBLIC_API_KEY
      const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTsForCollection/`
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`
      const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
      if (nfts) {
        console.log("NFTs in collection:", nfts)
        setNFTs(nfts.nfts)
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <input
          onChange={(e) => {
            setWalletAddress(e.target.value)
          }}
          value={wallet}
          type="text"
          placeholder="Add your wallet address"
          className="border-2 border-gray-600 p-4"
        />
        <input
          onChange={(e) => {
            setCollectionAddress(e.target.value)
          }}
          value={collection}
          type="text"
          placeholder="Add the collection address"
          className="border-2 border-gray-600 p-4"
        />
        <label className="text-gray-600 "><input
          onChange={(e) => {
            setFetchForCollection(e.target.checked)
          }}
          type={"checkbox"} className="mr-2"
        >
        </input>Fetch for collection</label>
        <button
          onClick={
            () => {
              if (fetchForCollection) {
                fetchNFTsForCollection()
              } else {
                fetchNFT()
              }
            }
          }
          className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"}
        >Let's go!
        </button>
      </div>
      <div className="flex flex-wrap justify-around bg-slate-900 gap-9 py-32 mt-24">
        {
          NFTs.length && NFTs.map((nft, index) => {
            return (
              <NFTCard nft={nft} key={index}></NFTCard>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home
