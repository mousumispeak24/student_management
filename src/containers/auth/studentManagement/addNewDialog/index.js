import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../addNewDialog/addNewRuleDialog.css";
import { Button, TextField, Dialog, DialogContent } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { MenuItem, Menu } from "@material-ui/core";

const AddNewDialog = (props) => {
  const dispatch = useDispatch();
  //if edit reword................
  useEffect(() => {
    // effect
    if (props && props.product) {
      setRewordRuleId(props.product.studentData.id);
      setRewordTitle(props.product.studentData.name);
      setdob(props.product.studentData.dob);
      setSelectedOption(props.product.studentData.gender);
      setSelectedStatus(props.product.studentData.course);
    }
    return () => {};
  }, []);
  //validation................
  const validate = () => {
    let isValid = true;
    if (!rewordTitle) {
      setTitleValidationError(true);
      isValid = false;
    }
    if (!dob ) {
      setRewordPointValidationError(true);
      isValid = false;
    }
    if(getAge(dob) <= 8){
      setAgeValidationError(true)
      isValid = false;
    }
    return isValid;
  };
  //set hooks......................
  const [rewordRuleId, setRewordRuleId] = useState(undefined);
  const [rewordTitle, setRewordTitle] = useState("");
  const [titleValidationError, setTitleValidationError] = useState(
    false
  );
  const [dob, setdob] = useState();
  const [rewordPointValidationError, setRewordPointValidationError] = useState(
    false
  );
  const [ageValidationError, setAgeValidationError] = useState(
    false
  );
  const [options, setOptions] = useState([
    "Male",
    "Female",
  ]);
  const [selectedOption, setSelectedOption] = useState("Male");
  const [course, setCourse] = useState(["B. Tech", "B. Com","B. Sc", "B. A"]);
  const [selectedStatus, setSelectedStatus] = useState(["B. Tech"]);

  const handelNameChange = (event) => {
    if (titleValidationError) {
      setTitleValidationError(false);
    }
    if(ageValidationError){
      setAgeValidationError(false);
    }
    setRewordTitle(event.target.value);
  };
  const handelRewordPointChange = (event) => {
    if (rewordPointValidationError) {
      setRewordPointValidationError(false);
    }
    setdob(event.target.value);
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
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
  // Math.floor((new Date() - new Date(birthDate).getTime())
  const handelSubmit = async () => {
    if (validate()) {
      if (props && props.product) {
        const payload = {
          id: rewordRuleId,
          name: rewordTitle,
          dob: dob,
          gender: selectedOption,
          course: selectedStatus,
          age:getAge(dob) 
        };
        props.onSubmitUpdateRule(payload);
      } else {
        const payload = {
          name: rewordTitle,
          dob:dob,
          gender: selectedOption,
          course: selectedStatus,
          age:getAge(dob) 
        };
        props.onSubmitNewRule(payload);
      }
      props.close();
    }
  };
  const header = props.product
    ? "Update student data"
    : "Add a new student";
  return (
    <div>
      <Dialog
        open={true}
        onClose={props.close}
        disableBackdropClick={true}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <div className="center-between">
            <div>
              <h2 className="dialog-heading  padding-left-15">{header}</h2>
            </div>
            <div onClick={props.close} className="close-icon">
              <CloseIcon />
            </div>
          </div>
          <div style={{ flex: 1, backgroundColor: "rgb(255,255,255)" }}>
            <div className="margin-left-20 margin-right-20">
              <TextField
                className="margin-bottom-0 margin-top-20"
                required
                label="Name"
                fullWidth
                value={rewordTitle}
                onChange={handelNameChange}
                margin="normal"
              />
              {titleValidationError ? (
                <span className="error-msg" style={{color:"red"}}>{`Enter a valid name`}</span>
              ) : null}

              <InputLabel className="labelStyle">Date Of Birth</InputLabel>
              <TextField
                type="date"
                className="margin-bottom-0 margin-top-20"
                required
                fullWidth
                onChange={handelRewordPointChange}
                value={dob}
                margin="normal"
              />

              {rewordPointValidationError ? (
                <span className="error-msg" style={{color:"red"}}>
                  {`Enter a valid Date Of Birth`}
                </span>
              ) : null}
              {ageValidationError ? (
                <span className="error-msg" style={{color:"red"}}>
                  {`Age should be greater than 8.`}
                </span>
              ) : null}

              <div className="margin-top-20">
              <InputLabel className="labelStyleInsideDiv">Gender</InputLabel>
                <FormControl className="width-100per">
                  <Select value={selectedOption} onChange={handleOptionChange}>
                    {options.map((option, index) => {
                      return (
                        <MenuItem key={index} value={option}>
                          {option}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
              <div className="margin-top-20">
                <InputLabel className="labelStyleInsideDiv">Course</InputLabel>
                <FormControl className="width-100per">
                  <Select value={selectedStatus} onChange={handleStatusChange} multiple>
                    {course.map((courseOption, index) => {
                      return (
                        <MenuItem key={index} value={courseOption}>
                          {courseOption}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>

              <div className="responsive-btn">
                <Button
                  className="btn-style dialog-submit-button width-20per"
                  style={{ marginLeft: 22 }}
                  onClick={handelSubmit}
                >
                  Submit
                </Button>
                <Button
                  className="cancel-btn-style dialog-submit-button width-20per"
                  onClick={() => {
                    props.close();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewDialog;
