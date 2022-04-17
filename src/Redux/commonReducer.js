let initialState = {
  loading: "",
  userAddress: "",
  connectionType: "",
  chainId: "",
  acesBalance: "",
  stakingApproved: false,
  nft: {
    minted: "",
    baseURI: "",
    price: "",
  },
  staking: [
    {
      daily_back: "",
      period: "",
    },
    {
      daily_back: "",
      period: "",
    },
    {
      daily_back: "",
      period: "",
    },
  ],
  userStaking: [
    {
      balance: "",
      claimed: "",
      lastClaim: "",
      started: "",
      unlockTime: "",
      earnings: "",
    },
    {
      balance: "",
      claimed: "",
      lastClaim: "",
      started: "",
      unlockTime: "",
      earnings: "",
    },
    {
      balance: "",
      claimed: "",
      lastClaim: "",
      started: "",
      unlockTime: "",
      earnings: "",
    },
  ],
};

let commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return {
        ...state,
        loading: false,
        userAddress: action.payload.userAddress,
        connectionType: action.payload.connectionType,
      };
    case "UPDATE_CHAIN":
      return {
        ...state,
        chainId: action.payload.chainId,
      };
    case "UPDATE_NFT":
      return {
        ...state,
        loading: false,
        nft: {
          minted: action.payload.minted,
          baseURI: action.payload.baseURI,
          price: action.payload.price,
        },
      };
    case "UPDATE_STAKING":
      return {
        ...state,
        loading: false,
        staking: [
          action.payload.level0,
          action.payload.level1,
          action.payload.level2,
        ],
      };
    case "UPDATE_USER_STAKING":
      return {
        ...state,
        loading: false,
        acesBalance: action.payload.balance,
        stakingApproved: action.payload.isApproved,
        userStaking: [
          action.payload.level0,
          action.payload.level1,
          action.payload.level2,
        ],
      };
    default: {
      return state;
    }
  }
};

export default commonReducer;
