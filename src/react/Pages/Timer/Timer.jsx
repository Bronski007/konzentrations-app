import React from "react"
import FlowTimer from "./FlowTimer"
import PomodoroTimer from "./PomodoroTimer"

const Timer = ({studyTechnique, studyDuration, learningIntervalTime, breakIntervalTime}) => {

  if (studyTechnique == "pomodoro"){
    return(
          <PomodoroTimer studyDuration = {studyDuration*60} learningIntervalTime = {learningIntervalTime*60} breakIntervalTime = {breakIntervalTime*60}/>
    )
  } 
  else {
    return(
          <FlowTimer studyDuration = {studyDuration*60}/>
    )
  }
  
}

export default Timer
