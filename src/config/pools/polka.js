import {
    Basis
} from "../BCData";
import {
    loadBasisFork
} from "./ethers_helper";

async function main() {
    await loadBasisFork(Basis.Polka);
}
