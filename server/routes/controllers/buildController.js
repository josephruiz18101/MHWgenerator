// File: /server/controllers/buildController.js
const fetch = require('node-fetch');  // ✅ Add this if Node <18 or for clarity
require('dotenv').config();

const generateBuild = async (req, res) => {
  const { weapon, focus, statusEffects, gamePhase } = req.body;

  if (!weapon || !focus) {
    return res.status(400).json({ error: 'Missing weapon or focus input.' });
  }

  const statusText = statusEffects.length > 0 ? statusEffects.join(', ') : 'no specific status effects';
  const prompt = `Create a detailed Monster Hunter Wilds build. Respond ONLY with the build (no extra intro).

  Build request: Generate the best possible build for a ${weapon}, focused on ${focus}, optimized for ${gamePhase}. The player wants ${statusText}. List the weapon, armor set, decorations, skills, talisman, and explain the synergy.`;

  console.log('Prompt:', prompt);
  console.log('HF Key:', process.env.HF_API_KEY?.slice(0, 10) + '...');

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    const data = await response.json();
    console.log('HF Response:', data);

    if (!Array.isArray(data) || !data[0]?.generated_text) {
      return res.status(500).json({ error: 'Invalid response from HuggingFace.' });
    }

    const rawText = data[0].generated_text;
    const cleanedText = rawText.replace(prompt, '').trim();  // ✂ Remove echoed prompt
    console.log('Sending build to frontend:', cleanedText);

    res.json({ build: cleanedText });
  } catch (error) {
    console.error('HF API Error:', error.message);
    res.status(500).json({ error: 'Failed to generate build.' });
  }
};

module.exports = { generateBuild };
