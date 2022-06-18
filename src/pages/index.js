import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavbarApp from "../components/NavbarApp";
import TrendingSlider from "../components/TrendingSlider";

// icons
import { BiChat, BiHeart } from "react-icons/bi";

const Home = () => {
  var iconStats = {
    fontSize: "16px",
  };

  const headPost = [
    {
      id: 1,
      img: "https://via.placeholder.com/150",
      headline: "Libur Lebaran, Jumlah Kendaraan yang Diangkut Kapal ...",
      love: 79,
      comment: 122,
      date: "12 Jam",
    },
    {
      id: 2,
      img: "https://via.placeholder.com/150",
      headline: "Main Film Ngeri Ngeri Sedap, Arswendi Nasution Jadi Bapak ...",
      love: 12,
      comment: 22,
      date: "1 Hari",
    },
    {
      id: 3,
      img: "https://via.placeholder.com/150",
      headline: "5 Bahasa yang Digunakan di Sumatera Utara",
      love: 79,
      comment: 122,
      date: "2 Hari",
    },
  ];
  return (
    <div>
      <NavbarApp />
      <section className="bg-dark pt-3 pb-5">
        <Container>
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <h2 className="text-white fw-bold">Trending</h2>
              <TrendingSlider />
            </Col>
            <Col md={{ span: 10, offset: 1 }}>
              <Row className="mt-5">
                {headPost.map((data, i) => (
                  <Col md={4} className="my-2" key={i}>
                    <div className="d-flex">
                      <div
                        style={{
                          backgroundImage: `url(${data.img})`,
                        }}
                        className="head-post align-self-center"
                      />
                      <div className="align-self-center ms-3">
                        <p className="text-white fw-bold">{data.headline}</p>
                      </div>
                    </div>
                    <ul className="list-unstyled stats">
                      <li>
                        <BiHeart style={iconStats} /> {data.love}
                      </li>
                      <li>
                        <BiChat style={iconStats} /> {data.comment}
                      </li>
                      <li>{data.date}</li>
                    </ul>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
