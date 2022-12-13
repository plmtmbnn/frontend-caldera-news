import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Button, Checkbox, Form, Input } from "antd";
import {Helmet} from "react-helmet";

const AdminPage = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="bg-admin">
         <Helmet>
        <title>caldera.id | Menu Admin</title>
        <meta name="title" content="caldera.id - Menu Admin" />
        <meta name="description"
    content="caldera.id - berita seputar batak, berita toba, berita adat batak, berita budaya batak, wisata batak, wisata danau toba" />
        <meta property="og:title" content={'caldera.id - Menu Admin'} />
        <meta property="og:url" content={`https://caldera.id`} />
        <meta property="og:type" content="website" /> <meta name="prerender-status-code" content="301" />
        <meta name="prerender-header" content="Location: https://www.caldera.id" />
    </Helmet>
      <Row className="w-100">
        <Col md={{ span: 4, offset: 4 }}>
          <Card>
            <Card.Body>
              <div className="text-center">
                <h3 className="fw-bold">Caldera Admin</h3>
                <p>Silakan masukan username dan password Anda!</p>
              </div>
              <Form
                name="basic"
                labelCol={{
                  span: 6,
                }}
                wrapperCol={{
                  span: 18,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  wrapperCol={{
                    offset: 6,
                    span: 18,
                  }}
                >
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 6,
                    span: 18,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminPage;
