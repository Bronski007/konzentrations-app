import React from 'react';
import { Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';

const TechniqueSelection = () => {
  const [studyTechnique, setStudyTechnique] = React.useState('pomodoro');

  const handleTechnique = (event, newTechnique) => {
    if (newTechnique !== null) {
      setStudyTechnique(newTechnique);
    }
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleTechnique}
      aria-label="study-technique"
    >
      <ToggleButton value="pomodoro" aria-label="left">
        <Typography variant="button" gutterBottom>pomodoro</Typography>
      </ToggleButton>
      <ToggleButton value="flow" aria-label="right">
      <Typography variant="button" gutterBottom>flow</Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default TechniqueSelection