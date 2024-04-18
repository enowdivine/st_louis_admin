import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Faculties from "../../features/Faculties";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Faculties" }));
  }, []);

  return <Faculties />;
}

export default InternalPage;
