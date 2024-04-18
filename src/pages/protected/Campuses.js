import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Campuses from "../../features/Campuses";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Campuses" }));
  }, []);

  return <Campuses />;
}

export default InternalPage;
