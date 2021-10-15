export const loginAction = (token, name, socketId) => {
  console.log("action token : ",token);

  return{
    type: 'LogIn',
    dispatch: {
      name,
      token,
      socketId
    }
  };
};
   