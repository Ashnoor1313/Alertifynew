import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import WorkingSection from "../components/WorkingFeatures";

const MainUspPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = () => {
      navigate("/MainUspPage", { replace: true });
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  return (
    <>
      <Navbar />
      <WorkingSection />
    </>
  );
};

export default MainUspPage;
