import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Container, Row, Col, Card, Breadcrumb } from "react-bootstrap";
import FooterApp from "../../components/FooterApp";
import SectionComment from "./components/sectionComment";
import NavbarApp from "../../components/NavbarApp";

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

import moment from "moment";
import { toast } from "react-toastify";

import { connect } from "react-redux";

const categoryImageList = [
  "Beach",
  "danautoba",
  "indonesia",
  "sumatera",
  "holiday",
  "travelling",
  "food",
];
const getRandomImage = () => {
  return `https://source.unsplash.com/random/500/?${
    categoryImageList[(Math.random() * categoryImageList.length) | 0]
  }`;
};

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

  useEffect(() => {
    getNewsDetail();
  }, [params.id]);

  const [isLoading, setisLoading] = useState(true);

  const [newsDetail, setnewsDetail] = useState({
    news: {
      id: "ae7d6f62-fa0a-11ec-8c6d-cecd024eb8ee",
      author_id: 1,
      news_url: "220702-20-27-12_5-tempat-terbaik-di-sumut",
      title: "",
      image_url: null,
      content: "",
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

  return (
    <div>
      <NavbarApp />
      <div className="py-5">
        <Container>
          {isLoading ? (
            <Row>
              <Col lg={{ span: 6, offset: 3 }}>
                <h3>Sedang memuat berita...</h3>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col lg={{ span: 6, offset: 3 }}>
                <section>
                  <h3 className="fw-bold my-4">{newsDetail.news.title}</h3>
                  <h6 className="opacity-75">
                    Penulis: {newsDetail.news.t_author.author_name}
                  </h6>
                  <div className="d-flex justify-content-between my-md-4">
                    <p className="text-muted">
                      {moment(newsDetail.news.posted_at).format("DD/MM/YYYY")}
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
                        />
                        <FacebookShareButton
                          style={{ ...iconStats, margin: "2px" }}
                          url={`https://frontend-caldera-news.vercel.app/article/${newsDetail.news.news_url}`}
                          quote={newsDetail.news.title}
                          hashtag="#CalderaNews"
                        >
                          <FacebookIcon size={36} />
                        </FacebookShareButton>
                        <TwitterShareButton
                          style={{ ...iconStats, margin: "2px" }}
                          url={`https://frontend-caldera-news.vercel.app/article/${newsDetail.news.news_url}`}
                          quote={newsDetail.news.title}
                          hashtag="#CalderaNews"
                        >
                          <TwitterIcon size={36} />
                        </TwitterShareButton>
                        <WhatsappShareButton
                          style={{ ...iconStats, margin: "2px" }}
                          url={`https://frontend-caldera-news.vercel.app/article/${newsDetail.news.news_url}`}
                          quote={newsDetail.news.title}
                          hashtag="#CalderaNews"
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
                      url={`https://frontend-caldera-news.vercel.app/article/${newsDetail.news.news_url}`}
                      quote={newsDetail.news.title}
                      hashtag="#CalderaNews"
                    >
                      <FacebookIcon size={36} />
                    </FacebookShareButton>
                    <TwitterShareButton
                      style={{ ...iconStats, margin: "2px" }}
                      url={`https://frontend-caldera-news.vercel.app/article/${newsDetail.news.news_url}`}
                      quote={newsDetail.news.title}
                      hashtag="#CalderaNews"
                    >
                      <TwitterIcon size={36} />
                    </TwitterShareButton>
                    <WhatsappShareButton
                      style={{ ...iconStats, margin: "2px" }}
                      url={`https://frontend-caldera-news.vercel.app/article/${newsDetail.news.news_url}`}
                      quote={newsDetail.news.title}
                      hashtag="#CalderaNews"
                    >
                      <WhatsappIcon size={36} />
                    </WhatsappShareButton>
                  </div>
                  <Card style={cardStyle} />
                  <h6 className="opacity-75 mt-2 mb-5" hidden>
                    Random Dummy Photo Foto: dok. Unsplash
                  </h6>
                  <br />
                  <div className="p-article mb-5">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: newsDetail.news.content,
                      }}
                    />
                  </div>
                </section>
                <section>
                  <h4 className="fw-bold">Baca Lainnya</h4>
                  <hr className="title mb-4" />
                  {lastestNewsList.length === 0 ? (
                    <div className="d-flex my-3">
                      <h6>Belum ada berita rekomendasi</h6>
                    </div>
                  ) : (
                    lastestNewsList.map((data, i) => (
                      <Link to={`/article/${data.news_url}`} className="link">
                        <div className="d-flex my-3" key={i}>
                          <div className="align-self-center">
                            <p className="fw-bold">{data.title}</p>
                            <ul className="list-unstyled stats">
                              <li className="text-dark">
                                <BiHeart style={iconStats} /> {data.total_likes}
                              </li>
                              <li className="text-dark">
                                <BiChat style={iconStats} />{" "}
                                {data.total_comment}
                              </li>
                              <li className="text-dark">
                                {data.posted_at
                                  ? moment(data.posted_at).format("DD/MM/YYYY")
                                  : "-"}
                              </li>
                            </ul>
                          </div>
                          <div
                            style={{
                              backgroundImage: `url(${
                                data.image_url || getRandomImage()
                              })`,
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
