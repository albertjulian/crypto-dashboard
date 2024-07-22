import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { IconButton, InputBase, Paper } from '@mui/material';
import './index.css';
import { useState } from 'react';
import Navbar from '../Navbar';

const Header = () => {
  const [toggleButton, setToggleButton] = useState(false);

  return (
    <div className='header-container'>
      <Navbar />
      
      <div className={toggleButton ? 'logo-container logo-container-none' : 'logo-container'}>
        <div className='logo-first'>
          Crypto
        </div>
        <div className='logo-second'>
          MarkЄt
        </div>
      </div>

      {
        toggleButton ?
          <Paper
            component="form"
            className='search-input-container'
          >
            <IconButton sx={{ p: '10px' }} aria-label="back" onClick={() => setToggleButton(false)}>
              <ArrowBackIosNewIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Crypto"
              inputProps={{ 'aria-label': 'search crypto' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          :
          <IconButton sx={{ color: 'white' }} aria-label="search" size="large" onClick={() => setToggleButton(true)}>
            <SearchIcon fontSize="inherit" />
          </IconButton>
      }

      

    </div>
  )
}

export default Header;