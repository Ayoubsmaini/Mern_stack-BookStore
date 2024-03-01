import "./index.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BsAward, BsList, BsX, BsBoxArrowInLeft } from "react-icons/bs"; // Import Bootstrap icons
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from "../../../redux/api/authApiCalls";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaRegCircleUser } from "react-icons/fa6";
import { HiHome } from "react-icons/hi";
import { RiLogoutCircleLine } from "react-icons/ri";
import { BsInboxesFill } from "react-icons/bs";
import { RiMenu4Fill } from "react-icons/ri";
import { ImBooks } from "react-icons/im";
import { HiArrowCircleLeft } from "react-icons/hi";

const Sidebar = ({ show, toggleShow }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handelLogout = () => {
    dispatch(LogoutUser(()=>navigate("/login")));
  };

  const closeIcon = show ? <HiArrowCircleLeft className="text-primary" size={30} /> : <RiMenu4Fill className="text-primary m-3" size={20} />;
  const logoutIcon = <RiLogoutCircleLine />;
  const Links = [
    {
      name: "Home",
      link: "/",
      icon: HiHome ,
      show: true,
    },
    {
      name: "Category",
      link: "/category",
      icon: BiSolidCategoryAlt ,
      show: true,
    },
    {
      name: "Book",
      link: "/book",
      icon: ImBooks,
      show: true,
    },
    {
      name: "Commande",
      link: "/commande",
      icon: BsInboxesFill,
      show: true,
    },
  ];

  return (
    <>
      <header className={` header ${show ? "space-toggle" : ""}`}>
        <div className="header-toggle" onClick={toggleShow}>
          {closeIcon}
        </div>
        <div className="text-dark fw-bold"> {user &&<span className="d-flex align-items-end gap-2 fs-5"> {user.user.user_name}<FaRegCircleUser size={30}/> </span> } </div>
      </header>

      <aside className={show ? "sidebar show " : "sidebar"}>
        <nav className="nav">
          <div>
           
          <Link to="/" className="nav-logo d-flex align-items-center ">
         
         <img src="/src/assets/image/1.png" className="imag-logo" alt="logo" />
       
     </Link>
            <div className="nav-list pt-5">
              {Links.map(
                (link, index) =>
                  link.show && (
                    <NavLink
                      to={link.link}
                      className="nav-link-iteme d-flex align-items-center fw-bold"
                      key={index}
                    >
                      {<link.icon className="nav-link-icon" size={20} />}{" "}
                      {/* Render the Bootstrap icon directly */}
                      <span className="nav-link-name">{link.name}</span>
                    </NavLink>
                  )
              )}
            </div>
          </div>

          <span
            to="/logout"
            className="nav-link-iteme  d-flex align-items-center fw-bold"
            onClick={handelLogout}
          >
            {logoutIcon}
            <span className="nav-link-name">Logout</span>
          </span>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
