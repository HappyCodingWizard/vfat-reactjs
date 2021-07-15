import {
    Dollars
} from "./dollars";
import {
    calculateEmptySetChange,
    loadDollar
} from "./dollar_helper";

export async function main() {
    const params = Dollars.ESB.Parameters;
    const calcPrice = (twap, totalCoupons, totalRedeemable) => calculateEmptySetChange(params, totalCoupons, totalRedeemable, twap)
    await loadDollar(Dollars.ESB, calcPrice);
}
