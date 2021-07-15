import {
    Dollars
} from "./dollars";
import {
    calculateEmptySetChange,
    loadDollar
} from "./dollar_helper";

export async function main() {
    const params = Dollars.eEUR.Parameters;
    const calcPrice = (twap, totalCoupons, totalRedeemable, epoch) =>
        (epoch < params.BootstrappingPeriod)
            ? params.BootstrappingPrice - 1
            : calculateEmptySetChange(params, totalCoupons, totalRedeemable, twap)

    loadDollar(Dollars.eEUR, calcPrice);
}
