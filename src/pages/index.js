/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavbarApp from "../components/NavbarApp";
import TrendingSlider from "../components/TrendingSlider";
import FooterApp from "../components/FooterApp";

// icons
import { BiChat, BiHeart } from "react-icons/bi";
import { FaLongArrowAltRight } from "react-icons/fa";


import {Helmet} from "react-helmet-async";

import logoCaldera from '../assets/logo.png';


// api
import { newsApi } from "../api/api.news";

import util from '../helper/util';

import newsImage from '../assets/news-image.jpg';

import { Tabs } from "antd";
const { TabPane } = Tabs;


const getImage = (image_url) => {
  if(image_url){
    const current = 
    `${process.env.REACT_APP_API_END_POINT}/news/image/news/${image_url}`;
    return(current);
  } else {
    return newsImage;
  }
};

const Home = () => {
  var iconStats = {
    fontSize: "16px",
  };

  const [newsCategory, setNewsCategory] = useState([
    {
      id: 1,
      category_name: "Peristiwa",
      total_post: 132,
      url: "#",
    },
    {
      id: 2,
      category_name: "Pariwisata/Budaya",
      total_post: 15,
      url: "#",
    },
    {
      id: 3,
      category_name: "Pertanian",
      total_post: 2,
      url: "#",
    },
  ]);

  const getCategory = async () => {
    const result = await newsApi.getCategory();
    if (result.status === "SUCCESS" && result.message === "SUCCESS") {
      setNewsCategory(result.data);
    }
  };

  const [lastestNewsList, setlastestNewsList] = useState([]);
  const getlastestNewsList = async (payload) => {
    const result = await newsApi.getNewsList(payload);
    if (result.status === "SUCCESS" && result.message === "SUCCESS") {
      setlastestNewsList(result.data);
    } else {
      setlastestNewsList([]);
    }
  };

  const [recommendedNewsList, setrecommendedNewsList] = useState([]);
  const getrecommendedNewsList = async (payload) => {
    const result = await newsApi.getNewsList(payload);
    if (result.status === "SUCCESS" && result.message === "SUCCESS") {
      setrecommendedNewsList(result.data);
    } else {
      setrecommendedNewsList([]);
    }
  };

  const [trendingNewsList, setTrendingNewsList] = useState([]);
  const getTrendingNewsList = async (payload) => {
    const result = await newsApi.getNewsList(payload);
    if (result.status === "SUCCESS" && result.message === "SUCCESS") {
      setTrendingNewsList(result.data);
    } else {
      setTrendingNewsList([]);
    }
  };

  const [baseOnCategoryNewsList, setbaseOnCategoryNewsList] = useState([]);
  const getbaseOnCategoryNewsList = async (payload) => {
    const result = await newsApi.getNewsList(payload);
    if (result.status === "SUCCESS" && result.message === "SUCCESS") {
      setbaseOnCategoryNewsList(result.data);
    } else {
      setbaseOnCategoryNewsList([]);
    }
  };

  const [category_id, setcategory_id] = useState(1);

  useEffect(() => {
    getCategory();
    getlastestNewsList({ status: "PUBLISH", limit: 4, offset: 0 });
    getrecommendedNewsList({
      is_recommendation: true,
      status: "PUBLISH",
      limit: 5,
      offset: 0,
    });
    getTrendingNewsList({
      is_trending: true,
      status: "PUBLISH",
      limit: 3,
      offset: 0,
    });
    getbaseOnCategoryNewsList({
      category_id,
      status: "PUBLISH",
      limit: 3,
      offset: 0,
    });
  }, []);

  useEffect(() => {
    getbaseOnCategoryNewsList({
      category_id,
      status: "PUBLISH",
      limit: 5,
      offset: 0,
    });
  }, [category_id]);

  const categoryNavigation = (index) => {
    let result = "category/peristiwa";
    switch (index) {
      case 1:
        result = "category/peristiwa";
        break;
      case 2:
        result = "category/pariwisata";
        break;
      case 3:
        result = "category/politik";
        break;
      case 4:
        result = "category/budaya-pendidikan";
        break;
      case 5:
        result = "category/lingkungan-kesehatan";
        break;
      case 6:
        result = "category/pertanian-ekonomi";
        break;
      case 7:
        result = "category/calderapedia";
        break;

      default:
        break;
    }
    return result;
  };
  return (
    <div>
      <Helmet>
        <title>caldera.id - Mengulas Sedalam Kaldera</title>
        <meta charset="utf-8" />
        <meta name="title" content="caldera.id - Mengulas Sedalam Kaldera" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description"
          content="Berita seputar batak, berita toba, adat batak, berita budaya batak, wisata danau toba" />

        <meta itemprop="name" content="caldera.id - Mengulas Sedalam Kaldera" />
        <meta itemprop="image" content="https://www.caldera.id/favicon-caldera.png" />
        <meta itemprop="description"
          content="Berita seputar batak, berita toba, adat batak, berita budaya batak, wisata danau toba" />
        
        <meta property="og:title" content="caldera.id - Mengulas Sedalam Kaldera" />
        <meta property="og:image" content="https://www.caldera.id/favicon-caldera.png" />
        <meta property="og:type" content="website" />
        <meta property="og:description"
          content="Berita seputar batak, berita toba, adat batak, berita budaya batak, wisata danau toba" />
        <meta property="og:type" content="website" />

        <meta property="fb:app_id" content="442815334329143" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.caldera.id" />
        <meta property="twitter:title" content="caldera.id - Mengulas Sedalam Kaldera" />
        <meta property="twitter:description"
          content="Berita seputar batak, berita toba, adat batak, berita budaya batak, wisata danau toba" />
        <meta property="twitter:image" content="https://www.caldera.id/favicon-caldera.png" />
      </Helmet>
      <NavbarApp />
      <section className="bg-dark pt-3 pb-5">
        <Container>
          <Row>
            <Col lg={{ span: 8, offset: 2 }}>
              <TrendingSlider/>
            </Col>
            <Col lg={{ span: 10, offset: 1 }}>
              <Row className="mt-5">
                {trendingNewsList.length === 0 ? (
                  <></>
                ) : (
                  trendingNewsList.map((data, i) => (
                    <Col md={6} lg={4} className="my-2" key={i}>
                      <Link onClick={()=>{window.scrollTo(0, 0)}} to={`/article/${data.news_url}`} className="link">
                        <div className="d-flex">
                          <div
                            style={{
                              backgroundImage: `url(${getImage(data.image_url)})`,
                            }}
                            className="head-post post-img align-self-center"
                          />
                          <div className="align-self-center ms-3">
                            <p className="text-white fw-bold">{data.title}</p>
                          </div>
                        </div>
                      </Link>
                      <ul className="list-unstyled stats">
                        <li>
                          <BiHeart style={iconStats} /> 
                          {data.total_likes}
                        </li>
                        <li>
                          <BiChat style={iconStats} /> {data.total_comment}
                        </li>
                        <li>
                          {data.posted_at
                            ? util.indonesiaFormat(data.posted_at)
                            : "-"}
                        </li>
                      </ul>
                    </Col>
                  ))
                )}
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
            <Link
              onClick={()=>{window.scrollTo(0, 0)}}
              to="/category/berita-terbaru"
              className="text-right align-self-center"
            >
              Lihat Semua Artikel <FaLongArrowAltRight />
            </Link>
          </div>
          <Row className="mt-5">
            {lastestNewsList.length === 0 ? (
              <div className="d-flex my-3">
                <h6>Belum ada berita terbaru</h6>
              </div>
            ) : (
              lastestNewsList.map((data, i) => (
                <Col md={6} lg={3} key={i} className="my-4">
                  <Link onClick={()=>{window.scrollTo(0, 0)}} to={`/article/${data.news_url}`} className="link">
                    <div
                      style={{
                        backgroundImage: `url(${getImage(data.image_url)})`,
                      }}
                      className="post-latest post-img"
                    />
                    <div className="mt-3">
                      <p className="fw-bold" style={{ color: "black" }}>
                        {data.title}
                      </p>
                      <ul className="list-unstyled stats">
                        <li className="text-dark">
                          <BiHeart style={iconStats} /> 
                          {data.total_likes}
                        </li>
                        <li className="text-dark">
                          <BiChat style={iconStats} /> {data.total_comment}
                        </li>
                        <li className="text-dark">
                          {data.posted_at
                            ? util.indonesiaFormat(data.posted_at)
                            : "-"}
                        </li>
                      </ul>
                    </div>
                  </Link>
                </Col>
              ))
            )}
          </Row>
        </Container>
      </section>
      <hr style={{ color: "#dbdbdb" }} />
      <section className="py-5">
        <Container>
          <Row>
            <Col md={8}>
              <h2 className="fw-bold mb-5">Rekomendasi</h2>
              {recommendedNewsList.length === 0 ? (
                <div className="d-flex my-3">
                  <h6>Belum ada berita rekomendasi</h6>
                </div>
              ) : (
                recommendedNewsList.map((data, i) => (
                  <Link
                    onClick={()=>{window.scrollTo(0, 0)}}
                    to={`/article/${data.news_url}`}
                    className="link"
                    key={i}
                  >
                    <Row className="my-5">
                      <Col lg={5}>
                        <div
                          style={{
                            backgroundImage: `url(${getImage(data.image_url)})`,
                          }}
                          className="post-rcmd post-img align-self-center mx-md-2"
                        />
                      </Col>
                      <Col lg={6} className="align-self-center mt-md-3 mt-lg-0">
                        <h4 className="fw-bold">{data.title}</h4>
                        <ul className="list-unstyled stats">
                          <li className="text-dark">
                            <BiHeart style={iconStats} /> 
                            {data.total_likes}
                          </li>
                          <li className="text-dark">
                            <BiChat style={iconStats} /> {data.total_comment}
                          </li>
                          <li className="text-dark">
                            {data.posted_at
                              ? util.indonesiaFormat(data.posted_at)
                              : "-"}
                          </li>
                        </ul>
                      </Col>
                    </Row>
                  </Link>
                ))
              )}
            </Col>
            <Col md={4}>
              <h4 className="mb-5">Artikel Umum</h4>
              <Tabs
                defaultActiveKey={1}
                onChange={(key) => {
                  setcategory_id(key);
                }}
              >
                {newsCategory.map((e) => {
                  return (
                    <TabPane tab={e.category_name} key={e.id}>
                      {baseOnCategoryNewsList.length === 0 ? (
                        <p>Belum ada berita</p>
                      ) : (
                        baseOnCategoryNewsList.map((data, i) => (
                          <Link
                            onClick={()=>{window.scrollTo(0, 0)}}
                            to={`/article/${data.news_url}`}
                            className="link"
                            key={i+Math.random()}
                          >
                            <div className="my-3" key={i}>
                              <p className="mb-0 text-primary">
                                {data.posted_at
                                  ? util.indonesiaFormat(data.posted_at)
                                  : "-"}
                              </p>
                              <p className="fw-bold mb-2">{data.title}</p>
                              <ul className="list-unstyled stats">
                                <li className="text-dark">
                                  <BiHeart style={iconStats} />{" "}
                                  {data.total_likes}
                                </li>
                                <li className="text-dark">
                                  <BiChat style={iconStats} />{" "}
                                  {data.total_comment}
                                </li>
                              </ul>
                              <hr style={{ color: "#5e5e5e" }} />
                            </div>
                          </Link>
                        ))
                      )}
                    </TabPane>
                  );
                })}
              </Tabs>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-5 bg-category">
        <Container>
          <Row className="mt-5">
            <Col lg={{ span: 10, offset: 1 }}>
              <Row>
                <h2 className="fw-bold text-white mb-5">Kategori Berita</h2>
                {newsCategory.map((data, i) => (
                  <Col md={6} className="align-self-center" key={i}>
                    <Link
                      onClick={()=>{window.scrollTo(0, 0)}}
                      className="cat-link"
                      to={categoryNavigation(data.id)}
                      key={i}
                      style={{ textDecoration: "none" }}
                    >
                      <Row className="mt-4 text-white">
                        <Col xs={8}>
                          <h4 className="fw-bold">{data.category_name}</h4>
                          <p>{data.description}</p>
                        </Col>
                        <Col xs={4} className="align-self-center text-end">
                          <Badge bg="light" text="dark" hidden>
                            {data.total_post} Artikel
                          </Badge>
                          <FaLongArrowAltRight className="ms-4" />
                        </Col>
                      </Row>
                      <hr style={{ color: "#fff" }} />
                    </Link>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      <FooterApp />
    </div>
  );
};

export default Home;
