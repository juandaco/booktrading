import React from 'react';
// My Components
import Home from '../components/Home';
import AllBooks from '../components/AllBooks';
import MyBooks from '../components/MyBooks';
import AddBooks from '../containers/AddBooks';
import Profile from '../components/Profile';
import TradeRequests from '../components/TradeRequests';
import About from '../components/About';
import SignUp from '../components/SignUp';
import LogIn from '../components/LogIn';

export default [
  {
    path: '/',
    exact: true,
    main: Home,
    title: null,
  },
  {
    path: '/browse',
    exact: true,
    main: AllBooks,
    title: () => <span>All Books</span>,
  },
  {
    path: '/user/books',
    exact: true,
    main: MyBooks,
    title: () => <span>My Books</span>,
  },
  {
    path: '/user/add-books',
    exact: true,
    main: AddBooks,
    title: () => <span>Add Books</span>,
  },
  {
    path: '/user/trade',
    exact: true,
    main: TradeRequests,
    title: () => <span>Trade Requests</span>,
  },
  {
    path: '/user/profile',
    exact: true,
    main: Profile,
    title: () => <span>Profile</span>,
  },
  {
    path: '/signup',
    exact: true,
    main: SignUp,
    title: () => <span>Sign Up</span>,
  },
  {
    path: '/login',
    exact: true,
    main: LogIn,
    title: () => <span>Login</span>,
  },
  {
    path: '/about',
    exact: true,
    main: About,
    title: () => <span>About</span>,
  },
];
