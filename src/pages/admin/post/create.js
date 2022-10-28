import React, { useState, useEffect, useRef } from "react";
import { Layout } from "antd";
import { Form, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import SidebarAdmin from "../layouts/Sider";
import CustomDropDownPenulis from '../components/CustomDropDownPenulis';
import TagCustom from '../components/TagCustom';

import { FilePond } from "react-filepond";

import { toast } from "react-toastify";

// api
import { newsApi } from "../../../api/api.news";

import { connect } from "react-redux";
import moment from "moment";


import { CKEditor } from 'ckeditor4-react';


const { Header, Content, Footer } = Layout;

function CreatePost(props) {
  
  const editor = useRef(null);

  const [newsCategory, setNewsCategory] = useState([]);

  const [tag, setTag] = useState([]);

  const [newsContent, setnewsContent] = useState({
    title: "",
    author_id: props.user.author_id,
    content: "",
    status: "DRAFT",
    file: null,
    category_id: 1,
    image_desc: '',
    is_recommendation: false,
    is_trending: false,
    origin_author_name: ''
  });

  const updateOriginAuthor = (origin_author_name) => {
    const payload = { ...newsContent, origin_author_name};
    setnewsContent(payload)
  }

  const getCategory = async () => {
    const result = await newsApi.getCategory();
    if (result.status === "SUCCESS" && result.message === "SUCCESS") {
      setNewsCategory(result.data);
    }
  };

  const upsertNews = async (sumbit_type) => {
    const payload = new FormData();
    payload.append("title", newsContent.title);
    payload.append("author_id", newsContent.author_id);
    payload.append("content", content);
    payload.append("status", sumbit_type);
    payload.append("image_desc", newsContent.image_desc);
    payload.append("is_recommendation", newsContent.is_recommendation);
    payload.append("is_trending", newsContent.is_trending);
    payload.append("origin_author_name", newsContent.origin_author_name);

    if (newsContent.file) {
      payload.append("file", newsContent.file);
    }

    if (tag.length > 0) {
      const list = [];
      tag.map((e) => {return list.push(e.value)});
      payload.append("tag_ids", JSON.stringify(list));
    }

    payload.append("category_id", newsContent.category_id);
    if (sumbit_type === "PUBLISH") {
      payload.append("posted_at", moment().format("YYYY-MM-DD HH:mm:ss"));
    }

    const result = await newsApi.upsertNews(payload);
    if (result.status === "SUCCESS" && result.message === "SUCCESS") {
      let message =
        sumbit_type === "PUBLISH"
          ? "Berhasil menyimpan dan mempublikasikan berita."
          : "Berhasil menyimpan berita sebagai draft.";
      toast.success(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });
      // window.location.href = "/admin/post";
    } else {
      toast.error("Gagal menyimpan berita.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });
    }
  };

  const handleSubmit = async (sumbit_type) => {
    if (sumbit_type === "CANCEL") {
    } else {
      await upsertNews(sumbit_type);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const [content, setContentNews] = useState('');

  const setContent =(content) => {
    setContentNews(String(content))
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
            <div className="mb-3 d-flex">
              <h3 className="w-100 text-center" style={{color: '#ce1127'}}>Buat Berita</h3>
            </div>
            <Row>
              <Col md={8}>
                <Form>
                  <Form.Group className="mb-4">
                    <Form.Label style={{color: '#ce1127'}}>Judul</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Tulis Judul Artikel"
                      value={newsContent.title}
                      onChange={(event) => {
                        setnewsContent({
                          ...newsContent,
                          title: event.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label style={{color: '#ce1127'}}>Kategori</Form.Label>
                    <Form.Select
                      onChange={(event) => {
                        setnewsContent({
                          ...newsContent,
                          category_id: event.target.value,
                        });
                      }}
                    >
                      {newsCategory.map((item, index) => {
                        return (
                          <option key={item.id} value={item.id}>
                            {item.category_name}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label style={{color: '#ce1127'}}>Gambar Utama Berita</Form.Label>
                    <br />
                    <FilePond
                      credits={""}
                      files={
                        typeof newsContent.file === "string" ||
                        !newsContent.file
                          ? newsContent.file
                          : [newsContent.file]
                      }
                      allowMultiple={false}
                      maxFiles={1}
                      acceptedFileTypes={["image/*"]}
                      instantUpload={false}
                      beforeAddFile={(item) => {
                        if (
                          newsContent.file === null ||
                          newsContent.file.size !== item.file.size
                        ) {
                          setnewsContent({
                            ...newsContent,
                            file: item.file,
                          });
                        }
                      }}
                      beforeRemoveFile={() => {
                        setnewsContent({
                          ...newsContent,
                          file: null,
                        });
                      }}
                      labelIdle='Silakan drag & drop file Anda atau <span class="filepond--label-action">Cari File</span>'
                      name="files"
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label style={{color: '#ce1127'}}>Deskripsi Gambar</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Tulis Deskripsi Gambar"
                      value={newsContent.image_desc}
                      onChange={(event) => {
                        setnewsContent({
                          ...newsContent,
                          image_desc: event.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label style={{color: '#ce1127'}}>Penulis</Form.Label> 
                    <div>
                      <CustomDropDownPenulis 
                      origin_author_name={newsContent.origin_author_name}
                      updateValue={(value) => {
                        updateOriginAuthor(value)
                      }}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-5">
                    <Form.Label style={{color: '#ce1127'}}>Isi Berita</Form.Label>
                    <div>
                    <CKEditor
                      // ref={editor}
                      editorUrl={`${window.location.origin}/ckeditor/ckeditor.js`}
                      onChange={(e)=>{
                          setContent(e.editor.getData());
                      }}
                    />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label style={{color: '#ce1127'}}>Hashtag</Form.Label> 
                    <div>
                      <TagCustom setTag = { (list) => { setTag(list); }} />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-5">
                    <Form.Label style={{color: '#ce1127'}}>Gambar Tambahan</Form.Label>
                    <p>Silakan simpan terlebih dahulu berita Anda untuk bisa mengupload gambar tambahan</p>
                  </Form.Group>
                  <Row>
                  <Col xs={12} md={4} className="my-2 my-md-0">
                    <Form.Check
                      label={`Berita Rekomendasi`}
                      id={`Berita Rekomendasi-default`}
                      checked={newsContent.is_recommendation}
                      onChange={()=>{
                        setnewsContent({
                          ...newsContent,
                          is_recommendation: !newsContent.is_recommendation,
                        });
                      }}
                    />
                  </Col>
                  <Col xs={12} md={4} className="my-2 my-md-0">
                    <Form.Check
                      label={`Berita Trending`}
                      id={`Berita Trending-default`}
                      checked={newsContent.is_trending}
                      onChange={()=>{
                        setnewsContent({
                          ...newsContent,
                          is_trending: !newsContent.is_trending,
                        });
                      }}
                    />
                  </Col>
                  </Row>
                  <br /><hr />
                  <Row>
                    <Col xs={12} md={4} className="my-2 my-md-0">
                      <Link onClick={()=>{window.scrollTo(0, 0)}} to={"/admin/post"}>
                        <Button
                          onClick={() => {
                            handleSubmit("CANCEL");
                          }}
                          variant="light"
                          className="me-3"
                        >
                          Batal
                        </Button>
                      </Link>
                    </Col>
                    <Col xs={12} md={4} className="my-2 my-md-0"
                    >
                      <Button
                        onClick={() => {
                          handleSubmit("DRAFT");
                        }}
                        variant="outline-primary"
                        className="me-3"
                      >
                        Simpan Sebagai Draft
                      </Button>
                    </Col>
                    <Col xs={12} md={4} className="my-2 my-md-0" hidden={!props.user.isAdmin}>
                      <Button
                        onClick={() => {
                          handleSubmit("PUBLISH");
                        }}
                        variant="primary"
                        className="me-3 px-5"
                      >
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
