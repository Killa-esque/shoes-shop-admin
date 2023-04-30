//Hook
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

// Libraries
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Table, Container, Card, CardBody, CardText, Breadcrumb, BreadcrumbItem, Label, CardImg } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import { motion } from 'framer-motion'
// import { Formik, Form, Field, ErrorMessage } from 'formik';

import { Button, Segmented, message, Popconfirm, Form, Space, DatePicker, Drawer, Input, Select, InputNumber, Tag, Image } from "antd";
// css
import '../../assets/css/profile.css'
import '../../assets/css/pagination.css'

// Create form & Validation
// import { Tag, message } from 'antd';
import * as yup from 'yup'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { adminService } from '../../service/adminService';
import { USER_LOGIN, USER_TOKEN, getStore } from '../../service/configURL';
const { Option } = Select;

const profileSchema = yup.object().shape({
  email: yup.string()
    .email('Email không hợp lệ')
    .required('Email là bắt buộc'),
  passwordConfirm: yup.string()
    .required('Điền mật khẩu để xác nhận thông tin thay đổi'),
  username: yup.string()
    .min(2, 'Tên đăng nhập phải chứa ít nhất 2 kí tự')
    .max(50, 'Tên đăng nhập không được quá 50 kí tự')
    .required('Tên đăng nhập là bắt buộc'),
  phone: yup.string()
    .matches(/^\d{10,11}$/, 'Số điện thoại không hợp lệ')
    .required('Số điện thoại là bắt buộc'),
  address: yup.string().required('Địa chỉ là bắt buộc'),
  gender: yup
    .string()
    .oneOf(['male', 'female'], 'Invalid gender')
    .required('Giới tính là bắt buộc'),
});

const UserDetail = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [userProfile, setUserProfile] = useState();
  console.log(userProfile)
  const [activeTab, setactiveTab] = useState('1');
  const [pageNumber, setPageNumber] = useState(0);

  // Number of product for each page
  const productPerTab = 5;
  // Get the visited page
  const vistedPage = pageNumber * productPerTab;
  // Show the product each page
  const displayPage = userProfile?.orders?.slice(
    vistedPage,
    vistedPage + productPerTab
  );
  // Calculate the page
  const pageCount = Math.ceil(userProfile?.orders?.length / productPerTab);
  // Function to paginate
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  // Change tab between User Orderd & User Favorite tab
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  }


  const handleGetUserById = () => {
    if (getStore(USER_TOKEN) && getStore(USER_LOGIN)) {
      adminService.getUserById(id)
        .then(res => {
          setUserProfile(res.data.content)
          form.setFieldsValue({ ...res.data.content })
        })
        .catch(err => {
          console.log(err)
        })
    }
  };

  const onFinish = (values) => {
    console.log(values)
    adminService.updateUser(values)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleGetUserById();
  }, [id]);

  return (
    <>
      <section style={{ backgroundColor: "#eee", padding: "50px 0 0 0" }}>
        <Container>

          <Row className=''>
            <Col>
              <Card className="mb-4 h-100">
                <CardBody>
                  <Form layout="vertical" form={form} onFinish={onFinish}>
                    <Col>
                      <Form.Item
                        className='d-none'
                        name="id"
                        label="ID"
                        rules={[
                          {
                            required: true,
                            message: 'ID',
                          },
                        ]}
                      >
                        <Input placeholder="ID" />
                      </Form.Item>
                    </Col>
                    <Row>
                      <Col>
                        <Form.Item
                          name="username"
                          label="Username"
                          rules={[
                            {
                              required: true,
                              message: 'Please enter user name',
                            },
                          ]}
                        >
                          <Input placeholder="Please enter user name" />
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item
                          name="email"
                          label="Email"
                          rules={[
                            {
                              required: true,
                              message: 'Please enter your email',
                            },
                          ]}
                        >
                          <Input placeholder="Please enter your email" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Item
                          name="gender"
                          label="Gender"
                          rules={[
                            {
                              required: true,
                              message: 'Please select gender',
                            },
                          ]}
                        >
                          <Select placeholder="Please select gender">
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item
                          name="age"
                          label="Age"
                          rules={[
                            {
                              required: true,
                              message: 'Please enter your age',
                            },
                          ]}
                        >
                          <InputNumber className="w-100" min={0} max={100} placeholder="Please enter your age" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row >
                      <Col>
                        <Form.Item
                          name="address"
                          label="Address"
                          rules={[
                            {
                              required: true,
                              message: 'Please enter address',
                            },
                          ]}
                        >
                          <Input placeholder="Enter address" />
                        </Form.Item>
                      </Col>

                      <Col>
                        <Form.Item
                          name="phone"
                          label="Phone Number"
                          rules={[
                            {
                              required: true,
                              message: 'Please enter phone number',
                            },
                          ]}
                        >
                          <Input placeholder="Please enter phone number" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <button type='submit' className='btn btn-dark'>Update</button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      <section className='p-5' style={{ backgroundColor: '#eee', padding: '50px 0 0 0' }}>
        <div className='container bg-white rounded-3 p-3 mb-4'>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => { toggle('1'); }}
                style={{
                  cursor: 'pointer'
                }}
              >
                Order history
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Row>
                <Table>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Size</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userProfile?.orders?.length !== 0 ? (
                      <>
                        {displayPage?.map((order, index) => {
                          return (
                            <Fragment key={index}>
                              <tr>
                                <td colSpan={12} className="order__date">
                                  <span>Order date:</span>{" "}
                                  {moment(order.date).format(
                                    "MMMM Do YYYY, h:mm:ss a"
                                  )}
                                  <span className='mx-3'>Address:</span>{" "}
                                  {order.address}
                                  <span className='mx-3'>Status:</span>{" "}
                                  {order.status}
                                </td>
                              </tr>
                              <Tr item={order.products} />
                            </Fragment>
                          );
                        })}
                      </>
                    ) : (
                      <tr className='w-100 text-center fs-4 fw-bold' style={{ textDecoration: 'none' }}>
                        <td className='p-5' colSpan={6}>No product founded!!</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                <div>
                  <ReactPaginate
                    pageCount={pageCount}
                    onPageChange={changePage}
                    previousLabel="Prev"
                    nextLabel="Next"
                    containerClassName="paginationBtns"
                  />
                </div>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      </section>
    </>
  )
}
const Tr = ({ item }) => {
  return (
    <>
      {item?.map((detail, index) => {
        const { id, name, price, image, quantity, size } = detail;
        return (
          <tr className="text-center profile__detail" key={index}>
            <td className="cart__img">
              <img src={image} alt="" />
            </td>
            <td>{name}</td>
            <td>
              <Tag color="red">Size: {size}</Tag>
            </td>
            <td>
              <Tag color="red">x{quantity}</Tag>
            </td>
            <td>${price * quantity}</td>
          </tr>
        );
      })}
    </>
  );
};

export default UserDetail
