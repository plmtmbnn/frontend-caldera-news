/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavbarApp from "../components/NavbarApp";
import TrendingSlider from "../components/TrendingSlider";
import FooterApp from "../components/FooterApp";

// icons
import { BiChat, BiHeart } from "react-icons/bi";
import { FaLongArrowAltRight } from "react-icons/fa";
import logoBatak from "../assets/batak-logo.png";

// api
import {newsApi} from '../api/api.news';
import moment from "moment";


import { Tabs } from 'antd';
const { TabPane } = Tabs;

const categoryImageList = ['Beach', 'danautoba', 'indonesia', 'sumatera', 'holiday', 'travelling', 'food']; 
const getRandomImage = () => {
  return `https://source.unsplash.com/random/500/?${categoryImageList[(Math.random() * categoryImageList.length) | 0]}`;
}

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
  }]);

  const getCategory = async () => {
    const result = await newsApi.getCategory();
    if(result.status === 'SUCCESS' && result.message === 'SUCCESS'){
      setNewsCategory(result.data);
    }
  }

  const [lastestNewsList, setlastestNewsList] = useState([]);
  const getlastestNewsList = async (payload) => {
    const result = await newsApi.getNewsList(payload);
    if(result.status === 'SUCCESS' && result.message === 'SUCCESS'){
      setlastestNewsList(result.data);
    } else {
      setlastestNewsList([]);
    }
  }

  const [recommendedNewsList, setrecommendedNewsList] = useState([]);
  const getrecommendedNewsList = async (payload) => {
    const result = await newsApi.getNewsList(payload);
    if(result.status === 'SUCCESS' && result.message === 'SUCCESS'){
      setrecommendedNewsList(result.data);
    } else {
      setrecommendedNewsList([]);
    }
  }

  const [trendingNewsList, setTrendingNewsList] = useState([]);
  const getTrendingNewsList = async (payload) => {
    const result = await newsApi.getNewsList(payload);
    if(result.status === 'SUCCESS' && result.message === 'SUCCESS'){
      setTrendingNewsList(result.data);
    } else {
      setTrendingNewsList([]);
    }
  }

  const [baseOnCategoryNewsList, setbaseOnCategoryNewsList] = useState([]);
  const getbaseOnCategoryNewsList = async (payload) => {
    const result = await newsApi.getNewsList(payload);
    if(result.status === 'SUCCESS' && result.message === 'SUCCESS'){
      setbaseOnCategoryNewsList(result.data);
    } else {
      setbaseOnCategoryNewsList([]);
    }
  }
  
  const [category_id, setcategory_id] = useState(1);
  
  useEffect(() => {
    getCategory();
    getlastestNewsList({status: 'PUBLISH', limit: 4, offset: 0});
    getrecommendedNewsList({is_recommendation: true ,status: 'PUBLISH', limit: 5, offset: 0});
    getTrendingNewsList({is_trending: true ,status: 'PUBLISH', limit: 3, offset: 0});
    getbaseOnCategoryNewsList({category_id ,status: 'PUBLISH', limit: 3, offset: 0});
  }, []);

  useEffect(() => {
    getbaseOnCategoryNewsList({category_id ,status: 'PUBLISH', limit: 5, offset: 0});
  }, [category_id]);

  const categoryNavigation = (index) => {
    let result = 'category/peristiwa';
    switch (index) {
      case 1:
        result = 'category/peristiwa';
        break;
      case 2:
        result = 'category/parawisata';
        break;
      case 3:
        result = 'category/pertanian';
        break;
    
      default:
        break;
    }
    return result;
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
                {
                trendingNewsList.length === 0
                ?
                <div className="d-flex my-3 text-center">
                  <h6 style={{color: 'white'}}>Belum ada berita trending</h6>
                </div>
                :
                trendingNewsList.map((data, i) => (
                  <Col md={4} className="my-2" key={i}>
                    <Link to={`/article/${data.news_url}`} className="link">
                      <div className="d-flex">
                        <div
                          style={{
                            backgroundImage: `url(${data.image_url || getRandomImage()})`,
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
                        <BiHeart style={iconStats} /> {data.total_likes}
                      </li>
                      <li>
                        <BiChat style={iconStats} /> {data.total_comment}
                      </li>
                      <li>{data.posted_at ? moment(data.posted_at).format('DD/MM/YYYY'): '-'}</li>
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
            {
            lastestNewsList.length === 0
            ?
            <div className="d-flex my-3">
                <h6>Belum ada berita terbaru</h6>
              </div>
            :
            lastestNewsList.map((data, i) => (
              <Col md={3} key={i}>
                <Link to={`/article/${data.news_url}`} className="link">
                  <div
                    style={{
                      backgroundImage: `url(${data.image_url || getRandomImage()})`,
                    }}
                    className="post-latest post-img"
                  />
                  <div className="mt-3">
                    <p className="fw-bold" style={{color: 'black'}}>{data.title}</p>
                    <ul className="list-unstyled stats">
                      <li className="text-dark">
                        <BiHeart style={iconStats} /> {data.total_likes}
                      </li>
                      <li className="text-dark">
                        <BiChat style={iconStats} /> {data.total_comment}
                      </li>
                      <li className="text-dark">{data.posted_at ? moment(data.posted_at).format('DD/MM/YYYY'): '-'}</li>
                    </ul>
                  </div>
                </Link>
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
              {
              recommendedNewsList.length === 0 ?
              <div className="d-flex my-3">
                <h6>Belum ada berita rekomendasi</h6>
              </div>
              :
              recommendedNewsList.map((data, i) => (
              <Link to={`/article/${data.news_url}`} className="link">
                <div className="d-flex my-3" key={i}>
                  <div
                    style={{
                      backgroundImage: `url(${data.image_url || getRandomImage()})`,
                    }}
                    className="post-rcmd post-img align-self-center"
                  />
                  <div className="align-self-center ms-3">
                    <h4 className="fw-bold">{data.title}</h4>
                    <ul className="list-unstyled stats">
                      <li className="text-dark">
                        <BiHeart style={iconStats} /> {data.total_likes}
                      </li>
                      <li className="text-dark">
                        <BiChat style={iconStats} /> {data.total_comment}
                      </li>
                      <li className="text-dark">{data.posted_at ? moment(data.posted_at).format('DD/MM/YYYY'): '-'}</li>
                    </ul>
                  </div>
                </div>
                </Link>
              ))}
            </Col>
            <Col md={4}>
              <h4 className="mb-5">Artikel Umum</h4>
              <Tabs defaultActiveKey={1} onChange={(key)=>{
                setcategory_id(key);
              }}>
                {
                  newsCategory.map((e)=>{
                    return (
                      <TabPane tab={e.category_name} key={e.id}>
                          {
                          baseOnCategoryNewsList.length === 0 ?
                          <p>Tidak ada berita</p>
                          :
                          baseOnCategoryNewsList.map((data, i) => (
                            <Link to={`/article/${data.news_url}`} className="link">                            
                              <div className="my-3" key={i}>
                                <p className="mb-0 text-primary">{data.posted_at ? moment(data.posted_at).format('DD/MM/YYYY'): '-'}</p>
                                <p className="fw-bold mb-2">{data.title}</p>
                                <ul className="list-unstyled stats">
                                  <li className="text-dark">
                                    <BiHeart style={iconStats} /> {data.total_likes}
                                  </li>
                                  <li className="text-dark">
                                    <BiChat style={iconStats} /> {data.total_comment}
                                  </li>
                                </ul>
                                <hr style={{ color: "#5e5e5e" }} />
                              </div>
                            </Link>
                          ))}
                      </TabPane>
                    )
                  })
                }
              </Tabs>              
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-5 bg-category">
        <Container>
          <Row className="mt-5">
            <Col md={{ span: 6, offset: 1 }} className="align-self-center">
              <h2 className="fw-bold text-white mb-5">Kategori Berita</h2>
              {newsCategory.map((data, i) => (
                <Link className="cat-link" to={categoryNavigation(i)} key={i}>
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
              ))}
            </Col>
            <Col md={{ span: 2, offset: 1 }} className="align-self-center">
              <img src={logoBatak} alt="" className="img-fluid" />
            </Col>
          </Row>
        </Container>
      </section>
      <FooterApp />
    </div>
  );
};

export default Home;
