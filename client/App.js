// File: /client/src/App.jsx

import React, { useState } from 'react';
import { ChakraProvider, Box, Container } from '@chakra-ui/react';
import BuildForm from './public/BuildForm';
import BuildCard from './BuildCard';

function App() {
  const [buildText, setBuildText] = useState('');

  const handleBuildGenerated = (build) => {
    setBuildText(build);
  };
  

  return (
    <ChakraProvider>
      <Container maxW="container.md" py={8}>
        <Box>
          <BuildForm onBuildGenerated={handleBuildGenerated} />
          {buildText && <BuildCard buildText={buildText} />}
        </Box>
      </Container>
    </ChakraProvider>
  );
}

export default App;