import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Buddies from "../../features/Buddies";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Buddies" }));
  }, []);

  return <Buddies />;
}

export default InternalPage;
