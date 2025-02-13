import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedUser } from "./../apiCalls/users";
// import { setAllUsers, setUser, setAllChats } from "../redux/usersSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../redux/loaderSlice";

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getLoggedInUser = async () => {
    let response = null;
    try {
      dispatch(showLoader());
      response = await getLoggedUser();
      dispatch(hideLoader());
      if (response.success) {
        setUser(response.data);
      } else {
        toast.error(response.message);
        navigate("/login");
      }
    } catch (err) {
      dispatch(hideLoader());
      navigate("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getLoggedInUser();
    } else {
      navigate("/login");
    }
  }, []);

  return <div>{children}</div>;
}

export default ProtectedRoute;
