import { useTheme } from "@emotion/react";
import { Divider, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CurrentJackpot from "../../Components/Common/CurrentJackpot/CurrentJackpot";
import TabTable from "../../Components/Common/TabTable/TabTable";
import MainCard from "../../Components/UI/Cards/MainCard/MainCard";
import SecondaryCard from "../../Components/UI/Cards/SecondaryCard/SecondaryCard";
import HistoryIcon from "../../Components/UI/Icons/HistoryIcon";
import SettingsIcon from "../../Components/UI/Icons/SettingsIcon";
import LeftSide from "../../Components/UI/Sides/LeftSide/LeftSide";
import RightSide from "../../Components/UI/Sides/RightSide/RightSide";
import classes from "./Lottery.module.css";
import { makeStyles } from "@mui/styles";
import SwapField from "../../Components/Common/SwapField/SwapField";
import ArrowDownSwapIcon from "../../Components/UI/Icons/ArrowDownSwapIcon";

import Label from "../../Components/UI/Text/Label/Label";
import ArrowsChangeIcon from "../../Components/UI/Icons/ArrowsChangeIcon";
import CustomButton from "../../Components/UI/Button/CustomButton";
import { parseMoney } from "../../Utils/parseMoney";
import useWindowDimensions from "../../Hooks/useWindowDimension";
import { cx } from "../../Utils/classnames";
import CloseIcon from "../../Components/UI/Icons/CloseIcon";
import ArrowLeftIcon from "../../Components/UI/Icons/ArrowLeftIcon";
import aces_logo from "../../Assets/Icons/aces_logo.png";

import {
  getTokenBalance,
  getQuote,
  checkAllowance,
  Approve,
  swap,
} from "../../blockchain/functions";

import { useDispatch, useSelector } from "react-redux";
import { getLottoData, getUserBalances } from "../../Redux/reduxActions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiButtonBase-root": {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));
const tokens = [
  {
    value: "BNB",
    text: "BNB",
    address: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
    decimals: 18,
    img: "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
    currentValue: "0",
    balance: "0",
  },
  {
    value: "$ACES",
    text: "METACES",
    address: "0xd17485e114e33e581cF58975cf8cAe0909985fE7",
    decimals: 9,
    img: aces_logo,
    currentValue: "0",
    balance: "0",
  },
];

const Lottery = (props) => {
  //   const { pay, receive, handlePay, handleReceive, handleSwap, exchangeRate } =
  //   props;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  let { lotto, acesBalance, bnbBalance, userEntries, userAddress } =
    useSelector((state) => state.common);
  let { signer } = useSelector((state) => state.signer);
  const [enoughAllowance, setEnoughAllowance] = useState(true);
  const [tokenIn, setTokenIn] = useState(tokens[0]);
  const [tokenOut, setTokenOut] = useState(tokens[1]);
  const [amountIn, setAmountIn] = useState("");
  const [amountOut, setAmountOut] = useState("");

  const firstInputRef = useRef();

  const theme = useTheme();

  const { width } = useWindowDimensions();

  const [isShowSwap, setIsShowSwap] = useState(false);

  const handleShowSwap = () => {
    setIsShowSwap(!isShowSwap);
    firstInputRef.current.focus();
  };

  const timer = null;

  const changeToken = async (token, side) => {
    switch (side) {
      case "IN":
        checkTokenAllowance(token);
        setTokenIn({ ...token });
        break;
      case "OUT":
        setTokenOut({ ...token });
        break;
      default:
        break;
    }
  };

  const switchSides = () => {
    changeToken(tokenOut, "IN");
    changeToken(tokenIn, "OUT");
  };

  const checkTokenAllowance = async (token) => {
    if (token.value === "BNB") {
      setEnoughAllowance(true);
    } else {
      let allowance = await checkAllowance(userAddress, token.address);
      console.log(allowance > 0, "allowance");
      setEnoughAllowance(allowance > 0);
    }
  };

  const handleAmountChange = async (num, side) => {
    let path = [tokenIn.address, tokenOut.address];
    let quote;
    switch (side) {
      case "IN":
        setAmountIn(num);
        quote = await getQuote(num, path, side, tokenIn.decimals);
        setAmountOut(
          getNumberDecimals((quote * 10 ** 18) / 10 ** tokenOut.decimals)
        );
        break;
      case "OUT":
        setAmountOut(num);
        quote = await getQuote(num, path, side, tokenOut.decimals);
        setAmountIn(
          getNumberDecimals((quote * 10 ** 18) / 10 ** tokenIn.decimals)
        );
        break;
      default:
        break;
    }
  };

  const handleSwap = async () => {
    setIsLoading(true);
    let path = [tokenIn.address, tokenOut.address];
    let decimals = [tokenIn.decimals, tokenOut.decimals];
    let receipt = await swap(
      amountIn,
      amountOut,
      path,
      userAddress,
      signer,
      decimals
    );
    if (receipt) {
      dispatch(getUserBalances(userAddress));
      dispatch(getLottoData());
      changeToken(tokenIn, "IN");
      changeToken(tokenOut, "OUT");
      console.log(receipt);
    }
    setIsLoading(false);
  };

  const handleApprove = async () => {
    setIsLoading(true);
    let receipt = await Approve(tokenIn.address, signer);
    if (receipt) {
      checkTokenAllowance(tokenIn);
      console.log(receipt);
    }
    setIsLoading(false);
  };

  const getNumberDecimals = (num) => {
    let length = Math.floor(num).toString().length;
    if (length > 4) {
      return Number(num).toFixed(0);
    } else {
      return Number(num).toFixed(8);
    }
  };

  const truncate = (value, numDecimalPlaces) =>
    Math.trunc(value * Math.pow(10, numDecimalPlaces)) /
    Math.pow(10, numDecimalPlaces);

  useEffect(() => {
    changeToken(tokens[0], "IN");
    changeToken(tokens[1], "OUT");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(lotto, "lotto");
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isShowSwap) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isShowSwap]);

  return (
    <div className={classes.main}>
      <LeftSide className={classes.left}>
        <CurrentJackpot
          cash={lotto.jackpot}
          actionText={"Buy Entry"}
          onClick={handleShowSwap}
        />
        <div className={classes.tickets}>
          <MainCard className={classes.ticket}>
            <p>{Number(acesBalance).toFixed(0)}</p>
            <span>$ACES Balance</span>
          </MainCard>
          <MainCard className={classes.ticket}>
            <p>{lotto.entries}</p>
            <span>Lotto Entries</span>
          </MainCard>
          <MainCard className={classes.ticket}>
            <p>{userEntries}</p>
            <span>My Entries</span>
          </MainCard>
        </div>
        <div className={classes.table}>
          <TabTable items={lotto.addresses} winners={lotto.results} />
        </div>
      </LeftSide>

      <RightSide
        className={cx(classes.right, isShowSwap ? classes.showSwap : "")}
      >
        <SecondaryCard
          className={cx(
            classes.rightCard,
            isShowSwap ? classes.showSwapCard : ""
          )}
        >
          <div className={classes.rightHeader}>
            <Typography variant="h4" color={"primary"}>
              Swap Tokens
            </Typography>
            {/* <div className={classes.actions}>
              <IconButton
                style={{
                  backgroundColor: theme.palette.background.buttonSecondary,
                  color: theme.palette.primary.main,
                  borderRadius: "8px",
                }}
              >
                <SettingsIcon />
              </IconButton>
              <IconButton
                style={{
                  backgroundColor: theme.palette.background.buttonSecondary,
                  color: theme.palette.primary.main,
                  borderRadius: "8px",
                }}
              >
                <HistoryIcon />
              </IconButton>
              <IconButton
                onClick={handleShowSwap}
                className={classes.showButt}
                style={{
                  backgroundColor: theme.palette.background.buttonSecondary,
                  color: theme.palette.primary.main,
                  borderRadius: "8px",
                }}
              >
                {!isShowSwap && <ArrowLeftIcon />}
                {isShowSwap && <CloseIcon color={theme.palette.primary.main} />}
              </IconButton>
            </div> */}
          </div>
          <SwapField
            tokenIcon={tokenIn.img}
            tokenName={tokenIn.value}
            leftLabel={"Pay"}
            available={
              tokenIn.value === "BNB"
                ? truncate(bnbBalance, 4)
                : truncate(acesBalance, 0)
            }
            valueText={"MAX"}
            inputRef={firstInputRef}
            value={amountIn}
            onChange={(e) => handleAmountChange(e, "IN")}
          />
          <div className={classes.iconContainer}>
            <Tooltip title="Swap">
              <IconButton onClick={switchSides}>
                <ArrowDownSwapIcon color={theme.palette.primary.main} />
              </IconButton>
            </Tooltip>
          </div>
          <SwapField
            tokenIcon={tokenOut.img}
            tokenName={tokenOut.value}
            leftLabel={"Receive (Estimated)"}
            available={
              tokenOut.value === "BNB"
                ? truncate(bnbBalance, 4)
                : truncate(acesBalance, 0)
            }
            valueText={"MAX"}
            value={amountOut}
            onChange={(e) => handleAmountChange(e, "OUT")}
          />
          <div className={classes.swapInfo}>
            <Label text={`1 BNB = ${parseMoney(125)} $ACES`} />
            <ArrowsChangeIcon color={theme.palette.primary.main} />
          </div>
          <CustomButton
            onClick={enoughAllowance ? handleSwap : handleApprove}
            text={enoughAllowance ? "Swap Now" : `Approve ${tokenIn.value}`}
            // text="Confirm"
            disabled={isLoading}
          />
          <Label
            className={classes.totalLabel}
            text="25,000 $ACES = 1 Lotto Entry"
          />
          <Divider
            style={{
              border: `1px solid ${theme.palette.background.border}`,
              width: "100%",
              marginTop: "24px",
            }}
          />
          <div className={classes.willGet}>
            <p style={{ color: theme.palette.text.primary }}>You will get:</p>
            <p style={{ color: theme.palette.text.special }}>
              {truncate((amountOut / 25000) % 25000, 0)} Entries!
            </p>
          </div>
        </SecondaryCard>
      </RightSide>
    </div>
  );
};

export default Lottery;
