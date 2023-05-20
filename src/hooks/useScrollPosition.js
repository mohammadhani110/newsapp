import { useEffect, useState } from "react";

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const bodyEl=document.querySelector('body');
    const updatePosition = () => {
      // setScrollPosition(window.pageYOffset);
      setScrollPosition(document.body.scrollTop);
      console.log("document.body.scrollTop-->", document.body.scrollTop);
      console.log("scrollPosition-->", scrollPosition);
    };

    window.addEventListener("scroll", updatePosition, true);

    return () => window.removeEventListener("scroll", updatePosition, true);
  }, []);

  return scrollPosition;
};

