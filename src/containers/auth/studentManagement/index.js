import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {addNewSagaRewordRule,getStudentManagementSaga,updateSagaStudent,searchSagaAction,deleteSagaAction
} from "../state/actions";
import {
  Button,
} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import "../style.css";
import ReactPaginate from "react-paginate";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { MenuItem } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { Search as SearchIcon } from "@material-ui/icons";
import AddNewDialog from "./addNewDialog";
import Edit from "@material-ui/icons/Edit";
import DeleteIcon from '@material-ui/icons/Delete';
import CopyrightIcon from '@material-ui/icons/Copyright';
import MessagePopup from "./messagePopup"
const StudentManagement = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const { data,totalPageCount,successMessage,successMessageToShow,initialPage  } = useSelector(
    (state) => state.auth
  );
  //set hooks
  const [selectPageNumber, setSelectPageNumber] = useState(5);
  const [initialPageNumber, setInitialPageNumber] = useState(0);
  const [searchData, setSearchData] = useState("");
  const [shouldShowAddRuleDialog, setShouldShowAddRuleDialog] = useState(false);
  const [reworsData, setReworsData] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [searchInputValidationError, setSearchInputValidationError] = useState(
    false
  );
  const [message,setMessage] = useState("");
  const [deleteData,setDeleteData] = useState("");
  const[pageSelect, setPageSelect] = useState(0);
 
  console.log("initialPage..",initialPage);
  useEffect(() => {
    console.log("pageSelect...........1",pageSelect);
    // effect
    const payloade = {
      pageIndex:pageSelect > 0 ? pageSelect : initialPageNumber,
      pageSize: selectPageNumber,
      searchKey: searchData.trim(),
    };
    dispatch(getStudentManagementSaga(payloade));
    setInitialPageNumber(0)
    return () => {
    };
  }, []);
  useEffect(() => {
    console.log("pageSelect...........2",pageSelect);
    // effect
    const payloade = {
      pageIndex: pageSelect > 0 ? pageSelect : initialPageNumber,
      pageSize: selectPageNumber,
      searchKey: searchData.trim(),
    };
    dispatch(getStudentManagementSaga(payloade));
    return () => {};
  }, [successMessage]);
  
  useEffect(() => {
    console.log("pageSelect...........3",pageSelect);
    setMessage(successMessageToShow)
  return () => {};
},[successMessageToShow]);
 
  //VALIDATION...............
  const validate = () => {
    let isValid = true;
    if (!searchInput) {
      setSearchInputValidationError(true);
      isValid = false;
    }
    return isValid;
  };
  const getAge = (birthDateString) => {
    const today = new Date();
    const birthDate = new Date(birthDateString);
    const yearsDifference = today.getFullYear() - birthDate.getFullYear();
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
      return yearsDifference - 1;
    }
    return yearsDifference;
  };
//HANDEL CHANGES.............
  const handelChangePageCountSelect = (event) => {
    setSelectPageNumber(event.target.value);
    const payloade = {
      pageIndex: initialPageNumber,
      pageSize: event.target.value,
      searchKey: searchData.trim(),
    };
    dispatch(getStudentManagementSaga(payloade));
  };

  const handelPageChange = (event) => {
    setInitialPageNumber(event.selected);
    setPageSelect(event.selected + 1)
    const payloade = {
      pageIndex: event.selected + 1,
      pageSize: selectPageNumber,
      searchKey: searchData.trim(),
    };
    dispatch(getStudentManagementSaga(payloade));
  };
  const handelSubmitNewRule = (payload) => {
    dispatch(addNewSagaRewordRule(payload));
  };
  const handelSubmitUpdateRule = (payload) => {
    dispatch(updateSagaStudent(payload));
  };
  const onSearchKeyPress = () => {
    if (validate()) {
      const payload = {
      pageIndex: initialPageNumber,
      pageSize: selectPageNumber,
      searchKey: searchInput.trim(),
      };
      dispatch(searchSagaAction(payload));
    }else{
      const payloade = {
        pageIndex: 0,
        pageSize: 10,
        searchKey: searchData.trim(),
      };
      dispatch(getStudentManagementSaga(payloade));
    }
  };
  const handelSearchTextChange = (event) => {
    if (searchInputValidationError) {
      setSearchInputValidationError(false);
    }
    setSearchInput(event.target.value);
  };
  const handelEditclick = (reword) => {
    setShouldShowAddRuleDialog(true);
    setReworsData(reword);
  };

  const handelDeleteclick = (payload) => {
    setMessage("Are you want to delete the data ?");
    setDeleteData(payload);
    // setInitialPageNumber(0)
  //  dispatch(deleteSagaAction(payload.studentData));
  };
  const handelCopyclick = (payload) =>{
    const data ={
      name: payload.studentData.name,
      dob:payload.studentData.dob,
      gender: payload.studentData.gender,
      course: payload.studentData.course,
      age:getAge(payload.studentData.dob) 
    };
    dispatch(addNewSagaRewordRule(data));
  }
  const handelDeleteSubmit = () => {
   dispatch(deleteSagaAction(deleteData.studentData));
   setMessage("");
  };
  const deleteCancel = () => {
    setDeleteData("");
    setMessage("");
   };
  const closeMessage = ()=>{
    setMessage("");
  }
   //open dialog................
   const handleOpenAddNewDialog = () => {
    setShouldShowAddRuleDialog(true);
  };
  const handleCloseAddNewDialog = () => {
    setShouldShowAddRuleDialog(false);
    setReworsData(undefined);
  };
  return (
    <React.Fragment>
      <div className="main-container">
          <h1>STUDENT DATA TABLE</h1>
          <Paper className="root">
            <div className="table-wrapper">
              <div className="center-between table-topbar">
                <div
                  className="margin-left-20 width-30per"
                  style={{ marginBottom: 6 }}
                >
                  <TextField
                    className="margin-top-10 margin-bottom-10 width-100per"
                    type="text"
                    label="Search here"
                    InputProps={{
                      classes: {
                        input: "text-field-style",
                      },
                      endAdornment: (
                        <InputAdornment variant="filled" position="end">
                          <IconButton
                            onClick={onSearchKeyPress}
                            disableRipple={true}
                          >
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    value={searchInput}
                    onChange={
                      handelSearchTextChange
                    }
                    onKeyDown={(e) => {
                    }}
                    margin="normal"
                  />
                </div>
              <div className="responsive-btn width-20per">
                  <Button
                    className="btn-style dialog-submit-button"
                    onClick={handleOpenAddNewDialog}
                  >
                    Add New
                  </Button>
                </div>
              </div>
              <TableContainer component={Paper}>
                <Table className="table" stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Name</TableCell>
                      <TableCell align="center"> Date Of Birth</TableCell>
                      <TableCell align="center"> Age - Years</TableCell>
                      <TableCell align="center">Gender</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody style={{overflow:"scroll",maxHeight:"100px"}}>
                    {data.length
                      ? data.map((studentData) => (
                          <TableRow key={studentData.id}>
                            <TableCell align="center">{studentData.name}</TableCell>
                            <TableCell align="center">{studentData.dob}</TableCell>
                            <TableCell align="center" style = {studentData.age<=10?{color:"red"}:{color:" rgba(0, 0, 0, 0.87)"}}>{studentData.age? studentData.age:getAge(studentData.dob)}</TableCell>
                            <TableCell align="center">
                              {studentData.gender}
                            </TableCell>
                            <TableCell align="center">
                            <span
                                title="Update Product"
                                onClick={() => handelEditclick({ studentData })}
                                className="editButton"
                              >
                                <Edit style={{ color: "green" }}/>
                              </span>
                              <span
                                title="Delete Product"
                                onClick={() => handelDeleteclick({ studentData })}
                                className="deleteButton"
                              >
                                <DeleteIcon color="secondary" />
                              </span>
                              <span
                                title="Copy Product"
                                onClick={() => handelCopyclick({ studentData })}
                                className="deleteButton"
                              >
                                <CopyrightIcon style={{ color: "blue" }}/>
                              </span>
                            </TableCell>
                          </TableRow>
                        ))
                      : null}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <div className="pagination-holder">
                        <div className="total-list">
                          <FormControl className="form-control width-100pix">
                            <InputLabel>Items per page</InputLabel>
                            <Select
                              displayEmpty
                              value={selectPageNumber}
                              onChange={handelChangePageCountSelect}
                            >
                              <MenuItem value="5">5</MenuItem>
                              <MenuItem value="10">10</MenuItem>
                              <MenuItem value="20">20</MenuItem>
                              <MenuItem value="50">50</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                        <ReactPaginate
                          initialPage={initialPageNumber}
                          disableInitialCallback={true}
                          previousLabel={"<"}
                          nextLabel={">"}
                          breakLabel={"..."}
                          breakClassName={"break-me"}
                          pageCount={totalPageCount}
                          onPageChange={handelPageChange}
                          containerClassName={"pagination"}
                          subContainerClassName={"pages pagination"}
                          activeClassName={"active"}
                          initialSelected ={initialPageNumber}
                        />
                      </div>
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </div>
          </Paper>
        </div>
        {shouldShowAddRuleDialog ? (
        <AddNewDialog
          product={reworsData}
          close={handleCloseAddNewDialog}
          onSubmitNewRule={handelSubmitNewRule}
          onSubmitUpdateRule={handelSubmitUpdateRule}
        />
      ) : null}
      {
        message!==""?(
          <MessagePopup
          messageIs = {message}
          closeMessage={closeMessage}
          handelDeleteSubmit ={handelDeleteSubmit}
          deleteCancel ={deleteCancel}
           />
        ):null
      }
    </React.Fragment>
  );
};
StudentManagement.propTypes = {
};
export default StudentManagement;
