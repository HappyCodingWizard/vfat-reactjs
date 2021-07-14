import * as ethcall from "ethcall";
import { ethers } from "ethers";

import { getTWAP, getVTDtwap } from "./dollar_helper";
import * as BCData from "../config/BCData";

const { ABI } = BCData;

export function getParameterCaseInsensitive(object: any, key: any) {
  return object[
    Object.keys(object).find((k: any) => k.toLowerCase() === key.toLowerCase())!
  ];
}

export const getPriceFromUniswap = async (
  App: any,
  basePrices: any,
  lpAddress: any,
  tokenAddress: any,
  baseTokenAddress: any,
  baseDecimals: any
) => {
  const uni = new ethcall.Contract(lpAddress, ABI.UNI_V2);
  const [token0, { _reserve0, _reserve1 }] = await App.ethcallProvider.all([
    uni.token0(),
    uni.getReserves(),
  ]);
  const basePrice = Object(getParameterCaseInsensitive(
    basePrices,
    baseTokenAddress
  )).usd;
  if (token0.toLowerCase() === tokenAddress.toLowerCase()) {
    //will need changing if any dollar token doesnt have 18 decimals
    return ((_reserve1 / 10 ** baseDecimals) * basePrice) / (_reserve0 / 1e18);
  } else {
    return ((_reserve0 / 10 ** baseDecimals) * basePrice) / (_reserve1 / 1e18);
  }
};

export const getDollar = async (App: any, basePrices: any, v: any) => {
  const price = await getPriceFromUniswap(
    App,
    basePrices,
    v.UniswapLP.address,
    v.Dollar.address,
    v.UniswapLP.baseCoin,
    v.UniswapLP.baseDecimals
  );
  const dol = new ethers.Contract(v.Dollar.address, ABI.ERC20, App.provider);
  const dao = new ethers.Contract(v.DAO.address, v.DAO.abi, App.provider);
  const totalSupply = (await dol.totalSupply()) / 1e18;
  const marketCap = totalSupply * price;
  const epoch = await dao.epoch();
  let twap: any;
  try {
    if (v.Dollar.ticker === "VTD") twap = await getVTDtwap(dao);
    else
      twap = await getTWAP(
        App,
        v.UniswapLP.address,
        v.Dollar.address,
        v.UniswapLP.baseDecimals
      );
  } catch {}
  const status =
    epoch <= (v.Parameters?.BootstrappingPeriod ?? 0)
      ? "Bootstrap"
      : twap > 1
      ? "Expansion"
      : "Contraction";
  return {
    page: v.Page,
    name: v.Dollar.ticker,
    lpToken: v.UniswapLP.ticker,
    epoch,
    price,
    twap,
    status,
    totalSupply,
    marketCap,
  };
};

export const getBasisFork = async (App: any, basePrices: any, v: any) => {
  try {
    const getPrice = (lp: any, token: any) =>
      getPriceFromUniswap(
        App,
        basePrices,
        lp,
        token,
        v.CashPool.baseCoin,
        v.CashPool.baseDecimals
      );
    const sharePrice = await getPrice(v.ShareLP, v.Share);
    const cashPrice = await getPrice(v.UniswapLP, v.Cash);
    const share = new ethcall.Contract(v.Share, ABI.ERC20);
    const [totalSupply, pool1, pool2] = await App.ethcallProvider.all([
      share.totalSupply(),
      share.balanceOf(v.CashPool.address),
      share.balanceOf(v.SharePool.address),
    ]);
    const cash = new ethers.Contract(v.Cash, ABI.ERC20, App.provider);
    const shareMarketCap = ((totalSupply - pool1 - pool2) / 1e18) * sharePrice;
    const cashMarketCap = ((await cash.totalSupply()) / 1e18) * cashPrice;
    return {
      page: v.Page,
      cash: v.CashTicker,
      share: v.ShareTicker,
      cashPrice,
      sharePrice,
      marketCap: cashMarketCap + shareMarketCap,
    };
  } catch (ex) {
    console.log(v.CashTicker, ex);
  }
};
