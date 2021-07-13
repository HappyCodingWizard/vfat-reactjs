import * as config from "config";

export function fetchLogo(poolName: string): string {
  const { logos } = config;

  return Object(logos.find((item) => poolName.trim() === item.name)).src;
}

export default fetchLogo;
