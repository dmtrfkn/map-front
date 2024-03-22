import axios from "axios";

export const createRequest = async () => {
  try {
    const request = axios
      .get("../../local_database.db", {
        params: {
          ID: 12345,
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    // const response = await request.data;
    return request;
  } catch (error) {
    console.warn(error);
    return undefined;
  }
};
