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

  const headPost = [
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
      img: "https://source.unsplash.com/random/500/?indonesia",
      headline: "5 Bahasa yang Digunakan di Sumatera Utara",
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
                {headPost.slice(0, 3).map((data, i) => (
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
            {headPost.map((data, i) => (
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
              <h2 className="fw-bold">Rekomendasi</h2>
              {headPost.slice(2, 4).map((data, i) => (
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
                      Satuan Reserse Narkoba Polres Metro Jakarta Barat
                      menangkap seorang musikus anggota grup band berinisial AB
                      terkait dugaan keterlibatan dalam kasus
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
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
