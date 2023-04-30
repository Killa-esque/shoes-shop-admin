import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Config Router
import { Routes, Route, Navigate, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

// Config history
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from './redux/configStore';
import Template from './Template/Template';
import Login from './Page/Auth/Login';
import Home from './Page/Main/Home';
import UserDetail from './Page/Detail/UserDetail';

export const history = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path='' element={<Template />}>
          <Route index element={<Home />}></Route>
          <Route path='user-detail' element={<UserDetail />}>
            <Route path=':id' element={<UserDetail />}></Route>
          </Route>
        </Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </HistoryRouter>
  </Provider>
);
