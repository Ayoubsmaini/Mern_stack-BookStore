import { useState } from "react";
import "./layout.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../components/main/Sidebar/Sidebar";

const Layout = () => {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  return (
    <>
      <main className={show ? "space-toggle" : null}>
        <Sidebar show={show} toggleShow={toggleShow} />
        <div className="content">
          <Outlet />
        </div>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          draggablePercent={60}
        />
      </main>
    </>
  );
};

export default Layout;
