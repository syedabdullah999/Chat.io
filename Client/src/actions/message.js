export const MessagesAction = (name, text) => {
    console.log("Message action token : ",name , text);
  
    return{
      type: 'ChatHistory',
      dispatch: {
        name,
        text,
      }
    };
  };
     