import express from 'express';
import cors from 'cors';
import { processMessage } from './DSA.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        const reply = await processMessage(userMessage);
        res.json({ response: reply });
    } catch (error) {
        console.error('Error processing message:', error);
        res.json({ response: "Sorry, I encountered an error processing your request." });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));