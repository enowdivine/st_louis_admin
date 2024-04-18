import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../components/Input/InputText";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice";
import { addBuddies } from "../../app/reducers/app";
import SwitchButton from "../../components/SwitchBtn/SwitchBtn";

const INITIAL_OBJ = {
  name: "",
  position: "",
  phone: "",
  campus: ""
};

function AddBuddiesModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [buddyObj, setBuddyObj] = useState(INITIAL_OBJ);
  const [role, setRole] = useState("");
  const [isFrench, setIsFrench] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const saveNewData = async () => {
    if (buddyObj.name.trim() === "")
      return setErrorMessage("name is required!")
    else {
      setLoading(true)
      const formData = new FormData();
      formData.append('image', selectedFiles[0]);
      formData.append('role', role);
      formData.append('name', buddyObj.name);
      formData.append('position', buddyObj.position);
      formData.append('phone', buddyObj.phone);
      formData.append('campus', buddyObj.campus);
      formData.append('isFrench', isFrench);
      await dispatch(addBuddies(formData)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          setErrorMessage(res.payload)
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: "New data added!", status: 1 }));
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
    setBuddyObj({ ...buddyObj, [updateType]: value });
  };

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

      <InputText
        type="text"
        defaultValue={buddyObj.name}
        updateType="name"
        containerStyle="mt-4"
        labelTitle="Name"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="text"
        defaultValue={buddyObj.position}
        updateType="position"
        containerStyle="mt-4"
        labelTitle="Position"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="text"
        defaultValue={buddyObj.phone}
        updateType="phone"
        containerStyle="mt-4"
        labelTitle="Phone Number"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={buddyObj.campus}
        updateType="campus"
        containerStyle="mt-4"
        labelTitle="Campus"
        updateFormValue={updateFormValue}
      />

      <p style={{ marginTop: 20 }}>Image</p>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange} className="input  input-bordered w-full mt-2" />

      <div style={{ marginTop: 30 }}>
        <SwitchButton value={isFrench} setValue={setIsFrench} text1={"FRENCH"} text2={"ENGLISH"} />
      </div>

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

export default AddBuddiesModalBody;
