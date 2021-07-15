import {
    Dollars
} from "./dollars";
import {
    calculateEmptySetChange,
    loadDollar
} from "./dollar_helper"; 

export async function main() {
    const params = Dollars.ZaiFi.Parameters;
    const calcPrice = (twap, totalCoupons, totalRedeemable) => calculateEmptySetChange(params, totalCoupons, totalRedeemable, twap)
    loadDollar(Dollars.ZaiFi, calcPrice);
}
