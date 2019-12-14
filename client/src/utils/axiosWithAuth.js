import Axios from 'axios';

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token');
  console.log(`axiosWithAuth -> token`, token);

  return Axios.create(
    {
      headers: {
        Authorization: token
      }
    }
  );
};