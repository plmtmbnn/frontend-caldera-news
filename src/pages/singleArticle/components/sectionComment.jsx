import React, {useState} from "react";
import { Avatar, Comment, Form, Button, Input, Tooltip } from "antd";

import {commentLikeApi} from '../../../api/api.comment-likes';

import { toast } from 'react-toastify';

import util from '../../../helper/util';

import { connect } from "react-redux";


const { TextArea } = Input;

const CommentItem = ({commentDetail, deleteComment, user}) => (
  <Comment
    author={commentDetail.t_user.full_name}
    avatar={<Avatar src="https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?b=1&k=20&m=1300845620&s=170667a&w=0&h=JbOeyFgAc6-3jmptv6mzXpGcAd_8xqkQa_oUK2viFr8=" alt="Han Solo" />}
    content={<p>{commentDetail.comment}</p>}
    datetime={util.indonesiaFormat(commentDetail.createdAt)}
    // children={<Button type="link">Hapus</Button>}
    actions={
      user.isAuthor && user.isAdmin ?
      [
        <Tooltip key="comment-basic-like" title="hapus">
      <span onClick={async (e)=> {
        await deleteComment(commentDetail.id);
        console.log('e', commentDetail);
        }}>
        hapus
      </span>
    </Tooltip>,
      ]
      :
      []
    }
  >
  </Comment>
);

const Editor = ({ onChange, onSubmit, submitting, value , user }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Tambahkan Komentar
      </Button>          
    </Form.Item>
  </>
);

const SectionComment = ({comments, news_id, user_id, getCommentList, user}) => {

  const [comment, setcomment] = useState("");
const submitComment = async () => {
  try {
    const payload = { comment, news_id, user_id };
    const result = await commentLikeApi.addComment(payload);
    if(result.status === 'SUCCESS' && result.message === 'SUCCESS') {
      toast.success('Berhasil menambahkan komentar.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        });
        setcomment("");
        getCommentList();
    } else {
      if(result.message === 'NOT_AUTHENTICATED') {
        toast.info('Silakan login untuk menambahkan komentar.', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          });
      } else {
        toast.error('Gagal menambahkan komentar.', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          });
      }
    }
  } catch (error) {
    
  }
}

const deleteComment = async (comment_id) => {
  try {
    const result = await commentLikeApi.deleteComment(comment_id);
    if(result.status === 'SUCCESS' && result.message === 'SUCCESS') {
      toast.success('Berhasil menghapus komentar.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        });
        getCommentList();
    } else {
      if(result.message === 'NOT_AUTHENTICATED') {
        toast.info('Silakan login untuk menghapus komentar.', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          });
      } else {
        toast.error('Gagal menghapus komentar.', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          });
      }
    }
  } catch (error) {
    
  }
}

return(
  <>
    {
      Array(...comments).map((item, index) => {
        return(<CommentItem commentDetail={item} key={index} deleteComment={(comment_id) => deleteComment(comment_id)} user={user}/>);
      })
    }
    
    <Comment
      avatar={
        <Avatar src="https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?b=1&k=20&m=1300845620&s=170667a&w=0&h=JbOeyFgAc6-3jmptv6mzXpGcAd_8xqkQa_oUK2viFr8=" alt="Han Solo" />
      }
      content={
        <Editor
        onChange={(event) => {setcomment(event.target.value);}}
        onSubmit={async ()=> {
          if(comment === ''){
            toast.info('Komentar tidak boleh kosong.', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              progress: undefined,
              });
          }else{
            await submitComment();
          }
        }}
        // submitting={submitting}
        value={comment}
        />
      }
    />
  </>
);
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(SectionComment);
