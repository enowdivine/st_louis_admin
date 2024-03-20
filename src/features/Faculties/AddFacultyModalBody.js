import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../components/Input/InputText";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice";
import { addFaculty } from "../../app/reducers/app";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const INITIAL_FACULTY_OBJ = {
  title: ""
};

function AddFacultyModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [facultyObj, setFacultyObj] = useState(INITIAL_FACULTY_OBJ);
  const [details, setDetails] = useState('')

  const saveNewData = async () => {
    if (facultyObj.title.trim() === "")
      return setErrorMessage("title is required!");
    else {
      setLoading(true)
      const data = {
        title: facultyObj.title,
        details
      }
      await dispatch(addFaculty(data)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          setErrorMessage(res.payload)
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: "New faculty Added!", status: 1 }));
        setLoading(false)
        closeModal();
        window.location.reload()
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setFacultyObj({ ...facultyObj, [updateType]: value });
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={facultyObj.title}
        updateType="title"
        containerStyle="mt-4"
        labelTitle="Name"
        updateFormValue={updateFormValue}
      />

      <p style={{ marginTop: 20 }}>Details</p>
      <ReactQuill
        theme="snow"
        value={details}
        onChange={setDetails}
        style={{ height: 100 }}
      />

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button
          className="btn btn-primary px-6"
          onClick={() => saveNewData()}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default AddFacultyModalBody;
