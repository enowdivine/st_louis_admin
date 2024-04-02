import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice"
import { updateCourse, getCampuses, getTeam, getCategories } from "../../app/reducers/app";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function UpdateCourseModalBody({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const { item } = extraObject

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [programmes, setProgrammes] = useState([])
  const [programme, setProgramme] = useState([])
  const [duration, setDuration] = useState('')
  const [location, setLocation] = useState('')
  const [fee, setFee] = useState('')
  const [courseType, settCourseType] = useState('')
  const [language, setLanguage] = useState('')
  const [startMonth, setStartMonth] = useState('')
  const [campuses, setCampuses] = useState([])
  const [lecturers, setLecturers] = useState([])
  const [content, setContent] = useState('')
  const [prospectus, setPropectus] = useState('')
  const [admissionRequirements, setAdmissionRequirements] = useState('')
  const [feeDetails, setFeeDetails] = useState('')
  const [scholarship, setScholarship] = useState('')
  const [applicationProcess, setApplicationProcess] = useState('')

  const [campusData, setCampusData] = useState([])
  const [lecturersData, setLecturersData] = useState([])
  console.log(campuses)

  const handlerGetCampuses = async () => {
    try {
      setLoading(true)
      await dispatch(getCampuses()).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          showNotification({ message: res.payload, status: 0 })
          setLoading(false)
          return
        }
        setCampusData(res.payload)
        setLoading(false)
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handlerGetProgramme = async () => {
    try {
      setLoading(true)
      await dispatch(getCategories()).then((res) => {
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

  const handlerGetTeam = async () => {
    try {
      setLoading(true)
      await dispatch(getTeam()).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          showNotification({ message: res.payload, status: 0 })
          setLoading(false)
          return
        }
        setLecturersData(res.payload)
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
    handlerGetProgramme()
    handlerGetTeam()
  }, [])

  const saveNewData = async () => {
    if (title) {
      setLoading(true)
      const data = {
        id: item._id,
        title,
        summary,
        programType: programme,
        duration,
        location,
        fee,
        courseType,
        language,
        startMonth,
        campuses,
        content,
        prospectus,
        lecturers,
        admissionRequirements,
        feeDetails,
        scholarship,
        applicationProcess
      }
      await dispatch(updateCourse(data)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          setErrorMessage(res.payload)
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: "Course Updated!", status: 1 }));
        setLoading(false)
        closeModal();
        window.location.reload()
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })
    } else {
      return setErrorMessage("All fields are required!");
    }
  };

  const handleAddCampus = (event) => {
    const options = event.target.options;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setCampuses(selectedValues);
  }

  const handleAddLecturer = (event) => {
    const options = event.target.options;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setLecturers(selectedValues);
  }

  useEffect(() => {
    setTitle(item.title)
    setSummary(item.summary)
    setProgramme(item.programType)
    setDuration(item.duration)
    setLocation(item.location)
    setFee(item.fee)
    settCourseType(item.courseType)
    setLanguage(item.language)
    setStartMonth(item.startMonth)
    setCampuses(item.campuses)
    setLecturers(item.lecturers)
    setContent(item.content)
    setPropectus(item.prospectus)
    setAdmissionRequirements(item.admissionRequirements)
    setFeeDetails(item.feeDetails)
    setScholarship(item.scholarship)
    setApplicationProcess(item.applicationProcess)
  }, [item])

  return (
    <>
      <p style={{ marginTop: 20 }}>Name</p>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input input-bordered w-full mt-2" />

      <p style={{ marginTop: 20 }}>Summary</p>
      <textarea value={summary} onChange={(e) => setSummary(e.target.value)} className="input input-bordered w-full mt-2" >
      </textarea>

      <p style={{ marginTop: 20 }}>Faculty Level</p>
      <select className="input input-bordered w-full mt-2"
        onChange={(e) => setProgramme(e.target.value)} value={programme}>
        <option>Select Faculty Level</option>
        {programmes?.map((item, index) => {
          return (
            <option key={index} value={item?._id}>{item?.title}</option>
          )
        })}
      </select>

      <p style={{ marginTop: 20 }}>Course Duration</p>
      <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} className="input input-bordered w-full mt-2" />

      <p style={{ marginTop: 20 }}>Study Mode (e.g On Site)</p>
      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="input input-bordered w-full mt-2" />

      <p style={{ marginTop: 20 }}>Fee</p>
      <input type="number" value={fee} onChange={(e) => setFee(e.target.value)} className="input input-bordered w-full mt-2" />

      <p style={{ marginTop: 20 }}>Course Structure (e.g Full Time)</p>
      <input type="text" value={courseType} onChange={(e) => settCourseType(e.target.value)} className="input input-bordered w-full mt-2" />

      <p style={{ marginTop: 20 }}>Language</p>
      <input type="text" value={language} onChange={(e) => setLanguage(e.target.value)} className="input input-bordered w-full mt-2" />

      <p style={{ marginTop: 20 }}>Start Time</p>
      <input type="month" value={startMonth} onChange={(e) => setStartMonth(e.target.value)} className="input input-bordered w-full mt-2" />

      <p style={{ marginTop: 20 }}>Campuses</p>
      <select className="input input-bordered w-full mt-2"
        style={{ minHeight: 100 }}
        multiple value={campuses}
        onChange={handleAddCampus}>
        <option>Select Campus</option>
        {campusData?.map((item, index) => {
          return (
            <option key={index} value={item._id}>{item?.title}</option>
          )
        })}
      </select>

      <p style={{ marginTop: 20 }}>Lecturers</p>
      <select className="input input-bordered w-full mt-2"
        style={{ minHeight: 100 }}
        multiple value={lecturers}
        onChange={handleAddLecturer}>
        <option>Select Lecturer</option>
        {lecturersData?.map((item, index) => {
          return (
            <option key={index} value={item._id}>{item?.name}</option>
          )
        })}
      </select>

      <p style={{ marginTop: 20 }}>Course Content</p>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        style={{ height: 100 }}
      />

      <p style={{ marginTop: 70 }}>Career Prospectus</p>
      <ReactQuill
        theme="snow"
        value={prospectus}
        onChange={setPropectus}
        style={{ height: 100 }}
      />

      <p style={{ marginTop: 70 }}>Admission Requirements</p>
      <ReactQuill
        theme="snow"
        value={admissionRequirements}
        onChange={setAdmissionRequirements}
        style={{ height: 100 }}
      />

      <p style={{ marginTop: 70 }}>Fee Details</p>
      <ReactQuill
        theme="snow"
        value={feeDetails}
        onChange={setFeeDetails}
        style={{ height: 100 }}
      />

      <p style={{ marginTop: 70 }}>Scholarship Details</p>
      <ReactQuill
        theme="snow"
        value={scholarship}
        onChange={setScholarship}
        style={{ height: 100 }}
      />

      <p style={{ marginTop: 70 }}>Application Process</p>
      <ReactQuill
        theme="snow"
        value={applicationProcess}
        onChange={setApplicationProcess}
        style={{ height: 100 }}
      />

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

export default UpdateCourseModalBody;
