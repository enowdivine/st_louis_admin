import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice"
import { updateProgramme, getCampuses } from "../../app/reducers/app";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function UpdateProgramModalBody({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [title, setTitle] = useState("")
  const [summary, setSummary] = useState("")
  const [details, setDetails] = useState("")
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [image, setImage] = useState([])
  const [previews, setPreviews] = useState([])
  // const [campuses, setCampuses] = useState([])
  // const [campus, setCampus] = useState("")

  const { item } = extraObject

  // const handlerGetCampuses = async () => {
  //   try {
  //     setLoading(true)
  //     await dispatch(getCampuses()).then((res) => {
  //       if (res.meta.requestStatus === "rejected") {
  //         showNotification({ message: res.payload, status: 0 })
  //         setLoading(false)
  //         return
  //       }
  //       setCampuses(res.payload)
  //       setLoading(false)
  //     }).catch((err) => {
  //       console.error(err)
  //       setLoading(false)
  //     })
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  const saveNewData = async () => {
    if (title && summary) {
      const formData = new FormData();
      formData.append('image', selectedFiles[0]);
      formData.append('title', title);
      formData.append('summary', summary);
      formData.append('otherDetails', details);
      // formData.append('campusID', campus);
      const data = { id: item._id, formData }
      await dispatch(updateProgramme(data)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          setErrorMessage(res.payload)
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: "Programme updated!", status: 1 }));
        setLoading(false)
        closeModal();
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })
    }
    else {
      return setErrorMessage("All field is required!");
    }
  }

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newSelectedFiles = [...selectedFiles, ...files];
      setSelectedFiles(newSelectedFiles);
      displayImagePreviews(newSelectedFiles);
    }
  };

  const displayImagePreviews = (files) => {
    const urls = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = () => {
        urls.push(reader.result);
        if (urls.length === files.length) {
          setPreviews(urls);
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const removeImage = (index) => {
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles.splice(index, 1);
    setSelectedFiles(newSelectedFiles);

    const newImagePreviewUrls = [...previews];
    newImagePreviewUrls.splice(index, 1);
    setPreviews(newImagePreviewUrls);
  };

  // useEffect(() => {
  //   handlerGetCampuses()
  // }, [])

  useEffect(() => {
    setTitle(item.title)
    setSummary(item.summary)
    setDetails(item.otherDetails)
    setImage(item.image)
    // setCampus(item.campusID)
  }, [item])

  // const handleCampusChange = (event) => {
  //   const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
  //   setCampus(selectedValues);
  // };


  return (
    <>
      <p style={{ marginTop: 20 }}>Name</p>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input input-bordered w-full mt-2" />

      {/* <p style={{ marginTop: 20 }}>Campus</p>
      <select className="input input-bordered w-full mt-2"
        onChange={handleCampusChange}
        value={campus}>
        <option>Select Campus</option>
        {campuses?.map((item, index) => {
          return (
            <option key={index} value={item?._id}>{item?.title}</option>
          )
        })}
      </select> */}

      <p style={{ marginTop: 20 }}>Summary</p>
      <textarea className="textarea textarea-bordered w-full mt-2" value={summary}
        onChange={(e) => setSummary(e.target.value)}>
      </textarea>

      <p style={{ marginTop: 20 }}>Other Details (Optional)</p>
      <ReactQuill
        theme="snow"
        value={details}
        onChange={setDetails}
        style={{ height: 100 }}
      />

      <p style={{ marginTop: 70 }}>Image</p>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange} className="input  input-bordered w-full mt-2" />

      <ul style={{ display: 'flex', flexWrap: 'wrap', marginTop: 20 }}>
        {previews?.map((url, index) => (
          <div style={{ width: "32%", margin: 2 }}>
            <img key={index} src={url} alt={`Image Preview ${index + 1}`}
              style={{ width: "100%", height: '80%', display: 'flex', border: '1px solid #ccc', cursor: 'pointer' }} />
            <p style={{ textAlign: 'right', cursor: 'pointer', color: 'red' }}
              onClick={() => removeImage(index)}
            >remove</p>
          </div>
        ))}
      </ul>

      <ul style={{ display: 'flex', flexWrap: 'wrap', marginTop: 40 }}>
        <div style={{ width: "32%", margin: 2, }}>
          <img
            style={{ width: "100%", height: "100%", border: '1px solid #ccc', cursor: 'pointer' }}
            src={`${process.env.REACT_APP_BASE_URL}/uploads/gallery/${image}`}
            alt="Image"
          />
        </div>
      </ul>

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button className="btn btn-primary px-6" onClick={() => saveNewData()}>
          {loading ? "Loading..." : "Save"}
        </button>
      </div>
    </>
  );
}

export default UpdateProgramModalBody;
