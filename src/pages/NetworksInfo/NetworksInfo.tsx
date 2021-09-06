import React, { useEffect, useRef } from 'react'
import cx from 'classnames'
import { useHistory } from 'react-router'
import { Box, Button, useMediaQuery } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useIsDarkMode } from 'state/user/hooks'
import Carousel, { RenderArrowProps } from 'react-elastic-carousel'
import { getNetworkInfo, fetchLogo } from 'hooks'
import { FilterToolbar } from 'components'

import ICON_TOKEN from 'assets/icon/awesome-coins.svg'
import ICON_WEBSITE from 'assets/icon/ionic-md-link.svg'
// import ICON_ARROW_LEFT from 'assets/icon/ionic-md-arrow-dropleft-circle.svg'
// import ICON_ARROW_RIGHT from 'assets/icon/ionic-md-arrow-dropright-circle.svg'
import BACK_POOLLOGO from 'assets/pools/poolLogoBackground.png'
import { useNetwork } from 'state/network/hooks'
import { usePoolToken } from 'state/pool/hooks'

const useStyles = makeStyles(({ palette }) => ({
  root: {
    height: '100%'
  },

  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: '50px'
  },

  carouselItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: palette.text.primary,
    fontWeight: 'bold'
  },

  poolName: {
    fontSize: '45px',
    fontWeight: 900,
    textTransform: 'uppercase',
    cursor: 'pointer'
  },

  poolLogo: {
    background: `url(${BACK_POOLLOGO}) left 5px top 5px no-repeat`,
    backgroundSize: 'cover',
    width: '200px',
    height: '200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '& > img': {
      width: '65%',
      height: '65%',
      transform: 'rotateY(-30deg) rotateX(30deg)',
      transformStyle: 'preserve-3d'
    }
  },

  tokenName: {
    fontWeight: 900,
    display: 'flex',
    alignItems: 'center',
    fontSize: '10px'
  },

  webSite: {
    fontWeight: 900,
    display: 'flex',
    alignItems: 'center',
    fontSize: '10px'
  },

  switchButton: {
    borderRadius: 5,
    backgroundColor: palette.text.primary,
    padding: 10,
    display: 'inline-block',
    color: palette.common.white,
    margin: 'auto 7px',
    fontSize: 12,
    fontWeight: 100,

    '& .text': {
      margin: 'auto 5px'
    }
  }
}))

const NetworksInfo: React.FC = () => {
  const { breakpoints } = useTheme()
  const dark = useIsDarkMode()
  const mobile = useMediaQuery(breakpoints.down('xs'))
  const classes = useStyles({ dark, mobile })
  const carouselRef = useRef<any>(null)
  const history = useHistory()
  const { rows } = getNetworkInfo()
  const [network] = useNetwork()
  const [, setToken] = usePoolToken()
  const colorList = ['#FDC113', '#C81B72', '#1BC870']

  useEffect(() => {
    if (!network) history.push('/networks')
    // eslint-disable-next-line
  }, [network])

  const renderHighlight = (value: string | number, i: number) => {
    return (
      <Box component='span' color={colorList[i % 3]}>
        {value}
      </Box>
    )
  }
  const renderPagination = () => {
    return <></>
  }

  const renderArrow = ({ type, onClick, isEdge }: RenderArrowProps) => {
    // const pointer = type === 'PREV' ? ICON_ARROW_LEFT : ICON_ARROW_RIGHT
    // return (
    //   <Box
    //     onClick={onClick}
    //     visibility={isEdge ? 'hidden' : 'visible'}
    //     display='flex'
    //     alignItems='center'
    //     style={{ cursor: 'pointer' }}
    //   >
    //     <img src={pointer} alt='direction' width='60px' />
    //   </Box>
    // )
    return <></>
  }

  const handleSwitchButton = (direction: number) => {
    if (direction > 0) {
      carouselRef.current.slideNext()
    } else {
      carouselRef.current.slidePrev()
    }
  }

  const extractLink = (tag: string): string => {
    return tag.match(/"([^']+)"/)![1] ?? '';
  }

  const handleClickPool = (url: string, token: string) => {
    setToken(token)
    history.push(extractLink(url))
  }

  return (
    <Box className={cx(classes.root)}>
      <FilterToolbar />

      <Carousel
        ref={ref => (carouselRef.current = ref)}
        itemsToShow={1}
        isRTL={false}
        renderPagination={renderPagination}
        renderArrow={renderArrow}
      >
        {rows &&
          rows.map((row: string[], i: number) => (
            <Box className={cx(classes.carouselItem)} key={i}>
              <Box className={cx(classes.poolName)} onClick={() => handleClickPool(row[1], row[2])}>
                {renderHighlight('#' + (i + 1), i)}&nbsp;
                {row[0]}
              </Box>
              <Box mt={'20px'} />
              <Box className={cx(classes.poolLogo)}>
                <img src={fetchLogo(row[0])} alt={row[0]} />
              </Box>
              <Box mt={'15px'} />
              <Box className={cx(classes.tokenName)}>
                <img src={ICON_TOKEN} alt='Token' width='20px' height='20px' />
                &nbsp; REWARD TOKEN:&nbsp;
                {renderHighlight(row[2], i)}
              </Box>
              <Box mt={'15px'} />
              <Box className={cx(classes.webSite)}>
                <img
                  src={ICON_WEBSITE}
                  alt='WebSite'
                  width='20px'
                  height='20px'
                />
                &nbsp; Website:&nbsp;
                {renderHighlight(row[3], i)}
              </Box>
            </Box>
          ))}
      </Carousel>

      <Box textAlign='center' mt='20px'>
        <Button
          className={cx(classes.switchButton)}
          onClick={() => handleSwitchButton(-1)}
        >
          <i className='fas fa-chevron-left' />
          <span className='text'>BACK</span>
        </Button>
        <Button
          className={cx(classes.switchButton)}
          onClick={() => handleSwitchButton(1)}
        >
          <span className='text'>NEXT</span>
          <i className='fas fa-chevron-right' />
        </Button>
      </Box>
    </Box>
  )
}

export default NetworksInfo
