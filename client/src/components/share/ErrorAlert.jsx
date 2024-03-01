import { BsExclamationTriangle } from "react-icons/bs"


const ErrorAlert = ({ error }) => {
  return (
    <div class="alert alert-danger d-flex align-items-center flex-column fw-bold mt-2" role="alert" >
    <BsExclamationTriangle className="text-danger" size={30}/>
    <div className="ms-3 ">
     {error && error}
    </div>
  </div>
  )
}

export default ErrorAlert