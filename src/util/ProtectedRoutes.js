import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cookie from 'react-cookies'

export const ProtectedAdminRoute = (props) => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);


  const checkAdmin = () => {

    let token = cookie.load("token")

    if (!token || token === 'undefined' || token?.role !== "admin") {
      setIsAdmin(false);
      return navigate('/signin');
    }
    setIsAdmin(true);
  }

  useEffect(() => {
    checkAdmin();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  return (
    <Fragment>
      {
        isAdmin ? props.children : null
      }
    </Fragment>
  );
}


export const ProtectedUserRoute = (props) => {
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState(false);


  const checkUser = () => {

    let token = cookie.load("token")

    if (!token || token === 'undefined') {
      setIsUser(false);
      return navigate('/signin');
    }
    setIsUser(true);
  }

  useEffect(() => {
    checkUser();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUser]);

  return (
    <Fragment>
      {
        isUser ? props.children : null
      }
    </Fragment>
  );
}

export const ProtectedLogoutRoute = (props) => {
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState(false);


  const checkToken = () => {

    let token = cookie.load("token")

    if (token) {
      setIsUser(false);
      return navigate('/');
    }
    setIsUser(true);
  }

  useEffect(() => {
    checkToken();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUser]);

  return (
    <Fragment>
      {
        isUser ? props.children : null
      }
    </Fragment>
  );
}
