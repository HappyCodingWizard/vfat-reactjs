import {
    Dollars
} from "./dollars";
import {
    loadDollar
} from "./dollar_helper"; 
export async function main() {
    const params = Dollars.FSEUR.Parameters;

    const calcPrice = twap => Math.min((twap - 1) / params.SupplyChangeDivisor, params.SupplyChangeLimit);

    loadDollar(Dollars.FSEUR, calcPrice);
}
