import moment from "moment";
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
import SearchBar from "../../components/Input/SearchBar";
import { getEvents } from "../../app/reducers/app";
import { FilterFunnction } from "../../components/TableFilter/FilterFunction";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewEventModal = () => {
    dispatch(
      openModal({
        title: "Add New Event",
        bodyType: MODAL_BODY_TYPES.ADD_NEW_EVENT,
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
        onClick={() => openAddNewEventModal()}
      >
        Add New
      </button>
    </div>
  );
};

function Events() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const [events, setEvents] = useState([])

  const handlerGetEvents = async () => {
    try {
      setLoading(true)
      await dispatch(getEvents()).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          showNotification({ message: res.payload, status: 0 })
          setLoading(false)
          return
        }
        setEvents(res.payload)
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
    handlerGetEvents()
  }, [])

  const deleteCurrentEvent = (item) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete ${item.title}`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.EVENT_DELETE,
          item,
        },
      })
    );
  };

  const updateCurrentEvent = (item) => {
    dispatch(
      openModal({
        title: "Update Event",
        bodyType: MODAL_BODY_TYPES.UPDATE_EVENT,
        extraObject: {
          item,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Events"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* room List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full" id="dataTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category </th>
                <th>Event Date</th>
                <th>Location</th>
                <th>Link</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {events.length > 0 ?
                events.map((item, index) => {
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
                      <td>{item.category}</td>
                      <td>{moment(item.date).format("D MMM YYYY")}</td>
                      <td>{item.location}</td>
                      <td>{item.link}</td>
                      <td>
                        <button
                          className="btn btn-square btn-ghost"
                          onClick={() => updateCurrentEvent(item)}
                        >
                          <PencilSquareIcon className="w-5" />
                        </button>
                        <button
                          className="btn btn-square btn-ghost"
                          onClick={() => deleteCurrentEvent(item)}
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

export default Events;
