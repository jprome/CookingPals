import * as React from 'react';
import { Grid, Box, Paper, TextField} from '@mui/material'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import PopOverUtil from './PopOverUtil';
import ingredientIcon from "../images/ingredient.png";
import cookingIcon from "../images/cooking.png";
import experienceIcon from "../images/experience.png";
import { Button } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../utils/Typescript';
import { findRequests } from '../redux/actions/searchAction';
//import { updateRequest } from '../../redux/actions/userAction';

interface RequestProps {

}

const lightTheme = createTheme({ palette: { mode: 'light' } });

const dietsList = ["Vegan",
     "Paleo",
     "Low-Carb/Keto",
     "Vegetarian",
     "Mediterranean",
     "Pescetarian",
     "Plant-based raw food",
     "Carnivore diet",
     "Lactose Intolerant",
     "Gluten-free",
     "Religion",
     "Allergies",
     "Diabetic"]

const MyPaper = styled(Paper)({ height: "fit-content", lineHeight: '60px' });
export default function RequestFormSearch() {

  const [giveS, setGive] = React.useState([1,1,1]);
  const [receiveS, setReceive] = React.useState([1,1,1]);
  const [budgetHigh, setBudgetHigh] = React.useState(0)
  const [budgetLow, setBudgetLow] = React.useState(0)
  const [diets, setDiets] = React.useState(["Paleo"])
  const [location, setLocation] = React.useState("")

  const pics = [ingredientIcon,experienceIcon,cookingIcon]

  const textIcon = ["buying ingredients", "sharing experience/expertise", "giving cooking time"]


  const handleGiveChange = ( index: number) =>{
    const c = [...giveS]
    c[index] = giveS[index] ? 0 : 1
    setGive(c)
  }

  const handleReceiveChange = ( index: number) =>{
    const c = [...receiveS]
    c[index] = receiveS[index] ? 0 : 1
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
  
  const handleBudgetChangeHigh = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBudgetHigh(Number(event.target.value))
  };

  const handleBudgetChangeLow = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBudgetLow(Number(event.target.value))
  };


  const { auth } = useSelector((state: RootStore) => state, shallowEqual)

  const dispatch = useDispatch()
  
  const handleSearchRequest = () => {
    // send request

    const request = {
            description: "",
            give_cooking: giveS[2],
            give_experience: giveS[1],
            give_ingredient: giveS[0],
            receive_cooking:  receiveS[2],
            receive_experience: receiveS[1],
            receive_ingredient: receiveS[0],
            //diet: diets,
            budgetLow:budgetLow,
            budgetHigh:budgetHigh,
    }

    dispatch(findRequests(auth.access_token,request))
  }


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
                                    <Box sx={{ display:'flex', pt: 3, pl:3 , typography: 'header1' ,  fontWeight: 'bold', fontSize: 20 , textAlign: 'left'}}>
                                        Search Request
                                    </Box>
                                    <Grid container sx={ {pt: 0, pl:5}}> 
                                        
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

                                        <Grid item xs={11} sx={ {pt: 5}} >

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
                                                                <PopOverUtil message={`You will  ${n ? "":"not"} contribute with ${textIcon[index]}`}>
                                                                    <img key={index}
                                                                    style={{ 
                                                                        //position:"fixed", 
                                                                        zIndex:10, 
                                                                        padding:2,
                                                                        opacity: 0.3 + 0.7*n,
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
                                                                <PopOverUtil message={`${n ? "":"Not"} looking for someone that can contribute by ${textIcon[index]}`}>
                                                                    <img key={index}
                                                                    style={{ 
                                                                        //position:"fixed", 
                                                                        zIndex:10, 
                                                                        padding:2,
                                                                        opacity: 0.3 + 0.7*n,
                                                                        height:"80px", 
                                                                        width:"80px"}} 
                                                                    alt="Error"
                                                                    src={pics[index]}
                                                                /></PopOverUtil>
                                                            </Button>
                                                        </Grid>)})}
                                            </Grid>
                                                                            
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Grid container   direction="row" spacing={10}>
                                                <Grid item xs={12}>
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
                                                                label="Weekly Budget High($)"
                                                                value={budgetHigh}
                                                                onChange={handleBudgetChangeHigh}
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

                                                    <Grid item xs={3}>
                                                        <Box sx={{ display:'flex', pt: 3 , typography: 'body1' ,  fontWeight: 'bold', fontSize: 20 , textAlign: 'left'}}>
                                                            <TextField
                                                                label="Weekly Budget Low ($)"
                                                                value={budgetLow}
                                                                onChange={handleBudgetChangeLow}
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
                                                        <Box sx={{ display:'flex', pr: 5 , pt:3, pb:5, typography: 'body1' ,  fontWeight: 'bold', fontSize: 20 , textAlign: 'left'}}>

                                                            <Grid container justifyContent="flex-end" alignItems="flex-end">
                                                                <Grid item >

                                                                <Button   onClick={() => {
                                                                 
                                                                    handleSearchRequest()
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
