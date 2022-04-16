import { ethers, providers } from "ethers";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import store from "./reduxStore";
import { nftABI } from "../abis/abis";
import { useSelector } from "react-redux";

const updateUser = (payload) => {
  return {
    type: "UPDATE_USER",
    payload: payload,
  };
};

const updateSigner = (payload) => {
  return {
    type: "UPDATE_SIGNER",
    payload: payload,
  };
};

const updateNftValues = (payload) => {
  return {
    type: "UPDATE_NFT",
    payload: payload,
  };
};

let provider = new ethers.providers.JsonRpcProvider(
  "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
);
// let provider = new ethers.providers.JsonRpcProvider(
//   "https://data-seed-prebsc-2-s2.binance.org:8545/"
// );

let nftAddress = "0x061877f578C1dAe494d16782E05f908b0053C999";

let nftInstance = new ethers.Contract(nftAddress, nftABI, provider);

export const getNftData = () => {
  return async (dispatch) => {
    try {
      let minted = await nftInstance.totalSupply();
      let baseURI = await nftInstance.baseURI();
      let price = await nftInstance.price();

      dispatch(
        updateNftValues({
          minted: Number(minted),
          baseURI: baseURI,
          price: ethers.utils.formatEther(price),
        })
      );
    } catch (error) {
      console.log(error, "getNftData");
    }
  };
};

export const mintNft = (amount) => {
  return async (dispatch) => {
    try {
      let reduxStore = store.getState().common;
      let signer = store.getState().signer;
      let storeSigner = signer.signer;

      let newNftInstance = new ethers.Contract(nftAddress, nftABI, storeSigner);
      let value = ethers.utils.parseUnits(
        (reduxStore.nft.price * amount).toString()
      );

      let tx = await newNftInstance.mint(amount, {
        value,
        gasLimit: 250000 * amount,
      });

      let receipt = await tx.wait();

      dispatch(getNftData());

      return receipt;
    } catch (error) {
      console.log(error, "mintNft");
    }
  };
};

export const connectMetamask = () => {
  return async (dispatch) => {
    try {
      console.log("hola");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      let userAddress = accounts[0];

      dispatch(getSigner());

      window.ethereum.on("accountsChanged", function (accounts) {
        // dispatch(getUserNumbers(accounts[0]));
        dispatch(
          updateUser({
            userAddress: accounts[0],
            connectionType: "metamask",
            provider: null,
          })
        );
      });

      window.ethereum.on("chainChanged", (_chainId) =>
        window.location.reload()
      );

      if (userAddress) {
        // dispatch(getUserNumbers(userAddress));
        dispatch(
          updateUser({
            userAddress,
            connectionType: "metamask",
            provider: null,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const connectWalletConnect = () => {
  return async (dispatch) => {
    try {
      console.log("hola");
      const provider = new WalletConnectProvider({
        rpc: {
          // 56: "https://bsc-dataseed.binance.org/",
          4: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
          97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
        },
        // network: "binance",
        chainId: 4,
        infuraId: null,
      });

      await provider.enable();

      dispatch(getSigner("WALLET_CONNECT", provider));

      const web3 = new Web3(provider);

      const accounts = await web3.eth.getAccounts();

      provider.on("accountsChanged", (accounts) => {
        updateUser({
          userAddress: accounts[0],
          connectionType: "WALLET_CONNECT",
          provider,
        });
      });

      // Subscribe to session disconnection
      provider.on("disconnect", (code, reason) => {
        dispatch(disconnectWallet());
      });

      if (accounts) {
        dispatch(
          updateUser({
            userAddress: accounts[0],
            connectionType: "WALLET_CONNECT",
            provider,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const disconnectWallet = () => {
  let reduxStore = store.getState().common;
  return async (dispatch) => {
    try {
      let { connectionType } = reduxStore;
      if (connectionType === "WALLET_CONNECT") {
        const provider = new WalletConnectProvider({
          rpc: {
            // 56: "https://bsc-dataseed1.ninicoin.io/",
            4: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",

            97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
          },
          chainId: 4,
          infuraId: null,
        });
        await provider.disconnect();
      }

      dispatch(
        updateUser({
          userAddress: "",
          connectionType: "",
          provider: null,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

const getSigner = (walletType, provider) => {
  return async (dispatch) => {
    try {
      let signer;
      if (walletType === "WALLET_CONNECT") {
        const web3Provider = new providers.Web3Provider(provider);

        signer = await web3Provider.getSigner(0);
      } else {
        let newProvider = new ethers.providers.Web3Provider(window.ethereum);
        signer = await newProvider.getSigner(0);
      }

      dispatch(
        updateSigner({
          signer,
        })
      );
    } catch (error) {
      console.log(error, "signer");
    }
  };
};
