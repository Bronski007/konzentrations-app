import React, { useState, useEffect } from "react"
import Typography from '@mui/material/Typography';
import displayTime from "../../../hooks/displayTime";

const FlowTimer = ({studyDuration}) => {
  
  const [time, setTime] = useState(0)
    
    useEffect(() => {
      const interval = setInterval(() =>{
        if (studyDuration>time) setTime(time+1)
      }, 200)
  
      return () => {
        clearInterval(interval)
      }
    })
  
  return(
    <div style={{display:'flex', flexDirection:'column', justifyContent:'space-evenly'}}>

    <Typography variant="caption" gutterBottom>
        duration: {studyDuration/60} minutes.
    </Typography>

    
    <Typography variant="h2" gutterbottom>
        {displayTime(time)}
    </Typography>
    
    </div>
   
  ) 
}

export default FlowTimer