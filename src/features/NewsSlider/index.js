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
import { getSLiderNews } from "../../app/reducers/app";
import { FilterFunnction } from "../../components/TableFilter/FilterFunction";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewTeamModal = () => {
    dispatch(
      openModal({
        title: "Add News",
        bodyType: MODAL_BODY_TYPES.ADD_NEW_SLIDERNEWS,
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

function NewsSlider() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const [news, setNews] = useState([])

  const handlerGetData = async () => {
    try {
      setLoading(true)
      await dispatch(getSLiderNews()).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          showNotification({ message: res.payload, status: 0 })
          setLoading(false)
          return
        }
        setNews(res.payload)
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
    handlerGetData()
  }, [])

  const deleteCurrentItem = (item) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete ${item.title}?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.SLIDERNEWS_DELETE,
          item,
        },
      })
    );
  };

  const updateCurrenItem = (item) => {
    dispatch(
      openModal({
        title: `Update ${item.title}`,
        bodyType: MODAL_BODY_TYPES.UPDATE_SLIDERNEWS,
        extraObject: {
          item,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Faculty Levels"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* room List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full" id="dataTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {news.length > 0 ?
                news.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div>
                          <div className="font-bold">{item.title}</div>
                        </div>
                      </td>
                      <td>
                        <button
                          className="btn btn-square btn-ghost"
                          onClick={() => updateCurrenItem(item)}
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

export default NewsSlider;
