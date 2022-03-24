import * as React from 'react';
import { Grid, Box, Paper, TextField} from '@mui/material'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import PopOverUtil from '../PopOverUtil';
import ingredientIcon from "../../images/ingredient.png";
import cookingIcon from "../../images/cooking.png";
import experienceIcon from "../../images/experience.png";
import { Button } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../utils/Typescript';

import { RequestCP } from '../../utils/Typescript';
import { updateRequest } from '../../redux/actions/userAction';

interface RequestProps {
  give: number [],
  receive: number [],
  diets: string [],
  description: string,
  budget: number,
  active: boolean,
  changeSection(): void
}

const lightTheme = createTheme({ palette: { mode: 'light' } });

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

const MyPaper = styled(Paper)({ height: "fit-content", lineHeight: '60px' });
export default function EditRequestsSection(props: RequestProps) {

  const [desc, setDesc] = React.useState(props.description);
  const [giveS, setGive] = React.useState(props.give);
  const [receiveS, setReceive] = React.useState(props.receive);
  const [budget, setBudget] = React.useState(props.budget)
  const [diets, setDiets] = React.useState(props.diets)
  const [active, setActive] = React.useState(props.active)
  

  const pics = [ingredientIcon,experienceIcon,cookingIcon]

  const iconState = ["will not", "may", "will"]
  const textIcon = ["buying ingredients", "sharing experience/expertise", "cooking time"]

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(event.target.value);
  };

  const handleGiveChange = ( index: number) =>{
    const c = [...giveS]
    c[index] = ((giveS[index] + 2) % 3) -1
    setGive(c)
  }

  const handleReceiveChange = ( index: number) =>{
    const c = [...receiveS]
    c[index] = ((receiveS[index] + 2)% 3) - 1
    setReceive(c)
  }

  const handleDietChange = (diet: string) => {
    if (diets.indexOf(diet) > -1 ){
        setDiets(diets.filter(item => item !== diet))
    }
    else {
        setDiets([...diets,diet])
    }
  }
  
  const { auth } = useSelector((state: RootStore) => state, shallowEqual)

  const dispatch = useDispatch()
  
  const handleSubmitRequest = () => {
    // send request

    const request : RequestCP = {
            description: desc,
            give_cooking: giveS[2],
            give_experience: giveS[1],
            give_ingredient: giveS[0],
            receive_cooking:  receiveS[2],
            receive_experience: receiveS[1],
            receive_ingredient: receiveS[0],
            diets: diets,
            weekly_budget:budget,
            active: active,
    }
    
    console.log(request)
    
    dispatch(updateRequest(auth,request))
  }

  const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(Number(event.target.value))
  };

  return (
    <React.Fragment>
        <Grid item 
                xs={12}  
                sx = {{borderRadius: 4}}
                //sm={8} 
                //md={5} 
                //component={Paper} 
                //elevation={5} 
                //square 
                >
                <Grid container spacing={2}>
    
                    <Grid item xs={12} spacing={3} columnSpacing={10} >
                        <ThemeProvider theme={lightTheme}>
                            <Box
                                sx={{
                                    p: 2,
                                    bgcolor: 'background.default',
                                    //display: 'grid',
                                    gridTemplateColumns: { md: '1fr 1fr' },
                                    gap: 2,
                                    textAlign: 'center',
                                   
                                }}
                                >
                               
                                <MyPaper  elevation={5} >

                                    <Grid container sx={ {pt: 3}}> 
                                    
                                        <Grid item xs={1}  sx={ {pt: 8}} >
                                            <Grid container rowSpacing={7} justifyContent="center" alignContent="center">
                                                <Grid item xs={12}>
                                                    <Box>
                                                        Give:
                                                    </Box>
                                                </Grid>
                                     
                                                <Grid item xs={12}>
                                                    <Box >
                                                        Receive:
                                                    </Box>
                                                </Grid>
                                 
                                               
                                           </Grid>
                                        </Grid>

                                        <Grid item xs={3} sx={ {pt: 5}} >

                                            <Grid container >
                                                {giveS.map((n,index) =>
                                                {  
                                                    return ( 
                                                        <Grid item xs={4}>      
                                                            <Button
                                                            onClick={() => {
                                                                handleGiveChange(index);
                                                            }}
                                                            >
                                                                <PopOverUtil message={`John ${iconState[n+1]} contribute with ${textIcon[index]}`}>
                                                                    <img key={index}
                                                                    style={{ 
                                                                        //position:"fixed", 
                                                                        zIndex:10, 
                                                                        padding:2,
                                                                        opacity: 0.2 + 0.4*(n+1),
                                                                        height:"80px", 
                                                                        width:"80px"}} 
                                                                    alt="Error"
                                                                    src={pics[index]}
                                                                    
                                                                /></PopOverUtil>
                                                            </Button>
                                                        </Grid>)
                                                 })}
                                            </Grid>

                                            <Grid container >
                                                {receiveS.map((n,index) =>
                                                {
                                                    return (
                                                        <Grid item xs={4}>      
                                                            <Button
                                                            onClick={() => {
                                                                handleReceiveChange(index);}}>
                                                                <PopOverUtil message="John can contribute with ingredients">
                                                                    <img key={index}
                                                                    style={{ 
                                                                        //position:"fixed", 
                                                                        zIndex:10, 
                                                                        padding:2,
                                                                        opacity: 0.2 + 0.4*(n+1),
                                                                        height:"80px", 
                                                                        width:"80px"}} 
                                                                    alt="Error"
                                                                    src={pics[index]}
                                                                /></PopOverUtil>
                                                            </Button>
                                                        </Grid>)})}
                                            </Grid>
                                                                            
                                        </Grid>

                                        <Grid item xs={8}>
                                            <Grid container   direction="row" spacing={10}>
                                                <Grid item xs={12}>
                                                    <Box sx={{ display:'flex', pr: 5 , typography: 'body1' ,  fontWeight: 'bold', fontSize: 20 , textAlign: 'left'}}>
                                                    <TextField fullWidth
                                                            id="outlined-multiline-flexible"
                                                            label="Description"
                                                            multiline
                                                            maxRows={4}
                                                            value={desc}
                                                            onChange={handleChange}
                                                            />
                                                    </Box>
                                                    
                                                    <Grid item xs={12}>
                                                    <Box sx={{ pt: 3 , typography: 'body1' , textAlign: 'left'}}>
                                                    {"Diets: "}
                                                            {dietsList.map((n,index) =>
                                                            {  
                                                                
                                                                if (diets.indexOf(n) === -1)
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

                                                    
                                                    <Grid item xs={3}>
                                                        <Box sx={{ display:'flex', pt: 3 , typography: 'body1' ,  fontWeight: 'bold', fontSize: 20 , textAlign: 'left'}}>
                                                            <TextField
                                                                label="Weekly Budget ($)"
                                                                value={budget}
                                                                onChange={handleBudgetChange}
                                                                InputLabelProps={{ shrink: true }}
                                                                name="numberformat"
                                                                id="formatted-numberformat-input"
                                                                InputProps={{
                                                                inputComponent: NumberFormat as any,
                                                                }}
                                                                prefix="$"
                                                                
                                                            />
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Box sx={{ display:'flex', pt: 3 , typography: 'body1' ,  fontWeight: 'bold', fontSize: 20 , textAlign: 'right'}}>
                                                        <PopOverUtil message="If active your request can be seen by other users">
                                                        <Button  onClick={() => { setActive(!active)} }variant="contained">{ active ? "Active" : "Inactive"}</Button>
                                                        </PopOverUtil>
                                                        </Box>
                                                    </Grid>



                                                    <Grid item xs={12}>
                                                        <Box sx={{ display:'flex', pr: 5 , pt:3, pb:5, typography: 'body1' ,  fontWeight: 'bold', fontSize: 20 , textAlign: 'left'}}>

                                                            <Grid container justifyContent="flex-end" alignItems="flex-end">
                                                                <Grid item >

                                                                <Button   onClick={() => {
                                                                    handleSubmitRequest()
                                                                    props.changeSection()
                                                                }}variant="contained">Submit Request Change</Button>
                                                                </Grid>

                                                            </Grid>
                                                        </Box>
                                                    </Grid>

                                                </Grid>
                                            </Grid>
                                        </Grid>

                                    </Grid>

                                </MyPaper>

                            </Box>
                        </ThemeProvider>
                    </Grid>

                </Grid>
            </Grid>
    </React.Fragment>
  );
}
