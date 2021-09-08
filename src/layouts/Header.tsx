import React, { useState } from 'react'
import { Box, useMediaQuery, Container, Drawer } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import cx from 'classnames'
import Hamburger from 'hamburger-react'

import { useIsDarkMode } from 'state/user/hooks'
import { useHistory } from 'react-router'
import { useNetwork } from 'state/network/hooks'

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  root: {
    position: 'fixed',
    top: 0,
    zIndex: 100,
    width: '100%',
    padding: '36px 20px',
    background: palette.background.default,

    [breakpoints.down('sm')]: {
      padding: '20px 20px',
    }
  },

  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  logo: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    flexDirection: 'row',
    
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
    }
  },

  logoImg: {
    '& > div:first-child': {
      top: '36px',
      left: '86px',
      width: '40px',
      height: '40px',
      transform: 'matrix(0.71, 0.71, -0.71, 0.71, 0, 0)',
      background: '#0D2146 0% 0% no-repeat padding-box',
      display: 'inline-block'
    },
    '& > div:last-child': {
      top: '36px',
      left: '102px',
      width: '40px',
      height: '40px',
      transform: 'matrix(0.71, 0.71, -0.71, 0.71, 0, 0)',
      background: '#FDC113 0% 0% no-repeat padding-box',
      display: 'inline-block',
      marginLeft: '-28px'
    },

    [breakpoints.down('sm')]: {
      '& > div:first-child': {
        width: '30px',
        height: '30px'
      },
      '& > div:last-child': {
        width: '30px',
        height: '30px',
        marginLeft: '-22px'
      }
    }
  },
  logoTitle: {
    color: palette.text.primary,
    paddingLeft: '20px',

    [breakpoints.down('xs')]: {
      paddingTop: '10px',
      paddingLeft: '0px'
    }
  },

  navMenu: {
    display: 'flex',
    alignItems: 'center',

    [breakpoints.down('xs')]: {
      flexDirection: 'column',
      backgroundColor: palette.background.default
    }
  },

  navItem: {
    color: palette.primary.main,
    padding: '0px 10px',
    display: 'inline-block',
    cursor: 'pointer',

    [breakpoints.down('xs')]: {
      padding: '20px'
    }
  },

  network: {
    display: 'flex',
    alignItems: 'center'
  },

  networkName: {
    fontWeight: 900,
    color: palette.primary.main
  },
  changeNetwork: {
    fontSize: '10px',
    color: palette.primary.light,
    cursor: 'pointer',
    transition: 'border .2s ease-in',
    borderBottom: `1px solid transparent`,
    display: 'inline-block'
  }
}))

const Header: React.FC = () => {
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('xs'))
  const dark = useIsDarkMode()
  const classes = useStyles({ dark, mobile })
  const history = useHistory()
  const [network, setNetwork] = useNetwork()
  const [isOpen, setOpen] = useState(false)

  const handleChangeNetwork = () => {
    history.push('/networks')
    setNetwork(null)
  }

  return (
    <Box className={cx(classes.root)}>
      <Container>
        <Box className={cx(classes.container)}>
          <Box className={cx(classes.logo)} onClick={() => history.push('/')}>
            <Box className={cx(classes.logoImg)}>
              <div />
              <div />
            </Box>
            <Box className={cx(classes.logoTitle)}>Their Logo</Box>
          </Box>

          {!network && (
            <>
              {!mobile && (
                <Box className={cx(classes.navMenu)}>
                  <Box className={cx(classes.navItem)}>About</Box>
                  <Box className={cx(classes.navItem)}>Contact</Box>
                  <Box className={cx(classes.navItem)}>Branding</Box>
                </Box>
              )}
              {mobile && (
                <>
                  <Hamburger toggled={isOpen} toggle={setOpen} />
                  <Drawer
                    anchor={'top'}
                    open={isOpen}
                    onClose={() => setOpen(false)}
                  >
                    <Box className={cx(classes.navMenu)}>
                      <Box className={cx(classes.navItem)}>About</Box>
                      <Box className={cx(classes.navItem)}>Contact</Box>
                      <Box className={cx(classes.navItem)}>Branding</Box>
                    </Box>
                  </Drawer>
                </>
              )}
            </>
          )}
          {network && (
            <Box className={cx(classes.network)}>
              <img
                src={network.logoSrc}
                alt='network logo'
                width='60px'
                height='60px'
              />
              <Box textAlign='right' display='inline-block'>
                <Box className={cx(classes.networkName)}>{network.name}</Box>
                <Box
                  className={cx(classes.changeNetwork)}
                  onClick={handleChangeNetwork}
                >
                  Change Network
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  )
}

export default Header
