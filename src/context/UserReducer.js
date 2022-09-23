export const userReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_USER':
            return {
                ...state,
                ...action.payload,
            };
        case 'CREATE_DATA_SETS':
            // console.log({ ...state.user, ['dataSets']: action.payload });

            return {
                ...state,
                user: { ...state.user },
                ['dataSets']: action.payload,
            };
        default:
            break;
    }
};
