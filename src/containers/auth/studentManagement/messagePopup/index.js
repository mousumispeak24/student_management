import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField, Dialog, DialogContent } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const MessagePopup = (props) => {
  const dispatch = useDispatch();
  //if edit reword................
  useEffect(() => {
    if (props && props.messageIs) {
      setShowMessage(props.messageIs)
    }
    return () => {};
  },[])

  //hooks........
  const [showMessage, setShowMessage] = useState("");

  return (
    <div>
      <Dialog
        open={true}
        onClose={props.closeMessage}
        disableBackdropClick={true}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <div className="center-between">
            <div>
              <h2 className="dialog-heading  padding-left-15" style={{color:"red"}}>{showMessage}</h2>
            </div>
            <div onClick={props.closeMessage} className="close-icon">
              <CloseIcon />
            </div>
          </div>
          {showMessage === "Are you want to delete the data ?"? (<div className="responsive-btn">
                <Button
                  className="btn-style dialog-submit-button width-20per"
                  style={{ marginLeft: 22 }}
                  onClick={props.handelDeleteSubmit}
                >
                  Ok
                </Button>
                <Button
                  className="cancel-btn-style dialog-submit-button width-20per"
                  onClick={() => {
                    props.deleteCancel();
                  }}
                >
                  Cancel
                </Button>
              </div>) : null}
          </DialogContent>
          </Dialog>
          </div>
  );

}


export default MessagePopup;