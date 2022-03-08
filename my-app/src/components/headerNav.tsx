import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import {Link} from 'react-router-dom';
import { Grid ,Typography, Box} from '@mui/material'



export default function Header() {
  const  title  = "CookingPals";

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
      
        <Grid container spacing={2}>
            <Grid item xs={2}>

                <Typography
                component="h2"
                variant="h5"
                color="inherit"
                noWrap
                sx={{ flex: 1 }}>
                {title}
                </Typography>

            </Grid>
            
            <Grid item xs={8}>

                <Grid container spacing={0}  >

                    <Grid item xs={4}>
                    <Box sx={{
                        mx: 4,
                        display: 'flex',
                        alignItems: 'right',
                        justifyContent: 'right'
                        }}>
                            <IconButton>
                                <HomeOutlinedIcon />
                            </IconButton>
                    </Box>
                    </Grid>

                    <Grid item xs={4}>
                    <Box sx={{
                        mx: 4,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        }}>
                            <Link to='/friends-groups'> 
                            <IconButton>
                                <GroupOutlinedIcon />
                            </IconButton>
                            </Link>
                    </Box>
                    </Grid>


                    <Grid item xs={4}>
                    <Box sx={{
                        mx: 4,
                        display: 'flex',
                        alignItems: 'left',
                        justifyContent: 'left'
                        }}>
                            <Link to='/search'> 
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                            </Link>
                    </Box>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={2}>
                <Box sx={{
                    mx: 4,
                    display: 'flex',
                    alignItems: 'right',
                    justifyContent: 'right'}}>
                        <Link to='/edit-profile'> 
                        <IconButton>
                            <AccountCircleOutlinedIcon />
                        </IconButton>
                        </Link>
                </Box>
            </Grid>

        </Grid>
      </Toolbar>
    </React.Fragment>
  );
}