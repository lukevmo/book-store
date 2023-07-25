import { Component } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/auth/login.component";
import Register from "./components/auth/register.component";

import EventBus from "./common/event-bus";
import { AddNewBook } from "./components/book/add-book.component";
import { DetailBook } from "./components/book/detail-book.component";
import { BooksList } from "./components/book/list-book.component";
import { HomePage } from "./components/home/homepage.component";

type Props = {};

type State = {
  email: string | undefined
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      email: undefined,
    };
  }

  componentDidMount() {
    const email = AuthService.getCurrentUser();

    if (email) {
      this.setState({
        email: email,
      });
    }

    EventBus.on("logout", this.logOut);
  }

  componentWillUnmount() {
    EventBus.remove("logout", this.logOut);
  }

  logOut() {
    AuthService.logout();
    this.setState({
      email: undefined,
    });
  }

  render() {
    const { email } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            VMO
          </Link>
          <div className="navbar-nav mr-auto">
            {email && (
              <>
               <li className='nav-item'>
                  <Link to={'/books'} className='nav-link'>
                    Book Management
                  </Link>
                </li>
               {/* <li className='nav-item'>
                  <Link to={'/add'} className='nav-link'>
                    Add new Book
                  </Link>
                </li> */}
              </>
            )}
          </div>

          {email ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link">
                  {email}
                </a>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/books" element={<BooksList />} />
            <Route path="/add" element={<AddNewBook />} />
            <Route path="/books/:id" element={<DetailBook />} />
            <Route path='/*' element={<Navigate to='/books' replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>

      </div>
    );
  }
}

export default App;