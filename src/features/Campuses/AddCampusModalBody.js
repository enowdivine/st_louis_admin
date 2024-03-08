import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../components/Input/InputText";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice";
import { addCampuses } from "../../app/reducers/app";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const INITIAL_TEAM_OBJ = {
  title: "",
  image: "",
};

function AddCampusModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [teamObj, setteamObj] = useState(INITIAL_TEAM_OBJ);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [summary, setSummary] = useState('')

  const saveNewData = async () => {
    if (teamObj.title.trim() === "")
      return setErrorMessage("title is required!");
    else {
      setLoading(true)
      const formData = new FormData();
      formData.append('image', selectedFiles[0]);
      formData.append('title', teamObj.title);
      formData.append('summary', summary);
      await dispatch(addCampuses(formData)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          setErrorMessage(res.payload)
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: "New campus Added!", status: 1 }));
        setLoading(false)
        closeModal();
        window.location.reload()
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })
    }
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newSelectedFiles = [...selectedFiles, ...files];
      setSelectedFiles(newSelectedFiles)
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setteamObj({ ...teamObj, [updateType]: value });
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={teamObj.title}
        updateType="title"
        containerStyle="mt-4"
        labelTitle="Name"
        updateFormValue={updateFormValue}
      />

      <p style={{ marginTop: 20 }}>Summary</p>
      <ReactQuill
        theme="snow"
        value={summary}
        onChange={setSummary}
        style={{ height: 100 }}
      />

      <p style={{ marginTop: 70 }}>Image</p>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange} className="input  input-bordered w-full mt-2" />

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

export default AddCampusModalBody;
