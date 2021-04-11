import axios from "axios";
import { getDefaultHeaders, processError } from "../../../utils/common";
//GET THE ALL STUDENTS DATA
export const gateStudentData = async (data) => {
  try {
    const headers = getDefaultHeaders();
    const response = await axios.get(
      `http://localhost:3002/students?_order=asc&_page=${data.pageIndex}&_limit=${data.pageSize} `,
      {
        headers,
      } 
    );
    return response.data;
  } catch (error) {
    return processError(error);
  }
};
//GET ALL THE DATA...........
export const gateStudentAllData = async (data) => {
  try {
    const headers = getDefaultHeaders();
    const response = await axios.get(
      `http://localhost:3002/students?_order=asc `,
      {
        headers,
      } 
    );
    return response.data;
  } catch (error) {
    return processError(error);
  }
};
//ADD NEW STUDENTS 
export const addNewStundents = async (data) => {
  try {
    const headers = getDefaultHeaders();
    const response = await axios.post(
      `http://localhost:3002/students`,data 
    );
    return response.data;

  } catch (error) {
    return processError(error);
  }
};

//UPDATE STUDENTS....
export const updateStudents = async (payload) => {
  try {
    //api call
    const headers = getDefaultHeaders();
    const response = await axios.put(
      `http://localhost:3002/students/${payload.id}`,
      payload,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

//DELETE STUDENT DATA,.........
export const deleteStudents = async (payload) => {
  try {
    //api call
    const headers = getDefaultHeaders();
    const response = await axios.delete(
      `http://localhost:3002/students/${payload.id}`,
      payload,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

//SEARCH DATA ACCORDINGLY..........
export const searchStudentData =  async (payload) => {
  try {
    //api call
    const headers = getDefaultHeaders();
    const response = await axios.get(
      `http://localhost:3002/students?q=${payload.searchKey}&_page=${payload.pageIndex}&_limit=${payload.pageSize}`,
      payload,
      {
        headers,
      }
    );
    return response.data;

  } catch (error) {
    return processError(error);
  }
};