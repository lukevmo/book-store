import { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import AuthService from "../../services/auth.service";

type Props = {};

type State = {
  fullName: string,
  email: string,
  password: string,
  successful: boolean,
  message: string
};

export default class Register extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);

    this.state = {
      fullName: "",
      email: "",
      password: "",
      successful: false,
      message: ""
    };
  }

  validationSchema() {
    return Yup.object().shape({
      fullName: Yup.string()
        .test(
          "len",
          "The fullName must be between 3 and 40 characters.",
          (val: any) =>
            val &&
            val.toString().length >= 3 &&
            val.toString().length <= 40
        )
        .required("This field is required!"),
      email: Yup.string()
        .email("This is not a valid email.")
        .required("This field is required!"),
      password: Yup.string()
        .test(
          "len",
          "The password must be between 6 and 40 characters.",
          (val: any) =>
            val &&
            val.toString().length >= 6 &&
            val.toString().length <= 40
        )
        .required("This field is required!"),
    });
  }

  handleRegister(formValue: { fullName: string; email: string; password: string }) {
    const { fullName, email, password } = formValue;

    this.setState({
      message: "",
      successful: false
    });

    AuthService.register(
      fullName,
      email,
      password
    ).then(
      response => {
        this.setState({
          message: response.data.message,
          successful: true
        });
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          successful: false,
          message: resMessage
        });
      }
    );
  }

  render() {
    const { successful, message } = this.state;

    const initialValues = {
      fullName: "",
      email: "",
      password: "",
    };

    return (
      <div className="col-md-12">
        <div className="card card-container register-screen">
          <img
            src="https://cdn.vmogroup.com/vmogroup-global/assets/img/thumbnail_vmo_light.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Formik
            initialValues={initialValues}
            validationSchema={this.validationSchema}
            onSubmit={this.handleRegister}
          >
            <Form>
              {!successful && (
                <div>
                  <div className="form-group">
                    <label htmlFor="fullName"> Full Name </label>
                    <Field name="fullName" type="text" className="form-control" placeholder="Enter full name" />
                    <ErrorMessage
                      name="fullName"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email"> Email </label>
                    <Field name="email" type="email" className="form-control" placeholder="Enter email" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password"> Password </label>
                    <Field
                      name="password"
                      type="password"
                      className="form-control"
                      placeholder="Enter password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block reg">Sign Up</button>
                  </div>
                </div>
              )}

              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
            </Form>
          </Formik>
        </div>
      </div>
    );
  }
}
