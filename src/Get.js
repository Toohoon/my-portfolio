// server.js
import express from 'express';
import OpenAI from 'openai';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: 'bce-v3/ALTAK-QdwhzRn1EQGvW9O2XyBsa/2dcaf7cc9c507ff87bd2b9c882f91baa00399f08',
  baseURL: 'https://qianfan.baidubce.com/v2/',
});

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  const stream = await client.chat.completions.create({
    messages: [{ role: 'user', content: message }],
    model: 'ernie-tiny-8k',
    stream: true,
  });

  let result = '';
  for await (const chunk of stream) {
    result += chunk.choices[0]?.delta?.content || '';
  }

  res.json({ result });
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
