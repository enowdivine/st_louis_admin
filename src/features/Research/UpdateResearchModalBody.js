import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice"
import { updateResearch } from "../../app/reducers/app";
import SwitchButton from "../../components/SwitchBtn/SwitchBtn";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function UpdateResearchModalBody({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [location, setLocation] = useState("")
  const [link, setLink] = useState("")
  const [date, setDate] = useState("")
  const [isFrench, setIsFrench] = useState(false);

  const [summary, setSummary] = useState("")
  const [details, setDetails] = useState("")
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [image, setImage] = useState([])
  const [previews, setPreviews] = useState([])

  const { item } = extraObject

  const saveNewRecord = async () => {
    if (title && category && details) {
      const formData = new FormData();
      formData.append('image', selectedFiles[0]);
      formData.append('title', title);
      formData.append('category', category);
      formData.append('summary', summary);
      formData.append('details', details);
      formData.append('date', date);
      formData.append('location', location);
      formData.append('link', link);
      formData.append('isFrench', isFrench);
      const data = { id: item._id, formData }
      await dispatch(updateResearch(data)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          setErrorMessage(res.payload)
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: "Record updated!", status: 1 }));
        setLoading(false)
        closeModal();
        window.location.reload()
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

  useEffect(() => {
    setTitle(item.title)
    setCategory(item.category)
    setSummary(item.summary)
    setDetails(item.details)
    setLocation(item.location)
    setLink(item.link)
    setDate(item.date)
    setImage(item.image)
    setIsFrench(item.isFrench)
  }, [item])

  return (
    <>
      <p style={{ marginTop: 20 }}>Title</p>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input input-bordered w-full mt-2" />

      <p style={{ marginTop: 20 }}>Category</p>
      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="input input-bordered w-full mt-2" />

      <p style={{ marginTop: 20 }}>Location</p>
      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="input input-bordered w-full mt-2" />

      <p style={{ marginTop: 20 }}>Link</p>
      <input type="text" value={link} onChange={(e) => setLink(e.target.value)} className="input input-bordered w-full mt-2" />

      <p style={{ marginTop: 20 }}>Publised Date</p>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input input-bordered w-full mt-2" />

      <p style={{ marginTop: 20 }}>Summary</p>
      <textarea className="textarea textarea-bordered w-full mt-2" value={summary}
        placeholder="Brief Summary"
        onChange={(e) => setSummary(e.target.value)}>
      </textarea>

      <p style={{ marginTop: 10 }}>Research Details</p>
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



      <div style={{ marginTop: 30 }}>
        <SwitchButton value={isFrench} setValue={setIsFrench} text1={"FRENCH"} text2={"ENGLISH"} />
      </div>

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
        <button className="btn btn-primary px-6" onClick={() => saveNewRecord()}>
          {loading ? "Loading..." : "Save"}
        </button>
      </div>
    </>
  );
}

export default UpdateResearchModalBody;
