import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <div className="homeContent">
          <img
            src="https://cf.bstatic.com/xdata/images/city/600x600/977237.jpg?k=6d894f6f1bc6d83e5206ee19d4e593b008640ec596ed3803071cc03aff856b8b&o="
            alt=""
            className="siImg"
          />
          <img
            src="https://cf.bstatic.com/xdata/images/city/600x600/653172.jpg?k=7f27dcc9202d8b94c667e446798404cc05350041c6b9332829723bcce5bf759b&o="
            alt=""
            className="siImg"
          />
          <img
            src="https://cf.bstatic.com/xdata/images/city/600x600/976999.jpg?k=1a9943601319fe7ff4f51e0644a5e61c362b9f979b0e1d5d60b4783ab6c5e5a4&o="
            alt=""
            className="siImg"
          />
          <img
            src="https://cf.bstatic.com/xdata/images/city/600x600/977038.jpg?k=7a972d6549c05a3f19227bdd9be88209cbc57be1dd143dcc20ae7a6addb8d3fb&o="
            alt=""
            className="siImg"
          />
          <img
            src="https://cf.bstatic.com/xdata/images/city/600x600/976539.jpg?k=0a7263960952588dc71a60f1f9c2e738b5c0af9b2d9d3c3df79677d630b8a665&o="
            alt=""
            className="siImg"
          />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
