import { IoPersonCircleOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useState } from "react";
import BtnCheckbox from "../../share/BtnCheckbox";
const HeaderRight = ({user}) => {
  const [showNotifications, setShowNotification] = useState(false);
 
  
  return (
    <div className="d-flex justify-content-center align-items-end gap-3">
      <div className="notification-conatiner ">
        <div
          
          onClick={() => setShowNotification(!showNotifications)}
        >
          <IoIosNotificationsOutline size={20} /></div>
          <div className="conter-notifications rounded-circle"></div>
          {showNotifications && (
            <div className="rounded notifications-content d-flex flex-column p-3">
              <div className="d-flex justify-content-center w-100 align-items-center gap-1 container-element-notification">
                <Link
                onClick={() => setShowNotification(!showNotifications)}
                  to="/document"
                  className="nav-link p-2 rounded element-notification my-1"
                >
                  etablissement flan en attende de valider la dommande de flaan
                  flan
                  <span className="notification-date">2024/12/23</span>
                </Link>
                <div className="d-flex flex-column gap-1">
                  <BtnCheckbox />
                  <div className="d-flex flex-row gap-1">
                    <button className="btn btn-outline-success btn-sm btn-notifications">
                      <FaCheck />
                    </button>
                    <button className="btn btn-outline-danger btn-sm btn-notifications">
                      <TiCancel />
                    </button>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center w-100 align-items-center gap-1 container-element-notification">
                <Link
                onClick={() => setShowNotification(!showNotifications)}
                  to="/document"
                  className="nav-link p-2 rounded element-notification my-1"
                >
                  etablissement flan en attende de valider la dommande de flaan
                  flan
                  <span className="notification-date">2024/12/23</span>
                </Link>
                <div className="d-flex flex-column gap-1">
                  <BtnCheckbox />
                  <div className="d-flex flex-row gap-1">
                    <button className="btn btn-outline-success btn-sm btn-notifications">
                      <FaCheck />
                    </button>
                    <button className="btn btn-outline-danger btn-sm btn-notifications">
                      <TiCancel />
                    </button>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center w-100 align-items-center gap-1 container-element-notification">
                <Link
                onClick={() => setShowNotification(!showNotifications)}
                  to="/document"
                  className="nav-link p-2 rounded element-notification my-1"
                >
                  etablissement flan en attende de valider la dommande de flaan
                  flan
                  <span className="notification-date">2024/12/23</span>
                </Link>
                <div className="d-flex flex-column gap-1">
                  <BtnCheckbox />
                  <div className="d-flex flex-row gap-1">
                    <button className="btn btn-outline-success btn-sm btn-notifications">
                      <FaCheck />
                    </button>
                    <button className="btn btn-outline-danger btn-sm btn-notifications">
                      <TiCancel />
                    </button>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center w-100 align-items-center gap-1 container-element-notification">
                <Link
                onClick={() => setShowNotification(!showNotifications)}
                  to="/document"
                  className="nav-link p-2 rounded element-notification my-1"
                >
                  etablissement flan en attende de valider la dommande de flaan
                  flan
                  <span className="notification-date">2024/12/23</span>
                </Link>
                <div className="d-flex flex-column gap-1">
                  <BtnCheckbox />
                  <div className="d-flex flex-row gap-1">
                    <button className="btn btn-outline-success btn-sm btn-notifications">
                      <FaCheck />
                    </button>
                    <button className="btn btn-outline-danger btn-sm btn-notifications">
                      <TiCancel />
                    </button>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center w-100 align-items-center gap-1 container-element-notification">
                <Link
                onClick={() => setShowNotification(!showNotifications)}
                  to="/document"
                  className="nav-link p-2 rounded element-notification my-1"
                >
                  etablissement flan en attende de valider la dommande de flaan
                  flan
                  <span className="notification-date">2024/12/23</span>
                </Link>
                <div className="d-flex flex-column gap-1">
                  <BtnCheckbox />
                  <div className="d-flex flex-row gap-1">
                    <button className="btn btn-outline-success btn-sm btn-notifications">
                      <FaCheck />
                    </button>
                    <button className="btn btn-outline-danger btn-sm btn-notifications">
                      <TiCancel />
                    </button>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center w-100 align-items-center gap-1 container-element-notification">
                <Link
                onClick={() => setShowNotification(!showNotifications)}
                  to="/document"
                  className="nav-link p-2 rounded element-notification my-1"
                >
                  etablissement flan en attende de valider la dommande de flaan
                  flan
                  <span className="notification-date">2024/12/23</span>
                </Link>
                <div className="d-flex flex-column gap-1">
                  <BtnCheckbox />
                  <div className="d-flex flex-row gap-1">
                    <button className="btn btn-outline-success btn-sm btn-notifications">
                      <FaCheck />
                    </button>
                    <button className="btn btn-outline-danger btn-sm btn-notifications">
                      <TiCancel />
                    </button>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center w-100 align-items-center gap-1 container-element-notification">
                <Link
                onClick={() => setShowNotification(!showNotifications)}
                  to="/document"
                  className="nav-link p-2 rounded element-notification my-1"
                >
                  etablissement flan en attende de valider la dommande de flaan
                  flan
                  <span className="notification-date">2024/12/23</span>
                </Link>
                <div className="d-flex flex-column gap-1">
                  <BtnCheckbox />
                  <div className="d-flex flex-row gap-1">
                    <button className="btn btn-outline-success btn-sm btn-notifications">
                      <FaCheck />
                    </button>
                    <button className="btn btn-outline-danger btn-sm btn-notifications">
                      <TiCancel />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        
      </div>
      <Link className="fw-bold d-flex align-items-end nav-link" to="/profile">
        <span>{user && user.user.user_name}</span>
        <IoPersonCircleOutline size={39} />
      </Link>
    </div>
  );
};

export default HeaderRight;
