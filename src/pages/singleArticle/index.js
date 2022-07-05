import React from "react";
import { Container, Row, Col, Card, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import FooterApp from "../../components/FooterApp";
import SectionComment from "./components/sectionComment";
import NavbarApp from "../../components/NavbarApp";

// icons
import { BiChat, BiHeart } from "react-icons/bi";
import { FaWhatsapp, FaShareAlt } from "react-icons/fa";

function SingleArticle() {
  var cardStyle = {
    height: "400px",
    backgroundImage: `url("https://source.unsplash.com/random/500/?car})`,
    backgroundSize: "cover",
    backgroudPosition: "bottom",
    borderRadius: "8px",
    border: "none",
  };
  var iconStats = {
    fontSize: "24px",
  };
  var imgFeed = {
    minWidth: "100px",
    height: "100px",
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
  return (
    <div>
      <NavbarApp />
      <div className="py-5">
        <Container>
          <Row>
            <Col md={7} xs={12}>
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link to="/">Home</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to="/category/peristiwa">Peristiwa</Link>
                </Breadcrumb.Item>
              </Breadcrumb>
              <h3 className="fw-bold my-4">
                Suzuki Brezza Dapat Penyegaran, Lebih Menarik dari Toyota
                HyRyder?
              </h3>
              <div className="d-flex justify-content-between my-4">
                <p className="text-muted">
                  5 Juli 2022 11:03 · waktu baca 2 menit
                </p>
                <ul className="list-unstyled inline">
                  <li>
                    <BiHeart className="text-info" style={iconStats} /> 79
                  </li>
                  <li>
                    <BiChat className="text-info" style={iconStats} /> 122
                  </li>
                  <li>
                    <FaWhatsapp className="text-success" style={iconStats} />
                  </li>
                  <li>
                    <FaShareAlt className="text-info" style={iconStats} />
                  </li>
                </ul>
              </div>
              <Card style={cardStyle} />
              <h6 className="opacity-75 mt-2 mb-5">
                Random Dummy Photo Foto: dok. Unsplash
              </h6>
              <div className="p-article mb-5">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Massa tempor nec feugiat nisl pretium. In iaculis nunc sed
                  augue lacus viverra vitae congue eu. At tellus at urna
                  condimentum mattis pellentesque id nibh. Pretium aenean
                  pharetra magna ac placerat vestibulum. Integer enim neque
                  volutpat ac tincidunt vitae semper.{" "}
                  <a href="/#">Dictum sit amet</a> justo donec enim diam
                  vulputate ut. Ut tellus elementum sagittis vitae et leo duis.
                  Vitae sapien pellentesque habitant morbi. Pellentesque diam
                  volutpat commodo sed egestas egestas fringilla. A arcu cursus
                  vitae congue mauris rhoncus aenean vel elit. Potenti nullam ac
                  tortor vitae purus faucibus ornare suspendisse sed.
                </p>
                <p>
                  <a href="/#">Metus dictum at tempor commodo</a> ac tortor
                  dignissim convallis aenean et. Metus dictum at tempor commodo.
                  Consectetur lorem donec massa sapien faucibus et molestie.
                  Donec et odio pellentesque diam volutpat commodo sed. Enim
                  nunc faucibus a pellentesque sit amet porttitor. Posuere
                  sollicitudin aliquam ultrices sagittis. Ut enim blandit
                  volutpat maecenas. Diam in arcu cursus euismod. Tristique et
                  egestas quis ipsum suspendisse ultrices. Lorem sed risus
                  ultricies tristique nulla aliquet enim tortor at
                </p>
              </div>
            </Col>
            <Col md={7} xs={12}>
              <h4 className="fw-bold">Baca Lainnya</h4>
              <hr className="title mb-4" />
              {commonPost.map((data, i) => (
                <>
                  <div className="d-flex my-3" key={i}>
                    <div className="align-self-center">
                      <p className="fw-bold">{data.headline}</p>
                      <h6 className="text-muted fw-normal">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris.
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
                    <div
                      style={{
                        backgroundImage: `url(${data.img})`,
                        ...imgFeed,
                      }}
                      className="post-img align-self-center"
                    />
                  </div>
                  <hr />
                </>
              ))}
              <h4 className="fw-bold mt-5">1 Komentar</h4>
              <hr className="title mb-4" />
              <SectionComment />
            </Col>
          </Row>
        </Container>
      </div>
      <FooterApp />
    </div>
  );
}

export default SingleArticle;
