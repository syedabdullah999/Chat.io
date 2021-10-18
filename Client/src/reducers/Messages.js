let initState = {
    username: "",
    text:""
}

const Messages = (state = initState, action ) => {
    
    // let x = localStorage.getItem("token");
    // state = x
    switch(action.type){
        case 'ChatHistory':
            return {
                ...state,
                username: action.dispatch.name,
                text: action.dispatch.text,

            }
        default:
            return state
    }
}
export default Messages;