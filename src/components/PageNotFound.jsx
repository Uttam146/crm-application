import React from "react";
import './PageNotFound.css';
import { Link } from 'react-router-dom';
export default function PageNotFound() {
  return (
    <>
      <div class="container">
        <div class="gif">
          <img src="https://i.postimg.cc/2yrFyxKv/giphy.gif" alt="gif_ing" />
        </div>
        <div class="content">
          <h1 class="main-heading">This page is gone.</h1>
          <p>
            ...maybe the page you're looking for is not found or never existed.
          </p>
          <Link to='/home'><button>Back to home <i class="far fa-hand-point-right"></i></button></Link>
        </div>
      </div>
    </>
  )
}