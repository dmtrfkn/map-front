import axios from 'axios';
import { DataProps } from '../types/data';

export const createRequest = async () => {
  try {
    const request = await axios.post('../../local_database.db');
    const response: DataProps[] = request.data;
    return response;
  } catch (error) {
    console.warn(error);
    return undefined;
  }
};
