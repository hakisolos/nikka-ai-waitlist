import nodeCron from 'node-cron';
import axios from 'axios';

const URL = "https://nikka-ai-waitlist.onrender.com"; 


nodeCron.schedule('* * * * *', async () => {
    try {
        const response = await axios.get(URL);
        console.log(`✅Pinged ${URL} - Status: ${response.status}`);
    } catch (error) {
        console.error(`❌ Failed to ping ${URL}:`, error.message);
    }
});
console.log('Cron job started - pinging every 5 minutes');