import React, {useEffect, useState} from 'react';
import { Button, Container, Grid, Paper} from '@mui/material'

import { createTheme, ThemeProvider} from '@mui/material/styles';

import imageBack from "../images/01.jpg";
import imageBackCookbook from "../images/cookbook_icon.png";
import ButtonBase from '@mui/material/ButtonBase';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Cookbook,FormSubmit, InputChange, RootStore  } from '../utils/Typescript';


const lightTheme = createTheme({ palette: { mode: 'light' } });

interface IState {
    own:boolean,
    cookbook: any
}

const MyPaper = styled(Paper)({   height: 180, lineHeight: '60px' });
export default function CookbookPage() {

  //State for new recipe Dialog
  const [open, setOpen] = React.useState(false);

  //State for recipe Dialog
  const [open_r, setOpenR] = React.useState(false);

  const { auth, profile } = useSelector((state: RootStore) => state, shallowEqual)

  // State for current cookbook
  const cookbookStateSample = { own: false, cookbook: []}
  const [cookbookState, setCookbookState] = useState<IState>(cookbookStateSample)
  const {cookbook, own } = cookbookState

  // State for new recipe
  const initialState ={ title: '', description: ''}
  const [cookbookInput, setInput] = useState(initialState)
  const {title, description } =  cookbookInput

  const navigate = useNavigate();
  const dispatch = useDispatch()
  let location = useLocation();


  const handleChangeInput = (e: InputChange) => {
    const {value, name} = e.target
    setInput({...cookbookInput, [name]:value})
  }

  const handleClickOpen = (n:number) => {
    if (n=== 0 ){
        setOpen(true);
    }
    else{
        setOpenR(true);
    }
    
  };

  const handleClose = (n:number) => {
    if (n=== 0 ){
        setOpen(false);
    }
    else{
        setOpenR(false);
    }
  };


  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()

    const request = {
            diet_filters: [],
            title: title,
            description: description,
            recipes: []
    }
    //dispatch(createCookbook(auth,request))

  }

  useEffect(() =>{

    const index = location.pathname.indexOf("/cookbook")

    if((location.pathname.substring(9,index) === auth.user!._id)){
       
        const c = auth.user!.cookbook.find((x:any) => x._id === location.pathname.substring(index + 10));
        setCookbookState({own:true, cookbook:c})
    }
    else if(location.pathname.substring(9,index) === auth.user?._id){
        const c = profile.cookbook.find((x:any) => x._id === location.pathname.substring(index + 10));
        setCookbookState({own:false, cookbook:c})
    }

  },[])

  return (
    <React.Fragment>

        <Typography>{cookbook.title}</Typography>
        <Typography>{cookbook.description}</Typography>
        <Container>
          <Grid item 
                xs={12}  
                sx = { {borderRadius: 4, mt:5}}
                //sm={8} 
                //md={5} 
                component={Paper} 
                elevation={5} 
                square 
                
                >
                <Grid container spacing={2}>
                    {[lightTheme].map((theme, index) => (
                    <Grid item xs={12} key={index} columnSpacing={10}>
                        <ThemeProvider theme={theme}>
                            <Box
                                sx={{
                                    p: 2,
                                    bgcolor: 'background.default',
                                    display: 'grid',
                                    gridTemplateColumns: { md: '1fr 1fr' },
                                    gap: 2,
                                    textAlign: 'center'
                                }}
                                >
                                
                                {(cookbook.recipes) ? 
                                    cookbook.recipes.map((n:any,index:any) => {
    
                                    return <React.Fragment>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
                                    
                                            <ImageButton
                                            focusRipple
                                            key={n}
                                            style={{width:700}}
                                            onClick={() => handleClickOpen(1)}
                                            >
                                            <ImageSrc style={{ backgroundImage:`url(${imageBack})` }} />
                                            <ImageBackdrop className="MuiImageBackdrop-root" />
                                            <Image>
                                                <Typography
                                                component="span"
                                                variant="subtitle1"
                                                color="inherit"
                                                sx={{
                                                    position: 'relative',
                                                    p: 4,
                                                    pt: 2, 
                                                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                                }}
                                                >
                                                {n.name}
                                                <ImageMarked className="MuiImageMarked-root" />
                                                </Typography>
                                            </Image>
                                            </ImageButton>


                                            <Dialog
                                                fullWidth={true}
                                                maxWidth="lg"
                                                open={open_r}
                                                onClose={() => handleClose(1)}
                                                aria-labelledby="max-width-dialog-title">

                                                <DialogTitle id="max-width-dialog-title">Optional sizes</DialogTitle>
                                                <DialogContent>
                                                <DialogContentText>
                                                    You can set my maximum width and whether to adapt or not.
                                                </DialogContentText>
                                                </DialogContent>

                                                <DialogActions>
                                                <Button onClick={() => handleClose(1)} color="primary">
                                                    Cancel
                                                </Button>
                                                <Button type="submit" onClick={() => handleClose(1)} color="primary">
                                                    Create Cookbook
                                                </Button>
                                                </DialogActions>

                                            </Dialog>
                                            
                                        </Box>
                                        </React.Fragment>
                                    }):<div></div>}
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
                                
                                    <ImageButton
                                    focusRipple
                                    key={"addNewRecipe"}
                                    style={{ width:700,}}>
                                    <ImageSrcNew  style={{ backgroundImage:`url(${imageBackCookbook})` }} />
                                    <ImageBackdrop className="MuiImageBackdrop-root" />
                                    <Image  onClick={() => handleClickOpen(0)}>
                                        <Typography
                                        component="span"
                                        variant="subtitle1"
                                        color="inherit"
                                        sx={{
                                            position: 'relative',
                                            p: 4,
                                            pt: 2, 
                                            pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                        }}
                                        >
                                        {"Create New Recipe"}
                                        <ImageMarked className="MuiImageMarked-root" />
                                        </Typography>
                                    </Image>
                                    </ImageButton>

                                    <Dialog open={open} onClose={() => handleClose(0)} aria-labelledby="form-dialog-title">
                                        <form
                                            onSubmit={handleSubmit
                                            }
                                        >
                                        <DialogTitle id="form-dialog-title">Create New Recipe</DialogTitle>
                                    
                                        <DialogContent>
                                        <DialogContentText>
                                            
                                        </DialogContentText>
                                        
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="title"
                                            name="title"
                                            value={title}
                                            label="Title"
                                            type="text"
                                            fullWidth
                                            onChange={handleChangeInput}
                                        />
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="title"
                                            name="description"
                                            value={description}
                                            label="Description"
                                            type="text"
                                            fullWidth
                                            onChange={handleChangeInput}
                                        />
                                            
                                        </DialogContent>
                                        <DialogActions>
                                        <Button onClick={() => handleClose(0)} color="primary">
                                            Cancel
                                        </Button>
                                        <Button type="submit" onClick={() => handleClose(0)} color="primary">
                                            Create Cookbook
                                        </Button>
                                        </DialogActions>
                                        </form>

                                    </Dialog>
                                    
                                </Box>
                            </Box>
                        </ThemeProvider>
                    </Grid>))}
                </Grid>
            </Grid>
        </Container>
    </React.Fragment>
  );
}


const images = [
    {
      url: imageBack,
      title: 'Breakfast',
      width: '40%',
    },
    {
      url: imageBack,
      title: 'Burgers',
      width: '30%',
    },
    {
      url: imageBack,
      title: 'Camera',
      width: '30%',
    },
  ];
  

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 300,
  borderRadius:"75px",
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize:"cover",
  backgroundPosition: 'center 10%',
  borderRadius:"20px",
  backgroundRepeat: "no-repeat"
  

});

const ImageSrcNew = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize:"contain",
    backgroundPosition: 'center 10%',
    borderRadius:"20px",
    backgroundRepeat: "no-repeat"
    
  
  });
  

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
 
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
    
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
  borderRadius:"20px",
  
}));

const ImageMarked = styled('span')(({ theme }) => ({

  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
  
}));

