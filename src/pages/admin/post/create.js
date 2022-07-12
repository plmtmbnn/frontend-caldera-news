import React, { useState, useEffect, useRef } from "react";
import { Layout } from "antd";
import { Form, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import SidebarAdmin from "../layouts/Sider";
import { FilePond } from 'react-filepond';

import JoditEditor from "jodit-react";
import { toast } from 'react-toastify';

// api
import {newsApi} from '../../../api/api.news';

import { connect } from "react-redux";
import moment from "moment";

const { Header, Content, Footer } = Layout;

function CreatePost(props) {
  const editor = useRef(null);

  const [newsCategory, setNewsCategory] = useState([]); 

  const [newsContent, setnewsContent] = useState({
    title: '',
    author_id: props.user.author_id,
    content: "",
    status: 'DRAFT',
    file: null,
    category_id: 1
  });

  const getCategory = async () => {
    const result = await newsApi.getCategory();
    if(result.status === 'SUCCESS' && result.message === 'SUCCESS'){
      setNewsCategory(result.data);
    }
  }

  const upsertNews = async (sumbit_type) => {
    const payload = new FormData();
    payload.append("title", newsContent.title);
    payload.append("author_id", newsContent.author_id);
    payload.append("content", newsContent.content);
    payload.append("status", sumbit_type);
    if(newsContent.file){
      payload.append("file", newsContent.file);
    }
    payload.append("category_id", newsContent.category_id);
    if(sumbit_type === 'PUBLISH'){
      payload.append("posted_at", moment().format('YYYY-MM-DD HH:mm:ss'));
    }
    
    const result = await newsApi.upsertNews(payload);
    if(result.status === 'SUCCESS' && result.message === 'SUCCESS'){
      let message = sumbit_type === 'PUBLISH' ? 
      'Berhasil menyimpan dan mempublikasikan berita.' : 'Berhasil menyimpan berita sebagai draft.';
      toast.success(message , {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        });
    } else {
      toast.error('Gagal menyimpan berita.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        });
    }
  }

  const handleSubmit = async (sumbit_type) => {
    if(sumbit_type === 'CANCEL') {
    } else {
      await upsertNews(sumbit_type);   
    }
  }

  useEffect(() => {
    getCategory();
  }, []);

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
            <div className="mb-3 d-flex">
              <h4 className="w-100">Buat Berita</h4>
            </div>
            <Row>
              <Col md={8}>
                <Form>
                  <Form.Group className="mb-4">
                    <Form.Label>Judul</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Tulis Judul Artikel"
                      value={newsContent.title}
                      onChange={(event) => {
                        setnewsContent({
                            ...newsContent,
                            title: event.target.value
                        });
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Kategori</Form.Label>
                      <Form.Select 
                      onChange={(event) => {
                        setnewsContent({
                            ...newsContent,
                            category_id: event.target.value
                        });
                      }}
                      >
                        {
                          newsCategory.map((item, index) => {
                            return (<option key={item.id} value={item.id}>{item.category_name}</option>);
                          })
                        }
                      </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Gambar Utama Berita</Form.Label>
                    <br />
                    <FilePond
                        credits={""}
                        files={
                          typeof newsContent.file === "string" ||
                          !newsContent.file
                            ? newsContent.file
                            :
                            [newsContent.file]
                        }
                        allowMultiple={false} 
                        maxFiles={1}
                        acceptedFileTypes={"image/*"}
                        instantUpload={false}
                        beforeAddFile={(item) => {
                          if (
                            newsContent.file === null ||
                            newsContent.file.size !== item.file.size
                          ) {
                            setnewsContent({
                              ...newsContent,
                              file: item.file
                            });
                          }                        
                          }
                        }
                        beforeRemoveFile={() => {
                          setnewsContent({
                            ...newsContent,
                            file: null
                          });
                        }}
                        labelIdle='Silakan drag & drop file Anda atau <span class="filepond--label-action">Cari File</span>'
                        name="files"
                    />
                  </Form.Group>
                  <Form.Group className="mb-5">                  
                    <Form.Label>Isi Berita</Form.Label>
                    <div>
                      <JoditEditor
                        ref={editor}
                        value={newsContent.content}
                        config={{
                          height: '450px',
                          readonly: false,
                          placeholder: 'Mulai menulis berita...',                          
                        }}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={newContent => {
                          setnewsContent({
                            ...newsContent,
                            content: newContent
                          })
                        }}
                    />
                    </div>
                   </Form.Group>                  
                  <Row>
                    <Col>
                        <Link to={'/admin/post'}>
                        <Button onClick={() => {
                          handleSubmit("CANCEL");
                        }} variant="light" className="me-3">
                          Batal
                        </Button>
                        </Link>
                    </Col>
                    <Col>
                      <Button onClick={() => {
                        handleSubmit("DRAFT");
                      }} variant="outline-primary" className="me-3">
                        Simpan Sebagai Draft
                      </Button>
                    </Col>
                    <Col>
                      <Button onClick={() => {
                        handleSubmit("PUBLISH");
                      }} variant="primary" className="me-3 px-5">
                        Simpan & Publish
                      </Button>                        
                    </Col>          
                  </Row>
                </Form>
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

export default connect(mapStateToProps)(CreatePost);