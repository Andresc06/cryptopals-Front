import { createContext, useReducer } from 'react';
import { userReducer } from './UserReducer';
import { colors } from '../helpers/colors.helper';
import { labels } from '../helpers/labels.helper';

const initialState = {
    user: {},
    dataSets: [],
};

export const UserContext = createContext(initialState);

export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    const getUser = user => {
        // console.log(user);
        dispatch({
            type: 'FETCH_USER',
            payload: {
                user,
            },
        });
    };

    const createDataSets = user => {
        const { wallet } = user;
        console.log(wallet);

        const dataSets = labels.map((label, k) => {
            const data = [wallet[0][label]];
            return {
                label,
                data,
                backgroundColor: colors[k],
            };
        });

        dispatch({
            type: 'CREATE_DATA_SETS',
            payload: dataSets,
        });
    };

    return <UserContext.Provider value={{ ...state, getUser, createDataSets }}>{children}</UserContext.Provider>;
};
