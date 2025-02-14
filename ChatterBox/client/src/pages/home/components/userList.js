import { useDispatch, useSelector } from "react-redux";

function UsersList({ searchKey }) {
  const { allUsers, allChats, user: currentUser, selectedChat } = useSelector((state) => state.userReducer);

  return allUsers
    .filter((user) => {
      return (
        (user.firstname?.toLowerCase().includes(searchKey?.toLowerCase()) ||
          user.lastname?.toLowerCase().includes(searchKey?.toLowerCase())) &&
        searchKey
      );
    })
    .map((user, idx) => {
      return (
        <div className="user-search-filter" key={idx}>
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
             { !allChats.find(chat=>chat.members.includes(user._id)) &&
              <div className="user-start-chat">
                <button className="user-start-chat-btn">Start Chat</button>
              </div>}
            </div>
          </div>
        </div>
      );
    });
}

export default UsersList;
