import { Link } from "react-router-dom";
import FacebookIcon from "../../icons/FacebookIcon";
import TwitterIcon from "../../icons/TwitterIcon";
import YoutupeIcon from "../../icons/YoutupeIcon";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
  return (
    <footer className="footer footer-center bg-base-200 text-base-content rounded p-9" style={{ backgroundColor: "#dab26d" }}>
  <nav> <img src ="bookstore.png" width={"80"} /></nav>
  <nav>
    <div className="grid grid-flow-col gap-4">
      <Link to={"#"}>
        <FacebookIcon/>
      </Link>
      <Link to={"#"}>
      <TwitterIcon/>
        
      </Link>
      <Link to={"#"}>
        <YoutupeIcon/>
      </Link>
      <Link to={"#"}>
      
    </Link>
    </div>
  </nav>
  <aside>
    <p>Copyright © {new Date().getFullYear()} - All right reserved by Book Store </p>
  </aside>
</footer>
  )
}

export default Footer;
