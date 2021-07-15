import React, { useEffect, useState } from "react";
import cx from "classnames";
import { Box, Typography, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useIsDarkMode } from "../../state/user/hooks";

import { DataTable, ImgButton } from "../../components";

import IMG_connect_wallet from "assets/img/bsc.svg";
import IMG_clear_browser from "assets/img/bsc.svg";

import {
  consoleInit,
  formatMoney,
  init_ethers,
  lookUpTokenPrices,
} from "../../config/pools/ethers_helper";
import { getDollar, getBasisFork } from "../../hooks/utils";
import { Dollars } from "../../config";
import { Basis } from "../../config/BCData";

const useStyles = makeStyles(({ palette }) => ({
  root: {},
}));

const SeignioragePage: React.FC = () => {
  const { breakpoints } = useTheme();
  const dark = useIsDarkMode();
  const mobile = useMediaQuery(breakpoints.down("xs"));
  const classes = useStyles({ dark, mobile });

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  const [dollarsTable, setDollarsTable] = useState<any>({
    title: "Self-Stabilizing Dollars",
    heading: [
      "Ticker",
      "Pool",
      "Epoch",
      "Price",
      "TWAP",
      "Status",
      "Supply",
      "Market Cap",
    ],
    rows: [],
    totalMarketCap: 0,
  });

  const [basisForksTable, setBasisForksTable] = useState<any>({
    title: "Seigniorage Shares",
    heading: [
      "Cash",
      "Share",
      "Cash Price",
      "Share Price",
      "Combined Market Cap",
    ],
    rows: [],
    totalMarketCap: 0,
  });

  const main = async () => {
    const App = await init_ethers();
    const dollarBaseCoins = Object.entries(Dollars).map(
      ([, v]) => Object(v).UniswapLP.baseCoin
    );
    const basisBaseCoins = Object.entries(Basis).map(
      ([, v]) => Object(v).CashPool.baseCoin
    );
    const uniqueBaseCoins = dollarBaseCoins
      .concat(basisBaseCoins)
      .filter((v, i, a) => a.indexOf(v) === i);
    const basePrices = await lookUpTokenPrices(uniqueBaseCoins);
    const dollars = await Promise.all(
      Object.entries(Dollars).map(([, v]) => getDollar(App, basePrices, v))
    );
    const basisForks = await Promise.all(
      Object.entries(Basis).map(([, v]) => getBasisFork(App, basePrices, v))
    );

    let rows = [];
    //esb is not production ready yet
    dollars.sort((a, b) => b.marketCap - a.marketCap);
    for (const d of dollars) {
      rows.push([
        //`<a href='/${d.page}/'>${d.name}</a>`,
        d.name,
        d.lpToken,
        d.epoch,
        `$${formatMoney(d.price)}`,
        d.twap?.toFixed(2),
        d.status,
        formatMoney(d.totalSupply),
        `$${formatMoney(d.marketCap)}`,
      ]);
    }

    setDollarsTable({
      ...dollarsTable,
      rows: rows,
      totalMarketCap: formatMoney(
        dollars.reduce((v1, d2) => {console.log(v1, d2); return v1 + d2.marketCap}, 0)
      ),
    });

    let rows1: any[] = [];
    basisForks.sort((a: any, b: any) => b.marketCap - a.marketCap);
    for (const b of basisForks) {
      rows1.push([
        b!.cash,
        b!.share,
        `$${formatMoney(b!.cashPrice)}`,
        `$${formatMoney(b!.sharePrice)}`,
        `$${formatMoney(b!.marketCap)}`,
      ]);
    }
    setBasisForksTable({
      ...basisForksTable,
      rows: rows1,
      totalMarketCap: formatMoney(
        basisForks.reduce((v3: any, d4: any) => {
          console.log(v3, d4);
          return v3 + d4.marketCap;
        }, 0)
      ),
    });
  };

  useEffect(() => {
    consoleInit(main);
    // eslint-disable-next-line
  }, []);

  return (
    <Box className={cx(classes.root)}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{today.toString()}</Typography>

        <Box>
          <ImgButton
            id="connect_wallet_button"
            label="Connect Wallet"
            src={IMG_connect_wallet}
            onClick={() => {}}
          />

          <ImgButton
            id="clear_browser_storage"
            label="Clear Browser Storage"
            src={IMG_clear_browser}
            onClick={() => {}}
          />
        </Box>
      </Box>
      {dollarsTable.rows.length > 0 && (
        <>
          <DataTable
            title={dollarsTable.title}
            heading={dollarsTable.heading}
            rows={dollarsTable.rows}
          />
          <p>Total Market Cap: ${dollarsTable.totalMarketCap}</p>
        </>
      )}
      {basisForksTable.rows.length > 0 && (
        <>
          <DataTable
            title={basisForksTable.title}
            heading={basisForksTable.heading}
            rows={basisForksTable.rows}
          />
          <p>Total Market Cap: ${basisForksTable.totalMarketCap}</p>
        </>
      )}
      <Box id="log"></Box>
    </Box>
  );
};

export default SeignioragePage;
