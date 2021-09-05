export function getPoolInfo(): any {
  try {
    const location = window.location.pathname.replace(/^\/|\/$/g, "").replace(/\//g, '_').replace("polygon_", "matic_");

    const { main } = require(`../config/pools/${location}.js`);

    return main;
  } catch (e) {
    return undefined;
  }
}

export default getPoolInfo;
