import React from 'react'
import { Box, useMediaQuery, Container } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import cx from 'classnames'

import { useIsDarkMode } from 'state/user/hooks'
import { useHistory } from 'react-router'
import { useNetwork } from 'state/network/hooks'

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  root: {
    position: 'fixed',
    top: 0,
    zIndex: 100,
    width: '100%',
    padding: '20px 0px',
    background: palette.background.default
  },

  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  logo: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
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
    }
  },
  logoTitle: {
    color: palette.text.primary,
    paddingLeft: '20px'
  },

  navMenu: {
    display: 'flex',
    alignItems: 'center'
  },

  navItem: {
    color: palette.primary.main,
    padding: '0px 10px',
    display: 'inline-block',
    cursor: 'pointer'
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
    display: 'inline-block',

    '&:hover': {
      borderBottom: `1px solid ${palette.primary.light}`
    }
  }
}))

const Header: React.FC = () => {
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))
  const dark = useIsDarkMode()
  const classes = useStyles({ dark, mobile })
  const history = useHistory()
  const [network, setNetwork] = useNetwork()

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
            <Box className={cx(classes.navMenu)}>
              <Box className={cx(classes.navItem)}>About</Box>
              <Box className={cx(classes.navItem)}>Contact</Box>
              <Box className={cx(classes.navItem)}>Branding</Box>
            </Box>
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
