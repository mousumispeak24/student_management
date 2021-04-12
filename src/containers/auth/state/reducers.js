import {
  SET_ERROR_MESSAGE,
  SET_SUCCESS_MESSAGE,
  GET_STUDENTS,
  SEARCH_DATA,

} from "./types.js";

const initialState = {
  data:[],
  totalPageCount:0,
  isLoading:false,
  successMessage:"",
  successMessageToShow:"",
  initialPage:0
};

export const studentDataReducer = (state = initialState, action) => {
  switch (action.type) {
      case SET_ERROR_MESSAGE:
      return { ...state, error: action.payload };
    case SET_SUCCESS_MESSAGE:
      return { ...state, success: action.payload };
    case GET_STUDENTS:
      return { ...state,...action.payload };
    case SEARCH_DATA:
      return { ...state,...action.payload };
    default:
      return { ...state };
  }
};
