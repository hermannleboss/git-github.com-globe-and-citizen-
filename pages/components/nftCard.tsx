import { NextPage } from "next"

export const NFTCard: NextPage = ({ nft }) => {
  return (
    <div className="max-w-sm min-w-sm flex flex-col p-8 bg-slate-800 rounded-2xl text-white box-border">
      <div className="rounded-md  min-h-128">
        <img className="object-cover h-128 w-full rounded-t-md" src={nft.media[0].gateway} alt={nft.description.substring(0, 10)}></img>
      </div>
      <h2 className="text-4xl hover:text-cyan-500 my-6">{nft.title}</h2>
      <p className="text-lg text-indigo-400 mb-6">{nft.description.substring(0, 80)}</p>
      <p className="text-base">Id: {nft.id.tokenId.substring(nft.id.tokenId.length - 4)}</p>
      <p className="mb-6">Contract: {nft.contract.address.substring(0, 4)}
        ... {nft.contract.address.substring(nft.contract.address.length - 4)}</p>
      <div><a target={"_blank"} href={`https://etherscan.io/token/${nft.contract.address}`}>Viex on ehterscan</a></div>
    </div>
  )
}