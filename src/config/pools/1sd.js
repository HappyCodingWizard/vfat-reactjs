import { Contracts } from "../BCData";

import { loadDollar, calculateEmptySetChange } from "../../config/pools/dollar_helper";

export async function main() {
    const params = Contracts._1SD.Parameters;
    const calcPrice = (twap, totalCoupons, totalRedeemable) => calculateEmptySetChange(params, totalCoupons, totalRedeemable, twap)
    await loadDollar(Contracts._1SD, calcPrice);
}
