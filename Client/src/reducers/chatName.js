export const chatName = ( state="" , action ) => {
    switch (action.type) {
      case 'chat':
        return { 
            // ...state,
                name: action.dispatch.name,
                
            // ...action.payload 
        };
  
      default:
        return state;
    }
  };
  export default chatName;