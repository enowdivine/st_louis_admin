import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "../features/common/headerSlice";
import modalSlice from "../features/common/modalSlice";
import rightDrawerSlice from "../features/common/rightDrawerSlice";
import roomSlice from "../features/rooms/roomSlice";
import testimonySlice from "../features/Testimony/testimonySlice";
import gallarySlice  from "../features/Gallery/gallerySlice";

const combinedReducer = {
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  room: roomSlice,
  testimony: testimonySlice,
  gallery: gallarySlice,
};

export default configureStore({
  reducer: combinedReducer,
});
