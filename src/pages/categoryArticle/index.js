import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import FooterApp from "../../components/FooterApp";
import NavbarApp from "../../components/NavbarApp";

// icons
import { BiChat, BiHeart } from "react-icons/bi";

function CategoryArticle() {
  var iconStats = {
    fontSize: "16px",
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
      <section className="py-5">
        <Container>
          <Row>
            <Col md={8}>
              <Row>
                <Col xs={8}>
                  <h4 className="fw-bold mb-5">Feed</h4>
                </Col>
                <Col xs={4} className="text-end">
                  <Form.Select aria-label="Select Feed">
                    <option value="1">Rekomendasi</option>
                    <option value="2">Terbaru</option>
                  </Form.Select>
                </Col>
              </Row>
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
            </Col>
          </Row>
        </Container>
      </section>
      <FooterApp />
    </div>
  );
}

export default CategoryArticle;
