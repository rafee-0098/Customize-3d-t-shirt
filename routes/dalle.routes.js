import express from 'express';
import * as dotenv from 'dotenv';
import  OpenAI  from 'openai';

dotenv.config();

 const router = express.Router();


const config = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAI(config);

router.route('/').get((req, res) => {
  res.status(200).json({ message: "Hello from DALL.E ROUTES" })
})

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.createCompletion({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json'
    });
    const image = response.choices[0].text;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" })
}
})

export default router;