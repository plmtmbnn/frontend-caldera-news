import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Container, Row, Col, Card, Breadcrumb } from "react-bootstrap";
import FooterApp from "../../components/FooterApp";
import SectionComment from "./components/sectionComment";
import NavbarApp from "../../components/NavbarApp";

// icons
import { BiChat, BiHeart } from "react-icons/bi";
import { FaWhatsapp, FaShareAlt } from "react-icons/fa";

// api
import {newsApi} from '../../api/api.news';
import {commentLikeApi} from '../../api/api.comment-likes';

import moment from "moment";


function SingleArticle() {
  const params = useParams();
  
  useEffect(() => {
    getNewsDetail();
  }, [params.id]);

  const [isLoading, setisLoading] = useState(true);

  const [newsDetail, setnewsDetail] = useState({
      "news":{
         "id":"ae7d6f62-fa0a-11ec-8c6d-cecd024eb8ee",
         "author_id":1,
         "news_url":"220702-20-27-12_5-tempat-terbaik-di-sumut",
         "title":"",
         "image_url":null,
         "content":"",
         "status":"PUBLISH",
         "category_id":1,
         "posted_at":"2022-07-06T09:18:33.246Z",
         "is_recommendation":false,
         "is_trending":false,
         "total_visit":"0",
         "createdAt":"2022-07-02T13:27:12.682Z",
         "updatedAt":"2022-07-02T13:27:12.682Z",
         "t_author":{
            "id":1,
            "user_id":3,
            "author_name":"Akun Testing",
            "createdAt":"2022-07-02T12:05:28.775Z",
            "updatedAt":"2022-07-02T12:05:28.775Z"
         },
         "t_news_category":{
            "id":1,
            "category_name":"Peristiwa",
            "status":true,
            "description":"Kategori khusus peristiwa.",
            "createdAt":"2022-07-02T08:51:21.062Z",
            "updatedAt":"2022-07-02T08:51:21.062Z"
         }
      },
      "likes":0,
      "comments":0
  });

  const [comments, setcomments] = useState([]);

  const getNewsDetail = async () => {   
    const result = await newsApi.getNewsDetail(params.id);
    if(result.status === 'SUCCESS' && result.message === 'SUCCESS'){
      await getCommentList(result.data.news.id);
      setnewsDetail(result.data);
    } else {
    }
    setisLoading(false);
  }

  const getCommentList = async (news_id) => {   
    const result = await commentLikeApi.getCommentList(news_id);
    if(result.status === 'SUCCESS' && result.message === 'SUCCESS'){
      setcomments(result.data.comments);
      setnewsDetail({...newsDetail, comments: result.data.comments_count});
    } else {
    }
  }

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
          {
            isLoading ?
            <Row>
              <Col md={{ span: 6, offset: 3 }}>
                <h3>Sedang memuat berita...</h3>
              </Col>
            </Row>
            :
            <Row>
              <Col md={{ span: 6, offset: 3 }}>
                <section>
                  <h3 className="fw-bold my-4">
                    {newsDetail.news.title}
                  </h3>
                  <h6 className="opacity-75">
                    Ditulis oleh: {newsDetail.news.t_author.author_name}
                  </h6>
                  <div className="d-flex justify-content-between my-4">
                    <p className="text-muted">
                      {moment(newsDetail.news.posted_at).format('DD/MM/YYYY HH:mm')}
                    </p>                  
                    <ul className="list-unstyled inline">
                      <li>
                        <BiHeart onClick={() => {alert('LIKE')}} className="text-info" style={iconStats} /> {newsDetail.likes}
                      </li>
                      <li>
                        <BiChat className="text-info" style={iconStats} /> {newsDetail.comments}
                      </li>
                      <li>
                        <FaShareAlt className="text-info" style={iconStats} />
                      </li>
                    </ul>
                  </div>
                  <Card style={cardStyle} />
                  <h6 className="opacity-75 mt-2 mb-5" hidden>
                    Random Dummy Photo Foto: dok. Unsplash
                  </h6>
                  <div className="p-article mb-5">
                    <p>
                      {
                        newsDetail.news.content
                      }
                    </p>
                  </div>
                </section>
                <section>
                  <h4 className="fw-bold" hidden>Baca Lainnya</h4>
                  <hr className="title mb-4" hidden/>
                  {commonPost.map((data, i) => (
                    <div hidden>
                      <div className="d-flex my-3" key={i} hidden>
                        <div className="align-self-center">
                          <p className="fw-bold">{data.headline}</p>
                          <h6 className="text-muted fw-normal">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris.
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
                    </div>
                  ))}
                  <hr />
                  <h4 className="fw-bold mt-5">{newsDetail.comments} Komentar</h4>
                  <hr className="title mb-4" />
                  <SectionComment comments={comments} news_id={newsDetail.id} user_id={3}/>
                </section>
              </Col>
            </Row>
          }
        </Container>
      </div>
      <FooterApp />
    </div>
  );
}

export default SingleArticle;
