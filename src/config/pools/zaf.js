import {
    Dollars
} from "./dollars";
import {
    loadDollar,
    calculateEmptySetChange
} from "./dollar_helper"; 

export async function main() {
    const params = Dollars.ZAF.Parameters;
    const calcPrice = (twap, totalCoupons, totalRedeemable) => calculateEmptySetChange(params, totalCoupons, totalRedeemable, twap)
    await loadDollar(Dollars.ZAF, calcPrice);
}
