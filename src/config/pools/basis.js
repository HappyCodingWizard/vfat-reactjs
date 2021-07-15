import {
  loadBasisFork
} from "./ethers_helper";
import {
  Basis
} from "../BCData";
export async function main() {
  await loadBasisFork(Basis.Basis);
}
