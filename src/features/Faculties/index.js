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
import { getFaculties } from "../../app/reducers/app";
import { FilterFunnction } from "../../components/TableFilter/FilterFunction";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewTeamModal = () => {
    dispatch(
      openModal({
        title: "Add New Faculty",
        bodyType: MODAL_BODY_TYPES.ADD_NEW_FACULTY,
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

function Faculties() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const [faculties, setFaculties] = useState([])

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

  useEffect(() => {
    handlerGetFaculties()
  }, [])

  const deleteCurrentItem = (item) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete ${item.title}?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.FACULTY_DELETE,
          item,
        },
      })
    );
  };

  const updateCurrentItem = (item) => {
    dispatch(
      openModal({
        title: `Update ${item.title}`,
        bodyType: MODAL_BODY_TYPES.UPDATE_FACULTY,
        extraObject: {
          item,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="faculties"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* room List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full" id="dataTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Details</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {faculties.length > 0 ?
                faculties.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-circle w-12 h-12">
                              <img
                                src={`${process.env.REACT_APP_BASE_URL}/uploads/gallery/${item?.image}`}
                                alt="Image"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{item.title}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ maxWidth: 500 }}>
                        <div dangerouslySetInnerHTML={{ __html: item?.details }} />
                        {/* <p>{item?.summary}</p> */}
                      </td>
                      <td>
                        <button
                          className="btn btn-square btn-ghost"
                          onClick={() => updateCurrentItem(item)}
                        >
                          <PencilSquareIcon className="w-5" />
                        </button>
                        <button
                          className="btn btn-square btn-ghost"
                          onClick={() => deleteCurrentItem(item)}
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

export default Faculties;
