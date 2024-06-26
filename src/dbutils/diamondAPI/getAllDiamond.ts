// Import axios
import axios from '@/dbutils/axios';
import { Diamond, columns } from '@/app/(Home)/diamond/diamond-table';

// Updated function using axios
async function getDiamonds(): Promise<Diamond[]> {
    try {
        const response = await axios.get('/diamonds');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch diamonds:', error);
            throw error; 
    }
}

export default getDiamonds;
