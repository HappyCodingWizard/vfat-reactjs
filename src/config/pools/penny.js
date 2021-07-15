import {
    Contracts
} from "../BCData";
import {
    loadDollar,
    calculateEmptySetChange
} from "./dollar_helper";
export async function main() {
    const params = Contracts.PEN.Parameters;
    const calcPrice = (twap, totalCoupons, totalRedeemable) => calculateEmptySetChange(params, totalCoupons, totalRedeemable, twap)
    await loadDollar(Contracts.PEN, calcPrice);
}
