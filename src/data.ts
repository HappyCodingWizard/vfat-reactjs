import IMG_BSC from 'assets/networks/BSC.png'

export interface networkItemType {
  name: string
  logoSrc: string
  redirectUrl: string
}

export const networks: networkItemType[] = [
  {
    name: 'BINANCE SMART CHAIN',
    logoSrc: IMG_BSC,
    redirectUrl: '/bsc'
  },
  {
    name: 'POLYGON NETWORK',
    logoSrc: IMG_BSC,
    redirectUrl: '/polygon'
  },
  {
    name: 'KCC NETWORK',
    logoSrc: IMG_BSC,
    redirectUrl: '/kcc'
  }
]