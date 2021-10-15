export const oneChatName = (name) => {
    console.log("action token : ",name);
  
    return{
      type: 'chat',
      dispatch: {
        name
      }
    };
  };
     