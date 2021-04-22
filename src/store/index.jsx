import { createStore } from 'redux';

const INITIAL_STATE = {
  showterms: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_TERMS':
      return {
        ...state,
        showterms: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
