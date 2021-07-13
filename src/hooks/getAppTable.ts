import * as config from "config";

export function getAppTable(): any {
  const { PoolsInfo } = config;
  const location = window.location.pathname;

  switch (location) {
    case "/home":
      return PoolsInfo.HomeTableData;
    case "/all":
      return PoolsInfo.AllTableData;
    case "/bsc":
      return PoolsInfo.BSCTableData;
    case "/heco":
      return PoolsInfo.HecoTableData;
    case "/polygon":
      return PoolsInfo.PolygonTableData;
    case "/xdai":
      return PoolsInfo.xDAITableData;
    case "/avax":
      return PoolsInfo.AvaxTableData;
    case "/fantom":
      return PoolsInfo.FantomTableData;
    case "/harmony":
      return PoolsInfo.HarmonyTableData;
    case "/fuse":
      return PoolsInfo.FuseTableData;
    case "/thundercore":
      return PoolsInfo.ThunderCoreTableData;
    case "/okex":
      return PoolsInfo.OkexTableData;
    case "/kucoin":
      return PoolsInfo.KucoinTableData;
    default:
      return {};
  }
}

export default getAppTable;
