import {
  AllPage,
  AvaxPage,
  BSCPage,
  FantomPage,
  FusePage,
  HarmonyPage,
  HecoPage,
  HomePage,
  KucoinPage,
  OkexPage,
  PolygonPage,
  SeignioragePage,
  ThunderCorePage,
  xDAIPage,
} from "../pages";

const routes = [
  {
    label: "Home",
    path: "/home",
    component: HomePage,
  },
  {
    label: "All",
    path: "/all",
    component: AllPage,
  },
  {
    label: "BSC",
    path: "/bsc",
    component: BSCPage,
  },
  {
    label: "HECO",
    path: "/heco",
    component: HecoPage,
  },
  {
    label: "POLYGON",
    path: "/polygon",
    component: PolygonPage,
  },
  {
    label: "xDAI",
    path: "/xdai",
    component: xDAIPage,
  },
  {
    label: "AVAX",
    path: "/avax",
    component: AvaxPage,
  },
  {
    label: "FANTOM",
    path: "/fantom",
    component: FantomPage,
  },
  {
    label: "HARMONY",
    path: "/harmony",
    component: HarmonyPage,
  },
  {
    label: "FUSE",
    path: "/fuse",
    component: FusePage,
  },
  {
    label: "ThunderCore",
    path: "/thundercore",
    component: ThunderCorePage,
  },
  {
    label: "OKEX",
    path: "/okex",
    component: OkexPage,
  },
  {
    label: "KUCOIN",
    path: "/kcc",
    component: KucoinPage,
  },
  {
    label: "Seigniorage",
    path: "/seigniorage",
    component: SeignioragePage,
  },
];

export default routes;
