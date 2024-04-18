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
import { getBuddies } from "../../app/reducers/app";
import { FilterFunnction } from "../../components/TableFilter/FilterFunction";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewTeamModal = () => {
    dispatch(
      openModal({
        title: "Add Buddy",
        bodyType: MODAL_BODY_TYPES.ADD_NEW_BUDDY,
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

function Buddies() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])

  const handlerGetTeam = async () => {
    try {
      setLoading(true)
      await dispatch(getBuddies()).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          showNotification({ message: res.payload, status: 0 })
          setLoading(false)
          return
        }
        setCategories(res.payload)
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
    handlerGetTeam()
  }, [])

  const deleteCurrentItem = (item) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete ${item.name}?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.BUDDY_DELETE,
          item,
        },
      })
    );
  };

  const updateCurrenItem = (item) => {
    dispatch(
      openModal({
        title: `Update ${item.name}`,
        bodyType: MODAL_BODY_TYPES.UPDATE_BUDDY,
        extraObject: {
          item,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Buddies"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* room List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full" id="dataTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Position</th>
                <th>Phone</th>
                <th>Campus</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ?
                categories.map((item, index) => {
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
                            <div className="font-bold">{item.name}</div>
                          </div>
                        </div>
                      </td>
                      <td>{item.role}</td>
                      <td>{item.position}</td>
                      <td>{item.phone}</td>
                      <td>{item.campus}</td>
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

export default Buddies;
