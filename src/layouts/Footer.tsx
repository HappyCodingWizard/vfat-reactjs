import React from 'react'
import { Box, useMediaQuery, Container } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import cx from 'classnames'

import { useIsDarkMode } from 'state/user/hooks'

import ICON_DARK from 'assets/icon/feather-moon.svg'
import ICON_LIGHT from 'assets/icon/metro-sun.svg'

import ICON_TELEGRAM from 'assets/icon/awesome-telegram-plane.svg'
import ICON_FACEBOOK from 'assets/icon/awesome-facebook-square.svg'
import ICON_TWITTER from 'assets/icon/awesome-twitter-square.svg'

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  root: {
    position: 'fixed',
    bottom: 0,
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

  switchTheme: {
    display: 'flex',

    '& > div:first-child': {
      borderRight: `2px solid ${palette.primary.main}`,
      borderRightStyle: 'dashed'
    }
  },

  themeImage: {
    display: 'flex',
    '& > img': {
      cursor: 'pointer',
      padding: '0px 10px',
      width: '40px'
    }
  },

  socialList: {
    display: 'flex',
    alignItems: 'center'
  },

  socialItem: {
    cursor: 'pointer',
    padding: '0px 10px',
    display: 'flex',
    '& > img': {
      width: '20px'
    }
  }
}))

const Footer: React.FC = () => {
  const { breakpoints } = useTheme()
  const dark = useIsDarkMode()
  const mobile = useMediaQuery(breakpoints.down('xs'))
  const classes = useStyles({ dark, mobile })

  return (
    <Box className={cx(classes.root)}>
      <Container>
        <Box className={cx(classes.container)}>
          <Box className={cx(classes.switchTheme)}>
            <Box className={cx(classes.themeImage)}>
              <img src={ICON_DARK} alt='dark' />
            </Box>
            <Box className={cx(classes.themeImage)}>
              <img src={ICON_LIGHT} alt='light' />
            </Box>
          </Box>

          <Box className={cx(classes.socialList)}>
            <Box className={cx(classes.socialItem)}>
              <img src={ICON_TELEGRAM} alt='telegram' />
            </Box>
            <Box className={cx(classes.socialItem)}>
              <img src={ICON_FACEBOOK} alt='facebook' />
            </Box>
            <Box className={cx(classes.socialItem)}>
              <img src={ICON_TWITTER} alt='twitter' />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
