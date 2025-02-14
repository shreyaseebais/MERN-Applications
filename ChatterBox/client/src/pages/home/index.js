import Header from "./components/header";
import SideBar from "./components/sidebar";

function Home() {
  return (
    <div className="home-page">
      <Header></Header>
      <div className="main-content">
        <SideBar></SideBar>
        {/* <!--CHAT AREA LAYOUT--> */}
      </div>
    </div>
  );
}

export default Home;
