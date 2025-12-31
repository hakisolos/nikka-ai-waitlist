import { ConDb } from './src/db.js';
import { Waitlist } from './src/models/waitlist.js';

async function purge() {
    try {
        ConDb();
        await Waitlist.deleteMany({});
        console.log('All waitlist documents have been deleted.');
    } catch (error) {
        console.error('Error purging waitlist:', error);
    } finally {
        process.exit();
    }
}

purge();