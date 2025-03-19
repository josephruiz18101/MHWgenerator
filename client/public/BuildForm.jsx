import React, { useState } from 'react';
import {
  Box,
  Stack,
  Button,
  Select,
  Checkbox,
  CheckboxGroup,
  Heading,
} from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { useToast } from '@chakra-ui/toast';
import axios from 'axios';

const BuildForm = ({ onBuildGenerated }) => {
  const [weapon, setWeapon] = useState('');
  const [focus, setFocus] = useState('');
  const [statusEffects, setStatusEffects] = useState([]);
  const [gamePhase, setGamePhase] = useState('endgame');
  const toast = useToast();

  const handleSubmit = async () => {
    if (!weapon || !focus) {
      toast({
        title: 'Missing Inputs',
        description: 'Please select both weapon and build focus.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/build', {
        weapon,
        focus,
        statusEffects,
        gamePhase,
      });
  
      console.log('API Build Response:', response.data); // ✅ Correct placement
      onBuildGenerated(response.data.build); // ✅ Send only build text
    } catch (error) {
      console.error('API Error:', error.message); // Add console error for trace
      toast({
        title: 'Error Generating Build',
        description: 'Try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  

  return (
    <Box p={6} borderWidth={1} borderRadius="md" boxShadow="md">
      <Heading mb={4} size="md">Generate Your Monster Hunter Wilds Build</Heading>

      <FormControl mb={4}>
        <FormLabel>Weapon Type</FormLabel>
        <Select placeholder="Select Weapon" onChange={(e) => setWeapon(e.target.value)}>
          <option>Great Sword</option>
          <option>Long Sword</option>
          <option>Sword and Shield</option>
          <option>Dual Blades</option>
          <option>Hammer</option>
          <option>Hunting Horn</option>
          <option>Lance</option>
          <option>Gunlance</option>
          <option>Switch Axe</option>
          <option>Charge Blade</option>
          <option>Insect Glaive</option>
          <option>Bow</option>
          <option>Light Bowgun</option>
          <option>Heavy Bowgun</option>
        </Select>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Build Focus</FormLabel>
        <Select placeholder="Select Focus" onChange={(e) => setFocus(e.target.value)}>
          <option>Max DPS</option>
          <option>Max Affinity</option>
          <option>Status Effects</option>
          <option>Elemental Damage</option>
          <option>Tank/Defense</option>
        </Select>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Status Effects (optional)</FormLabel>
        <CheckboxGroup onChange={setStatusEffects}>
          <Stack spacing={3} direction="row">
            <Checkbox value="Poison">Poison</Checkbox>
            <Checkbox value="Paralysis">Paralysis</Checkbox>
            <Checkbox value="Sleep">Sleep</Checkbox>
            <Checkbox value="Blast">Blast</Checkbox>
          </Stack>
        </CheckboxGroup>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Game Phase</FormLabel>
        <Select onChange={(e) => setGamePhase(e.target.value)} defaultValue="endgame">
          <option value="earlygame">Early Game</option>
          <option value="midgame">Mid Game</option>
          <option value="endgame">End Game</option>
        </Select>
      </FormControl>

      <Button colorScheme="blue" onClick={handleSubmit}>Generate Build</Button>
    </Box>
  );
};

export default BuildForm;
