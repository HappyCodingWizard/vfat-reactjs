import React from 'react'
import cx from 'classnames'
import { Box, useMediaQuery } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useIsDarkMode } from 'state/user/hooks'

import Carousel from 'react-elastic-carousel'
import { Button } from 'components'
import { useHistory } from 'react-router'

import { networks, networkItemType } from 'data'

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

  const handleSelectNetwork = (item: networkItemType) => {
    history.push({
      pathname: item.redirectUrl,
      state: {
        networkInfo: item
      }
    })
  }

  return (
    <Box className={cx(classes.root)}>
      <Carousel
        itemsToShow={1}
        className={cx(classes.carousel)}
        isRTL={false}
        renderPagination={() => {
          return <></>
        }}
        // renderArrow={customArrow}
      >
        {networks && networks.map(item => (
          <Box className={cx(classes.carouselItem)} key={item.name}>
            <p className={cx(classes.networkName)}>{item.name}</p>
            <img src={item.logoSrc} alt='BSC' width='200px' height='200px' />
            <Button onClick={() => handleSelectNetwork(item)}>SELECT NETWORK</Button>
          </Box>
        ))}
      </Carousel>
    </Box>
  )
}

export default SelectNetwork
