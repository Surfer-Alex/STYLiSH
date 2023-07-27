import React from "react";
import styled from "styled-components";
import { useEffect } from "react";

export default function Login({ data, status, handleFBLogin, handleFBLogout }) {
  // console.log(data.data)
  // if (status === 'connected') {
  //     return <Redirect to="/login" />;
  //   }

  useEffect(() => {
    if (status === "connected") {
      handleFBLogin();
    }
  }, [status]);

  if (status === "connected") {
    console.log(data);
    return (
      <Container>
        <Button onClick={handleFBLogin}>使用 Facebook 登入</Button>
        <Button onClick={handleFBLogout}>登出</Button>

        <div>
          <div>{data?.data.user.name}</div>
          <div>{data?.data.user.email}</div>
          <img src={data?.data.user.picture} alt="User Picture" />
        </div>
      </Container>
    );
  } else {
    return (
      <Container>
        <Button onClick={handleFBLogin}>使用 Facebook 登入</Button>
        <Button onClick={handleFBLogout}>登出</Button>
        <div></div>
      </Container>
    );
  }
}

const Button = styled.button`
  background: #1877f2;
  color: white;
  min-width: 200px;
  font-family: "Noto Sans TC", sans-serif;
  font-weight: bold;
  padding: 6px 0;
  margin: 3rem 1rem;

  &:hover {
    background: #385898;
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
