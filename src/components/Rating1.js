import React, { useEffect, useContext } from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';



export default function Rating1({ x }) {
  console.log(x)
  return (
    <div>
      
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Rating name="read-only" value={x} readOnly />
      </Box>
      
    </div>
  );
}
