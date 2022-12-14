import React, { useEffect, useState } from "react"

import UserService from "../services/user.service"

export default function BoardModerator() {
  const [content, setContent] = useState("")

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data)
      },
      (error) => {
        setContent(
          (error.response && error.response.data) ||
            error.message ||
            error.toString()
        )
      }
    )
  }, [])

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  )
}