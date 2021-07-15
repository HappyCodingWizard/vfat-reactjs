import * as config from "config";

export function getNetworkInfo(): any {
  const { NetworksInfo } = config;
  const location = window.location.pathname;

  switch (location) {
    case "/home":
      return NetworksInfo.HomeTableData;
    case "/all":
      return NetworksInfo.AllTableData;
    case "/bsc":
      return NetworksInfo.BSCTableData;
    case "/heco":
      return NetworksInfo.HecoTableData;
    case "/polygon":
      return NetworksInfo.PolygonTableData;
    case "/xdai":
      return NetworksInfo.xDAITableData;
    case "/avax":
      return NetworksInfo.AvaxTableData;
    case "/fantom":
      return NetworksInfo.FantomTableData;
    case "/harmony":
      return NetworksInfo.HarmonyTableData;
    case "/fuse":
      return NetworksInfo.FuseTableData;
    case "/thundercore":
      return NetworksInfo.ThunderCoreTableData;
    case "/okex":
      return NetworksInfo.OkexTableData;
    case "/kcc":
      return NetworksInfo.KucoinTableData;
    default:
      return {};
  }
}

export default getNetworkInfo;
