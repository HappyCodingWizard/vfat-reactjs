import React from 'react'
import cx from 'classnames'
import { Box, useMediaQuery } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useIsDarkMode } from 'state/user/hooks'

import Carousel, { RenderArrowProps } from 'react-elastic-carousel'
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
    width: '700px'
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
  },

  ArrowRight: {
    width: '50px',
    transition: 'width .5s',

    '& div:first-child': {
      display: 'block',
      fontSize: '40px',
      lineHeight: '100%',
      float: 'right',
      transition: 'float .5s',
    },
    '& div:last-child': {
      display: 'none',
      fontSize: '40px',
      lineHeight: '100%',
      float: 'left',
      transition: 'float .5s',
    },

    '&:hover': {
      background: '#DAE7F9',
      borderRadius: '100px',
      width: '100%',

      '& div:first-child': {
        display: 'none',
        float: 'left',
      },
      '& div:last-child': {
        display: 'block',
        float: 'right',
      },
    }
  },

  ArrowLeft: {
    width: '50px',
    transition: 'width .5s',

    '& div:first-child': {
      display: 'block',
      fontSize: '40px',
      lineHeight: '100%',
      float: 'left',
      transition: 'float .5s',
    },
    '& div:last-child': {
      display: 'none',
      fontSize: '40px',
      lineHeight: '100%',
      float: 'right',
      transition: 'float .5s',
    },

    '&:hover': {
      background: '#DAE7F9',
      borderRadius: '100px',
      width: '100%',

      '& div:first-child': {
        display: 'none',
        float: 'right',
      },
      '& div:last-child': {
        display: 'block',
        float: 'left',
      },
    }
  },
}))

const SelectNetwork: React.FC = () => {
  const { breakpoints } = useTheme()
  const dark = useIsDarkMode()
  const mobile = useMediaQuery(breakpoints.down('xs'))
  const classes = useStyles({ dark, mobile })
  const history = useHistory()

  const renderArrow = ({ type, onClick, isEdge }: RenderArrowProps) => {
    const pointer = type === 'PREV' ? 'left' : 'right'
    return (
      <Box 
        visibility={isEdge ? 'hidden' : 'visible'}
        display='flex'
        alignItems='center'
        width={'150px'}
        justifyContent={type === 'PREV' ? 'flex-end' : 'flex-start'}
      >
        <Box
          className={cx({[classes.ArrowLeft]: type === 'PREV'}, {[classes.ArrowRight]: type !== 'PREV'})}
          style={{cursor: 'pointer'}}
          onClick={onClick}
        >
          <Box>
            <i className={`far fa-chevron-circle-${pointer}`} />
          </Box>
          <Box>
            <i className={`fas fa-chevron-circle-${pointer}`} />
          </Box>
        </Box>
      </Box>
    )
  }
  const renderPagination = () => {
    return <></>
  }

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
        renderPagination={renderPagination}
        renderArrow={renderArrow}
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
