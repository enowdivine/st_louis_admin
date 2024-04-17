import { useState } from "react"
import { useDispatch } from "react-redux";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_CLOSE_TYPES,
} from "../../../utils/globalConstantUtil";
import { showNotification } from "../headerSlice";
import {
  deleteEvent, deleteMember, deleteProgramme, deleteCampus, deleteCategory, deleteCourse,
  deleteFaculty, deleteResearch, deleteSliderNews
} from "../../../app/reducers/app";

function ConfirmationModalBody({ extraObject, closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)

  const { message, type, item } = extraObject;

  const proceedWithYes = async () => {
    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.EVENT_DELETE) {
      setLoading(true)
      dispatch(deleteEvent(item._id)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          dispatch(showNotification({ message: res.payload, status: 0 }));
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: `${item.title} Deleted!`, status: 1 }));
        setLoading(false)
        window.location.reload()
        return
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })
    } else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.TEAM_DELETE) {
      setLoading(true)
      dispatch(deleteMember(item._id)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          dispatch(showNotification({ message: res.payload, status: 0 }));
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: `${item.name} Deleted!`, status: 1 }));
        setLoading(false)
        window.location.reload()
        return
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })
    } else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.PROGRAM_DELETE) {
      setLoading(true)
      dispatch(deleteProgramme(item._id)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          dispatch(showNotification({ message: res.payload, status: 0 }));
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: `${item.title} Deleted!`, status: 1 }));
        setLoading(false)
        window.location.reload()
        return
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })
    } else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.CAMPUS_DELETE) {
      setLoading(true)
      dispatch(deleteCampus(item._id)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          dispatch(showNotification({ message: res.payload, status: 0 }));
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: `${item.title} Deleted!`, status: 1 }));
        setLoading(false)
        window.location.reload()
        return
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })
    } else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.CATEGORY_DELETE) {
      setLoading(true)
      dispatch(deleteCategory(item._id)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          dispatch(showNotification({ message: res.payload, status: 0 }));
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: `${item.title} Deleted!`, status: 1 }));
        setLoading(false)
        window.location.reload()
        return
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })
    } else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.COURSE_DELETE) {
      setLoading(true)
      dispatch(deleteCourse(item._id)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          dispatch(showNotification({ message: res.payload, status: 0 }));
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: `${item.title} Deleted!`, status: 1 }));
        setLoading(false)
        window.location.reload()
        return
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })
    } else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.FACULTY_DELETE) {
      setLoading(true)
      dispatch(deleteFaculty(item._id)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          dispatch(showNotification({ message: res.payload, status: 0 }));
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: `${item.title} Deleted!`, status: 1 }));
        setLoading(false)
        window.location.reload()
        return
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })
    } else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.RESEARCH_DELETE) {
      setLoading(true)
      dispatch(deleteResearch(item._id)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          dispatch(showNotification({ message: res.payload, status: 0 }));
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: `${item.title} Deleted!`, status: 1 }));
        setLoading(false)
        window.location.reload()
        return
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })
    } else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.SLIDERNEWS_DELETE) {
      setLoading(true)
      dispatch(deleteSliderNews(item._id)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          dispatch(showNotification({ message: res.payload, status: 0 }));
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: `${item.title} Deleted!`, status: 1 }));
        setLoading(false)
        window.location.reload()
        return
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })
    }
    closeModal();
  };

  return (
    <>
      <p className=" text-xl mt-8 text-center">{message}</p>

      <div className="modal-action mt-12">
        <button className="btn btn-outline   " onClick={() => closeModal()}>
          Cancel
        </button>

        <button
          className="btn btn-primary w-36"
          onClick={() => proceedWithYes()}
        >
          {loading ? "Loading..." : "Yes"}
        </button>
      </div>
    </>
  );
}

export default ConfirmationModalBody;
