import { createStore } from 'redux';

const INITIAL_STATE = {
  showterms: false,
  currentTour: "1",
  visitedTour: []
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_TERMS':
      return {
        ...state,
        showterms: action.payload,
      };
    case 'UPDATE_TOUR':
      return {
        ...state,
        currentTour: action.payload,
      };
    case 'UPDATE_VISITED_TOUR':
        return {
          ...state,
          visitedTour: action.payload,
        };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
