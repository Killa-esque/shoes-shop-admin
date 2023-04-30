import { https } from "./configURL";


export const adminService = {
  // Product
  getProductList: () => {
    return https.get(`api/products`);
  },
  getProductById: (id) => {
    return https.get(`api/products/${id}`);
  },
  addProduct: (newProduct) => {
    return https.post(`api/products`, newProduct);
  },
  updateProduct: (id, product) => {
    return https.put(`api/products/${id}`, product);
  },
  deleteProduct: (id) => {
    return https.delete(`api/products/${id}`);
  },

  // User
  getUserList: () => {
    return https.get(`api/users`);
  },
  getUserById: (id) => {
    return https.get(`api/users/${id}`);
  },
  addUser: (newUser) => {
    return https.post(`api/users`, newUser);
  },
  updateUser: (User) => {
    return https.put(`api/users/${User.id}`, User);
  },
  deleteUser: (id) => {
    return https.delete(`api/users/${id}`);
  },

  // Brand
  getBrandList: () => {
    return https.get(`api/brands`);
  },
  getBrandById: (id) => {
    return https.get(`api/brands/${id}`);
  },
  addBrand: (newBrand) => {
    return https.post(`api/brands`, newBrand);
  },
  updateBrand: (id, Brand) => {
    return https.put(`api/brands/${id}`, Brand);
  },
  deleteBrand: (id) => {
    return https.delete(`api/brands/${id}`);
  },

  // Categories
  getCategoriesList: () => {
    return https.get(`api/categories`);
  },
  getCategoriesById: (id) => {
    return https.get(`api/categories/${id}`);
  },
  addCategories: (newCategories) => {
    return https.post(`api/categories`, newCategories);
  },
  updateCategories: (id, Categories) => {
    return https.put(`api/categories/${id}`, Categories);
  },
  deleteCategories: (id) => {
    return https.delete(`api/categories/${id}`);
  },
};
