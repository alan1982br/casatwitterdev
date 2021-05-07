import { createStore } from 'redux';

const INITIAL_STATE = {
  showterms: false,
  currentTour: "15",
  visitedTour: [],
  currentUser: [],
  showDepoimentos: false,
  showCases: false,
  showTrends: false
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
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload,
      };
    case 'UPDATE_DEPOIMENTOS':
      return {
        ...state,
        showDepoimentos: action.payload,
      };
    case 'UPDATE_TRENDS':
      return {
        ...state,
        showTrends: action.payload,
      };
    case 'UPDATE_CASES':
      return {
        ...state,
        showCases: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
