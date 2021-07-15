import {
    Contracts
} from "../BCData";
import {
    calculateEmptySetChange,
    loadDollar
} from "./dollar_helper";

export async function main() {
    const params = Contracts.ESG.Parameters;
    const calcPrice = (twap, totalCoupons, totalRedeemable) => calculateEmptySetChange(params, totalCoupons, totalRedeemable, twap)
    await loadDollar(Contracts.ESG, calcPrice);
}
