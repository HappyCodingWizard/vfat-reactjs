import IMG_BSC from 'assets/networks/BSC.png'

export interface networkItemType {
  id: string
  name: string
  logoSrc: string
  redirectUrl: string
}

export const networks: networkItemType[] = [
  {
    id: 'bsc',
    name: 'BINANCE SMART CHAIN',
    logoSrc: IMG_BSC,
    redirectUrl: '/bsc'
  },
  {
    id: 'polygon',
    name: 'POLYGON NETWORK',
    logoSrc: IMG_BSC,
    redirectUrl: '/polygon'
  },
  {
    id: 'kcc',
    name: 'KCC NETWORK',
    logoSrc: IMG_BSC,
    redirectUrl: '/kcc'
  }
]