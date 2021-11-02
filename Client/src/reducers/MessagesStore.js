const initial = {
    arr : [] 
}

const AllGlobalMessages = (state = initial, action) => {
    // debugger;
    // console.log("inside reducer of messages save  :  ", INIT_STATE.arr);
    initial.arr.length=0
    switch (action.type) {
        case 'Msgs':
            return {
                
                arr: [...state.arr, ...action.dispatch.arr]
               
            }
  

            // console.log("ssssssssss ",arr);
        default:
            return state
    }
}


export default AllGlobalMessages;




