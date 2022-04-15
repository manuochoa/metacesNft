let initialState = {
  loading: "",
  userAddress: "",
  connectionType: "",
  nft: {
    minted: "",
    baseURI: "",
    price: "",
  },
};

let commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return {
        ...state,
        loading: false,
        userAddress: action.payload.userAddress,
        connectionType: action.payload.connectionType,
        provider: action.payload.provider,
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
    default: {
      return state;
    }
  }
};

export default commonReducer;
