import React,{useState} from "react";
import { Container, Box, Paper, Tabs, Tab, IconButton } from "@mui/material";
import Primary from "./Primary";
import Secondary from "./Secondary";

const Students = () => {
  const [tabIndex,setTabIndex] = useState(0)

  return (
    <Container maxWidth='sm'>
    <Paper elevation={3} sx={{padding:4, marginTop:5}}>
      <Tabs value={tabIndex} onChange={(e,newIndex)=> setTabIndex(newIndex)} centered >
        <Tab label='Primary'/>
        <Tab label='College'/>
      </Tabs>

      {tabIndex === 0 ? <Primary /> : <Secondary/>}
    </Paper>
    </Container>
  );
};

export default Students;
