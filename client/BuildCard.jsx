// File: /client/src/components/BuildCard.jsx

import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const BuildCard = ({ buildText }) => {
  return (
    <Box
      p={6}
      borderWidth={1}
      borderRadius="md"
      boxShadow="lg"
      mt={6}
      bg="gray.50"
      maxH="500px"
      overflowY="auto"
      fontFamily="monospace"
    >
      <Heading size="md" mb={4}>Your AI-Generated Build</Heading>
      <Text whiteSpace="pre-wrap">{buildText}</Text>
    </Box>
  );
};

export default BuildCard;
