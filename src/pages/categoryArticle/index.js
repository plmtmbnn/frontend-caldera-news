/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import FooterApp from "../../components/FooterApp";
import NavbarApp from "../../components/NavbarApp";

// icons
import { BiChat, BiHeart } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";

// api
import {newsApi} from '../../api/api.news';
import moment from "moment";

import { Pagination } from 'antd';


function CategoryArticle() {
  const params = useParams();

  const [offset, setoffset] = useState(0);
  const [page, setpage] = useState(1);
  const [newsList, setnewsList] = useState([]);

  useEffect(() => {
    getNewsList();
  }, [params.id, page]);

  const getNewsList = async () => {
    let category_id = null;
    switch (params.id) {
      case 'peristiwa':
        category_id = 1;
        break;
      case 'parawisata':
        category_id = 2;
        break;
      case 'pertanian':
        category_id = 3;
        break;
    
      default:
        break;
    }
    const result = await newsApi.getNewsList({category_id, status: "PUBLISH", limit: 10, offset});
    if(result.status === 'SUCCESS' && result.message === 'SUCCESS'){
      setnewsList(result.data);
    } else {
      setnewsList([]);
    }
  }

  const showCategoryName = (name) => {
    let result = null;
    switch (name) {
      case 'peristiwa':
        result = 'Peristiwa';
        break;
      case 'parawisata':
        result = 'Parawisata/Budaya';
        break;
      case 'pertanian':
        result = 'Pertanian';
        break;
    
      default:
        break;
    }
    return result;
  } 

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
            <Col md={8}>
              <Row>
                <Col xs>
                  <h4 className="mb-5">Berita Khusus <span className="fw-bold" style={{ color: '#ce1127'}}>{showCategoryName(params.id)}</span></h4>
                  <hr />
                </Col>
              </Row>
              {
              newsList.length === 0 ?
              <Row><h4>Tidak ada berita...</h4></Row>
              :
              newsList.map((data, i) => (
                <>
                  <Link to={`/article/${data.news_url}`} className="link" key={i}>
                    <div className="d-flex my-3">
                      <div className="align-self-center">
                        <p className="fw-bold text-black">{data.title}</p>                        
                        <ul className="list-unstyled stats">
                          <li className="text-dark">
                            <BiHeart style={iconStats} /> {parseInt(data.total_likes)}
                          </li>
                          <li className="text-dark">
                            <BiChat style={iconStats} /> {parseInt(data.total_comment)}
                          </li>
                          <li className="text-dark">{moment(data.posted_at).format('DD/MM/YYYY')}</li>
                        </ul>
                      </div>
                      <div
                        style={{
                          backgroundImage: `url(${data.img || 'https://source.unsplash.com/random/500/?seaport'})`,
                          ...imgFeed,
                        }}
                        className="post-img align-self-center"
                      />
                    </div>
                  </Link>
                  <hr />
                </>
              ))}
            </Col>
          </Row>
          <Row>
          <Col>
          <Pagination 
          defaultCurrent={offset} 
          defaultPageSize={10} 
          total={newsList.length}
          onChange={(page, pageSize) => {
            setpage(page);
            if(page === 1){
              setoffset(0);
            } else {
              setoffset((page * 10));
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