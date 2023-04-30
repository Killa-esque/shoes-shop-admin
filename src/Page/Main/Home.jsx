import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Segmented, Table, message, Popconfirm, Form, Row, Col, Space, DatePicker, Drawer, Input, Select, InputNumber, Tag, Image, Divider } from "antd";
import {
  DatabaseFilled,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import * as Yup from 'yup';
import Column from "antd/es/table/Column";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { history } from "../..";
import { adminService } from "../../service/adminService";

const { Option } = Select;

const options = Array.from(Array(10).keys()).map((value) => {
  const size = value + 40;
  return <Option key={size} value={size}>{size}</Option>;
});

const Home = () => {
  const [value, setValue] = useState('User List');

  const renderContent = () => {
    switch (value) {
      case 'User List':
        return <UserList />;
      case 'Product List':
        return <ProductList />;
      default:
        return null;
    }
  };

  return (
    <div className="container-fluid mt-2">
      <Segmented
        options={[
          {
            label: 'Quản lý user',
            value: 'User List',
            icon: <DatabaseFilled />,
          },
          {
            label: 'Quản lý product',
            value: 'Product List',
            icon: <DatabaseFilled />,
          },
          {
            label: 'Quản lý brand',
            value: 'Brand List',
            icon: <DatabaseFilled />,
          },
        ]}
        value={value}
        onChange={setValue}
      />
      {renderContent()}
    </div>
  );
}

export default Home


const UserList = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [open, setOpen] = useState(false);

  const handleGetUserList = () => {
    adminService.getUserList()
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleGetUserById = (id) => {
    adminService.getUserById(id)
      .then((res) => {
        console.log(res)
        setEditingUser(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleDeleteUser = (id) => {
    adminService.deleteUser(id)
      .then((res) => {
        console.log(res)
        message.open({
          type: 'success',
          content: 'Xóa user thành công'
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onFinish = (values) => {
    console.log(values)
    adminService.addUser({ ...values, role: 1 })
      .then((res) => {
        console.log(res)
        message.open({
          type: 'success',
          content: 'User thêm thành công'
        })
        setEditingUser(null);
        setOpen(true);
        form.setFieldsValue({})
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    handleGetUserList();
  }, [onFinish, handleDeleteUser])


  const handleSubmit = (values, { setSubmitting }) => {
    if (editingUser) {
      setData(
        data.map((user) =>
          user.id === editingUser.id ? { ...user, ...values } : user
        )
      );
      message.success("User updated successfully");
    } else {
      setData([...data, { ...values, id: data.length + 1 }]);
      message.success("User added successfully");
    }
    setSubmitting(false);
    setOpen(false);
  };

  return (
    <>
      <div style={{ marginBottom: 16 }} className="mt-5">
        <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
          New account
        </Button>
      </div>
      <Table dataSource={data} rowKey="id">
        <Column title="ID" dataIndex="id" />
        <Column title="Name" dataIndex="username" />
        <Column title="Age" dataIndex="age" />
        <Column title="Email" dataIndex="email" />
        <Column title="Phone Number" dataIndex="phone" />
        <Column title="Address" dataIndex="address" />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Link to={`/user-detail/${record.id}`}>
                <Button
                  type="primary"
                  // onClick={() => handleEdit(record)}
                  icon={<EditOutlined />}
                >
                  Edit
                </Button>
              </Link>
              <Popconfirm
                title="Are you sure to delete this user?"
                onConfirm={() => handleDeleteUser(record.id)}
              >
                <Button type="danger" icon={<DeleteOutlined />}>
                  Delete
                </Button>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
      <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Exit</Button>
            <Button onClick={onClose} type="primary">
              Save Form
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
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
            <Col span={12}>
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
          <Row gutter={16}>
            <Col span={12}>
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
            <Col span={12}>
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
          <Row gutter={16}>
            <Col span={12}>
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

            <Col span={12}>
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
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: 'Please enter password',
                  },
                ]}
              >
                <Input.Password placeholder="Enter password" />
              </Form.Item>
            </Col>
          </Row>
          <button type='submit' className='btn btn-dark'>Creat user</button>
        </Form>
      </Drawer>
    </>
  );
};



const ProductList = () => {
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [productId, setProductId] = useState({})

  // Categories
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [isCategoriesAdded, setIsCategoriesAdded] = useState(false);
  const inputRef = useRef(null);

  // Brands
  const [brands, setBrands] = useState([])
  console.log(brands)
  const [name1, setName1] = useState('');
  const [isBrandsAdded, setIsBrandAdded] = useState(false);
  const inputRef1 = useRef(null);

  const handleGetUserList = () => {
    adminService.getProductList()
      .then((res) => {
        console.log(res)
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleGetBrandList = () => {
    adminService.getBrandList()
      .then((res) => {
        console.log(res)
        setBrands(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleGetCategoriesList = () => {
    adminService.getCategoriesList()
      .then((res) => {
        console.log(res)
        setCategories(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleGetProductById = () => {
    adminService.getProductById(productId)
      .then((res) => {
        console.log(res)
        setEditingProduct(res.data)
        form.setFieldsValue({ ...res.data })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleEdit = (record) => {
    setProductId(record.id)
    setEditingProduct(record);
    setOpen(true);
  }

  const handleDelete = (record) => {
    adminService.deleteProduct(record.id)
      .then((res) => {
        console.log(res)
        message.open({
          type: 'success',
          content: 'Xóa product thành công'
        })
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onFinish = (values) => {
    adminService.updateProduct(editingProduct.id, values)
      .then(res => {
        message.open({
          type: 'success',
          content: 'Cập nhật product thành công'
        })
        console.log(res)
      })
      .catch(err => {
        message.open({
          type: 'error',
          content: 'Cập nhật thất bại'
        })
      })
    console.log(values)
  }

  const handleDelete1 = (record) => {
    console.log("del")
  }

  const showDrawer1 = () => {
    setOpen1(true);
  };


  const onClose1 = () => {
    setOpen1(false);
  };

  const onFinish1 = (values) => {
    adminService.addProduct(values)
      .then(res => {
        message.open({
          type: 'success',
          content: 'Thêm product thành công'
        })
        console.log(res)
      })
      .catch(err => {
        message.open({
          type: 'error',
          content: 'Thêm thất bại'
        })
      })
    console.log(values)
  }

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onNameChange1 = (event) => {
    setName1(event.target.value);
  };

  const addItem = useCallback((e) => {
    console.log(name)
    adminService
      .addCategories({ name: name })
      .then((res) => {
        message.open({
          type: 'success',
          content: 'Create new category successfully !'
        })
        setName('')
        setIsCategoriesAdded(true);
        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
      })
      .catch((err) => {
        message.open({
          type: 'error',
          content: 'Create category fail'
        })
        console.log(err);
      });

  }, [name]);

  const addItem1 = useCallback((e) => {
    console.log(name)
    adminService
      .addBrand({ name: name1 })
      .then((res) => {
        message.open({
          type: 'success',
          content: 'Create new brand successfully !'
        })
        setName1('')
        setIsBrandAdded(true);
        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
      })
      .catch((err) => {
        message.open({
          type: 'error',
          content: 'Create brand fail'
        })
        console.log(err);
      });

  }, [name1]);

  useEffect(() => {
    if (isCategoriesAdded || isBrandsAdded) {
      handleGetBrandList();
      handleGetCategoriesList();
      setIsCategoriesAdded(false);
      setIsBrandAdded(false);
    }
  }, [isCategoriesAdded, isBrandsAdded]);

  useEffect(() => {
    handleGetUserList();
    handleGetBrandList();
    handleGetCategoriesList();
  }, []);

  useEffect(() => {
    handleGetProductById();
  }, [productId])

  return (
    <>
      <div style={{ marginBottom: 16 }} className="mt-5">
        <Button type="primary" onClick={showDrawer1} icon={<PlusOutlined />}>
          New product
        </Button>
      </div>
      <Table dataSource={data} rowKey="id"
        pagination={{
          position: ['bottomRight'],
          showSizeChanger: false
        }}>
        <Column title="ID" dataIndex="id" />
        <Column
          title="Image"
          dataIndex="image"
          render={(text, record) => (
            <>
              <Image src={record.image} alt="product image" width={50} />
            </>
          )}
        />
        <Column title="Name" dataIndex="name" width={200} />
        <Column title="Description" dataIndex="description" width={300} />
        <Column
          title="Price"
          dataIndex="price"
          render={(text, record) => (
            <span>
              ${record.price}
            </span>
          )}
        />
        <Column title="Size" dataIndex="size" render={(text, record) => (
          <>
            {record.size.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </>
        )} />
        <Column title="Quantity" dataIndex="quantity" />
        <Column title="Brand" dataIndex="brands" />
        <Column title="Category" dataIndex="categories" />
        <Column
          title="Related Products"
          dataIndex="relatedProducts"
          width={200}
          render={(text, record) => (
            <>
              {record.relatedProducts.map((id) => {
                const product = data.find((product) => parseInt(product.id) === parseInt(id));
                return product ? <Tag className="my-1" key={id}>{product.name}</Tag> : null;
              })}
            </>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Button
                type="primary"
                onClick={() => { handleEdit(record) }}
                icon={<EditOutlined />}
              >
                Edit
              </Button>
              <Popconfirm
                title="Are you sure to delete this user?"
                onConfirm={() => handleDelete(record)}
              >
                <Button type="danger" icon={<DeleteOutlined />}>
                  Delete
                </Button>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
      <Drawer
        title="Edit product"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Exit</Button>
            <Button onClick={onClose} type="primary">
              Save
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Product Name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter product name',
                  },
                ]}
              >
                <Input placeholder="Please enter product name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Price"
                rules={[
                  {
                    required: true,
                    message: 'Please enter price',
                  },
                ]}
              >
                <InputNumber className="w-100" min={0} placeholder="Please enter price" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: 'Please enter description',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="Enter description" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="size"
                label="Size"
                rules={[
                  {
                    required: true,
                    message: 'Please select product size',
                  },
                ]}
              >
                <Select mode="multiple" allowClear>
                  {options}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="quantity"
                label="Quantity"
                rules={[
                  {
                    required: true,
                    message: 'Please enter quantity',
                  },
                ]}
              >
                <InputNumber className="w-100" min={0} placeholder="Please enter quantity" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="brands"
                label="Brands"
                rules={[
                  {
                    required: true,
                    message: 'Please enter product brands',
                  },
                ]}
              >
                <Select
                  maxTagCount='responsive'
                  placeholder="Please select categories"
                  dropdownRender={(menu) => {
                    return (
                      <>
                        {menu}
                        <Divider
                          style={{
                            margin: '8px 0',
                          }}
                        />
                        <Space
                          style={{
                            padding: '0 8px 4px',
                          }}
                        >
                          <Input
                            placeholder="Please enter item"
                            ref={inputRef1}
                            value={name1}
                            onChange={onNameChange1}
                          />
                          <Button type="text" icon={<PlusOutlined />} onClick={addItem1}>
                            Create new brand
                          </Button>
                        </Space>
                      </>
                    )
                  }}
                  options={brands?.map((item) => {
                    return ({
                      label: item.name,
                      value: item.id,
                    })
                  })}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="categories"
                label="Categories"
                rules={[
                  {
                    required: true,
                    message: 'Please enter product categories',
                  },
                ]}
              >
                <Select
                  maxTagCount='responsive'
                  placeholder="Please select categories"
                  dropdownRender={(menu) => {
                    return (
                      <>
                        {menu}
                        <Divider
                          style={{
                            margin: '8px 0',
                          }}
                        />
                        <Space
                          style={{
                            padding: '0 8px 4px',
                          }}
                        >
                          <Input
                            placeholder="Please enter item"
                            ref={inputRef}
                            value={name}
                            onChange={onNameChange}
                          />
                          <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                            Create new category
                          </Button>
                        </Space>
                      </>
                    )
                  }}
                  options={categories?.map((item) => {
                    return ({
                      label: item.name,
                      value: item.id,
                    })
                  })}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="relatedProducts"
                label="Related Products"
                rules={[
                  {
                    required: true,
                    message: 'Please enter related products',
                  },
                ]}
              >
                <Select mode="multiple" placeholder="Please select related products">
                  {data.map((product) => (
                    <Select.Option key={product.id} value={product.id}>
                      {product.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="image"
                label="Image URL"
                rules={[
                  {
                    required: true,
                    message: 'Please enter image URL',
                  },
                ]}
              >
                <Input placeholder="Enter image URL" />
              </Form.Item>
            </Col>
          </Row>
          <button className="btn btn-dark" type='submit'>Save</button>
        </Form>

      </Drawer>
      <Drawer
        title="Add new product"
        width={720}
        onClose={onClose1}
        open={open1}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose1}>Exit</Button>
            <Button onClick={onClose1} type="primary">
              Save
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" form={form1} onFinish={onFinish1}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Product Name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter product name',
                  },
                ]}
              >
                <Input placeholder="Please enter product name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Price"
                rules={[
                  {
                    required: true,
                    message: 'Please enter price',
                  },
                ]}
              >
                <InputNumber className="w-100" min={0} placeholder="Please enter price" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: 'Please enter description',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="Enter description" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="size"
                label="Size"
                rules={[
                  {
                    required: true,
                    message: 'Please select product size',
                  },
                ]}
              >
                <Select mode="multiple" allowClear>
                  {options}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="quantity"
                label="Quantity"
                rules={[
                  {
                    required: true,
                    message: 'Please enter quantity',
                  },
                ]}
              >
                <InputNumber className="w-100" min={0} placeholder="Please enter quantity" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="brands"
                label="Brands"
                rules={[
                  {
                    required: true,
                    message: 'Please enter product brands',
                  },
                ]}
              >
                <Select
                  maxTagCount='responsive'
                  placeholder="Please select categories"
                  dropdownRender={(menu) => {
                    return (
                      <>
                        {menu}
                        <Divider
                          style={{
                            margin: '8px 0',
                          }}
                        />
                        <Space
                          style={{
                            padding: '0 8px 4px',
                          }}
                        >
                          <Input
                            placeholder="Please enter item"
                            ref={inputRef1}
                            value={name1}
                            onChange={onNameChange1}
                          />
                          <Button type="text" icon={<PlusOutlined />} onClick={addItem1}>
                            Create new brand
                          </Button>
                        </Space>
                      </>
                    )
                  }}
                  options={brands?.map((item) => {
                    return ({
                      label: item.name,
                      value: item.id,
                    })
                  })}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="categories"
                label="Categories"
                rules={[
                  {
                    required: true,
                    message: 'Please enter product categories',
                  },
                ]}
              >
                <Select
                  maxTagCount='responsive'
                  placeholder="Please select categories"
                  dropdownRender={(menu) => {
                    return (
                      <>
                        {menu}
                        <Divider
                          style={{
                            margin: '8px 0',
                          }}
                        />
                        <Space
                          style={{
                            padding: '0 8px 4px',
                          }}
                        >
                          <Input
                            placeholder="Please enter item"
                            ref={inputRef}
                            value={name}
                            onChange={onNameChange}
                          />
                          <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                            Create new category
                          </Button>
                        </Space>
                      </>
                    )
                  }}
                  options={categories?.map((item) => {
                    return ({
                      label: item.name,
                      value: item.id,
                    })
                  })}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="relatedProducts"
                label="Related Products"
                rules={[
                  {
                    required: true,
                    message: 'Please enter related products',
                  },
                ]}
              >
                <Select mode="multiple" placeholder="Please select related products">
                  {data.map((product) => (
                    <Select.Option key={product.id} value={product.id}>
                      {product.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="image"
                label="Image URL"
                rules={[
                  {
                    required: true,
                    message: 'Please enter image URL',
                  },
                ]}
              >
                <Input placeholder="Enter image URL" />
              </Form.Item>
            </Col>
          </Row>
          <button className="btn btn-dark" type='submit'>Save</button>
        </Form>

      </Drawer>
    </>
  );
}

