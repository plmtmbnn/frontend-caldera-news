/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Container, Row, Col, CloseButton } from "react-bootstrap";
import NavbarApp from "../components/NavbarApp";
import TrendingSlider from "../components/TrendingSlider";

// icons
import { BiChat, BiHeart } from "react-icons/bi";
import { FaLongArrowAltRight } from "react-icons/fa";

const Home = () => {
  var iconStats = {
    fontSize: "16px",
  };

  const commonPost = [
    {
      id: 1,
      img: "https://source.unsplash.com/random/500/?seaport",
      headline: "Libur Lebaran, Jumlah Kendaraan yang Diangkut Kapal",
      love: 79,
      comment: 122,
      date: "12 Jam",
    },
    {
      id: 2,
      img: "https://source.unsplash.com/random/500/?movie",
      headline: "Main Film Ngeri Ngeri Sedap, Arswendi Nasution Jadi Bapak",
      love: 12,
      comment: 22,
      date: "1 Hari",
    },
    {
      id: 3,
      img: "https://source.unsplash.com/random/500/?medan",
      headline:
        "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
      love: 79,
      comment: 122,
      date: "2 Hari",
    },
    {
      id: 4,
      img: "https://source.unsplash.com/random/500/?swiss",
      headline:
        "Atalia Kamil Pamit ke Eril: Mama Lepas Kamu di Sungai Aare yang Indah Ini",
      love: 79,
      comment: 122,
      date: "12 Jam",
    },
  ];

  const generalPost = [];
  for (let i = 0; i < 4; i++) {
    generalPost.push({
      key: i,
      headline: `Menantu Luhut Mayjen Maruli Simanjuntak Jadi Pangkostrad ${i}`,
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
      do consectetur adipiscing elit ${i}`,
      date: "17-9-2022",
    });
  }

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
                {commonPost.slice(0, 3).map((data, i) => (
                  <Col md={4} className="my-2" key={i}>
                    <div className="d-flex">
                      <div
                        style={{
                          backgroundImage: `url(${data.img})`,
                        }}
                        className="head-post post-img align-self-center"
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
      <section className="py-5">
        <Container>
          <div className="d-flex">
            <h2 className="fw-bold align-self-center flex-fill">
              Artikel Terbaru
            </h2>
            <a href="#" className="text-right align-self-center">
              Lihat Semua Artikel <FaLongArrowAltRight />
            </a>
          </div>
          <Row className="mt-5">
            {commonPost.map((data, i) => (
              <Col md={3} key={i}>
                <div
                  style={{
                    backgroundImage: `url(${data.img})`,
                  }}
                  className="post-latest post-img"
                />
                <div className="mt-3">
                  <p className="fw-bold">{data.headline}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <hr style={{ color: "#dbdbdb" }} />
      <section className="py-5">
        <Container>
          <Row>
            <Col md={8}>
              <h2 className="fw-bold mb-5">Rekomendasi</h2>
              {commonPost.slice(2, 4).map((data, i) => (
                <div className="d-flex my-3" key={i}>
                  <div
                    style={{
                      backgroundImage: `url(${data.img})`,
                    }}
                    className="post-rcmd post-img align-self-center"
                  />
                  <div className="align-self-center ms-3">
                    <h4 className="fw-bold">{data.headline}</h4>
                    <h6 className="text-muted fw-normal">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur.
                    </h6>
                    <ul className="list-unstyled stats">
                      <li className="text-dark">
                        <BiHeart style={iconStats} /> {data.love}
                      </li>
                      <li className="text-dark">
                        <BiChat style={iconStats} /> {data.comment}
                      </li>
                      <li className="text-dark">{data.date}</li>
                    </ul>
                  </div>
                </div>
              ))}
            </Col>
            <Col md={4}>
              <h4 className="mb-5">Artikel Umum</h4>
              {generalPost.map((data, i) => (
                <div className="my-3" key={i}>
                  <p className="mb-0 text-primary">{data.date}</p>
                  <p className="fw-bold mb-2">{data.headline}</p>
                  <h6 className="opacity-75 fw-normal">{data.content}</h6>
                  <hr style={{ color: "#5e5e5e" }} />
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-5 bg-category">
        <Container>asdas</Container>
      </section>
    </div>
  );
};

export default Home;
