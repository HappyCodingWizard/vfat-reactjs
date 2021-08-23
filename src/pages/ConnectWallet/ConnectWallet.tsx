import React, { useState } from 'react'
import cx from 'classnames'
import { Box, TextField, useMediaQuery } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useIsDarkMode } from 'state/user/hooks'

import { Button } from 'components'
import { connectWallet } from 'config/pools/ethers_helper'
import { useHistory } from 'react-router-dom'
import { ethers } from "ethers";

const useStyles = makeStyles(({ palette }) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%'
  },

  addressInput: {
    width: '250px',
    '& label': {
      color: '#61738E',
      fontSize: '12px'
    }
  }
}))

const ConnectWallet: React.FC = () => {
  const { breakpoints } = useTheme()
  const dark = useIsDarkMode()
  const mobile = useMediaQuery(breakpoints.down('xs'))
  const classes = useStyles({ dark, mobile })
  const history = useHistory()
  const [address, setAddress] = useState<string>('')
  const [isError, setIsError] = useState<boolean>(false)

  const handleClick = () => {
    // console.log(address)
    if (address === '') {
      connectWallet().then(() => {
        history.push('/networks')
      })
    } else if (ethers.utils.isAddress(address)) {
      localStorage.setItem('addr', address)
      history.push('/networks')
    } else {
      setIsError(true)
    }
  }

  const handleChange = (e: any) => {
    setAddress(e.target.value)
    setIsError(false)
  }

  return (
    <Box className={cx(classes.root)}>
      <Button id='connect_wallet_button' onClick={handleClick}>
        CONNECT WALLET
      </Button>

      <TextField
        error={isError}
        label='Enter your wallet address manually'
        className={cx(classes.addressInput)}
        value={address}
        onChange={handleChange}
      />
    </Box>
  )
}

export default ConnectWallet
