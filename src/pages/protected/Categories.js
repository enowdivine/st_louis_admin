import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Categories from "../../features/Categories";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Faculty Levels" }));
  }, []);

  return <Categories />;
}

export default InternalPage;
