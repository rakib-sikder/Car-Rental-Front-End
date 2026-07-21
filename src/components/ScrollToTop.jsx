import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// React Router doesn't reset scroll between routes — do it here.
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default ScrollToTop;
