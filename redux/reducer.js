import * as actions from './actions.js';

//Normalized state.
export const initialState = {
    loaded: false
};

export default (state, action) => {
        if (!state) state = initialState;

        switch (action.type) {
            case actions.LOADED:
            return Object.assign({}, state, {loaded: action.loaded});


            default:
                return state;
        }
};

