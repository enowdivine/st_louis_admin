import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../components/Input/InputText";
import TextAreaInput from "../../components/Input/TextAreaInput";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice";
import { addProgramme, getCampuses, getFaculties } from "../../app/reducers/app";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const INITIAL_OBJ = {
  title: "",
  image: "",
  summary: "",
};

function AddProgramModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [dataObject, setdataObject] = useState(INITIAL_OBJ);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [otherDetails, setOtherDetails] = useState('');
  const [campuses, setCampuses] = useState([])
  const [campus, setCampus] = useState([])
  const [faculties, setFaculties] = useState([])
  const [faculty, setFaculty] = useState([])

  const handlerGetCampuses = async () => {
    try {
      setLoading(true)
      await dispatch(getCampuses()).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          showNotification({ message: res.payload, status: 0 })
          setLoading(false)
          return
        }
        setCampuses(res.payload)
        setLoading(false)
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })
    } catch (error) {
      console.error(error)
    }
  }
  const handlerGetFaculties = async () => {
    try {
      setLoading(true)
      await dispatch(getFaculties()).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          showNotification({ message: res.payload, status: 0 })
          setLoading(false)
          return
        }
        setFaculties(res.payload)
        setLoading(false)
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    handlerGetCampuses()
    handlerGetFaculties()
  }, [])

  const saveNewData = async () => {
    if (dataObject.title.trim() === "")
      return setErrorMessage("title is required!");
    else if (dataObject.summary.trim() === "")
      return setErrorMessage("summary is required!")
    else {
      setLoading(true)
      const formData = new FormData();
      formData.append('image', selectedFiles[0]);
      formData.append('title', dataObject.title);
      formData.append('summary', dataObject.summary);
      formData.append('otherDetails', otherDetails);
      formData.append('campusID', JSON.stringify(campus));
      formData.append('faculties', JSON.stringify(faculty));
      await dispatch(addProgramme(formData)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          setErrorMessage(res.payload)
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: "New programme Added!", status: 1 }));
        setLoading(false)
        window.location.reload()
        closeModal();
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
    setdataObject({ ...dataObject, [updateType]: value });
  };

  const handleCampusChange = (event) => {
    const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
    setCampus(selectedValues);
  };

  const handleFacultyChange = (event) => {
    const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
    setFaculty(selectedValues);
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={dataObject.title}
        updateType="title"
        containerStyle="mt-4"
        labelTitle="Title"
        updateFormValue={updateFormValue}
      />

      <p style={{ marginTop: 20 }}>Faculties</p>
      <select className="input input-bordered w-full mt-2"
        multiple
        onChange={handleFacultyChange}
        value={faculty}
        style={{ minHeight: 100 }}>
        <option>Select Faculty</option>
        {faculties?.map((item, index) => {
          return (
            <option key={index} value={item?._id}>{item?.title}</option>
          )
        })}
      </select>

      <p style={{ marginTop: 20 }}>Campuses</p>
      <select className="input input-bordered w-full mt-2"
        multiple
        onChange={handleCampusChange}
        value={campus}
        style={{ minHeight: 100 }}>
        <option>Select Campus</option>
        {campuses?.map((item, index) => {
          return (
            <option key={index} value={item?._id}>{item?.title}</option>
          )
        })}
      </select>

      <TextAreaInput
        labelTitle="Programme summary"
        labelStyle="text-lg"
        type="text"
        containerStyle="my-4"
        defaultValue={dataObject.summary}
        updateFormValue={updateFormValue}
        updateType="summary"
      />

      <p style={{ marginTop: 20 }}>Other Details (Optional)</p>
      <ReactQuill
        theme="snow"
        value={otherDetails}
        onChange={setOtherDetails}
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

export default AddProgramModalBody;
