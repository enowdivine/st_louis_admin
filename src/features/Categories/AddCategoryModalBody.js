import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../components/Input/InputText";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice";
import { addCategories, getCampuses, getProgrammes } from "../../app/reducers/app";

const INITIAL_TEAM_OBJ = {
  title: "",
};

function AddCategoryModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [teamObj, setteamObj] = useState(INITIAL_TEAM_OBJ);
  const [programmes, setProgrammes] = useState([])
  const [programme, setProgramme] = useState([])
  // const [campuses, setCampuses] = useState([])
  // const [campus, setCampus] = useState("")

  const handlerGetProgramme = async () => {
    try {
      setLoading(true)
      await dispatch(getProgrammes()).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          showNotification({ message: res.payload, status: 0 })
          setLoading(false)
          return
        }
        setProgrammes(res.payload)
        setLoading(false)
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })
    } catch (error) {
      console.error(error)
    }
  }

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
    if (teamObj.title.trim() === "")
      return setErrorMessage("title is required!");
    // else if (campus.trim() === "")
    //   return setErrorMessage("campus is required!");
    else if (programme.length <= 0)
      return setErrorMessage("programme is required!");
    else {
      setLoading(true)
      const data = {
        title: teamObj.title,
        programmeID: programme,
        // campusID: campus
      }
      await dispatch(addCategories(data)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          setErrorMessage(res.payload)
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: "New category added!", status: 1 }));
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

  useEffect(() => {
    // handlerGetCampuses()
    handlerGetProgramme()
  }, [])

  const handleProgrammeChange = (event) => {
    const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
    setProgramme(selectedValues);
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

      <p style={{ marginTop: 20 }}>Programme</p>
      <select className="input input-bordered w-full mt-2"
        style={{ minHeight: 100 }}
        multiple
        onChange={handleProgrammeChange} value={programme}>
        <option>Select Programme</option>
        {programmes?.map((item, index) => {
          return (
            <option key={index} value={item?._id}>{item?.title}</option>
          )
        })}
      </select>

      {/* <p style={{ marginTop: 20 }}>Campus</p>
      <select className="input input-bordered w-full mt-2"
        onChange={(e) => setCampus(e.target.value)}>
        <option>Select Campus</option>
        {campuses?.map((item, index) => {
          return (
            <option key={index} value={item?._id}>{item?.title}</option>
          )
        })}
      </select> */}

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

export default AddCategoryModalBody;
