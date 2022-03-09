import * as React from 'react';
import { Grid, Box, Paper} from '@mui/material'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import PopOverUtil from '../PopOverUtil';
import ingredientIcon from "../../images/ingredient.png";
import cookingIcon from "../../images/cooking.png";
import experienceIcon from "../../images/experience.png";
import { Button } from '@material-ui/core';
import { preProcessFile } from 'typescript';


interface RequestProps {
  give: number [],
  receive: number [],
  diet: string [],
  description: string,
  budget: number,
  active: boolean,
  changeSection?(): void
  // will add a true / false prop to distiguish own account against others to have changing privileges
}

const lightTheme = createTheme({ palette: { mode: 'light' } });

const MyPaper = styled(Paper)({ height: "fit-content", lineHeight: '60px' });

export default function SmallRequestsSection(props: RequestProps) {

  const pics = [ingredientIcon,experienceIcon,cookingIcon]

  const textIcon = ["buying ingredients", "sharing experience/expertise", "cooking time"]

  return (
    <React.Fragment>
        <Grid item xs={12}  
                >
                <Grid container >
    
                    <Grid item xs={12}  columnSpacing={10} >
                        <ThemeProvider theme={lightTheme}>

                                    <Grid container> 
                                    
                                        <Grid item xs={3}  sx={ {pt: 8}} >
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

                                        <Grid item xs={9} sx={ {pt: 5}} >

                                            <Grid container >
                                                {props.give.map((n,index) =>
                                                {  
                                                    return ( 
                                                        <Grid key={`${index}${n}Grid3`} item xs={4}>      
                                                                <Button>
                                                                <PopOverUtil message={`John will  ${n ? "":"not"} contribute with ${textIcon[index]}`}>
                                                                    <img 
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
                                                {props.receive.map((n,index) =>
                                                {
                                                    return (
                                                        <Grid item  key={`${index}${n}Grid4`} xs={4}>      
                                                                <Button>
                                                                <PopOverUtil message={`John is ${n ? "":"not"} looking for someone that can contribute by ${textIcon[index]}`}>
                                                                    <img 
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
                                                        </Grid>
                                                      )
                                                })}
                                            </Grid>
                                                                            
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Grid container  direction="row" spacing={10}>
                                                <Grid item xs={12}>
                                                    <Box sx={{ display:'flex', pr: 5 , typography: 'body1' ,  fontWeight: 'bold', fontSize: 20 , textAlign: 'left'}}>
                                                        {props.description}
                                                    </Box>
                                                    
                                                    <Grid item xs={12}>
                                                    <Box sx={{ pt: 3 , typography: 'body1' , textAlign: 'left' , fontSize: 20 , fontWeight: 'bold'}}>
                                                    {"Diets: "}
                                                            {props.diet.map((n,index) =>
                                                            {  
                                                                    return (
                                                                        <Button variant="contained" key={`${index}${n}Button3`} color="primary">
                                                                            {n}
                                                                        </Button>
                                                                    )
                                                            })}
                                                    </Box>
                                                    </Grid>

                                                    
                                                    <Grid item xs={3}>
                                                        <Box sx={{ display:'flex', pt: 3 , typography: 'body1' ,  fontWeight: 'bold', fontSize: 20 , textAlign: 'left'}}>
                                                           Budget: {props.budget}
                                                        </Box>
                                                    </Grid>

                                                    <Grid item xs={12}>
                                                        <Box sx={{ display:'flex', pr: 5 , pt:3, pb:5, typography: 'body1' ,  fontWeight: 'bold', fontSize: 20 , textAlign: 'left'}}>

                            
                                                        </Box>
                                                    </Grid>

                                                </Grid>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                        </ThemeProvider>
                    </Grid>
                </Grid>
            </Grid>
    </React.Fragment>
  );
}