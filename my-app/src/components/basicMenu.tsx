import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ArrowDropDownCircleOutlined } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import { useNavigate } from 'react-router-dom';

export default function BasicMenu(props: {own:boolean}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (a:number|null) => {
    setAnchorEl(null);
    console.log(a)

    if (a == 4){
      navigate('reference')
    }
    
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
      <ArrowDropDownCircleOutlined />      
      </Button>
      
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(0)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >

        <Grid>
          <Grid item>
          <MenuItem onClick={() => handleClose(1)}>Send Message</MenuItem>
          </Grid>
          <Grid item>
          <MenuItem onClick={() => handleClose(2)}>Report/Block</MenuItem>
          </Grid>
          <Grid item>
          <MenuItem onClick={() => handleClose(3)}>Send Friend Request</MenuItem>
          </Grid>
          <Grid item>
          <MenuItem onClick={() => handleClose(4)}>Send Group Invite</MenuItem>
          </Grid>
          {(!props.own )?  
             <Grid item>
             <MenuItem onClick={() => handleClose(4)}>Write Reference</MenuItem>
             </Grid>
                                                                : <div></div>}
        </Grid>

      </Menu>
    </div>
  );
}

