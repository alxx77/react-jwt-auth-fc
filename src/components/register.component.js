import React, { useState } from "react"
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";
import { isEmail } from "validator"

import AuthService from "../services/auth.service"

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    )
  }
}

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    )
  }
}

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    )
  }
}

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    )
  }
}

export default function Register() {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    successful: false,
    message: "",
  })

  const onChangeUsername = (e) => {
    setState((pV) => {
      return {
        ...pV,
        username: e.target.value,
      }
    })
  }

  const onChangeEmail = (e) => {
    setState((pV) => {
      return {
        ...pV,
        email: e.target.value,
      }
    })
  }

  const onChangePassword = (e) => {
    setState((pV) => {
      return {
        ...pV,
        password: e.target.value,
      }
    })
  }

  const handleRegister = (e) => {
    e.preventDefault()

    setState((pV) => {
      return {
        ...pV,
        message: "",
        successful: false,
      }
    })

    //this.form.validateAll();

    // if (this.checkBtn.context._errors.length === 0) {
    if (true) {
      AuthService.register(state.username, state.email, state.password).then(
        (response) => {
          setState((pV) => {
            return {
              ...pV,
              message: response.data.message,
              successful: true,
            }
          })
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()

          setState((pV) => {
            return {
              ...pV,
              successful: false,
              message: resMessage,
            }
          })
        }
      )
    }
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <form
          onSubmit={handleRegister}
          // ref={c => {
          //   this.form = c;
          // }}
        >
          {!state.successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={state.username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={state.email}
                  onChange={onChangeEmail}
                  validations={[required, email]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={state.password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}

          {state.message && (
            <div className="form-group">
              <div
                className={
                  state.successful
                    ? "alert alert-success"
                    : "alert alert-danger"
                }
                role="alert"
              >
                {state.message}
              </div>
            </div>
          )}
          {/* <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            /> */}
        </form>
      </div>
    </div>
  )
}
