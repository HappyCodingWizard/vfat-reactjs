import {
    Basis
} from "../BCData";
import {
    loadBasisFork
} from "./ethers_helper"; 

export async function main() {
    await loadBasisFork(Basis.YFLUSD);
}
