import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../components/Input/InputText";
import TextAreaInput from "../../components/Input/TextAreaInput";
// import SelectBox from "../../components/Input/SelectBox";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice";
import { addMember } from "../../app/reducers/app";
import SwitchButton from "../../components/SwitchBtn/SwitchBtn";

const INITIAL_TEAM_OBJ = {
  name: "",
  image: "",
  profession: "",
  details: "",
};

function AddTeamModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [teamObj, setteamObj] = useState(INITIAL_TEAM_OBJ);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isFrench, setIsFrench] = useState(false);
  const [isManagement, setIsManagement] = useState(false);

  const saveNewTeam = async () => {
    if (teamObj.name.trim() === "")
      return setErrorMessage("name is required!");
    else if (teamObj.profession.trim() === "")
      return setErrorMessage("profession is required!");
    else {
      setLoading(true)
      const formData = new FormData();
      formData.append('image', selectedFiles[0]);
      formData.append('name', teamObj.name);
      formData.append('profession', teamObj.profession);
      formData.append('details', teamObj.details);
      formData.append('isFrench', isFrench);
      formData.append('isManagement', isManagement);
      await dispatch(addMember(formData)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          setErrorMessage(res.payload)
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: "New member Added!", status: 1 }));
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
        defaultValue={teamObj.name}
        updateType="name"
        containerStyle="mt-4"
        labelTitle="Name"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="text"
        defaultValue={teamObj.position}
        updateType="profession"
        containerStyle="mt-4"
        labelTitle="Position"
        updateFormValue={updateFormValue}
      />

      {isManagement && <TextAreaInput
        labelTitle="Enter more details about member"
        labelStyle="text-lg"
        type="text"
        containerStyle="my-4"
        defaultValue={teamObj.details}
        placeholder="Type your details here"
        updateFormValue={updateFormValue}
        updateType="details"
      />}

      <p style={{ marginTop: 20 }}>Image</p>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange} className="input  input-bordered w-full mt-2" />

      <div style={{ marginTop: 30 }}>
        <SwitchButton value={isManagement} setValue={setIsManagement} text1={"MANAGEMENT"} text2={"STAFF"} />
      </div>

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
          onClick={() => saveNewTeam()}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default AddTeamModalBody;
