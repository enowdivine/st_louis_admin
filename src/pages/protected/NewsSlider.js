import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import NewsSlider from "../../features/NewsSlider";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "News Slider" }));
  }, []);

  return <NewsSlider />;
}

export default InternalPage;
