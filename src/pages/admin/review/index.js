import React, { useState, useEffect } from "react";

import {Layout, Space, Table, Tag } from "antd";
import {Button, FormControl, Row, Col, FormGroup, FormLabel, FormSelect} from 'react-bootstrap';

import SidebarAdmin from "../layouts/Sider";
import { Link } from "react-router-dom";

import { newsApi } from "../../../api/api.news";
import moment from "moment";

import { connect } from "react-redux";

const { Header, Content, Footer } = Layout;

function ReviewNews(props) {
  const [offset, setoffset] = useState(0);
  const [page, setpage] = useState(1);
  const [newsList, setnewsList] = useState([]);
  const [newsCategory, setNewsCategory] = useState([]);
  const [category_id, setcategory_id] = useState(null);


  const [title, settitle] = useState("");

  const getCategory = async () => {
    const result = await newsApi.getCategory();
    if (result.status === "SUCCESS" && result.message === "SUCCESS") {
      setNewsCategory(result.data);
    }
  };

  useEffect(() => {
    getNewsList();
    getCategory();
  }, [page, category_id]);

  const getNewsList = async () => {
    let payload = {
      limit: 10,
      offset,
      status: 'REVIEW'
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

    const result = await newsApi.getNewsList(payload);
    if (result.status === "SUCCESS" && result.message === "SUCCESS") {
      setnewsList(result.data);
    } else {
      setnewsList([]);
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
              <Link to="/admin/post/create">
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
              </Row>              
            </div>
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
              scroll={{ x: 980 }}
              columns={[
                {
                  title: "Judul",
                  dataIndex: "title",
                  key: "title",
                  render: (text) => <p>{text}</p>,
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
                {
                  title: "Kunjungan",
                  dataIndex: "total_visit",
                  key: "total_visit",
                  sorter: (a, b) => a.total_visit - b.total_visit,
                  render: (text) => <p>{text}</p>,
                },
                {
                  title: "Tgl Update",
                  dataIndex: "updated_at",
                  key: "updated_at",
                  render: (text) => <p>{moment(text).format("DD MMM YYYY")}</p>,
                },
                {
                  title: "Action",
                  key: "action",
                  render: (_, record) => (
                    <Space size="middle">
                      <Link to={`/admin/post/detail/${record.id}`} target="_blank" rel="noopener noreferrer">
                        <Button type="primary">Detail</Button>
                      </Link>
                    </Space>
                  ),
                },
              ]}
              dataSource={newsList}
            />
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

export default connect(mapStateToProps)(ReviewNews);