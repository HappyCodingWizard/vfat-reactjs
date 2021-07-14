import { ethers } from "ethers";
import * as BCData from "../config/BCData";

// const { BCData } = config;
const { UNI_ABI } = BCData;

export const calculateTwap = async (oldPrice0: any, oldTimestamp: any, price0: any, timestamp: any, targetMantissa: any) => {
    // Convert Prices to BN
    const price0CumulativeLast = ethers.BigNumber.from(oldPrice0)
    let price0Cumulative = ethers.BigNumber.from(price0)
  
    // Convert timestamps to BN
    const latest = ethers.BigNumber.from(timestamp) // Current Uniswap contract timestamp
    const blockTimestamp = latest.mod(ethers.BigNumber.from(2).pow(32))
    const blockTimestampLast = ethers.BigNumber.from(oldTimestamp) // Saved Uniswap timestamp
  
    // Sub the timestamps to get distance
    const timeElapsed = blockTimestamp.sub(blockTimestampLast)
  
    // If subbing timestamps equals 0: no new trades have happened so use the Spot Price
    // Returning 0 here so it can be handled else where
    if (timeElapsed.toNumber() === 0) return 0
  
    // Do the TWAP calc
    const price0Average = price0Cumulative
      .sub(price0CumulativeLast)
      .div(timeElapsed)
  
    // Shifting the base to match the right numbers
    // Adjust the number of 0s as necessary.
    const exchangeRate0: any = price0Average
    .mul(ethers.BigNumber.from(10).pow(18))
    .mul(ethers.BigNumber.from(10).pow(targetMantissa))
    .div(ethers.BigNumber.from(2).pow(112))

    // Returnthe Float of the TWAP 
    return exchangeRate0 / 1e18;
}

export const getCurrentPriceAndTimestamp = async (App: any, address: any) => {
    const UNI = new ethers.Contract(address, UNI_ABI, App.provider);
    const price0 = await UNI.price0CumulativeLast();
    const price1 = await UNI.price1CumulativeLast();
    const { _blockTimestampLast } = await UNI.getReserves()
    const token0 = await UNI.token0();
    return [ price0, price1, _blockTimestampLast, token0 ]
}

export async function getTWAP(App: any, lpAddress: any, dollarAddress: any, baseTokenDecimals: any) {
  const resp = await fetch("https://api.vfat.tools/twap/" + lpAddress);
  const text = await resp.text();
  const array = text.split("\n");
  let twap;
  if (array.length > 0) {
    const [oldPrice0, oldPrice1, oldTimestamp] =
      array[array.length - 2].split(" "); //last line is blank
    const [price0, price1, timestamp, token0] =
      await getCurrentPriceAndTimestamp(App, lpAddress);
    const targetMantissa = 18 - (baseTokenDecimals ?? 6); //default USDC
    if (token0.toLowerCase() === dollarAddress.toLowerCase()) {
      twap = await calculateTwap(
        oldPrice0,
        oldTimestamp,
        price0,
        timestamp,
        targetMantissa
      );
    } else {
      twap = await calculateTwap(
        oldPrice1,
        oldTimestamp,
        price1,
        timestamp,
        targetMantissa
      );
    }
  }
  return twap;
}

export const getVTDtwap = async (DAO: any) => {
  const supplyIncrease = DAO.filters.SupplyIncrease();
  const supplyDecrease = DAO.filters.SupplyDecrease();
  const supplyNeutral = DAO.filters.SupplyNeutral();
  const increases = await DAO.queryFilter(supplyIncrease, -10000);
  const decreases = await DAO.queryFilter(supplyDecrease, -10000);
  const neutral = await DAO.queryFilter(supplyNeutral, -10000);
  const events = increases.concat(decreases, neutral);
  events.sort((e1: any, e2: any) => e2.args.epoch - e1.args.epoch);
  return events[0].args.price / 1e18;
};
