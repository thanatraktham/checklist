import { ArrowBackIosNew } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Footerbar = ({ submitButton }) => {
  const navigate = useNavigate();
  return (
    <div className="footerbar-container">
      <button
        className="back-button"
        style={{ marginLeft: 20 }}
        onClick={() => navigate(-1)}
      >
        <div>
          <ArrowBackIosNew sx={{ position: "relative", top: "2px" }} />
        </div>
        <span>BACK</span>
      </button>
      {/* <span /> */}
      {submitButton}
    </div>
  );
};

export default Footerbar;
