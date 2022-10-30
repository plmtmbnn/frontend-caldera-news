import React, { useState, useEffect, useRef } from "react";
import { Layout } from "antd";
import { Form, Button, Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import SidebarAdmin from "../layouts/Sider";
import { FilePond } from "react-filepond";

import { toast } from "react-toastify";

import 'jodit';
import 'jodit/build/jodit.min.css';
import JoditEditor from "jodit-react";

import CustomDropDownPenulis from '../components/CustomDropDownPenulis';
import TagCustom from '../components/TagCustom';
import WritingTipsModal from '../components/WritingTipsModal';

// api
import { newsApi } from "../../../api/api.news";

import { connect } from "react-redux";
import moment from "moment";

import {useNavigate} from 'react-router-dom';

const { Header, Content, Footer } = Layout;

function DetailPost(props) {
  const param = useParams();
  const editor = useRef(null);
  const navigate = useNavigate();

  const [tag, setTag] = useState([]);

  const [newsCategory, setNewsCategory] = useState([]);

  const [newsContent, setnewsContent] = useState({
    title: "",
    author_id: props.user.author_id,
    content: "<div></div>",
    status: "DRAFT",
    file: null,
    category_id: 1,
    news_id: null,
    image_desc: '',
    is_recommendation: false,
    is_trending: false,
    origin_author_name: '',
    id: ''
  });

  const [content, setContentNews] = useState('<div></div>');

  const setContent =(value) => {
    setContentNews(String(value));
  }

  const updateOriginAuthor = (origin_author_name) => {
    setnewsContent({ ...newsContent, origin_author_name})
  }

  const getCategory = async () => {
    const result = await newsApi.getCategory();
    if (result.status === "SUCCESS" && result.message === "SUCCESS") {
      setNewsCategory(result.data);
    }
  };

  const getNewsDetail = async () => {
    const result = await newsApi.getNewsDetailById(param.id);
    if (result.status === "SUCCESS" && result.message === "SUCCESS") {
      setnewsContent(result.data.news);
      setContent(result.data.news.content);
      const savedTags = [];
      Array(...result.data.tags).map((e) => {
        savedTags.push({ 
          key: `${e.t_tag.id}`,
          value: e.t_tag.id,
          children: e.t_tag.name
        })
      });
      setTag(savedTags);
    } else {
    }
  };

  useEffect(() => {
    getNewsDetail();
  }, [param.id]);

  const [contentEditor, setContentEditor] = useState(null);

  useEffect(() => {
    setContent(newsContent.content);
    return () => {
      if (contentEditor) contentEditor.removeListener();
    };
  }, [contentEditor, newsContent.content]);

  const upsertNews = async (sumbit_type) => {
    toast.info("Sedang diproses...", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
    });

    const payload = new FormData();
    payload.append("title", newsContent.title);
    payload.append("author_id", newsContent.author_id);
    payload.append("content", content);
    payload.append("status", sumbit_type);
    payload.append("category_id", newsContent.category_id);
    payload.append("image_desc", newsContent.image_desc);
    payload.append("origin_author_name", newsContent.origin_author_name);
    payload.append("is_recommendation", newsContent.is_recommendation);
    payload.append("is_trending", newsContent.is_trending);

    if (newsContent.file) {
      payload.append("file", newsContent.file);
    }
    if (newsContent.id) {
      payload.append("news_id", newsContent.id);
    }
    if (sumbit_type === "PUBLISH") {
      payload.append("posted_at", moment().format("YYYY-MM-DD HH:mm:ss"));
    }

    if (tag.length > 0) {
      const list = [];
      tag.map((e) => {return list.push(e.value)});
      payload.append("tag_ids", JSON.stringify(list));
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

      if(sumbit_type === "PUBLISH"){
        navigate("/admin/post");
      }
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
                    <Form.Label>Judul</Form.Label>
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
                    <Form.Label>Kategori</Form.Label>
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
                          <option
                            selected={item.id === newsContent.category_id}
                            key={item.id}
                            value={item.id}
                          >
                            {item.category_name}
                          </option>
                        );
                      })}
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
                          : [newsContent.file]
                      }
                      acceptedFileTypes={['image/*', 'audio/*', 'video/*']}
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
                    <Form.Label>Deskripsi Gambar</Form.Label>
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
                    <Form.Label>Isi Berita <WritingTipsModal /></Form.Label>
                    <div>
                      <JoditEditor
                          value={content}
                          editorRef={editor}
                          tabIndex={1} // tabIndex of textarea
                          onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                          onChange={(newContent) => {}}
                          key={newsContent.news_id}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label style={{color: '#ce1127'}}>Hashtag</Form.Label> 
                    <div>
                      <TagCustom setTag = { (list) => { setTag(list); }} selectedTag = {tag} key={newsContent.news_id}/>
                    </div>
                  </Form.Group>
                  <Row>
                  <Form.Label style={{color: '#ce1127'}}>Untuk memasukan berita sebagai Berita Rekomendasi / Berita Trending silakan ceklis salah satu atau keduanya</Form.Label>
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
                    <Col xs={12} md={4} className="my-2 my-md-0">
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
                    <Col xs={12} md={4} className="my-2 my-md-0">
                      <Button
                        onClick={() => {
                          handleSubmit("PUBLISH");
                        }}
                        variant="primary"
                        className="me-3 px-5"
                      >
                        Simpan &amp; Publish
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

export default connect(mapStateToProps)(DetailPost);
