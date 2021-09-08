import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import { Box, useMediaQuery } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useIsDarkMode } from 'state/user/hooks'

import Carousel, { RenderArrowProps } from 'react-elastic-carousel'
import { Button } from 'components'
import { useHistory } from 'react-router'

import { networks, networkItemType } from 'data'
import { useNetwork } from 'state/network/hooks'
import { pageNetworkFromParam } from 'config/pools/ethers_helper'
import { ethers } from 'ethers'

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%'
  },

  carousel: {
    width: '700px',
    [breakpoints.down('xs')]: {
      width: '350px'
    }
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
    fontSize: '30px',

    [breakpoints.down('xs')]: {
      fontSize: '19px',
      margin: 'auto -100px'
    }
  },

  ArrowRight: {
    width: '40px',
    transition: 'width .5s',

    '& div:first-child': {
      display: 'block',
      fontSize: '40px',
      lineHeight: '100%',
      float: 'right',
      transition: 'float .5s'
    },
    '& div:last-child': {
      display: 'none',
      fontSize: '40px',
      lineHeight: '100%',
      float: 'left',
      transition: 'float .5s'
    },
    '& ~ span': {
      opacity: 0,
      marginRight: '-30px',
      marginBottom: '5px'
    },

    '&:hover': {
      background: '#DAE7F9',
      borderRadius: '100px',
      width: '100%',

      '& div:first-child': {
        display: 'none',
        float: 'left'
      },
      '& div:last-child': {
        display: 'block',
        float: 'right'
      },
      '& ~ span': {
        opacity: 1
      }
    }
  },

  ArrowLeft: {
    width: '40px',
    transition: 'width .5s',

    '& div:first-child': {
      display: 'block',
      fontSize: '40px',
      lineHeight: '100%',
      float: 'left',
      transition: 'float .5s'
    },
    '& div:last-child': {
      display: 'none',
      fontSize: '40px',
      lineHeight: '100%',
      float: 'right',
      transition: 'float .5s'
    },
    '& ~ span': {
      opacity: 0,
      marginLeft: '-30px',
      marginBottom: '5px'
    },

    '&:hover': {
      background: '#DAE7F9',
      borderRadius: '100px',
      width: '100%',

      '& div:first-child': {
        display: 'none',
        float: 'right'
      },
      '& div:last-child': {
        display: 'block',
        float: 'left'
      },
      '& ~ span': {
        opacity: 1
      }
    }
  },

  siblingName: {
    fontSize: '10px',
    fontWeight: 'bold'
  }
}))

const SelectNetwork: React.FC = () => {
  const { breakpoints } = useTheme()
  const dark = useIsDarkMode()
  const mobile = useMediaQuery(breakpoints.down('xs'))
  const classes = useStyles({ dark, mobile })
  const history = useHistory()

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [, setNetwork] = useNetwork()

  const renderArrow = ({ type, onClick, isEdge }: RenderArrowProps) => {
    const pointer = type === 'PREV' ? 'left' : 'right'
    if (!mobile) {
      return (
        <Box
          visibility={isEdge ? 'hidden' : 'visible'}
          display='flex'
          alignItems='center'
          width={'150px'}
          justifyContent={type === 'PREV' ? 'flex-end' : 'flex-start'}
        >
          <Box
            display='flex'
            flexDirection='column'
            width='100%'
            alignItems={type === 'PREV' ? 'flex-end' : 'flex-start'}
          >
            <Box
              className={cx(
                { [classes.ArrowLeft]: type === 'PREV' },
                { [classes.ArrowRight]: type !== 'PREV' }
              )}
              style={{ cursor: 'pointer' }}
              order={2}
              onClick={onClick}
            >
              <Box>
                <i className={`far fa-chevron-circle-${pointer}`} />
              </Box>
              <Box>
                <i className={`fas fa-chevron-circle-${pointer}`} />
              </Box>
            </Box>
            <Box component='span' order={1} className={cx(classes.siblingName)}>
              {type === 'PREV'
                ? networks[selectedIndex - 1]?.name ?? 'PREV'
                : networks[selectedIndex + 1]?.name ?? 'NEXT'}
            </Box>
          </Box>
        </Box>
      )
    } else {
      return (
        <Box
          visibility={isEdge ? 'hidden' : 'visible'}
          display='flex'
          alignItems='center'
          justifyContent='center'
          style={{ fontSize: '40px' }}
        >
          <Box onClick={onClick}>
            <i className={`far fa-chevron-circle-${pointer}`} />
          </Box>
        </Box>
      )
    }
  }
  const renderPagination = () => {
    return <></>
  }

  const onChange = (currentItem: any, pageIndex: number) => {
    setSelectedIndex(pageIndex)
  }

  const handleSelectNetwork = async (item: networkItemType) => {
    const targetNetwork = pageNetworkFromParam(item.id)
    console.log(targetNetwork)

    const walletProvider = window.ethereum
    let provider = new ethers.providers.Web3Provider(walletProvider)
    let connectedNetwork = await provider.getNetwork()
    let targetNetworkId = parseInt(targetNetwork.chainId, 16)

    if (connectedNetwork.chainId !== targetNetworkId) {
      await walletProvider
        .request({ method: 'wallet_addEthereumChain', params: [targetNetwork] })
        .catch()

      walletProvider.on('chainChanged', (chainId: string) => {
        setNetwork(item)
        history.push({
          pathname: item.redirectUrl,
          state: {
            networkInfo: item
          }
        })
      })
    } else {
      setNetwork(item)
      history.push({
        pathname: item.redirectUrl,
        state: {
          networkInfo: item
        }
      })
    }
  }

  useEffect(() => {
    setNetwork(null)
  }, [setNetwork])

  return (
    <Box className={cx(classes.root)}>
      <Carousel
        itemsToShow={1}
        className={cx(classes.carousel)}
        isRTL={false}
        renderPagination={renderPagination}
        renderArrow={renderArrow}
        onChange={onChange}
      >
        {networks &&
          networks.map(item => (
            <Box className={cx(classes.carouselItem)} key={item.name}>
              <p className={cx(classes.networkName)}>{item.name}</p>
              <img src={item.logoSrc} alt='BSC' width='200px' height='200px' />
              <Button onClick={() => handleSelectNetwork(item)}>
                SELECT NETWORK
              </Button>
            </Box>
          ))}
      </Carousel>
    </Box>
  )
}

export default SelectNetwork
