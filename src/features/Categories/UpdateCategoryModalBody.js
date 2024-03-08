import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice"
import { updateCategories, getCampuses, getProgrammes } from "../../app/reducers/app";

function UpdateCategoryModalBody({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [title, setTitle] = useState("")
  const [programmes, setProgrammes] = useState([])
  const [campuses, setCampuses] = useState([])
  const [campus, setCampus] = useState("")
  const [programme, setProgramme] = useState("")

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

  const saveNewData = async () => {
    if (title && programme && campus) {
      const data = {
        id: item._id,
        title,
        programmeID: programme,
        campusID: campus
      }
      await dispatch(updateCategories(data)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          setErrorMessage(res.payload)
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: "Category updated!", status: 1 }));
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
    setCampus(item.campusID)
    setProgramme(item.programmeID)
  }, [item])

  useEffect(() => {
    handlerGetCampuses()
    handlerGetProgramme()
  }, [])


  return (
    <>
      <p style={{ marginTop: 20 }}>Name</p>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input input-bordered w-full mt-2" />

      <p style={{ marginTop: 20 }}>Programme</p>
      <select className="input input-bordered w-full mt-2"
        onChange={(e) => setProgramme(e.target.value)} value={programme}>
        <option>Select Programme</option>
        {programmes?.map((item, index) => {
          return (
            <option key={index} value={item?._id}>{item?.title}</option>
          )
        })}
      </select>

      <p style={{ marginTop: 20 }}>Campus</p>
      <select className="input input-bordered w-full mt-2"
        onChange={(e) => setCampus(e.target.value)} value={campus}>
        <option>Select Campus</option>
        {campuses?.map((item, index) => {
          return (
            <option key={index} value={item?._id}>{item?.title}</option>
          )
        })}
      </select>

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
