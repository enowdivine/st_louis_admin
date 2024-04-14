import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice"
import { updateCategories, getFaculties, getProgrammes } from "../../app/reducers/app";
import SwitchButton from "../../components/SwitchBtn/SwitchBtn";

function UpdateCategoryModalBody({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [title, setTitle] = useState("")
  const [programmes, setProgrammes] = useState([])
  const [programme, setProgramme] = useState([])
  const [faculties, setFaculties] = useState([])
  const [faculty, setFaculty] = useState("")
  const [isFrench, setIsFrench] = useState(false);

  const { item } = extraObject

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

  const saveNewData = async () => {
    if (title) {
      const data = {
        id: item._id,
        title,
        programmeID: programme,
        facultyID: faculty[0],
        isFrench
      }
      await dispatch(updateCategories(data)).then((res) => {
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

  useEffect(() => {
    setTitle(item.title)
    setFaculty(item.facultyID)
    setProgramme(item.programmeID)
    setIsFrench(item.isFrench)
  }, [item])

  useEffect(() => {
    handlerGetFaculties()
    handlerGetProgramme()
  }, [])

  const handleProgrammeChange = (event) => {
    const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
    setProgramme(selectedValues);
  };

  const handleFacultyChange = (event) => {
    const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
    setFaculty(selectedValues);
  };


  return (
    <>
      <p style={{ marginTop: 20 }}>Name</p>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input input-bordered w-full mt-2" />

      <p style={{ marginTop: 20 }}>Faculty</p>
      <select className="input input-bordered w-full mt-2"
        onChange={handleFacultyChange} value={faculty}>
        <option>Select Faculty</option>
        {faculties?.map((item, index) => {
          return (
            <option key={index} value={item?._id}>{item?.title}</option>
          )
        })}
      </select>

      <p style={{ marginTop: 20 }}>Programme</p>
      <select className="input input-bordered w-full mt-2" style={{ minHeight: 100 }}
        multiple
        onChange={handleProgrammeChange} value={programme}>
        <option>Select Programme</option>
        {programmes?.map((item, index) => {
          return (
            <option key={index} value={item?._id}>{item?.title}</option>
          )
        })}
      </select>

      <div style={{ marginTop: 30 }}>
        <SwitchButton value={isFrench} setValue={setIsFrench} text1={"FRENCH"} text2={"ENGLISH"} />
      </div>

      {/* <p style={{ marginTop: 20 }}>Campus</p>
      <select className="input input-bordered w-full mt-2"
        onChange={(e) => setCampus(e.target.value)} value={campus}>
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
        <button className="btn btn-primary px-6" onClick={() => saveNewData()}>
          {loading ? "Loading..." : "Save"}
        </button>
      </div>
    </>
  );
}

export default UpdateCategoryModalBody;
