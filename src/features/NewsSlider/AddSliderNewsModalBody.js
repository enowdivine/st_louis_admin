import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../components/Input/InputText";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice";
import { addSliderNews } from "../../app/reducers/app";
import SwitchButton from "../../components/SwitchBtn/SwitchBtn";

const INITIAL_TEAM_OBJ = {
  title: "",
};

function AddSliderNewsModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [teamObj, setteamObj] = useState(INITIAL_TEAM_OBJ);
  const [isFrench, setIsFrench] = useState(false);

  const saveNewData = async () => {
    if (teamObj.title.trim() === "")
      return setErrorMessage("title is required!")
    else {
      setLoading(true)
      const data = {
        title: teamObj.title,
        isFrench
      }
      await dispatch(addSliderNews(data)).then((res) => {
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

export default AddSliderNewsModalBody;
