import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice"
import { updateBuddies } from "../../app/reducers/app";
import SwitchButton from "../../components/SwitchBtn/SwitchBtn";

function UpdateBuddiesModalBody({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [role, setRole] = useState("")
  const [name, setName] = useState("")
  const [position, setPosition] = useState("")
  const [phone, setPhone] = useState("")
  const [campus, setCampus] = useState("")
  const [isFrench, setIsFrench] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [image, setImage] = useState([])
  const [previews, setPreviews] = useState([])

  const { item } = extraObject

  const saveNewData = async () => {
    if (name) {
      const formData = new FormData();
      formData.append('image', selectedFiles[0]);
      formData.append('role', role);
      formData.append('name', name);
      formData.append('position', position);
      formData.append('phone', phone);
      formData.append('campus', campus);
      formData.append('isFrench', isFrench);
      const data = { id: item._id, formData }
      await dispatch(updateBuddies(data)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          setErrorMessage(res.payload)
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: "Department updated!", status: 1 }));
        setLoading(false)
        closeModal();
        window.location.reload()
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })
    }
    else {
      return setErrorMessage("All field are required!");
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
    setImage(item.image)
    setRole(item.role)
    setName(item.name)
    setPosition(item.position)
    setPhone(item.phone)
    setCampus(item.campus)
    setIsFrench(item.isFrench)
  }, [item])



  return (
    <>
      <p style={{ marginTop: 20 }}>Role</p>
      <select className="input input-bordered w-full mt-2"
        onChange={(e) => setRole(e.target.value)} value={role}>
        <option>Select Role</option>
        <option value="STUDENT">Student</option>
        <option value="ADMISSION_ADVICERS">Admission Advicers</option>
        <option value="ADMINISTRATORS">Administrators</option>
        <option value="ALUMNI">Alumni</option>
      </select>

      <p style={{ marginTop: 20 }}>Name</p>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input input-bordered w-full mt-2" />

      <p style={{ marginTop: 20 }}>Position</p>
      <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} className="input input-bordered w-full mt-2" />

      <p style={{ marginTop: 20 }}>Phone</p>
      <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="input input-bordered w-full mt-2" />

      <p style={{ marginTop: 20 }}>Campus</p>
      <input type="text" value={campus} onChange={(e) => setCampus(e.target.value)} className="input input-bordered w-full mt-2" />

      <p style={{ marginTop: 20 }}>Image</p>
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
        <button className="btn btn-primary px-6" onClick={() => saveNewData()}>
          {loading ? "Loading..." : "Save"}
        </button>
      </div>
    </>
  );
}

export default UpdateBuddiesModalBody;
