export function getPoolInfo(): any {
  try {
    const location = window.location.pathname.replace(/^\/|\/$/g, "");

    const { main } = require(`../config/pools/${location}.js`);

    return main;
  } catch (e) {
    return undefined;
  }
}

export default getPoolInfo;
