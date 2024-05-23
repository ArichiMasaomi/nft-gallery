import { createThirdwebClient, getContract } from "thirdweb";
// import { ethereum } from "thirdweb/chains";
import { defineChain } from "thirdweb/chains";


export const redstone = /* @__PURE__ */ defineChain({
  id: 620,
  name: "Redstone",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpc: "https://rpc.redstonechain.com",
  blockExplorers: [
    {
      name: "Etherscan",
      url: "https://etherscan.io",
    },
  ],
});
/** Change these values to configure the application for your own use. **/

export const client = createThirdwebClient({
  clientId: import.meta.env.VITE_TEMPLATE_CLIENT_ID,
  secretKey: import.meta.env.VITE_TEMPLATE_SECRET_KEY,
});

export const nftContract = getContract({
  // Your smart contract address (available on the thirdweb dashboard)
  address: "0xe680743004614a15db9873aa1aaf0ca3b101619f",
  // The chain object of the chain your contract is deployed to.
  // If that chain isn't in the default list of our SDK, use `defineChain` - for example: defineChain(666666)
  chain: redstone,
  client,
});

// The block explorer you want to use (Opens when user clicks on history of events. i.e. transfers)
export const blockExplorer = "https://etherscan.io";
