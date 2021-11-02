export const MessagesStoreAction = (arr) => {
    console.log("all redux global messages    ::::: ", arr);

    return {
        type: 'Msgs',
        dispatch: {
            arr
        }
    };
};
