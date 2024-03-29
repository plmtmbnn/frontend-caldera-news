import React, { useState, useEffect } from "react";

import {Layout, Space, Table, Tag, Pagination, Button as ButtonAntd } from "antd";
import {Button, FormControl, Row, Col, FormGroup, FormLabel, FormSelect} from 'react-bootstrap';

import SidebarAdmin from "../layouts/Sider";
import { Link } from "react-router-dom";

import { newsApi } from "../../../api/api.news";
import moment from "moment";

import { connect } from "react-redux";

const { Header, Content, Footer } = Layout;

const options = [
  {
    value: 'Trending',
  },
  {
    value: 'Rekomendasi'
  }
];

function AdminPost(props) {
  const [offset, setoffset] = useState(0);
  const [page, setpage] = useState(1);
  const [newsList, setnewsList] = useState([]);
  const [newsCategory, setNewsCategory] = useState([]);
  const [category_id, setcategory_id] = useState(null);
  const [status, setstatus] = useState(null);
  const [count, setcount] = useState(0);

  const [title, settitle] = useState("");

  const [newsType, setnewsType] = useState("SEMUA");

  const getCategory = async () => {
    const result = await newsApi.getCategory();
    if (result.status === "SUCCESS" && result.message === "SUCCESS") {
      setNewsCategory(result.data);
    }
  };

  const deleteNews = async (news_id) => {
    const result = await newsApi.deleteNews(news_id);
    if (result.status === "SUCCESS" && result.message === "SUCCESS") {
      await getNewsList();
    }
  };

  useEffect(() => {
    getNewsList();
    getCategory();
  }, []);

  useEffect(() => {
    getNewsList();
  }, [page, category_id, newsType, status]);

  const getNewsList = async () => {    
    let payload = {
      limit: 10,
      offset,
    };

    if(props.user && props.user.isAuthor && !props.user.isAdmin){
      payload.author_id = props.user.author_id;
    }
    
    if(title && title !== ''){
      payload.title = title;
    }

    if(category_id && category_id !== 'Semua'){
      payload.category_id = category_id;
    }
    payload.newsType = newsType;
    
    if(status && status !== 'Semua'){
      payload.status = status;
    }

    const result = await newsApi.getNewsList(payload);
    if (result.status === "SUCCESS" && result.message === "SUCCESS") {
      setnewsList(result.data);
      setcount(result.count);
    } else {
      setnewsList([]);
      setcount(0);
    }
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <SidebarAdmin />
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <div className="mb-5 d-flex">
              <h4 className="w-100">Daftar Berita</h4>
              <Link onClick={()=>{window.scrollTo(0, 0)}} to="/admin/post/create">
                <Button type="primary" className="float-end">
                  Buat Berita Baru
                </Button>
              </Link>
            </div>
            <div className="mb-1 d-flex">
              <Row>
                <Col>
                  <FormGroup>
                    <FormLabel>Judul Berita</FormLabel>
                    <FormControl 
                      placeholder="Cari judul berita..." 
                      onChange={(e)=>{
                        settitle(e.target.value);
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col>
                <FormGroup>
                    <FormLabel>Tipe</FormLabel>
                    <FormSelect
                      onChange={(event) => {setnewsType(event.target.value);}}
                    >
                      <option
                            selected={"SEMUA" === newsType}
                            key={"SEMUA"}
                            value={"SEMUA"}
                          >
                            Semua
                      </option>
                      <option
                            selected={'TRENDING' === newsType}
                            key={'TRENDING'}
                            value={'TRENDING'}
                          >
                            Berita Trending / Utama
                      </option>
                      <option
                            selected={'REKOMENDASI' === category_id}
                            key={'REKOMENDASI'}
                            value={'REKOMENDASI'}
                          >
                            Berita Rekomendasi
                      </option>                                            
                    </FormSelect>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                      <FormLabel>Kategori Berita</FormLabel>
                      <FormSelect
                        onChange={(event) => {setcategory_id(event.target.value);}}
                      >
                        <option
                              selected={null === category_id}
                              key={null}
                              value={null}
                            >
                              Semua
                        </option>
                        {newsCategory.map((item, index) => {
                          return (
                            <option
                              selected={item.id === category_id}
                              key={item.id}
                              value={item.id}
                            >
                              {item.category_name}
                            </option>
                          );
                        })}
                      </FormSelect>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                      <FormLabel>Status Berita</FormLabel>
                      <FormSelect
                        onChange={(event) => {setstatus(event.target.value);}}
                      >
                        <option
                              selected={null === status}
                              key={null}
                              value={null}
                            >
                              Semua
                        </option>
                        <option
                              selected={'DRAFT' === status}
                              key={'DRAFT'}
                              value={'DRAFT'}
                            >
                              DRAFT
                        </option>
                        <option
                              selected={"REVIEW" === status}
                              key={"REVIEW"}
                              value={"REVIEW"}
                            >
                              REVIEW
                        </option>
                        <option
                              selected={'PUBLISH' === status}
                              key={'PUBLISH'}
                              value={'PUBLISH'}
                            >
                              PUBLISH
                        </option>
                      </FormSelect>
                  </FormGroup>
                </Col>
              </Row>              
            </div>
            <br />
            <div>
              <Button
                onClick={ async ()=> {
                  await getNewsList();
                }}
                variant="primary"
              >Cari</Button>
            </div>          
            <hr />
            <Table
              pagination={false}
              scroll={{ x: 980 }}
              columns={[
                {
                  title: "Judul",
                  dataIndex: "title",
                  key: "title",
                  render: (text, e) => {
                    return(
                      <Link 
                      style={{
                    'text-decoration': 'none', 'border-bottom':'1px solid #af504c'
                    }}
                      onClick={()=>{window.scrollTo(0, 0)}} to={`/admin/post/detail/${e.id}`} rel="noopener noreferrer">
                      <p style={{color: 'black', 
                    'text-decoration': 'none'
                    }} type="link" block>{text}</p>
                    </Link>)},
                },
                {
                  title: "Keterangan",
                  dataIndex: "title",
                  key: "title",
                  render: (text, e) => {

                    return(<div>
                      <Tag hidden={!e.is_trending} color="#f50">Trending</Tag>
                      <Tag hidden={!e.is_recommendation} color="#2db7f5">Rekomendasi</Tag>
                    </div>);
                  },
                },
                {
                  title: "Status",
                  dataIndex: "status",
                  key: "status",
                  defaultSortOrder: "descend",
                  sorter: (a, b) => a.status.length - b.status.length,
                  render: (text) => (
                    <Tag
                      color={text === "PUBLISH" ? "green" : "volcano"}
                      key={text}
                    >
                      {text}
                    </Tag>
                  ),
                },
                {
                  title: "Kategori",
                  dataIndex: "category_name",
                  key: "category_name",
                  sorter: (a, b) =>
                    a.category_name.length - b.category_name.length,
                  render: (text) => <p>{text}</p>,
                },
                {
                  title: "Komentar",
                  dataIndex: "total_comment",
                  key: "total_comment",
                  sorter: (a, b) => a.total_comment - b.total_comment,
                  render: (text) => <p>{text}</p>,
                },
                {
                  title: "Like",
                  dataIndex: "total_likes",
                  key: "total_likes",
                  sorter: (a, b) => a.total_likes - b.total_likes,
                  render: (text) => <p>{text}</p>,
                },
                // {
                //   title: "Kunjungan",
                //   dataIndex: "total_visit",
                //   key: "total_visit",
                //   sorter: (a, b) => a.total_visit - b.total_visit,
                //   render: (text) => <p>{text}</p>,
                // },
                {
                  title: "Tanggal",
                  dataIndex: "updated_at",
                  key: "updated_at",
                  sorter: (a, b) => moment(a.updated_at).unix() - moment(b.updated_at).unix(),
                  render: (text) => <p>{moment(text).format("DD MMM YYYY")}</p>,
                },
                {
                  title: "Action",
                  key: "action",
                  render: (_, record) => (
                    <Space size="middle">
                      <Link onClick={()=>{window.scrollTo(0, 0)}} to={`/admin/post/detail/${record.id}`} rel="noopener noreferrer">
                        <Button variant="outline-primary">Detail</Button>
                      </Link>
                        <Button 
                        hidden={_.status === "PUBLISH"}
                        variant="primary" onClick={async (e)=> {
                          await deleteNews(_.id)
                        }}>Hapus</Button>
                    </Space>
                  ),
                },
              ]}
              dataSource={newsList}
            />
            <br />
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
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Caldera ©2022
        </Footer>
      </Layout>
    </Layout>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(AdminPost);