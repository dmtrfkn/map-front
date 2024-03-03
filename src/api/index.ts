import axios from 'axios';
import { Camera } from '../../types/camera';

export const createRequest = async () => {
  try {
    const request = await axios.post('../../local_database.db');
    const response: Camera[] = request.data;
    return response;
  } catch (error) {
    console.warn(error);
    return undefined;
  }
};
