import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedUser, getAllUsers } from "./../apiCalls/users";
// import { setAllUsers, setUser, setAllChats } from "../redux/usersSlice";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { showLoader, hideLoader } from "../redux/loaderSlice";
import { setAllChats, setAllUsers, setUser } from "../redux/usersSlice";
import { getAllChats } from "../apiCalls/chat";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getLoggedInUser = async () => {
    let response = null;

    try {
      dispatch(showLoader());
      response = await getLoggedUser();
      dispatch(hideLoader());

      if (response.success) {
        dispatch(setUser(response.data));
      } else {
        toast.error(response.message);
        navigate("/login");
      }
    } catch (err) {
      dispatch(hideLoader());
      navigate("/login");
    }
  };

  const getAllUsersFromDB = async () => {
    let response = null;

    try {
      dispatch(showLoader());
      response = await getAllUsers();
      dispatch(hideLoader());

      if (response.success) {
        dispatch(setAllUsers(response.data));
      } else {
        toast.error(response.message);
        navigate("/login");
      }
    } catch (err) {
      dispatch(hideLoader());
      navigate("/login");
    }
  };

  const getCurrentUserChats = async()=>{
    try{
      const response = await getAllChats();
      if(response.success){
        dispatch(setAllChats(response.data))
      }else{

      }
    }catch(err){
      navigate('/login')
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getLoggedInUser();
      getAllUsersFromDB();
      getCurrentUserChats();
    } else {
      navigate("/login");
    }
  }, []);

  return <div>{children}</div>;
}

export default ProtectedRoute;
