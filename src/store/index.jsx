import { createStore } from 'redux';

const INITIAL_STATE = {
  showterms: false,
  currentTour: "15",
  visitedTour: [],
  currentUser: [],
  showConteudos: false,
  showCases: false,
  showTrends: false,
  showPdf: {pdf: 'twitter-trends-report-pt.pdf', visible: false }
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
    case 'UPDATE_CONTEUDOS':
      return {
        ...state,
        showConteudos: action.payload,
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
    case 'UPDATE_MODAL_PDF':
        return {
          ...state,
          showPdf: action.payload,
        };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
