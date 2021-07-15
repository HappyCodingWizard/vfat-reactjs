import {
    Contracts
} from "../BCData";
import {
    loadDollar
} from "./dollar_helper"; 

export async function main() {
    const params = Contracts.SDP.Parameters;

    const calcPrice = twap => Math.min((twap - 1) / params.SupplyChangeDivisor, params.SupplyChangeLimit);

    loadDollar(Contracts.SDP, calcPrice);
}
