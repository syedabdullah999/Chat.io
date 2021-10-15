let initState = {
    token: "",
    userName: "",
    socketId:""
}

const SignIn = (state = initState, action ) => {
    
    // let x = localStorage.getItem("token");
    // state = x
    switch(action.type){
        case 'LogIn':
            return {
                ...state,
                userName: action.dispatch.name,
                token: action.dispatch.token,
                socketId:action.dispatch.socketId
            }
        default:
            return state
    }
}
export default SignIn;