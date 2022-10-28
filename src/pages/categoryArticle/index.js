/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import FooterApp from "../../components/FooterApp";
import NavbarApp from "../../components/NavbarApp";

// icons
import { BiChat, BiHeart } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";

// api
import { newsApi } from "../../api/api.news";
import util from '../../helper/util';

import { Pagination } from "antd";

import newsImage from '../../assets/news-image.jpg';

const getImage = (image_url) => {
  if(image_url){
    const current = 
    `${process.env.REACT_APP_API_END_POINT}/news/image/news/${image_url}`;
    return(current);
  } else {
    return newsImage;
  }
};

function CategoryArticle() {
  const params = useParams();

  const [offset, setoffset] = useState(0);
  const [page, setpage] = useState(1);
  const [newsList, setnewsList] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [count, setcount] = useState(0);

  useEffect(() => {
    getNewsList();
  }, [params.id, page]);

  const getNewsList = async () => {
    let category_id = null;
    switch (params.id) {
      case "peristiwa":
        category_id = 1;
        break;
      case "pariwisata":
        category_id = 2;
        break;
      case "politik":
        category_id = 3;
        break;
      case "budaya-pendidikan":
        category_id = 4;
        break;
      case "lingkungan-kesehatan":
        category_id = 5;
        break;
      case "pertanian-ekonomi":
        category_id = 6;
        break;
      case "calderapedia":
        category_id = 7;
        break;

      default:
        break;
    }
    const result = await newsApi.getNewsList({
      category_id,
      status: "PUBLISH",
      limit: 10,
      offset,
    });
    if (result.status === "SUCCESS" && result.message === "SUCCESS") {
      setnewsList(result.data);
      setcount(result.count);
      setisLoading(false);
    } else {
      setnewsList([]);
      setisLoading(false);
      setcount(0);
    }
  };

  const showCategoryName = (name) => {
    let result = null;
    switch (name) {
      case "peristiwa":
        result = "Peristiwa";
        break;
      case "pariwisata":
        result = "Pariwisata";
        break;
      case "politik":
        result = "Politik";
        break;
      case "budaya-pendidikan":
        result = "Budaya/Pendidikan";
        break;
      case "lingkungan-kesehatan":
        result = "Lingkungan/Kesehatan";
        break;
      case "pertanian-ekonomi":
        result = "Pertanian/Ekonomi";
        break;
      case "calderapedia":
        result = "Calderapedia";
        break;

      default:
        break;
    }
    return result;
  };

  var iconStats = {
    fontSize: "16px",
  };
  var imgFeed = {
    minWidth: "100px",
    height: "100px",
  };

  return (
    <div>
      <NavbarApp />
      <section className="py-5">
        <Container>
          <Row>
            <Col lg={8}>
              {params.id === "berita-terbaru" ? (
                <h4 className="mb-5">Kumpulan Berita Terbaru</h4>
              ) : (
                <h4 className="mb-5">
                  Kumpulan Berita Khusus{" "}
                  <span className="fw-bold" style={{ color: "#ce1127" }}>
                    {showCategoryName(params.id)}
                  </span>
                </h4>
              )}
              <hr />

              {isLoading ? (
                <Row>
                  <h4>
                    <Spinner animation="border" variant="danger" />
                    {" Sedang memuat berita..."}
                  </h4>
                </Row>
              ) : newsList.length === 0 ? (
                <Row>
                  <h4>Belum ada berita...</h4>
                </Row>
              ) : (
                newsList.map((data, i) => (
                  <>
                    <Link
                      onClick={()=>{window.scrollTo(0, 0)}}
                      to={`/article/${data.news_url}`}
                      className="link"
                      key={i}
                    >
                      <Row className="my-3">
                        <Col xs={8} className="align-self-center">
                          <p className="fw-bold text-black">{data.title}</p>
                          <ul className="list-unstyled stats">
                            <li className="text-dark">
                              <BiHeart style={iconStats} />{" "}
                              {Math.floor((Math.random() * 500))} 
                              {/* {parseInt(data.total_likes)} */}
                            </li>
                            <li className="text-dark">
                              <BiChat style={iconStats} />{" "}
                              {parseInt(data.total_comment)}
                            </li>
                            <li className="text-dark">
                              {util.indonesiaFormat(data.posted_at)}
                            </li>
                          </ul>
                        </Col>
                        <Col xs={4}>
                          <div
                            style={{
                              backgroundImage: `url(${getImage(data.image_url)})`,
                              ...imgFeed,
                            }}
                            className="post-img align-self-end"
                          />
                        </Col>
                      </Row>
                    </Link>
                    <hr />
                  </>
                ))
              )}
            </Col>
          </Row>
          <Row>
            <Col hidden={newsList.length === 0}>
              <Pagination
                defaultCurrent={offset}
                defaultPageSize={10}
                total={count}
                onChange={(page, pageSize) => {
                  setpage(page);
                  if (page === 1) {
                    setoffset(0);
                  } else {
                    setoffset((page - 1) * 10);
                  }
                }}
              />
            </Col>
          </Row>
        </Container>
      </section>
      <FooterApp />
    </div>
  );
}

export default CategoryArticle;
