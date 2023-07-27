import React, { useState, useEffect } from "react";
import { API_HOST } from "./constants/constants";
import styled from "styled-components";

async function fetchData(setData, prime, cart, dataFB) {
  const url = `${API_HOST}/order/checkout`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${dataFB.data.access_token}`,
  };
  const list = JSON.stringify(
    cart.map((item) => ({
      id: item.id,
      name: item.title,
      price: item.price,
      color: {
        code: item.color,
        name: item.colorName,
      },
      size: item.size,
      qty: item.quantity,
    }))
  );
  const body = {
    prime: `${prime}`,
    order: {
      shipping: "delivery",
      payment: "credit_card",
      subtotal: 1234,
      freight: 14,
      total: 1300,
      recipient: {
        name: "Luke",
        phone: "0987654321",
        email: "luke@gmail.com",
        address: "市政府站",
        time: "morning",
      },
      list: [{ list }],
    },
  };

  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  };

  const res = await fetch(url, options);
  const data = await res.json();
  console.log(data);
  setData(data);
}

export default function Thankyou({ prime, dataFB, cart }) {
  const [data, setData] = useState(null);

  const [thankyou, setThankyou] = useState(false);

  useEffect(() => {
    if (dataFB) {
      fetchData(setData, prime, cart, dataFB);
    }

    setTimeout(() => {
      setThankyou(true);
    }, 4500);
  }, []);
  if (dataFB) {
    return (
      <>
        <Growing></Growing>
        {thankyou && (
          <Thanktext>
            Thanks for your order!
            <br />
            Order number
            <br />
            {data?.data.number}
          </Thanktext>
        )}
      </>
    );
  } else {
    return <FnNotLoginText>請登入FB再來買</FnNotLoginText>;
  }
}
const Thanktext = styled.h1`
  margin: -100px auto 100px;
  max-width: 500px;
  text-align: center;
  font-family: "Noto Sans TC";
  font-style: normal;
  color: #8b572a;
`;
const FnNotLoginText = styled.h1`
  margin: 100px auto;
  max-width: 500px;
  text-align: center;
  font-family: "Noto Sans TC";
  font-style: normal;
  color: #8b572a;
`;
const Growing = styled.div`
  width: 150px;
  height: 150px;
  margin: 200px auto;
  position: relative;
  clip-path: inset(-100vh 0);
  &:before {
    content: "";
    display: block;
    width: 400%;
    height: 100%;
    background:
      /*1*/ radial-gradient(farthest-side, #639510 97%, #0000)
        12.5% 65%/12px 9px,
      linear-gradient(#996b52 0 0) 9% 80%/9.4% 9%,
      linear-gradient(#996b52 0 0) 10% 100%/7% 25%,
      linear-gradient(#639510 0 0) 12.5% 100%/5px 36%,
      /*2*/ radial-gradient(farthest-side, #639510 97%, #0000) 35.5% 50%/15px
        10px,
      radial-gradient(farthest-side, #639510 97%, #0000) 38% 64%/15px 10px,
      linear-gradient(#996b52 0 0) 35.5% 80%/9.4% 9%,
      linear-gradient(#996b52 0 0) 36% 100%/7% 25%,
      linear-gradient(#639510 0 0) 37% 100%/5px 52%,
      /*3*/ radial-gradient(farthest-side, #fb3e4c 98%, #0000) 64.5% 40.5%/10px
        9px,
      radial-gradient(
          farthest-side at bottom,
          #0000 calc(100% - 5px),
          #639510 0 100%,
          #0000
        )
        63.6% 34%/20px 10px,
      radial-gradient(farthest-side, #639510 97%, #0000) 61% 50%/15px 10px,
      radial-gradient(farthest-side, #639510 97%, #0000) 63.5% 64%/15px 10px,
      linear-gradient(#996b52 0 0) 63.5% 80%/9.4% 9%,
      linear-gradient(#996b52 0 0) 63.1% 100%/7% 25%,
      linear-gradient(#639510 0 0) 62% 100%/5px 62%,
      /*4*/ radial-gradient(farthest-side at 50% 4px, #fb3e4c 98%, #0000) 88.1%
        17.5%/17px 13px,
      radial-gradient(farthest-side, #639510 97%, #0000) 87% 50%/15px 10px,
      radial-gradient(farthest-side, #639510 97%, #0000) 89.5% 38%/15px 10px,
      radial-gradient(farthest-side, #639510 97%, #0000) 89.5% 64%/15px 10px,
      linear-gradient(#996b52 0 0) 91% 80%/9.4% 9%,
      linear-gradient(#996b52 0 0) 90% 100%/7% 25%,
      linear-gradient(#639510 0 0) 87.5% 100%/5px 77%;
    background-repeat: no-repeat;
    animation: m 4s 0.5s both;
  }

  &:after {
    content: "";
    position: absolute;
    inset: -100vh 49px 42px 54px;
    background: conic-gradient(at 2px 50%, #0000 270deg, #fff 0) 0 0/8px 10px,
      conic-gradient(at 2px 50%, #0000 270deg, #fff 0) 4px 5px/8px 10px;
    animation: s 4s 0.5s both;
  }
  @keyframes m {
    0%,
    20% {
      transform: translate(0%);
    }
    33.33%,
    53.33% {
      transform: translate(-24%);
    }
    66.66%,
    86.66% {
      transform: translate(-49.5%);
    }
    100% {
      transform: translate(-74.5%);
    }
  }
  @keyframes s {
    0% {
      inset: -100vh 49px 100vh 54px;
    }
    10% {
      inset: -100vh 49px 42px 54px;
      opacity: 1;
    }
    20% {
      inset: -100vh 49px 42px 54px;
      opacity: 0;
    }
    20.01%,
    33.33% {
      inset: -100vh 49px 100vh 54px;
      opacity: 1;
    }
    43.33% {
      inset: -100vh 49px 42px 54px;
      opacity: 1;
    }
    53.33% {
      inset: -100vh 49px 42px 54px;
      opacity: 0;
    }
    53.34%,
    66.66% {
      inset: -100vh 49px 100vh 54px;
      opacity: 1;
    }
    76.66% {
      inset: -100vh 49px 42px 54px;
      opacity: 1;
    }
    86.66%,
    100% {
      inset: -100vh 49px 42px 54px;
      opacity: 0;
    }
  }
`;
