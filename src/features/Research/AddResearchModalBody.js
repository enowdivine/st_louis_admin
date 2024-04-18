import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../components/Input/InputText";
import TextAreaInput from "../../components/Input/TextAreaInput";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice";
import { addResearch } from "../../app/reducers/app";
import SwitchButton from "../../components/SwitchBtn/SwitchBtn";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const INITIAL_EVENT_OBJ = {
  name: "",
  category: "",
  date: "",
  image: "",
  summary: "",
  description: "",
  location: "",
  link: ""
};

function AddResearchModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [eventObj, seteventObj] = useState(INITIAL_EVENT_OBJ);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [details, setDetails] = useState("")
  const [isFrench, setIsFrench] = useState(false);

  const saveNewRecord = async () => {
    if (eventObj.name.trim() === "")
      return setErrorMessage("Event title is required!");
    else if (eventObj.category.trim() === "")
      return setErrorMessage("Event category is required!");
    else if (eventObj.date.trim() === "")
      return setErrorMessage("Event date is required!");
    else if (eventObj.summary.trim() === "")
      return setErrorMessage("Brief summary is required!");
    else if (eventObj.location.trim() === "")
      return setErrorMessage("Event location is required!");
    else if (eventObj.link.trim() === "")
      return setErrorMessage("Registration link is required!");
    else {
      setLoading(true)
      const formData = new FormData();
      formData.append('image', selectedFiles[0]);
      formData.append('title', eventObj.name);
      formData.append('category', eventObj.category);
      formData.append('summary', eventObj.summary);
      formData.append('details', details);
      formData.append('date', eventObj.date);
      formData.append('location', eventObj.location);
      formData.append('link', eventObj.link);
      formData.append('isFrench', isFrench);
      await dispatch(addResearch(formData)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          setErrorMessage(res.payload)
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: "New record added!", status: 1 }));
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
    seteventObj({ ...eventObj, [updateType]: value });
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={eventObj.name}
        updateType="name"
        containerStyle="mt-4"
        labelTitle="Name"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="text"
        defaultValue={eventObj.location}
        updateType="location"
        containerStyle="mt-4"
        labelTitle="Location"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="text"
        defaultValue={eventObj.category}
        updateType="category"
        containerStyle="mt-4"
        labelTitle="Category"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="text"
        defaultValue={eventObj.link}
        updateType="link"
        containerStyle="mt-4"
        labelTitle="Publised Link"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="date"
        defaultValue={eventObj.date}
        updateType="date"
        containerStyle="mt-4"
        labelTitle="Published Date"
        updateFormValue={updateFormValue}
      />
      <p style={{ marginTop: 20 }}>Image</p>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange} className="input  input-bordered w-full mt-2" />

      <TextAreaInput
        labelTitle="Brief Summary"
        labelStyle="text-lg"
        type="text"
        containerStyle="my-4"
        defaultValue={eventObj.summary}
        placeholder="Brief Summary"
        updateFormValue={updateFormValue}
        updateType="summary"
      />

      <p style={{ marginTop: 10 }}>Research Details</p>
      <ReactQuill
        theme="snow"
        value={details}
        onChange={setDetails}
        style={{ height: 100 }}
      />

      <div style={{ marginTop: 70 }}>
        <SwitchButton value={isFrench} setValue={setIsFrench} text1={"FRENCH"} text2={"ENGLISH"} />
      </div>

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button className="btn btn-primary px-6" onClick={() => saveNewRecord()}>
          Save
        </button>
      </div>
    </>
  );
}

export default AddResearchModalBody;
