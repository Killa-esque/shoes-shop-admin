import React from 'react';
import { Button, Col, Layout, Row, Typography, message } from 'antd';
import '../../assets/css/login.css'
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import { USER_LOGIN, USER_TOKEN, saveStore } from '../../service/configURL';
import { history } from '../..';
import axios from 'axios';
import { loginAction } from '../../redux/reducer/userReducer';
// import { loginApi } from '../../redux/slices/userSlice';

const { Title } = Typography;
const { Content } = Layout;

const Login = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Hãy điền email"),
      password: Yup.string().required("Hãy điền password"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:8080/api/auth/admin/login", values);
        console.log(response)
        if (response.data.statusCode === 200) {
          const { accessToken, email } = response.data.content;
          saveStore(USER_LOGIN, email);
          saveStore(USER_TOKEN, accessToken);
          dispatch(loginAction({
            userLogin: email,
            userToken: accessToken
          }));
          history.push("/")
          window.location.reload()
          message.open({
            type: 'success',
            content: "Sign in successfully",
          });
        } else {
          message.open({
            type: 'error',
            content: 'Email và mật khẩu bạn nhập không kết nối với tài khoản nào'
          })
          console.error('Request failed with status code', response.status);
        }
      } catch (error) {
        message.open({
          type: 'error',
          content: 'Email và mật khẩu bạn nhập không kết nối với tài khoản nào'
        })
        console.error(error);
      }
    },
  });

  return (
    <Layout className="layout-default layout-signin">
      <Content className="signin">
        <Row gutter={[24, 0]} justify="center">
          <Col
            xs={{ span: 24 }}
            lg={{ span: 8 }}
            md={{ span: 12 }}
          >
            <Title className="mb-15">Sign In</Title>
            <Title className="font-regular text-muted" level={5}>
              Enter your corresponding information to sign in
            </Title>
            <form
              style={{ fontWeight: "bold" }}
              className="form"
              onSubmit={formik.handleSubmit}
            >
              <div className="loginItem">
                <input
                  className="swing"
                  id="email"
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='Enter your email'
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="loginItem">
                <input
                  className="swing"
                  id="password"
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='Enter your password'
                />
                <label htmlFor="password">Password</label>
              </div>

              <div className="loginItem">
                <Button
                  className='btnSignin'
                  type="primary"
                  htmlType="submit"
                  style={{ background: 'rgb(5, 55, 66)', width: "100%" }}
                >
                  SIGN IN
                </Button>
              </div>
            </form>
          </Col>
        </Row>

      </Content>
    </Layout>
  );
};

export default Login;

