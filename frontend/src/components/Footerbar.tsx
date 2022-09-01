import { ArrowBackIosNew } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

type Props = {
  submitButton: JSX.Element;
};

const Footerbar = ({ submitButton }: Props) => {
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
      {submitButton}
    </div>
  );
};

export default Footerbar;
