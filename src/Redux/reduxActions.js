import { ethers, providers } from "ethers";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import store from "./reduxStore";
import {
  nftABI,
  stakingABI,
  tokenABI,
  lottoABI,
  nftLottoABI,
} from "../abis/abis";
import { useSelector } from "react-redux";

const updateUser = (payload) => {
  return {
    type: "UPDATE_USER",
    payload: payload,
  };
};

const updateUserBalances = (payload) => {
  return {
    type: "UPDATE_USER_BALANCES",
    payload: payload,
  };
};

const updateChain = (payload) => {
  return {
    type: "UPDATE_CHAIN",
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

const updateStakingValues = (payload) => {
  return {
    type: "UPDATE_STAKING",
    payload: payload,
  };
};

const updateUserStaking = (payload) => {
  return {
    type: "UPDATE_USER_STAKING",
    payload: payload,
  };
};

const updateLottoValues = (payload) => {
  return {
    type: "UPDATE_LOTTO_VALUES",
    payload: payload,
  };
};

const updateNftLottoValues = (payload) => {
  return {
    type: "UPDATE_NFT_LOTTO_VALUES",
    payload: payload,
  };
};

const updateUserNftBalance = (payload) => {
  return {
    type: "UPDATE_NFT_BALANCE",
    payload: payload,
  };
};

let provider = new ethers.providers.JsonRpcProvider(
  // "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
  "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
);
let BSCprovider = new ethers.providers.JsonRpcProvider(
  "https://bsc-dataseed1.ninicoin.io/"
);

let nftAddress = "0x061877f578C1dAe494d16782E05f908b0053C999"; // NFT on RINKEBY
let tokenAddress = "0x1702e76a5be119E332805dC7C11Be26f3857c31d"; //token on BSC MAINNET
let lottoAddress = "0x93f9073619707b068DBD436B31907159f3Fe4bEa"; //lotto on BSC MAINNET
let nftLottoAddress = "0x90d3D7dcF74F52E5F78521226Aa3fE31a499fC5F"; //lotto on RINKEBY
let stakingAddress = "0xaebDD6cBd68c150d111d1Ebd4a58C6bD4Cc4671A"; //staking on BSC MAINNET

let nftInstance = new ethers.Contract(nftAddress, nftABI, provider);
let tokenInstance = new ethers.Contract(tokenAddress, tokenABI, BSCprovider);
let lottoInstance = new ethers.Contract(lottoAddress, lottoABI, BSCprovider);
let nftLottoInstance = new ethers.Contract(
  nftLottoAddress,
  nftLottoABI,
  provider
);
let stakingInstance = new ethers.Contract(
  stakingAddress,
  stakingABI,
  BSCprovider
);

// BALANCES

export const getUserBalances = (userAddress) => {
  return async (dispatch) => {
    try {
      if (!userAddress) {
        let reduxStore = store.getState().common;
        userAddress = reduxStore.userAddress;
      }

      let balance = await tokenInstance.balanceOf(userAddress);
      let bnbBalance = await BSCprovider.getBalance(userAddress);
      let entries = await lottoInstance.userEntries(userAddress);

      dispatch(
        updateUserBalances({
          acesBalance: ethers.utils.formatUnits(balance, 9),
          bnbBalance: ethers.utils.formatUnits(bnbBalance, 18),
          userEntries: Number(entries),
        })
      );
    } catch (error) {
      console.log(error, "getUserBalances");
    }
  };
};

// STAKING FUNCTIONS

export const initAction = (type, level, _amount) => {
  return async (dispatch) => {
    try {
      let signer = store.getState().signer;
      let newStakingInstance = new ethers.Contract(
        stakingAddress,
        stakingABI,
        signer.signer
      );

      let tx;
      let amount = _amount ? ethers.utils.parseUnits(_amount, 9) : "";

      switch (type) {
        case "DEPOSIT":
          tx = await newStakingInstance.deposit(amount, level);
          break;
        case "WITHDRAW":
          tx = await newStakingInstance.withdraw(amount, level);
          break;
        case "CLAIM":
          tx = await newStakingInstance.claim(level);
          break;
        case "COMPOUND":
          tx = await newStakingInstance.compound(level);
          break;
        case "APPROVE":
          let newTokenInstance = new ethers.Contract(
            tokenAddress,
            tokenABI,
            signer.signer
          );
          tx = await newTokenInstance.approve(
            stakingAddress,
            "115792089237316195423570985008687907853269984665640564039457584007913129639935"
          );
          break;
        default:
          break;
      }

      let receipt = await tx.wait();

      dispatch(getUserInfo());

      return receipt;
    } catch (error) {
      console.log(error, "initAction");
      if (error.data) {
        window.alert(error.data.message);
      }
    }
  };
};

export const getLevelsInfo = () => {
  return async (dispatch) => {
    try {
      let data = await stakingInstance.getLevelsInfo();

      dispatch(
        updateStakingValues({
          level0: {
            daily_back: Number(data.level0.APY / 365) / 100,
            APY: Number(data.level0.APY) / 100,
            period: timeLeft(data.level0.lockPeriod * 1000),
          },
          level1: {
            daily_back: Number(data.level1.APY / 365) / 100,
            APY: Number(data.level1.APY) / 100,
            period: timeLeft(data.level1.lockPeriod * 1000),
          },
          level2: {
            daily_back: Number(data.level2.APY / 365) / 100,
            APY: Number(data.level2.APY) / 100,
            period: timeLeft(data.level2.lockPeriod * 1000),
          },
          level3: {
            daily_back: Number(data.level3.APY / 365) / 100,
            APY: Number(data.level3.APY) / 100,
            period: timeLeft(data.level3.lockPeriod * 1000),
          },
        })
      );
    } catch (error) {
      console.log(error, "getLevelsInfo");
    }
  };
};

export const getUserInfo = (userAddress) => {
  return async (dispatch) => {
    try {
      if (!userAddress) {
        let reduxStore = store.getState().common;
        userAddress = reduxStore.userAddress;
      }
      let data = await stakingInstance.getUserInfo(userAddress);
      let balance = await tokenInstance.balanceOf(userAddress);
      let allowance = await tokenInstance.allowance(
        userAddress,
        stakingAddress
      );

      dispatch(
        updateUserStaking({
          balance: ethers.utils.formatUnits(balance, 9),
          isApproved: Number(allowance) > 0,
          level0: {
            balance: ethers.utils.formatUnits(data.level0.balance, 9),
            claimed: ethers.utils.formatUnits(data.level0.claimed, 9),
            lastClaim: Number(data.level0.lastClaim * 1000),
            started: Number(data.level0.started * 1000),
            unlockTime: Number(data.level0.unlockTime * 1000),
            earnings: Number(
              ethers.utils.formatUnits(data.level0Rewards, 9)
            ).toFixed(2),
          },
          level1: {
            balance: ethers.utils.formatUnits(data.level1.balance, 9),
            claimed: ethers.utils.formatUnits(data.level1.claimed, 9),
            lastClaim: Number(data.level1.lastClaim * 1000),
            started: Number(data.level1.started * 1000),
            unlockTime: Number(data.level1.unlockTime * 1000),
            earnings: Number(
              ethers.utils.formatUnits(data.level1Rewards, 9)
            ).toFixed(2),
          },
          level2: {
            balance: ethers.utils.formatUnits(data.level2.balance, 9),
            claimed: ethers.utils.formatUnits(data.level2.claimed, 9),
            lastClaim: Number(data.level2.lastClaim * 1000),
            started: Number(data.level2.started * 1000),
            unlockTime: Number(data.level2.unlockTime * 1000),
            earnings: Number(
              ethers.utils.formatUnits(data.level2Rewards, 9)
            ).toFixed(2),
          },
          level3: {
            balance: ethers.utils.formatUnits(data.level3.balance, 9),
            claimed: ethers.utils.formatUnits(data.level3.claimed, 9),
            lastClaim: Number(data.level3.lastClaim * 1000),
            started: Number(data.level3.started * 1000),
            unlockTime: Number(data.level3.unlockTime * 1000),
            earnings: Number(
              ethers.utils.formatUnits(data.level3Rewards, 9)
            ).toFixed(2),
          },
        })
      );
    } catch (error) {
      console.log(error, "getUserInfo");
    }
  };
};

// NFT FUNCTIONS

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

// LOTTO FUNCTIONS

export const getLottoData = () => {
  return async (dispatch) => {
    try {
      let roundNum = await lottoInstance.roundNum();
      let results = await lottoInstance.resultLog("0", roundNum.toString());
      let entries = await lottoInstance.roundEntries();
      let addresses = await lottoInstance.getUniqueAddresses();
      let jackpot = await lottoInstance.currentJackpot();

      let entriesList = [];
      addresses[0].map((el, index) => {
        entriesList.push({
          _id: index,
          address: el,
          entries: Number(addresses[1][index]),
        });
      });

      let resultsList = [];
      results.map((el, index) => {
        resultsList.push({
          _id: index,
          winningAddress: el.winningAddress,
          totalEntries: Number(el.totalEntries),
          payout: ethers.utils.formatUnits(el.payout, 9),
        });
      });

      dispatch(
        updateLottoValues({
          roundNum: Number(roundNum),
          results: resultsList,
          entries: Number(entries),
          addresses: entriesList,
          jackpot: ethers.utils.formatUnits(jackpot, 9),
        })
      );
    } catch (error) {
      console.log(error, "getLottoData");
    }
  };
};

export const getUserLottoData = () => {
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

// LOTTO FUNCTIONS

export const getNftLottoData = () => {
  return async (dispatch) => {
    try {
      let roundNum = await nftLottoInstance.roundNum();
      let results = await nftLottoInstance.resultLog("0", roundNum.toString());
      let entries = await nftLottoInstance.getEntries();
      let addresses = await nftLottoInstance.getUniqueAddresses();
      let jackpot = await nftLottoInstance.currentJackpot();

      let entriesList = [];
      addresses[0].map((el, index) => {
        entriesList.push({
          _id: index,
          address: el,
          entries: Number(addresses[1][index]),
        });
      });

      let resultsList = [];
      results.map((el, index) => {
        resultsList.push({
          _id: index,
          winningAddress: el.winningAddress,
          totalEntries: Number(el.totalEntries),
          payout: ethers.utils.formatUnits(el.payout, 18),
        });
      });

      dispatch(
        updateNftLottoValues({
          roundNum: Number(roundNum),
          results: resultsList,
          entries: Number(entries),
          addresses: entriesList,
          jackpot: ethers.utils.formatUnits(jackpot, 18),
        })
      );
    } catch (error) {
      console.log(error, "getNftLottoData");
    }
  };
};

export const getUserNftLottoData = (userAddress) => {
  return async (dispatch) => {
    try {
      if (!userAddress) {
        let reduxStore = store.getState().common;
        userAddress = reduxStore.userAddress;
      }
      let balance = await nftInstance.balanceOf(userAddress);

      dispatch(
        updateUserNftBalance({
          balance: Number(balance),
        })
      );
    } catch (error) {
      console.log(error, "getNftData");
    }
  };
};

// WALLET CONNECTION

export const connectMetamask = () => {
  return async (dispatch) => {
    try {
      console.log("hola");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      let userAddress = accounts[0];
      const id = await window.ethereum.request({
        method: "eth_chainId",
      });

      let chainId = parseInt(id, 16);
      console.log(chainId, "chainId");

      dispatch(
        updateChain({
          chainId,
        })
      );
      dispatch(getSigner());
      dispatch(getUserInfo(userAddress));
      dispatch(getUserBalances(userAddress));
      dispatch(getUserNftLottoData(accounts[0]));

      window.ethereum.on("accountsChanged", function (accounts) {
        dispatch(
          updateUser({
            userAddress: accounts[0],
            connectionType: "metamask",
            provider: null,
          })
        );
        dispatch(getSigner());
        dispatch(getUserInfo(accounts[0]));
        dispatch(getUserBalances(accounts[0]));
        dispatch(getUserNftLottoData(accounts[0]));
      });

      window.ethereum.on("chainChanged", (_chainId) => {
        window.location.reload();
      });

      if (userAddress) {
        dispatch(
          updateUser({
            userAddress,
            connectionType: "metamask",
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
          1: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
          56: "https://bsc-dataseed1.ninicoin.io/",
          4: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
          97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
        },
        // network: "binance",
        chainId: 56,
        infuraId: null,
      });

      await provider.enable();

      dispatch(getSigner("WALLET_CONNECT", provider));

      const web3 = new Web3(provider);

      const accounts = await web3.eth.getAccounts();
      let chainId = await web3.eth.getChainId();

      dispatch(
        updateChain({
          chainId,
        })
      );

      dispatch(getUserInfo(accounts[0]));
      dispatch(getUserBalances(accounts[0]));
      dispatch(getUserNftLottoData(accounts[0]));

      provider.on("accountsChanged", (accounts) => {
        console.log(accounts);
        dispatch(
          updateUser({
            userAddress: accounts[0],
            connectionType: "WALLET_CONNECT",
          })
        );
        dispatch(getUserInfo(accounts[0]));
        dispatch(getUserBalances(accounts[0]));
        dispatch(getUserNftLottoData(accounts[0]));
        dispatch(getSigner("WALLET_CONNECT", provider));
      });

      // Subscribe to session disconnection
      provider.on("disconnect", (code, reason) => {
        dispatch(disconnectWallet());
      });

      provider.on("chainChanged", (chainId) => {
        dispatch(
          updateChain({
            chainId,
          })
        );
      });

      if (accounts) {
        dispatch(
          updateUser({
            userAddress: accounts[0],
            connectionType: "WALLET_CONNECT",
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
            1: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
            56: "https://bsc-dataseed1.ninicoin.io/",
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

// PROVIDER SIGNER

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

const timeLeft = (time) => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  let hours = Math.floor((time % day) / hour).toLocaleString(undefined, {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  let days = Math.floor(time / day);
  let minutes = Math.floor((time % hour) / minute).toLocaleString(undefined, {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  if (days <= 0) {
    return `${hours > 0 ? `${hours} Hours, ` : ""}${minutes} Minutes`;
  }

  return `${days} Days`;
};
