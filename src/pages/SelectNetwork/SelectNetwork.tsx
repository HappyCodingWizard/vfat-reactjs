import React from 'react'
import cx from 'classnames'
import { Box, useMediaQuery } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useIsDarkMode } from 'state/user/hooks'

import Carousel from 'react-elastic-carousel'
import { Button } from 'components'
import { useHistory } from 'react-router'

import IMG_BSC from 'assets/networks/BSC.png'
// import IMG_BSC1 from 'assets/networks/undefined.png'

interface networkItemType {
  name: string
  logoSrc: string
  redirectUrl: string
}

const items: networkItemType[] = [
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

const useStyles = makeStyles(({ palette }) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%'
  },

  carousel: {
    width: '500px'
  },

  carouselItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  networkName: {
    fontWeight: 900,
    color: palette.text.primary,
    fontSize: '30px'
  }
}))

const SelectNetwork: React.FC = () => {
  const { breakpoints } = useTheme()
  const dark = useIsDarkMode()
  const mobile = useMediaQuery(breakpoints.down('xs'))
  const classes = useStyles({ dark, mobile })
  const history = useHistory()

  // const customArrow = ({ type, onClick, isEdge }: RenderArrowProps) => {
  //   const pointer = type === 'PREV' ? '👈' : '👉'
  //   return (
  //     <Button onClick={onClick} disabled={isEdge}>
  //       {pointer}
  //     </Button>
  //   )
  // }

  return (
    <Box className={cx(classes.root)}>
      <Carousel
        itemsToShow={1}
        className={cx(classes.carousel)}
        isRTL={false}
        // renderArrow={customArrow}
      >
        {items && items.map(item => (
          <Box className={cx(classes.carouselItem)}>
            <p className={cx(classes.networkName)}>{item.name}</p>
            <img src={item.logoSrc} alt='BSC' width='200px' height='200px' />
            <Button onClick={() => history.push(item.redirectUrl)}>SELECT NETWORK</Button>
          </Box>
        ))}
      </Carousel>
    </Box>
  )
}

export default SelectNetwork
