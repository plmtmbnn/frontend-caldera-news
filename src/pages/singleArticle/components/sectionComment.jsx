import React from "react";
import { Avatar, Comment, Form, Button, Input } from "antd";
const { TextArea } = Input;

const CommentItem = ({ children }) => (
  <Comment
    actions={[<span key="comment-nested-reply-to">Reply to</span>]}
    author={<a>Han Solo</a>}
    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
    content={
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure).
      </p>
    }
  >
    {children}
  </Comment>
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
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
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const SectionComment = () => (
  <>
    <CommentItem>
      <CommentItem>
        <CommentItem />
      </CommentItem>
    </CommentItem>

    <Comment
      avatar={
        <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
      }
      content={
        <Editor
        // onChange={handleChange}
        // onSubmit={handleSubmit}
        // submitting={submitting}
        // value={value}
        />
      }
    />
  </>
);

export default SectionComment;
