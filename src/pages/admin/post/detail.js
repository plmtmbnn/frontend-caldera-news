import React, { useState, useEffect, useRef } from "react";
import { Layout, Alert, Button } from "antd";
import { Form, Col, Row  } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import SidebarAdmin from "../layouts/Sider";
import { FilePond } from "react-filepond";

import CustomDropDownPenulis from '../components/CustomDropDownPenulis';
import TagCustom from '../components/TagCustom';
import WritingTipsModal from '../components/WritingTipsModal';

import { toast } from "react-toastify";

// api
import { newsApi } from "../../../api/api.news";

import { connect } from "react-redux";
import moment from "moment";

import 'jodit';
import 'jodit/build/jodit.min.css';
import JoditEditor from "jodit-react";

import newsImage from '../../../assets/news-image.jpg';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';

import {useNavigate} from 'react-router-dom';

const { Header, Content, Footer } = Layout;

function DetailPost(props) {
  const param = useParams();
  const editor = useRef(null);

  const navigate = useNavigate();

  const [loading, setloading] = useState(false);

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
    image_url: null,
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
      const savedTags = [];
      Array(...result.data.tags).map((e) => {
        savedTags.push({ 
          key: e.t_tag.id,
          value: e.t_tag.id,
          label: e.t_tag.name
        })
      });
      
      setnewsContent(result.data.news);
      setContent(result.data.news.content);
      setTag(savedTags);
    }
  };

  
  
  const getImagesGroup = async () => {
    const result = await newsApi.getImagesGroup(param.id);
    if (result.status === "SUCCESS" && result.message === "SUCCESS") {
      let currentFileList = [];
      if(result.data && result.data.images_count > 0) {
          //status: 'uploading', 'done', 'error'

          Array(...result.data.images).map((e, index) => {
            currentFileList.push(
              {
                uid: `-${index + 1}`,
                name: e.image_url,
                status: 'done',
                url: `${process.env.REACT_APP_API_END_POINT}/news/image/news/${e.image_url}`
              }
            );
          });
        setFileList(currentFileList);
      }
    } else {
    }
  };

  

  const upsertNews = async (sumbit_type) => {
    setloading(true);
    toast.info("Sedang diproses...", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
    });

    const payload = new FormData();

    if(props.user && props.user.isAuthor && !props.user.isAdmin){
      payload.append("author_id", newsContent.author_id);
      payload.append("status", sumbit_type === 'DRAFT' ? 'DRAFT' : 'REVIEW');
    } else {
      payload.append("status", sumbit_type);
    }
    payload.append("title", newsContent.title);
    payload.append("content", content);
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
      if(result.message === 'NOT_AUTHENTICATED'){
        toast.info("Sesi habis, silakan login kembali.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
        });

        if (typeof window !== 'undefined') {
        localStorage.setItem(
          "_CALDERA_",
          JSON.stringify({
            id: 3,
            full_name: "",
            email: "",
            avatar_url: "",
            created_at: "",
            isAdmin: false,
            isAuthor: false,
            token: "xxx",
          })
        );
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
    }
    setloading(false);
  };

  const handleSubmit = async (sumbit_type) => {
    if (sumbit_type === "CANCEL") {
    } else {
      await upsertNews(sumbit_type);
    }
  };

  const showNewsStatusAlert = () => {
      let type = 'success';

      switch (newsContent.status) {
        case 'PUBLISH':
          type = 'success';
          break;
        case 'DRAFT':
          type = 'warning';
          break;
        case 'REVIEW':
          type = 'info';
          break;
        case 'DECLINED':
          type = 'error';
          break;
      
        default:
          break;
      }

      return (<Alert message={`Status berita: ${newsContent.status}`} type={type} />)
  }

  const handleHidden = () => {
    let result = false;
    try {
      if(props.user && props.user.isAuthor && !props.user.isAdmin){
        if(newsContent.status === 'PUBLISH' ){
          result = true;
        }
      }
    } catch (error) {
      
    }
    return result;
  }

  const uploadAdditionalImage = async (file) => {
    toast.info("Sedang diproses...", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
    });

    const payload = new FormData();
    payload.append("file", file);
    payload.append("news_id", newsContent.id);

      const result = await newsApi.uploadAdditionalImage(payload);
    if (result.status === "SUCCESS" && result.message === "SUCCESS") {
      let message = 'Gambar tambahan berhasil diupload, silakan copy URL';
      toast.success(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });
    // return {
    //   "name": result.image_url,
    //   "status": "done",
    //   "url": `${process.env.REACT_APP_API_END_POINT}/news/image/news/${result.image_url}`,
    //   "thumbUrl": `${process.env.REACT_APP_API_END_POINT}/news/image/news/${result.image_url}`,
    //   };
    await getImagesGroup();
    } else {
      if(result.message === 'NOT_AUTHENTICATED'){
        toast.info("Sesi habis, silakan login kembali.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
        });
      } else {
      toast.error("Gagal mengupload gambar.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });
      }
    }
  };

  
const getImage = (image_url) => {
  if(image_url){
    const current = 
    `${process.env.REACT_APP_API_END_POINT}/news/image/news/${image_url}`;
    return(current);
  } else {
    return newsImage;
  }
};

const getBase64 = (file) =>
new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = () => {
    resolve(reader.result);
  };

  reader.onerror = (error) => {
    console.log('error', error);
    reject(error);
  };
});

  const [previewOpen, setPreviewOpen] = useState(false);
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewOpen(false);


  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  
  useEffect(() => {
    getNewsDetail();
    getCategory();
    getImagesGroup();
  }, []);

  const [contentEditor, setContentEditor] = useState(null);

  // useEffect(() => {
  //   setContent(newsContent.content);
  //   return () => {
  //     if (contentEditor) contentEditor.removeListener();
  //   };
  // }, [contentEditor, newsContent.content]);
  

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
                    <Form.Label style={{color: '#ce1127'}}>Judul Berita</Form.Label>
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
                    <Form.Label style={{color: '#ce1127'}}>Kategori Berita</Form.Label>
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
                    <Form.Label style={{color: '#ce1127'}}>Gambar Utama Berita</Form.Label>
                    <br />
                    <FilePond
                      credits={""}
                      files={
                        typeof newsContent.file === "string" ||
                        !newsContent.file
                          ?
                          getImage(newsContent.image_url)
                          : [newsContent.file]
                      }
                      maxFiles={1}
                      acceptedFileTypes={['image/*']}
                      beforeAddFile={(fileItems) => {
                          if(typeof fileItems.source !== 'string') {
                            setnewsContent({
                              ...newsContent,
                              file: fileItems.file
                            });
                          }
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
                    <Form.Label style={{color: '#ce1127'}}>Isi Berita <WritingTipsModal /></Form.Label>
                    <div>
                      <JoditEditor
                          value={content}
                          editorRef={editor}
                          tabIndex={1} // tabIndex of textarea
                          onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                          onChange={(newContent) => {}}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label style={{color: '#ce1127'}}>Hashtag</Form.Label> 
                    <div>
                      <TagCustom setTag = { (list) => { setTag(list); }} selectedTag={tag}/>
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-5">
                    <Form.Label style={{color: '#ce1127'}}>Gambar Tambahan</Form.Label>
                      <Upload
                        action={ async (file) => {
                          await uploadAdditionalImage(file);
                        }}
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={(e) => {
                          navigator.clipboard.writeText(e.url);
                          toast.success('URL gambar berhasil dicopy.', {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            progress: undefined,
                          });
                        }}
                        accept="image/png, image/jpeg"
                      >
                        {fileList.length >= 8 ? null : uploadButton}
                      </Upload>
                      <p style={{ fontSize: 10}}>Klik icon "preview" untuk meng-copy URL gambar</p>
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
                  <div className="mb-3">
                    {showNewsStatusAlert()}
                  </div>                  
                  <Row hidden={handleHidden()} className='d-flex justify-content-between'>
                    <Col xs={12} md={6} className="my-2 my-md-2 text-center">
                      <Link onClick={()=>{window.scrollTo(0, 0)}} to={"/admin/post"}>
                        <Button
                          onClick={() => {
                            handleSubmit("CANCEL");
                          }}
                          type="dashed"
                          className="me-3"
                        >
                          Batal
                        </Button>
                      </Link>
                    </Col>
                    <Col xs={12} md={6} className="my-2 my-md-2 text-center">
                      <Button
                        onClick={() => {
                          handleSubmit("DRAFT");
                        }}
                        className="me-3"
                        loading={loading}
                      >
                        Simpan Sebagai Draft
                      </Button>
                    </Col>
                    <hr />
                    <Col xs={12} md={12} className="my-2 my-md-2 text-center">
                      <Button
                        onClick={() => {
                          handleSubmit("PUBLISH");
                        }}
                        type="primary"
                        className="me-3 px-5"
                        loading={loading}
                      >
                        {
                        props.user && props.user.isAuthor && !props.user.isAdmin ?
                          'Simpan & Mulai Review Admin'
                          :
                          'Simpan & Publish'
                        }
                      </Button>
                    </Col>
                  </Row>
                  <div className="mb-3" hidden={!handleHidden()}>
                    <Alert message={"Berita sudah PUBLISH, hanya admin yang bisa mengubah."}/>
                  </div>
                </Form>
              </Col>
            </Row>
          </div>
        </Content>
        <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
          <img
            alt="example"
            style={{
              width: '100%',
            }}
          />
        </Modal>
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
