import React, {
  FC,
  useState,
  useEffect,
} from "react";

const PageTransition: FC = () => {
  const [hide, setHide] = useState<boolean>(true);

  const handleAppear = () => setHide(false);

  useEffect(() => handleAppear(), []);

  return (
    <div
      id="pageTransition"
      className={`page-transition${
        hide ? " page-transition-hide" : ""
      }`}
    >
      <span className="page-transition-one" />
      <span className="page-transition-two" />
    </div>
  );
};

export default PageTransition;
