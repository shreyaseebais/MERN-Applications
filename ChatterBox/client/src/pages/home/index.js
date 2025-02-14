import Header from "./components/header";
import SideBar from "./components/sidebar";
import ChatArea from "./components/chat";

function Home() {
  return (
    <div className="home-page">
      <Header></Header>
      <div className="main-content">
        <SideBar></SideBar>
        <ChatArea></ChatArea>
      </div>
    </div>
  );
}

export default Home;
