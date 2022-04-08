import React, {useEffect, useState} from 'react';
import { Alert, Button, Collapse, Container, Grid, IconButton, List, ListItem, ListItemText, Paper, Typography} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

import {createTheme, Theme, ThemeProvider} from '@mui/material/styles';

import imageBack from "../images/01.jpg";
import imageBackCookbook from "../images/cookbook_icon.png";
import ButtonBase from '@mui/material/ButtonBase';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useLocation, useNavigate } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Cookbook,FormSubmit, InputChange, Recipe, RootStore  } from '../utils/Typescript';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ListItemSecondaryAction } from '@material-ui/core';
import { deleteCookbook } from '../redux/actions/userAction';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: 10000,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }),
);

const lightTheme = createTheme({ palette: { mode: 'light' } });

interface IState {
    own:boolean,
    cookbook: any
}

interface SectionProps {
  startEditRecipe(): void,
  finishEditRecipe():void
  own: boolean,
  _id?: string
  name: string
  description:string,
  steps: string[],
  ingredients: string [],
  pic?: File,
  section: number
}


const SectionComponent = (s: SectionProps) => {
  if (s.section === 0){
      return <React.Fragment>
              <Grid container spacing={0} rowSpacing={0}>

              </Grid>
            </React.Fragment>
  }
  if (s.section === 1){
      return <React.Fragment>
                <Grid container spacing={0} rowSpacing={0}>

                </Grid>
             </React.Fragment>
  }
}

const dietsList = ["vegan",
     "paleo",
     "low-Carb/keto",
     "vegetarian",
     "mediterranean",
     "pescetarian",
     "omnivore",
     "plant-based raw food",
     "carnivore diet",
     "lactose Intolerant",
     "gluten-free",
     "religion",
     "allergies",
     "diabetic"]

const MyPaper = styled(Paper)({   height: 180, lineHeight: '60px' });
export default function CookbookPage() {

  const { auth, profile } = useSelector((state: RootStore) => state, shallowEqual)

  // State for alert, edits, etc
  const [alert_open, setAlertOpen] = React.useState({state:false, message:""})
  const [edit, setEdit] = React.useState(false)


  //- Dialogs State 
  // New recipe
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  // Current Recipe
  const [open_recipe, setOpenRecipe] = React.useState(false);


  // Delete cookbook
  const [delete_cookbook_dialog, setOpenDeleteCookbook] = React.useState(false);

  // Edit Cookbook
  const [edit_cookbook_dialog, setOpenEditCookbook] = React.useState(false);


  // - Current state info

  // State for current cookbook
  const cookbookStateSample = { own: false, cookbook: []}
  const [cookbookState, setCookbookState] = useState<IState>(cookbookStateSample)
  const {cookbook, own } = cookbookState

  //State for editing current cookbook
  const [cookbookEditState, setCookbookEditState] = useState([] as any)

  //State for current recipe
  const initialState ={ name: '', description: '', steps:[] as string[],ingredients:[] as string[], step:"", ingredient:"", diet_filters:[] as string[]}
  const [indexRecipe, setIndexRecipe] = useState(-1)
  const [currentRecipeState, setCurrentRecipeState] = useState(initialState)
  

  // State for new recipe
  const [recipeState, setRecipeState] = useState(initialState)
  const {name, description, step, ingredient, steps, ingredients, diet_filters} =  recipeState

  
  

  const navigate = useNavigate();
  const dispatch = useDispatch()
  let location = useLocation();

  
  const handleChangeInput = (e: InputChange) => {
    const {value, name} = e.target
    setRecipeState({...recipeState, [name]:value})
  }

  // Handle Dilogs 
  const handleDialogOpen = (n:number, a?: any, index?: number) => {
    
    if (n=== 0 ){
        setOpen(true);
    }
    else if (n=== 1){
        setIndexRecipe(index!)
        setCurrentRecipeState(a)
        setOpenRecipe(true);
        
    }
    else if (n ==2){
      setOpenDeleteCookbook(true)
    }
    else {
      setOpenEditCookbook(true)
      console.log(cookbook)
      setCookbookEditState(cookbook)
    }
  };

  const handleDialogClose = (n:number) => {
    if (n=== 0 ){
        setOpen(false);
        setEdit(false);
    }
    else if (n==1){
        setOpenRecipe(false);
        setEdit(false);
        setRecipeState(initialState)
    }
    else if (n ==2){
      setOpenDeleteCookbook(false)
    }
    else {
      setOpenEditCookbook(false)
    }
  };

// ----

  const handleSubmitRecipeNew = (e: FormSubmit) => {
    e.preventDefault()
    const new_recipe = {
            name: name,
            description: description,
            ingredients: ingredients,
            diet_filters: diet_filters,
            steps:steps,
    }

    const new_cookbook = {...cookbook as any}
    new_cookbook.recipes = { ... new_cookbook.recipes, new_recipe}

    //dispathc(addRecipe)
     //dispatch(editCookbook(auth,new_cookbook,"newRecipe"))
    setRecipeState(initialState)
    setOpenRecipe(false)
    setAlertOpen({state:true,message:"Recipe Added!"})
  }

  const handleSubmitRecipeEdit = () => {

    const new_recipe = {
            name: name,
            description: description,
            ingredients: ingredients,
            diet_filters: diet_filters,
            steps:steps,
    }

    const new_cookbook = {...cookbook as any}
    new_cookbook.recipes[indexRecipe] = new_recipe

    //dispatch(editCookbook(auth,new_cookbook,"editRecipe"))
    setOpenRecipe(false)
    setRecipeState(initialState)
    setAlertOpen({state:true,message:"Recipe Edited!"})
    setIndexRecipe(-1)
    setEdit(false)
  }

  // Handling state used for creating/editing recipes 
  const handleIngredientChange = (n:number) => {
    if (n > -1){
      const temp = [...ingredients]
      temp.splice(n,1)
      setRecipeState({...recipeState, ingredients:temp})
    }
    else {
      setRecipeState({...recipeState, ingredient:"", ingredients:[...ingredients,ingredient]})
    }
  }

  const handleStepChange = (n:number) => {
    if(n > -1){
      const temp = [...steps]
      temp.splice(n,1)
      setRecipeState({...recipeState, steps:temp})
    }
    else{
      setRecipeState({...recipeState, step:"", steps:[...steps,step]})
    }
  }

  const handleDietChange = (diet: string) => {
    if (diet_filters.indexOf(diet) > -1 ){
        const filtered = diet_filters.filter(item => item !== diet)
        setRecipeState({...recipeState, diet_filters:filtered})
    }
    else {
      setRecipeState({...recipeState, diet_filters:[...diet_filters,diet]})
    }
  }
  // 

  const handleChangeToEdit = () => {

    if (!edit){
      const temp_name = currentRecipeState.name ? currentRecipeState.name : ''
      const temp_description = currentRecipeState.description ? currentRecipeState.description : ''
      const temp_steps = currentRecipeState.steps ? currentRecipeState.steps : [] as string[]
      const temp_ingredients = currentRecipeState.ingredients ? currentRecipeState.ingredients : [] as string[]
      const diet_filters = currentRecipeState.diet_filters ? currentRecipeState.diet_filters  : [] as string []
    
      setRecipeState({ name: temp_name, description: temp_description, steps:temp_steps,ingredients:temp_ingredients as string[], step:"", ingredient:"", diet_filters:diet_filters})
    }

    setEdit((edit) => !edit )

  }
  const removeCookbook = () => {

    dispatch(deleteCookbook(auth,cookbook._id))
    navigate(`/profile/${auth.user!._id}`)
  }

  const handleCookbookEditSubmit = () => {
    console.log(cookbookEditState)
  }


  useEffect(() =>{
    const index = location.pathname.indexOf("/cookbook")

    if((location.pathname.substring(9,index) === auth.user!._id)){
        const c = auth.user!.cookbook.find((x:any) => x._id === location.pathname.substring(index + 10));
        setCookbookState({own:true, cookbook:c})
    }
    else if(location.pathname.substring(9,index) == profile._id){
        const c = profile.cookbook.find((x:any) => x._id === location.pathname.substring(index + 10));
        setCookbookState({own:false, cookbook:c})
    }
    else{
        console.log("Error: Id of Auth nor profile has matches url")
    }

  },[])

  return (
    <React.Fragment>
  
        <Grid container>
            <Grid item xs={12} sx={{pl:10,ml:10,pt:5,mt:10,pb:0}}><Typography variant="h2">{cookbook.title}</Typography></Grid>
            <Grid item xs={12} sx={{pl:10,ml:10,pt:0,mt:10,pb:5}}><Typography variant="h5">{cookbook.description}</Typography></Grid>
        </Grid>

        <Container>
          <Grid container columnSpacing={10} elevation={5} component={Paper} borderRadius={4} square>
            <Box sx={{
              p: 2,
              bgcolor: 'background.default',
              display: 'grid',
              gridTemplateColumns: { md: '1fr 1fr' },
              gap: 4,
              borderRadius:4,
              textAlign: 'center',
              }}
              >     
              {(cookbook.recipes) ? 
                cookbook.recipes.map((n:any,index:any) => {

                    return <React.Fragment>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>

                            <ImageButton focusRipple key={`IMAGE${n._id}`} style={{width:700}} onClick={() => handleDialogOpen(1,n,index)}>
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
                                key={n._id}
                                fullWidth={true}
                                maxWidth="xl"
                                open={open_recipe}
                                onClose={() => handleDialogClose(1)}
                                scroll="paper"
                                aria-labelledby="max-width-dialog-title">
                                {(!edit)?

                                <React.Fragment>
                                <DialogTitle id="max-width-dialog-title"><Typography variant="h2">{currentRecipeState.name}</Typography></DialogTitle>

                                <DialogContentText >
                                  <Typography variant="h4" sx={{pl:5}}>{currentRecipeState.description}</Typography> 
                                </DialogContentText>

                                <DialogContent>
                                <Grid container>
                                    <Grid item xs={6}

                                      sx={{ backgroundPosition: 'center center', pl:5
                                        }}>
                                        <img 
                                            style={{ 
                                                objectFit:'cover',
                                                backgroundSize: 'cover',
                                                height:"30vh", 
                                                width:"30vw"}} 
                                            className="login-photo" 
                                            src={require("../images/rice_0.png")} 
                                            alt={"login"}/>
                                    </Grid>

                                    <Grid item

                                        xs={6}
                                        sx={{backgroundPosition: 'center center', pl:5
                                        }}>
                                        <img 
                                            style={{ 

                                                objectFit:'cover',
                                                backgroundSize: 'cover', 
                                                backgroundPosition: 'center center',
                                                height:"30vh", 
                                                width:"30vw"}} 
                                            className="login-photo" 
                                            src={require("../images/rice_1.png")} 
                                            alt={"login"}/>
                                    </Grid>
                                
                                {(currentRecipeState.ingredients)? 
                                  <React.Fragment>
                                    <Typography sx={{pl:4,pt:4}} variant="h4">Ingredients</Typography>
                                    <Grid xs={12}>
                                        <List dense className={classes.root}>
                                                {currentRecipeState.ingredients.map((value) => {
                                                    const labelId = `checkbox-list-secondary-label-${value}`;
                                                    return (
                                                    <ListItem key={value} button>
                                                        
                                                        <ListItemText id={labelId} sx={{pl:8}}> <Typography variant="h5">{value}</Typography></ListItemText>
                                                        <ListItemSecondaryAction>

                                                        </ListItemSecondaryAction>
                                                    </ListItem>
                                                    );
                                                })}
                                        </List>
                                      </Grid>
                                    </React.Fragment>
                                  : <div></div>}

                                <br></br>
                                
                                  {(currentRecipeState.steps)? 
                                    <React.Fragment>
                                      <Typography sx={{pl:4,pt:4}} variant="h4">Steps</Typography>
                                        <Grid container >
                                          <List dense  className={classes.root}>
                                                  {currentRecipeState.steps.map((value,index) => {
                                                      const labelId = `checkbox-list-secondary-label-${value}`;
                                                      return (
                                                      <Grid item xs={12}>
                                                      <ListItem sx={{ width: '100%'}} key={value} button>
                                                          
                                                          <ListItemText id={labelId}  sx={{pl:8}}> <Typography variant="h5">Step {index + 1}. {value}</Typography></ListItemText>
                                                          <ListItemSecondaryAction>
                                                          
                                                          </ListItemSecondaryAction>
                                                      </ListItem>
                                                      </Grid>
                                                      );
                                                  })}
                                          
                                          </List>
                                          </Grid>
                                    </React.Fragment>
                                  :<div>
                                  </div>}

                                </Grid>

                                </DialogContent>
                                { own ? <React.Fragment>
                                  <DialogActions>
                                  <Button onClick={() => handleDialogClose(1)} color="primary">
                                      Go Back
                                  </Button>
                                  <Button type="submit" onClick={() => handleChangeToEdit()} color="primary">
                                      Edit Recipe
                                  </Button>
                                  </DialogActions>
                                  </React.Fragment> :

                                  <React.Fragment>
                                  <DialogActions>
                                  <Button onClick={() => handleDialogClose(1)} color="primary">
                                      Go Back
                                  </Button>

                                  </DialogActions>
                                  </React.Fragment>
                                
                                }
                                </React.Fragment>
                                : <div>
                                  <form onSubmit={handleSubmitRecipeEdit}>
                                    <DialogTitle id="form-dialog-title">Edit Recipe</DialogTitle>
                                      
                                    <DialogContent>
                                    <DialogContentText>
                                        
                                    </DialogContentText>
                                    <Grid container>
                                        <Grid item xs={12}>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="name"
                                            name="name"
                                            value={name}
                                            label="Name"
                                            type="text"
                                            fullWidth
                                            onChange={handleChangeInput}
                                        />
                                        </Grid>
                                        <Grid item xs={12}>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="description"
                                            name="description"
                                            value={description}
                                            label="Description"
                                            type="text"
                                            fullWidth
                                            onChange={handleChangeInput}
                                        />
                                        </Grid>
                                        <Grid item xs={10}>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="ingredient"
                                            name="ingredient"
                                            value={ingredient}
                                            label="Add Ingredient"
                                            type="text"
                                            fullWidth
                                            onChange={handleChangeInput}
                                        />
                                        </Grid>
                                        <Grid item xs={2}>
                                          <Button onClick={() => handleIngredientChange(-1)} color="primary">
                                              <AddCircleIcon sx={{pt:2}} ></AddCircleIcon>
                                          </Button>
                                        </Grid>
                                        <Grid xs={12}>
                                        <List dense className={classes.root}>
                                            {ingredients.map((value:string,index:number) => {
                                                const labelId = `checkbox-list-secondary-label-${value}`;
                                                return (
                                                
                                                  <ListItem key={`${value}${index}ingredients`} button>
                                                      
                                                      <ListItemText id={labelId} sx={{pl:8}}> <Typography variant="h5">{value}</Typography></ListItemText>
                                                      <ListItemSecondaryAction>
                                                      {(cookbookState.own) ? 
                                                            <Button onClick={() => handleIngredientChange(index)}>
                                                            <RemoveCircleIcon></RemoveCircleIcon>
                                                          </Button>
                                                      
                                                      : <div></div>}
                                                      
                                                      </ListItemSecondaryAction>
                                                  </ListItem>
                                               
                                                );
                                            })}
                                        </List>
                                        </Grid>
                                        
                                        <Grid item xs={10}>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="step"
                                            name="step"
                                            value={step}
                                            label="Add Step"
                                            type="text"
                                            fullWidth
                                            onChange={handleChangeInput}
                                        />
                                        </Grid>

                                        <Grid item xs={2}>
                                          <Button onClick={() => handleStepChange(-1)} color="primary">
                                          <AddCircleIcon sx={{pt:2}}></AddCircleIcon>
                                          </Button>
                                        </Grid>
                                        
                                        <List dense className={classes.root}>
                                            {steps.map((value:any,index:number) => {
                                                const labelId = `checkbox-list-secondary-label-${value}`;
                                                return (
                                                <ListItem key={`${value}${index}step`} button>
                                                    
                                                    <ListItemText id={labelId} sx={{pl:8}}> <Typography variant="h5">Step {index}. {value}</Typography></ListItemText>
                                                    <ListItemSecondaryAction>
                                                    {(cookbookState.own) ? 
                                                        <Button onClick={() => handleStepChange(index)}>
                                                          <RemoveCircleIcon></RemoveCircleIcon>
                                                        </Button>
                                                    
                                                    : <div></div>}
                                                    
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                                );
                                            })}
                                        </List>

                                        <Grid item xs={12}>
                                          <Box sx={{ pt: 3 , typography: 'body1' , textAlign: 'left'}}>
                                            {"Diets: "}
                                              {dietsList.map((n,index) =>
                                                {  
                                                  if (diet_filters.indexOf(n) === -1)
                                                    return ( 
                                                        <Button key={`ingredient${index}${n}`} variant="outlined"  color="secondary"
                                                        onClick={() => {handleDietChange(n)}}>{n}</Button>)
                                                  else {
                                                      return (
                                                          <Button key={`ingredient2${index}${n}`}variant="contained" color="primary"
                                                          onClick={() => {handleDietChange(n)}}>{n}</Button>)
                                                  }})}
                                            </Box>
                                        </Grid>
                                      </Grid>
                                        
                                      </DialogContent>
                                    </form>
                                    <DialogActions>
                                      <Button onClick={() => handleChangeToEdit()} color="primary">
                                          Cancel Edit
                                      </Button>
                                      <Button onClick={() => handleSubmitRecipeEdit()} color="primary">
                                          Submit Edit
                                      </Button>
                                    </DialogActions>
                                  </div>}

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
                        <Image  onClick={() => handleDialogOpen(0,0)}>
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

                        <Dialog scroll="paper" open={open} onClose={() => handleDialogClose(0)} aria-labelledby="form-dialog-title">
                            <form onSubmit={handleSubmitRecipeNew}>
                            <DialogTitle id="form-dialog-title">Create New Recipe</DialogTitle>
                              
                            <DialogContent>
                            <DialogContentText>
                                
                            </DialogContentText>
                            <Grid container>
                                <Grid item xs={12}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    name="name"
                                    value={name}
                                    label="Name"
                                    type="text"
                                    fullWidth
                                    onChange={handleChangeInput}
                                />
                                </Grid>
                                <Grid item xs={12}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="description"
                                    name="description"
                                    value={description}
                                    label="Description"
                                    type="text"
                                    fullWidth
                                    onChange={handleChangeInput}
                                />
                                </Grid>
                                <Grid item xs={10}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="ingredient"
                                    name="ingredient"
                                    value={ingredient}
                                    label="Add Ingredient"
                                    type="text"
                                    fullWidth
                                    onChange={handleChangeInput}
                                />
                                </Grid>
                                <Grid item xs={2}>
                                  <Button onClick={() => handleIngredientChange(-1)} color="primary">
                                      <AddCircleIcon sx={{pt:2}} ></AddCircleIcon>
                                  </Button>
                                </Grid>


                                <List dense className={classes.root}>

                                    {ingredients.map((value:string,index:number) => {
                                        const labelId = `checkbox-list-secondary-label-${value}`;
                                        return (
                                        <Grid item xs={12}>
                                        <ListItem key={`${value}${index}ingredients`} button>
                                            
                                            <ListItemText id={labelId} sx={{pl:8}}> <Typography variant="h5"> {value}</Typography></ListItemText>
                                            <ListItemSecondaryAction>
                                            {(cookbookState.own) ? 
                                                  <Button onClick={() => handleIngredientChange(index)}>
                                                  <RemoveCircleIcon></RemoveCircleIcon>
                                                </Button>
                                            
                                            : <div></div>}
                                            
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        </Grid>
                                        );
                                    })}
                                </List>
                                
                                <Grid item xs={10}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="step"
                                    name="step"
                                    value={step}
                                    label="Add Step"
                                    type="text"
                                    fullWidth
                                    onChange={handleChangeInput}
                                />
                                </Grid>

                                <Grid item xs={2}>
                                  <Button onClick={() => handleStepChange(-1)} color="primary">
                                  <AddCircleIcon sx={{pt:2}}></AddCircleIcon>
                                  </Button>
                                </Grid>
                                
                                <List dense className={classes.root}>
                                    {steps.map((value:any,index:number) => {
                                        const labelId = `checkbox-list-secondary-label-${value}`;
                                        return (
                                        <ListItem key={`${value}${index}step`} button>
                                            
                                            <ListItemText id={labelId} sx={{pl:8}}> <Typography variant="h5">Step {index}. {value}</Typography></ListItemText>
                                            <ListItemSecondaryAction>
                                            {(cookbookState.own) ? 
                                                <Button onClick={() => handleStepChange(index)}>
                                                  <RemoveCircleIcon></RemoveCircleIcon>
                                                </Button>
                                            
                                            : <div></div>}
                                            
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        );
                                    })}
                                </List>

                                <Grid item xs={12}>
                                  <Box sx={{ pt: 3 , typography: 'body1' , textAlign: 'left'}}>
                                    {"Diets: "}
                                      {dietsList.map((n,index) =>
                                        {  
                                          if (diet_filters.indexOf(n) === -1)
                                            return ( 
                                    
                                                <Button variant="outlined"  color="secondary"
                                                onClick={() => {
                                                    handleDietChange(n)
                                                }}
                                                >
                                                    {n}
                                                </Button>)
                                          else {
                                              return (
                                                  <Button variant="contained" color="primary"
                                                  onClick={() => {
                                                      handleDietChange(n)
                                                  }}
                                                  >
                                                      {n}
                                                  </Button>
                                              )
                                          }})}
                                  </Box>
                                </Grid>
                              </Grid>
                                
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={() => handleDialogClose(0)} color="primary">
                                    Cancel
                                </Button>
                                <Button type="submit" onClick={() => handleDialogClose(0)} color="primary">
                                    Create Recipe
                                </Button>
                              </DialogActions>
                            </form>
                        </Dialog>
                    </Box>
                  </Box>
          </Grid>
       

            <Button sx={{pt:10}} onClick={() => handleDialogOpen(2)} color="primary"> Delete Cookbook </Button>
              <Dialog scroll="paper" open={delete_cookbook_dialog} onClose={() => handleDialogClose(2)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Delete Cookbook</DialogTitle>
                <DialogContent>
                  <DialogContentText >
                    <Typography variant="h4" sx={{pl:5}}>Are you sure you want to delete this cookbook?</Typography> 
                  </DialogContentText>
                </DialogContent>

                <DialogActions>
                  <Button onClick={() => handleDialogClose(2)} color="primary">
                      Cancel
                  </Button>
                  <Button onClick={() => removeCookbook()} color="primary">
                      Delete Cookbook
                  </Button>
                </DialogActions>
              </Dialog>

            <Button sx={{pt:10}} onClick={() => handleDialogOpen(3)} color="primary"> Edit Cookbook </Button>
            <Dialog open={edit_cookbook_dialog} onClose={() => handleDialogOpen(3)} aria-labelledby="form-dialog-title">
              <form
                onSubmit={handleCookbookEditSubmit
                }>
                                    <DialogTitle id="form-dialog-title">Edit Cookbook</DialogTitle>
                                   
                                    <DialogContent>
                                    <DialogContentText>
                                        
                                    </DialogContentText>
                                    
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="title"
                                        name="title"
                                        value={cookbookEditState.title}
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
                                        value={cookbookEditState.description}
                                        label="Description"
                                        type="text"
                                        fullWidth
                                        onChange={handleChangeInput}
                                    />
                                    <Grid item xs={12}>
                                  <Box sx={{ pt: 3 , typography: 'body1' , textAlign: 'left'}}>
                                    {"Diets: "}
                                      {dietsList.map((n,index) =>
                                        {  
                                          if (diet_filters.indexOf(n) === -1)
                                            return ( 
                                    
                                                <Button variant="outlined"  color="secondary"
                                                onClick={() => {
                                                    handleDietChange(n)
                                                }}
                                                >
                                                    {n}
                                                </Button>)
                                          else {
                                              return (
                                                  <Button variant="contained" color="primary"
                                                  onClick={() => {
                                                      handleDietChange(n)
                                                  }}
                                                  >
                                                      {n}
                                                  </Button>
                                              )
                                          }})}
                                  </Box>
                                </Grid>
                                          
                                    </DialogContent>
                                    <DialogActions>
                                    <Button onClick={() => handleDialogClose(3)} color="primary">
                                        Cancel
                                    </Button>
                                    <Button type="submit" onClick={() => handleDialogClose(3)} color="primary">
                                        Create Cookbook
                                    </Button>
                                    </DialogActions>
                                    </form>
                                </Dialog>
            


            
        </Container>

          <Box sx={{ width: '20%', position:'absolute', top:200, right:300}}>
            <Collapse in={alert_open.state}>
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setAlertOpen({state:false,message:alert_open.message});
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {alert_open.message}
              </Alert>
            </Collapse>
          </Box>

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

