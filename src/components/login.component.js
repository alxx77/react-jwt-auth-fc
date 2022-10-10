import React, { useState } from "react"
//import Form from "react-validation/build/form"
//import Input from "react-validation/build/input"
//import CheckButton from "react-validation/build/button"

import AuthService from "../services/auth.service"

import { withRouter } from "../common/with-router"

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    )
  }
}

function Login(props) {
  const [state, setState] = useState({
    username: "",
    password: "",
    loading: false,
    message: "",
  })

  //const [formRef, setFormRef] = useState(null)
  //const [checkBtn, setCheckBtn] = useState(null)

  const onChangeUsername = (e) => {
    setState((pV) => {
      return {
        ...pV,
        username: e.target.value,
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

  const handleLogin = (e) => {
    e.preventDefault()

    setState((pV) => {
      return {
        ...pV,
        message: "",
        loading: true,
      }
    })

    //formRef.validateAll()

    //if (checkBtn.context._errors.length === 0) {
      if (true) {
      AuthService.login(state.username, state.password).then(
        () => {
          props.router.navigate("/profile")
          window.location.reload()
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
              loading: false,
              message: resMessage,
            }
          })
        }
      )
    } else {
      setState((pV) => {
        return {
          ...pV,
          loading: false,
        }
      })
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

        <form onSubmit={handleLogin}
         //ref={(c) => setFormRef(c)}
         >
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={state.username}
              onChange={onChangeUsername}
              validations={[required]}
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
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button
              className="btn btn-primary btn-block"
              disabled={state.loading}
            >
              {state.loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {state.message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {state.message}
              </div>
            </div>
          )}
          {/* <CheckButton
            style={{ display: "none" }}
            ref={(c) => setCheckBtn(c)}
          /> */}
        </form>
      </div>
    </div>
  )
}

export default withRouter(Login)
