import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createNewChat } from "../../../apiCalls/chat";
import { showLoader, hideLoader } from "../../../redux/loaderSlice";
import { setAllChats, setSelectedChat } from "../../../redux/usersSlice";

function UsersList({ searchKey }) {
  const {
    allUsers,
    allChats,
    user: currentUser,
    selectedChat,
  } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const startNewChat = async (searchedUserId) => {
    console.log("startNewChat() ");
    let response = null;
    try {
      console.log("Try ");
      dispatch(showLoader());
      const response = await createNewChat([currentUser._id, searchedUserId]);
      console.log("response: ", response);
      dispatch(hideLoader());

      if (response.success) {
        console.log("Response success ");
        toast.success(response.message);
        const newChat = response.data;
        const updatedChat = [...allChats, newChat];
        dispatch(setAllChats(updatedChat));
        dispatch(setSelectedChat(newChat));
      }
    } catch (err) {
      toast.error(err);
      dispatch(hideLoader());
    }
  };

  const openChat = async (selectedUserId) => {
    const chat = allChats.find(
      (chat) =>
        chat.members.includes(currentUser._id) &&
        chat.members.includes(selectedUserId)
    );

    if (chat) {
      dispatch(setSelectedChat(chat));
    }
  };

  return allUsers
    .filter((user) => {
      return (
        ((user.firstname?.toLowerCase().includes(searchKey?.toLowerCase()) ||
          user.lastname?.toLowerCase().includes(searchKey?.toLowerCase())) &&
          searchKey) ||
        allChats.some((chat) => chat.members.includes(user._id))
      );
    })
    .map((user) => {
      return (
        <div
          className="user-search-filter"
          key={user._id}
          onClick={() => openChat(user._id)}
        >
          <div className="filtered-user">
            <div className="filter-user-display">
              {user.profilePic && (
                <img
                  src={user.profilePic}
                  alt="Profile Pic"
                  className="user-profile-image"
                ></img>
              )}
              {!user.profilePic && (
                <div className="user-default-profile-pic">
                  {user.firstname.charAt(0).toUpperCase() +
                    user.lastname.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="filter-user-details">
                <div className="user-display-name">
                  {user.firstname + " " + user.lastname}
                </div>
                <div className="user-display-email">{user.email}</div>
              </div>
              {!allChats.find((chat) => chat.members.includes(user._id)) && (
                <div className="user-start-chat">
                  <button
                    className="user-start-chat-btn"
                    onClick={() => startNewChat(user._id)}
                  >
                    Start Chat
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    });
}

export default UsersList;
