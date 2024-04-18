import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice"
import { updateSliderNews } from "../../app/reducers/app";
import SwitchButton from "../../components/SwitchBtn/SwitchBtn";

function UpdateSliderNewsModalBody({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [title, setTitle] = useState("")
  const [isFrench, setIsFrench] = useState(false);

  const { item } = extraObject

  const saveNewData = async () => {
    if (title) {
      const data = {
        id: item._id,
        title,
        isFrench
      }
      await dispatch(updateSliderNews(data)).then((res) => {
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
    setIsFrench(item.isFrench)
  }, [item])


  return (
    <>
      <p style={{ marginTop: 20 }}>Name</p>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input input-bordered w-full mt-2" />

      <div style={{ marginTop: 30 }}>
        <SwitchButton value={isFrench} setValue={setIsFrench} text1={"FRENCH"} text2={"ENGLISH"} />
      </div>

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

export default UpdateSliderNewsModalBody;
