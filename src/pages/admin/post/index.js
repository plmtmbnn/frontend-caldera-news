import React, {useState, useEffect} from "react";
import { Button, Layout, Space, Table, Tag } from "antd";

import SidebarAdmin from "../layouts/Sider";
import { Link } from "react-router-dom";

import {newsApi} from '../../../api/api.news';
import moment from "moment";

const { Header, Content, Footer } = Layout;

function AdminPost() {
  const [offset, setoffset] = useState(0);
  const [page, setpage] = useState(1);
  const [newsList, setnewsList] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    getNewsList();
  }, [page]);

  const getNewsList = async () => {
    let category_id = null;
    const result = await newsApi.getNewsList({category_id, limit: 10, offset});
    if(result.status === 'SUCCESS' && result.message === 'SUCCESS'){
      setnewsList(result.data);
    } else {
      setnewsList([]);
    }    
  }

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
            <Table             
            columns={
              [
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
                    defaultSortOrder: 'descend',
                    sorter: (a, b) => a.status.length - b.status.length,
                    render: (text) => <Tag color={text === 'PUBLISH' ? 'green' : 'volcano'} key={text}>{text}</Tag>,
                  },
                  {
                    title: "Kategori",
                    dataIndex: "category_name",
                    key: "category_name",
                    sorter: (a, b) => a.category_name.length - b.category_name.length,
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
                    render: (text) => <p>{moment(text).format('DD/MM/YYYY')}</p>,
                  },
                  {
                    title: "Action",
                    key: "action",
                    render: (_, record) => (
                      <Space size="middle">
                        <Link to={`/admin/post/detail/${record.news_url}`}>
                          <Button type="primary">Detail</Button>
                        </Link>
                      </Space>
                    ),
                  },                
              ]
            } dataSource={newsList} />
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

export default AdminPost;
