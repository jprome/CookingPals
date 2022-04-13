import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ArrowDropDownCircleOutlined } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { Box, Divider, Grid, Typography } from "@mui/material";

export default function BasicMenu(props: { own: boolean }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (a: number | null) => {
    setAnchorEl(null);

    if (a == 3) {
      navigate("sendFriendRequest");
    } else if (a == 4) {
      navigate("reference");
    }
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
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
          "aria-labelledby": "basic-button",
        }}
      >
        <Box
          sx={{
            width: 200,
            height: 300,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            display: "flex",
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <MenuItem onClick={() => handleClose(1)}>
                <Typography variant="h6" sx={{ pl: 4 }}>
                  Send Message
                </Typography>
              </MenuItem>
              <Divider />
            </Grid>

            <Grid item xs={12} sx={{ mt: 1 }}>
              <MenuItem onClick={() => handleClose(2)}>
                <Typography variant="h6" sx={{ pl: 5 }}>
                  Report/Block
                </Typography>
              </MenuItem>
              <Divider />
            </Grid>
            <Grid item xs={12} sx={{ mt: 1 }}>
              <MenuItem onClick={() => handleClose(3)}>
                <Typography variant="h6" sx={{ pl: 1 }}>
                  Send Friend Request
                </Typography>
              </MenuItem>
              <Divider />
            </Grid>
            <Grid item xs={12} sx={{ mt: 1 }}>
              <MenuItem onClick={() => handleClose(4)}>
                <Typography variant="h6" sx={{ pl: 2 }}>
                  Send Group Invite
                </Typography>
              </MenuItem>
              <Divider />
            </Grid>
            {!props.own ? (
              <Grid item xs={12} sx={{ mt: 1 }}>
                <MenuItem onClick={() => handleClose(4)}>
                  <Typography variant="h6" sx={{ pl: 3 }}>
                    Write Reference
                  </Typography>
                </MenuItem>
              </Grid>
            ) : (
              <div></div>
            )}
          </Grid>
        </Box>
      </Menu>
    </div>
  );
}
