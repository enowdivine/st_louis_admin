import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import { showNotification } from "../common/headerSlice";
// import SearchBar from "../../components/Input/SearchBar";
import { getCourses, getProgrammes } from "../../app/reducers/app";
import { FilterFunnction } from "../../components/TableFilter/FilterFunction";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewTeamModal = () => {
    dispatch(
      openModal({
        title: "Add New Course",
        bodyType: MODAL_BODY_TYPES.ADD_NEW_COURSE,
      })
    );
  };

  return (
    <div className="">
      {/* <SearchBar /> */}
      <input type="text" className="input input-bordered w-50 mt-2" placeholder="Search text"
        onKeyUp={(e) => FilterFunnction(0, e.target)} />

      <button
        className="btn mx-3 px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewTeamModal()}
      >
        Add New
      </button>
    </div>
  );
};

function Team() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const [courses, setCourses] = useState([])
  const [programmes, setProgrammes] = useState([])

  const handlerGetCourses = async () => {
    try {
      setLoading(true)
      await dispatch(getCourses()).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          showNotification({ message: res.payload, status: 0 })
          setLoading(false)
          return
        }
        setCourses(res.payload)
        setLoading(false)
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })
    } catch (error) {
      console.error(error)
    }
  }
  const handlerGetProgrammes = async () => {
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

  useEffect(() => {
    handlerGetCourses()
    handlerGetProgrammes()
  }, [])

  const deleteCurrentTeam = (item) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete ${item.title}?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.COURSE_DELETE,
          item,
        },
      })
    );
  };

  const updateCurrenTeam = (item) => {
    dispatch(
      openModal({
        title: `Update ${item.title}`,
        bodyType: MODAL_BODY_TYPES.UPDATE_COURSE,
        extraObject: {
          item,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Programmes"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* room List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full" id="dataTable">
            <thead>
              <tr>
                <th>Name</th>
                {/* <th>Program</th> */}
                <th>Duration</th>
                <th>Fee</th>
                <th>Language</th>
                <th>Start Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.length > 0 ?
                courses.map((item, index) => {
                  // const programme = programmes.filter(p => item.programType === p._id)[0]
                  return (
                    <tr key={index}>
                      <td>
                        <div>
                          <div className="font-bold">{item.title}</div>
                        </div>
                      </td>
                      {/* <td>{programme?.title}</td> */}
                      <td>{item.duration}</td>
                      <td>{item.fee}</td>
                      <td>{item.language}</td>
                      <td>{item.startMonth}</td>
                      <td>
                        <button
                          className="btn btn-square btn-ghost"
                          onClick={() => updateCurrenTeam(item)}
                        >
                          <PencilSquareIcon className="w-5" />
                        </button>
                        <button
                          className="btn btn-square btn-ghost"
                          onClick={() => deleteCurrentTeam(item)}
                        >
                          <TrashIcon className="w-5" />
                        </button>
                      </td>
                    </tr>
                  )
                }) : <tr>
                  <td colSpan="6" className="text-center py-4">
                    No records found
                  </td>
                </tr>}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Team;
