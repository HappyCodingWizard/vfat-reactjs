import {
    Dollars
} from "./dollars";
import {
    loadDollar
} from "./dollar_helper"; 

export async function main() {
    const params = Dollars.SSD.Parameters;

    const calcPrice = twap => Math.min((twap - 1) / params.SupplyChangeDivisor, params.SupplyChangeLimit);

    loadDollar(Dollars.SSD, calcPrice);
}
