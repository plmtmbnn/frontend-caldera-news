import React, { useEffect, useState, useLayoutEffect } from "react";
import { Link, useParams } from "react-router-dom";

// import {Helmet} from "react-helmet";

import  { Helmet } from 'react-helmet-async';



import { Spin, Tag } from 'antd';

import { Container, Row, Col } from "react-bootstrap";
import FooterApp from "../../components/FooterApp";
import SectionComment from "./components/sectionComment";
import NavbarApp from "../../components/NavbarApp";

import { toast } from "react-toastify";

// icons
import { BiChat, BiHeart } from "react-icons/bi";
import { FaShareAlt } from "react-icons/fa";

//share
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappIcon,
  WhatsappShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

// api
import { newsApi } from "../../api/api.news";
import { commentLikeApi } from "../../api/api.comment-likes";

import util from '../../helper/util';

import { connect } from "react-redux";

import { LoadingOutlined } from '@ant-design/icons';

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

const getUrl = (news_url) => {
  const current = process.env.REACT_APP_API_ENV === 'production' ? 
  `https://www.caldera.id/article/${news_url}`
  : 
  `https://frontend-caldera-news.vercel.app/article/${news_url}`;
  return(current);
}

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

function SingleArticle(props) {
  const params = useParams();

  const [lastestNewsList, setlastestNewsList] = useState([]);
  const getlastestNewsList = async (payload) => {
    const result = await newsApi.getNewsList(payload);
    if (result.status === "SUCCESS" && result.message === "SUCCESS") {
      setlastestNewsList(result.data);
    } else {
      setlastestNewsList([]);
    }
  };

  useLayoutEffect(() => {
    getNewsDetail();
  }, []);

  useEffect(() => {
    getNewsDetail();
  }, [params.id]);

  const [isLoading, setisLoading] = useState(true);

  const [newsDetail, setnewsDetail] = useState({
    news: {
      id: "ae7d6f62-fa0a-11ec-8c6d-cecd024eb8ee",
      author_id: 1,
      image_desc: '',
      news_url: "220702-20-27-12_5-tempat-terbaik-di-sumut",
      title: "Berita",
      image_url: '',
      content: "...",
      status: "PUBLISH",
      category_id: 1,
      posted_at: "2022-07-06T09:18:33.246Z",
      is_recommendation: false,
      is_trending: false,
      total_visit: "0",
      createdAt: "2022-07-02T13:27:12.682Z",
      updatedAt: "2022-07-02T13:27:12.682Z",
      t_author: {
        id: 1,
        user_id: 3,
        author_name: "Akun Testing",
        createdAt: "2022-07-02T12:05:28.775Z",
        updatedAt: "2022-07-02T12:05:28.775Z",
      },
      t_news_category: {
        id: 1,
        category_name: "Peristiwa",
        status: true,
        description: "Kategori khusus peristiwa.",
        createdAt: "2022-07-02T08:51:21.062Z",
        updatedAt: "2022-07-02T08:51:21.062Z",
      },
    },
    likes: 0,
    comments: 0,
  });

  const [comments, setcomments] = useState([]);

  const [tagList, setTagList] = useState([]);

  const getNewsDetail = async () => {
    const result = await newsApi.getNewsDetail(params.id);
    if (result.status === "SUCCESS" && result.message === "SUCCESS") {
      await getCommentList(result.data.news.id);
      getlastestNewsList({
        category_id: result.data.news.category_id,
        status: "PUBLISH",
        limit: 5,
        offset: 0,
      });
      setnewsDetail(result.data);
      setTagList(result.data.tags);
    } else {
    }
    setisLoading(false);
  };

  const getCommentList = async (news_id) => {
    const result = await commentLikeApi.getCommentList(news_id);
    if (result.status === "SUCCESS" && result.message === "SUCCESS") {
      setcomments(result.data.comments);
      setnewsDetail({ ...newsDetail, comments: result.data.comments_count });
    } else {
    }
  };


  var iconStats = {
    fontSize: "24px",
  };

  const getLikeList = async (news_id) => {
    const result = await commentLikeApi.getLikeList(news_id);
    if (result.status === "SUCCESS" && result.message === "SUCCESS") {
      setnewsDetail({ ...newsDetail, likes: result.data.likes_count });
    } else {
    }
  };

  const handleLike = async () => {
    const result = await commentLikeApi.addLike({
      news_id: newsDetail.news.id,
      user_id: props.user.id,
    });
    if (result.status === "SUCCESS" && result.message === "SUCCESS") {
      await getLikeList(newsDetail.news.id);
    } else {
      if (result.message === "NOT_AUTHENTICATED") {
        toast.info("Silakan login untuk menyukai berita ini.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
        });
      } else {
        toast.error("Fitur like bermasalah.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
        });
      }
    }
  };

  return (<div>
          <Helmet>
            <title>{String(newsDetail.news.title || 'Loading...')} | caldera.id</title>
            <meta charset="utf-8" />
            <meta name="title" content={String(newsDetail.news.title || 'caldera.id').substring(0, 60)} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <meta name="description"
              content="Berita seputar batak, berita toba, adat batak, berita budaya batak, wisata danau toba" />

            <meta itemprop="name" content={String(newsDetail.news.title || 'caldera.id').substring(0, 60)} />
            <meta itemprop="image" content={getImage(String(newsDetail.news.image_url))} />
            <meta itemprop="description"
              content="Berita seputar batak, berita toba, adat batak, berita budaya batak, wisata danau toba" />

            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${window.location.origin}/${window.location.pathname}`} />
            <meta property="og:title" content={String(newsDetail.news.title || 'caldera.id').substring(0, 60)} />
            <meta property="og:image" content={getImage(String(newsDetail.news.image_url))} />
            <meta property="og:image:secure_url" content={getImage(String(newsDetail.news.image_url))} />
            <meta property="og:image:type" content="image/jpeg"/>
            <meta property="og:description"
              content="Berita seputar batak, berita toba, adat batak, berita budaya batak, wisata danau toba" />
            <meta property="og:image:width" content="450" />
            <meta property="og:image:height" content="298" />

            <meta property="twitter:card" content="summary_large_image"/>
            <meta property="twitter:url" content={`${window.location.origin}/${window.location.pathname}`} />
            <meta property="twitter:title" content={String(newsDetail.news.title || 'caldera.id').substring(0, 60)} />
            <meta property="twitter:description" content="Berita seputar batak, berita toba, adat batak, berita budaya batak, wisata danau toba"/>
            <meta property="twitter:image" content={getImage(String(newsDetail.news.image_url))} />
        </Helmet>
      <NavbarApp />
      <div className="py-5">
        <Container>
          {isLoading ? (
            <Row>
              <Col lg={{ span: 6, offset: 3 }}>
                <h3 className="text-center"><span><Spin indicator={antIcon} /></span> Sedang memuat berita...</h3>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col lg={{ span: 6, offset: 3 }}>
                <section>
                  <h3 className="fw-bold my-4">{newsDetail.news.title}</h3>
                  <h6 className="opacity-75">
                    Editor: {newsDetail.news.t_author.author_name} | Penulis: {newsDetail.news.origin_author_name}
                  </h6>
                  <h6 className="opacity-75">
                  {util.indonesiaFormat(newsDetail.news.posted_at)}
                  </h6>
                  <div className="d-flex justify-content-between my-md-4">
                    <p className="text-muted">
                    </p>
                    <ul className="list-unstyled inline">
                      <li>
                        <BiHeart
                          onClick={() => {
                            handleLike();
                          }}
                          className="text-info"
                          style={iconStats}
                        />{" "}
                        {newsDetail.likes}
                      </li>
                      <li>
                        <BiChat className="text-info" style={iconStats} />{" "}
                        {newsDetail.comments}
                      </li>
                      <li className="d-none d-md-block">
                        <FaShareAlt
                          className="text-info me-2"
                          style={{ ...iconStats, margin: "2px" }}
                          onClick={()=>{
                            toast.success("URL berita berhasil disalin.", {
                              position: "top-center",
                              autoClose: 3000,
                              hideProgressBar: true,
                              closeOnClick: true,
                              progress: undefined,
                            });
                            navigator.clipboard.writeText(getUrl(newsDetail.news.news_url));
                          }}
                        />
                        <FacebookShareButton
                          style={{ ...iconStats, margin: "2px" }}
                          url={getUrl(newsDetail.news.news_url)}
                          quote={newsDetail.news.title}
                          hashtag="#CalderaNews"
                          title={newsDetail.news.title}
                          
                        >
                          <FacebookIcon size={36} />
                        </FacebookShareButton>
                        <TwitterShareButton
                          style={{ ...iconStats, margin: "2px" }}
                          url={getUrl(newsDetail.news.news_url)}
                          quote={newsDetail.news.title}
                          hashtag="#CalderaNews"
                        >
                          <TwitterIcon size={36} />
                        </TwitterShareButton>
                        <WhatsappShareButton
                          style={{ ...iconStats, margin: "2px" }}
                          url={getUrl(newsDetail.news.news_url)}
                          quote={newsDetail.news.title}
                          hashtag="#CalderaNews"
                          forwardedRef
                        >
                          <WhatsappIcon size={36} />
                        </WhatsappShareButton>
                      </li>
                    </ul>
                  </div>
                  <div className="d-md-none mb-4 text-end">
                    <FaShareAlt
                      className="text-info me-2"
                      style={{ ...iconStats, margin: "2px" }}
                    />
                    <FacebookShareButton
                      style={{ ...iconStats, margin: "2px" }}
                      url={getUrl(newsDetail.news.news_url)}
                      quote={newsDetail.news.title}
                      hashtag="#CalderaNews"
                    >
                      <FacebookIcon size={36} />
                    </FacebookShareButton>
                    <TwitterShareButton
                      style={{ ...iconStats, margin: "2px" }}
                      url={getUrl(newsDetail.news.news_url)}
                      quote={newsDetail.news.title}
                      hashtag="#CalderaNews"
                    >
                      <TwitterIcon size={36} />
                    </TwitterShareButton>
                    <WhatsappShareButton
                      style={{ ...iconStats, margin: "2px" }}
                      url={getUrl(newsDetail.news.news_url)}
                      quote={newsDetail.news.title}
                      hashtag="#CalderaNews"
                    >
                      <WhatsappIcon size={36} />
                    </WhatsappShareButton>
                  </div>
                  <Container fluid="md">
                  <Row className="justify-content-md-center">
                    <Col>
                    <img 
                    alt='text' 
                    className="text-center self-content-center" 
                    src={getImage(newsDetail.news.image_url)}
                    style={{
                      maxWidth:"100%"
                    }}
                    />
                    </Col>
                  </Row>
                  </Container>
                 
                  <h6 className="opacity-75 mt-2 mb-5">
                    {newsDetail.news.image_desc}
                  </h6>
                  <div className="p-article mb-5">
                    <div
                      onCopy={(e) => {
                          e.preventDefault();
                          return false;
                      }}
                      dangerouslySetInnerHTML={{
                        __html: newsDetail.news.content,
                      }}
                    />
                  </div>
                </section>
                {
                  tagList.length > 0 ?
                  (<section>
                  <h4 className="fw-bold">Hashtag</h4>
                  {
                    tagList.map((e, index) => {
                      return(<Tag style={{background: 'linear-gradient(90deg, #eb5757 0%, #000000 100%)', color: 'white', fontSize: 'large'}} key={e.id}>#{e.t_tag.name}</Tag>)
                    })
                  }
                  </section>)
                  :
                  <></>
                }
                <hr />
                <section>
                  <h4 className="fw-bold">Baca Lainnya</h4>
                  <hr className="title mb-4" />
                  {lastestNewsList.length === 0 ? (
                    <div className="d-flex my-3">
                      <h6>Belum ada berita rekomendasi</h6>
                    </div>
                  ) : (
                    lastestNewsList.map((data, i) => (
                      <Link onClick={()=>{window.scrollTo(0, 0)}} to={`/article/${data.news_url}`} className="link" key={data.news_url}>
                        <div className="d-flex my-3" key={i}>
                          <div className="align-self-center">
                            <p className="fw-bold">{data.title}</p>
                            <ul className="list-unstyled stats">
                              <li className="text-dark">
                                <BiHeart style={iconStats} /> 
                                {data.total_likes}
                              </li>
                              <li className="text-dark">
                                <BiChat style={iconStats} />{" "}
                                {data.total_comment}
                              </li>
                              <li className="text-dark">
                                {data.posted_at
                                  ? util.indonesiaFormat(data.posted_at)
                                  : "-"}
                              </li>
                            </ul>
                          </div>
                          <div
                            style={{
                              backgroundImage: `url(${getImage(data.image_url)})`,
                            }}
                            className="post-img align-self-center"
                          />
                        </div>
                        <hr />
                      </Link>
                    ))
                  )}
                  <hr />
                  <h4 className="fw-bold mt-5">
                    {newsDetail.comments} Komentar
                  </h4>
                  <hr className="title mb-4" />
                  <SectionComment
                    comments={comments}
                    news_id={newsDetail.news.id}
                    user_id={3}
                    getCommentList={() => {
                      getCommentList(newsDetail.news.id);
                    }}
                  />
                </section>
              </Col>
            </Row>
          )}
        </Container>
      </div>
      <FooterApp />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(SingleArticle);
