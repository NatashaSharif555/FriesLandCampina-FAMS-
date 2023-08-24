const API_KEY = process.env.REACT_APP_API_KEY;

export const api = async (requestParams) => {
  const { payload, path, method } = requestParams;
  let options = {
    method: method,
  };
  if (payload) options.body = JSON.stringify(payload);
  let response;
  response = await fetch(`${path}${API_KEY}`, options)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
  return response;
};
