import { MODAL_BODY_TYPES } from "../utils/globalConstantUtil";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../features/common/modalSlice";
import ConfirmationModalBody from "../features/common/components/ConfirmationModalBody";
import AddEventModalBody from "../features/Events/AddEventModalBody";
import UpdateEventModalBody from "../features/Events/UpdateEventModalBody";
import AddResearchModalBody from "../features/Research/AddResearchModalBody";
import UpdateResearchModalBody from "../features/Research/UpdateResearchModalBody";
import AddTeamModalBody from "../features/Team/AddTeamModalBody";
import UpdateTeamModalBody from "../features/Team/UpdateTeamModalBody";
import AddProgramModalBody from "../features/Programs/AddModalBody";
import UpdateProgramModalBody from "../features/Programs/UpdateModalBody";
import UpdatePasswordModal from "../features/user/UpdatePasswordModal";
import UpdateEmailModal from "../features/user/UpdateEmailModal";
import UpdateCampusModalBody from "../features/Campuses/UpdateCampusModalBody";
import AddCampusModalBody from "../features/Campuses/AddCampusModalBody";
import AddCourseModalBody from "../features/Courses/AddCourseModalBody";
import UpdateCourseModalBody from "../features/Courses/UpdateCourseModalBody";
import AddFacultyModalBody from "../features/Faculties/AddFacultyModalBody";
import UpdateFacultyModalBody from "../features/Faculties/UpdateFacultyModalBody";
import AddSliderNewsModalBody from "../features/NewsSlider/AddSliderNewsModalBody";
import UpdateSliderNewsModalBody from "../features/NewsSlider/UpdateSliderNewsModalBody";
import AddBuddiesModalBody from "../features/Buddies/AddBuddiesModalBody";
import UpdateBuddiesModalBody from "../features/Buddies/UpdateBuddiesModalBody";

function ModalLayout() {
  const { isOpen, bodyType, size, extraObject, title } = useSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();

  const close = (e) => {
    dispatch(closeModal(e));
  };

  return (
    <>
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <div className={`modal ${isOpen ? "modal-open" : ""}`}>
        <div className={`modal-box  ${size === "lg" ? "max-w-5xl" : ""}`}>
          <button
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => close()}
          >
            ✕
          </button>
          <h3 className="font-semibold text-2xl pb-6 text-center">{title}</h3>

          {/* Loading modal body according to different modal type */}
          {
            {
              [MODAL_BODY_TYPES.ADD_NEW_EVENT]: (
                <AddEventModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.UPDATE_EVENT]: (
                <UpdateEventModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              // 
              [MODAL_BODY_TYPES.ADD_NEW_RESEARCH]: (
                <AddResearchModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.UPDATE_RESEARCH]: (
                <UpdateResearchModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              // 
              // 
              [MODAL_BODY_TYPES.ADD_NEW_SLIDERNEWS]: (
                <AddSliderNewsModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.UPDATE_SLIDERNEWS]: (
                <UpdateSliderNewsModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              // 
              [MODAL_BODY_TYPES.ADD_NEW_TEAM]: (
                <AddTeamModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.UPDATE_TEAM]: (
                <UpdateTeamModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              // 
              // 
              [MODAL_BODY_TYPES.ADD_NEW_PROGRAM]: (
                <AddProgramModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.UPDATE_PROGRAM]: (
                <UpdateProgramModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),

              // 
              // 
              [MODAL_BODY_TYPES.ADD_NEW_CAMPUS]: (
                <AddCampusModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.UPDATE_CAMPUS]: (
                <UpdateCampusModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              // 
              // 
              [MODAL_BODY_TYPES.ADD_NEW_FACULTY]: (
                <AddFacultyModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.UPDATE_FACULTY]: (
                <UpdateFacultyModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              // 
              // 
              [MODAL_BODY_TYPES.ADD_NEW_BUDDY]: (
                <AddBuddiesModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.UPDATE_BUDDY]: (
                <UpdateBuddiesModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              // 
              // 
              [MODAL_BODY_TYPES.ADD_NEW_COURSE]: (
                <AddCourseModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.UPDATE_COURSE]: (
                <UpdateCourseModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              // 
              // 
              [MODAL_BODY_TYPES.UPDATE_USER_PASSWORD]: (
                <UpdatePasswordModal
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.UPDATE_USER_EMAIL]: (
                <UpdateEmailModal
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              // 
              // 
              [MODAL_BODY_TYPES.CONFIRMATION]: (
                <ConfirmationModalBody
                  extraObject={extraObject}
                  closeModal={close}
                />
              ),
              [MODAL_BODY_TYPES.DEFAULT]: <div></div>,
            }[bodyType]
          }
        </div>
      </div>
    </>
  );
}

export default ModalLayout;
