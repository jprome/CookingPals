import * as React from 'react';
import { Grid, Box, Paper} from '@mui/material'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import PopOverUtil from '../PopOverUtil';
import ingredientIcon from "../../images/ingredient.png";
import cookingIcon from "../../images/cooking.png";
import experienceIcon from "../../images/experience.png";


interface RequestProps {
  give: number [],
  receive: number [],
  diet: number [],
  description: string
}

const lightTheme = createTheme({ palette: { mode: 'light' } });



const MyPaper = styled(Paper)({ height: "fit-content", lineHeight: '60px' });
export default function RequestsSection(props: RequestProps) {

  const pics = [ingredientIcon,experienceIcon,cookingIcon]

  const textIcon = ["buying ingredients", "sharing experience/expertise", "cooking time"]

  
  

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

                                    <Grid container sx={ {pt: 5}}> 
                                    
                                        <Grid item xs={1}>
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
                                 
                                                <Grid item xs={12}>
                                                    <Box >
                                                        Diets:
                                                    </Box>
                                                </Grid>
                                           </Grid>
                                        </Grid>

                                        <Grid item xs={3}>
                                            <Grid container >
                                                {props.give.map((n,index) =>

                                                 {if (n === 1)
                                                    return ( <Grid item xs={4}>      
                                                        <PopOverUtil message="John can contribute with ingredients">
                                                            <img key={index}
                                                            style={{ 
                                                                //position:"fixed", 
                                                                zIndex:10, 
                                                                padding:2,
                                                                height:"80px", 
                                                                width:"80px"}} 
                                                            alt="Error"
                                                            src={pics[index]}
                                                            
                                                    /></PopOverUtil></Grid>)
                                                 else {
                                                     return <div></div>
                                                 }})}
                                            </Grid>

                                            <Grid container >
                                                {props.receive.map((n,index) =>
                                                {  if (n === 1)
                                                        return ( <Grid item xs={4}>      
                                                            <PopOverUtil message="John can contribute with ingredients">
                                                                <img key={index}
                                                                style={{ 
                                                                    //position:"fixed", 
                                                                    zIndex:10, 
                                                                    padding:2,
                                                                    height:"80px", 
                                                                    width:"80px"}} 
                                                                alt = "Error"
                                                                src={pics[index]}/></PopOverUtil></Grid>)
                                                    else {
                                                        return <div></div>
                                                }})}
                                            </Grid>

                                            <Grid container >
                                                Filters here
                                            </Grid>

                                        </Grid>

                                        <Grid item xs={8}>
                                            <Box sx={{ pr: 5 , typography: 'body1' ,  fontWeight: 'bold', fontSize: 20 , textAlign: 'left' }}>
                                                    
                                                    {props.description}
                                            </Box>
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