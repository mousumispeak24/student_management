import { put, takeEvery } from "redux-saga/effects";
import {
  COUNTRY_WEATHER_SAGA_ACTION,
  ADD_NEW_SAGA,
  GET_STUDENTS_SAGA,
  UPDATE_STUDENT_SAGA_DATA,
  SEARCH_SAGA_DATA,
  DELETE_SAGA_DATA,
} from "./types";
import {
  setErrorMessageAction,
  setSuccessMessageAction,
  getStudents,
  searchAction
} from "./actions.js";
import { gateStudentData,addNewStundents,updateStudents, deleteStudents,searchStudentData,gateStudentAllData } from "./api";
import { SEVERITY_TYPES } from "../../../enums/severityTypes";

//ADD NEW STUDENT..............................
function* addNewStudentHandler(action) {
  try {
    const { payload } = action;
    //api
    const response = yield addNewStundents(payload);
    if (response) {
      yield put(
        getStudents({
          successMessage: "New studentAdded Successfully",
          successMessageToShow:"New studentAdded Successfully"
        })
      );
    } else {
      yield put(
        setErrorMessageAction({
          message: response.message,
          severity: SEVERITY_TYPES.ERROR,
        })
      );
    }
  } catch (error) {
    throw error;
  }
}
//get student data..................................
function* getStudentDataHandler(action) {
  try {
    //api call
    const { payload } = action;
    const response = yield gateStudentData(payload);

    if (response ) {
      yield put(
        getStudents({
          data: response,
          isLoading: false,
          successMessage: "get data",
          totalPageCount: 1,
        })
      );
    }
    const response1 = yield gateStudentAllData();
    if(response1){
      yield put(
        getStudents({
          totalPageCount: Math.ceil(response1.length/payload.pageSize),
        })
      )
    }
  } catch (error) {
    throw error;
  }
}
//UPDATE STUDENT DATA.........................
function* updateStudentData(action) {
  try {
    const { payload } = action;
    //api
    const response = yield updateStudents(payload);
    if (response ) {
      yield put(
        getStudents({
          successMessage: "Student updated successfully",
          successMessageToShow: "Student updated successfully"
        })
      )
    } else {
      yield put(
        setErrorMessageAction({
          message: response.message,
          severity: SEVERITY_TYPES.ERROR,
        })
      );
    }
  } catch (error) {
    throw error;
  }
}
//DELETE STUDENT DATA.................
function* deleteDataHandler(action){
  try {
    const { payload } = action;
    //api
    const response = yield deleteStudents(payload);
    if (response ) {
      yield put(
        getStudents({
          successMessage: "student data deleted Successfully",
          successMessageToShow: "student data deleted Successfully"
        })
      )
    } else {
      yield put(
        setErrorMessageAction({
          message: response.message,
          severity: SEVERITY_TYPES.ERROR,
        })
      );
    }
  } catch (error) {
    throw error;
  }

}
//SEARCH DATA .....................
function* searchDataHandler(action) {
  try {
    const { payload } = action;
    //api call
    const response = yield searchStudentData(payload);
    if (response) {
      yield put(
        searchAction({
          data: response,
        })
      );
    }
  } catch (error) {
    throw error;
  }
}

export default function* watchAuth() {
  yield takeEvery(ADD_NEW_SAGA,addNewStudentHandler);
  yield takeEvery(GET_STUDENTS_SAGA,getStudentDataHandler);
  yield takeEvery(UPDATE_STUDENT_SAGA_DATA, updateStudentData);
  yield takeEvery(SEARCH_SAGA_DATA, searchDataHandler);
  yield takeEvery(DELETE_SAGA_DATA, deleteDataHandler);


}
