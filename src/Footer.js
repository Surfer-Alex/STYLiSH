import {
  MEDIA_QUERY_360,
  MEDIA_QUERY_480,
  MEDIA_QUERY_1279,
} from "./constants/style";
import styled from "styled-components";
import cart from "./images/cart.png";
import member from "./images/member.png";
import line from "./images/line.png";
import twitter from "./images/twitter.png";
import facebook from "./images/facebook.png";
import { Link } from "react-router-dom";

const Foot = styled.div`
  margin-top: 49px;
  width: 100%;
  ${MEDIA_QUERY_480} {
    margin-top: 32px;
  }
  ${MEDIA_QUERY_360} {
    margin-top: 32px;
  }
`;

const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  height: 115px;
  background-color: black;
  ul {
    width: 670px;
    height: 16px;
    display: flex;
    margin-right: auto;
    li {
      width: 134px;
      &:not(:first-child) {
        border-left: 1px solid;
      }
      a {
        justify-content: center;
        font-family: "Noto Sans TC";
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #f5f5f5;
        ${MEDIA_QUERY_1279} {
          justify-content: center;
          font-family: "Noto Sans TC";
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          color: #d3d3d3;
        }
      }
      ${MEDIA_QUERY_1279} {
        width: 85px;
        justify-content: flex-start;
        margin-bottom: 8px;
        &:not(:first-child) {
          border-left: none;
        }
      }

      ${MEDIA_QUERY_480} {
        width: 85px;
        &:nth-last-child(-n + 2) {
          margin-left: 36px;
        }
      }
    }

    ${MEDIA_QUERY_1279} {
      width: 177px;
      height: 84px;
      flex-wrap: wrap;
      flex-direction: column;
    }
    ${MEDIA_QUERY_480} {
      width: 200px;
    }
  }

  img {
    max-width: 100%;
  }
  ${MEDIA_QUERY_1279} {
    width: 100%;
    flex-direction: column;
    height: 206px;
    justify-content: flex-start;
  }
`;

const FooterInfo = styled.div`
  min-width: 1160px;
  display: flex;
  align-items: center;
  ${MEDIA_QUERY_1279} {
    min-width: 296px;
    margin-top: 25px;
  }
  ${MEDIA_QUERY_480} {
    width: 296px;
    margin-top: 25px;
  }
`;

const Conclude = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  ${MEDIA_QUERY_1279} {
    margin-right: auto;
  }
  ${MEDIA_QUERY_480} {
    width: 88px;
    margin-bottom: 25px;
    margin-right: 0;
  }
  p {
    font-family: "Noto Sans TC";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
    text-align: center;
    color: #828282;
    ${MEDIA_QUERY_1279} {
      display: none;
    }
  }
`;

const FooterIcons = styled.div`
  display: flex;
  width: 240px;
  height: 50px;
  align-items: center;
  ${MEDIA_QUERY_1279} {
    min-width: 88px;
  }
  ${MEDIA_QUERY_480} {
    width: 88px;
  }
  ${MEDIA_QUERY_360} {
  }

  a {
    margin-right: 30px;
    img {
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      ${MEDIA_QUERY_1279} {
        min-width: 20px;
        min-height: 20px;
      }
      ${MEDIA_QUERY_480} {
        width: 20px;
        height: 20px;
      }
    }
    ${MEDIA_QUERY_480} {
      margin-right: 14px;
    }
  }
`;

const MobileCopyright = styled.div`
  font-family: "Noto Sans TC";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  transform: scale(0.83);
  line-height: 14px;
  text-align: center;
  color: #828282;
  display: none;
  ${MEDIA_QUERY_1279} {
    display: flex;
    min-width: 124px;
    margin-top: 5px;
  }
  ${MEDIA_QUERY_480} {
    padding-right: 4px;
  }
`;

const CartMemberContainer = styled.div`
  display: none;
  ${MEDIA_QUERY_1279} {
    display: flex;
    width: 100%;
    height: 24px;
    background-color: black;
    justify-content: space-around;
    margin-top: 39px;
  }

  ${MEDIA_QUERY_480} {
    justify-content: space-evenly;
    margin-top: 39px;
  }
  ${MEDIA_QUERY_360} {
    justify-content: space-evenly;
    margin-top: 38px;
  }
  span {
    ${MEDIA_QUERY_1279} {
      border-left: 1px solid #ffffff;
    }
  }
`;
const FooterCartCombo = styled.div`
  ${MEDIA_QUERY_1279} {
    display: flex;
    align-items: center;
    position: relative;
    min-width: 180px;
    justify-content: center;
  }

  div {
    ${MEDIA_QUERY_1279} {
      font-family: "Noto Sans TC";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 16px;

      text-align: center;

      color: #ffffff;
    }
  }
`;
const FooterCartIcon = styled.a`
  ${MEDIA_QUERY_1279} {
    filter: brightness(5);
  }
`;

const CartIconNumber = styled.div`
  position: absolute;
  bottom: 2px;
  right: 42px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #8b572a;
  color: white;
  text-align: center;
  line-height: 24px;
  font-size: 18px;
  ${MEDIA_QUERY_1279} {
    position: absolute;
    left: 64px;
    top: 9px;
  }
  ${MEDIA_QUERY_480} {
    position: absolute;
    left: 64px;
    top: 10px;
    font-size: 20px;
  }
`;

const FooterMemberCombo = styled.div`
  ${MEDIA_QUERY_1279} {
    display: flex;
    align-items: center;
    min-width: 180px;
    justify-content: center;
  }

  div {
    ${MEDIA_QUERY_480} {
      font-family: "Noto Sans TC";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 16px;
      text-align: center;
      color: #ffffff;
    }
  }
`;

const FooterMemberIcon = styled.a`
  ${MEDIA_QUERY_1279} {
    filter: brightness(5);
  }
  ${MEDIA_QUERY_480} {
    height: 44px;
    transform: scale(0.83);
  }
`;

function Footer() {
  return (
    <>
      <Foot>
        <FooterContainer>
          <FooterInfo>
            <ul>
              <li>
                <a href="#">關於 STYLiSH</a>
              </li>
              <li>
                <a href="#">服務條款</a>
              </li>
              <li>
                <a href="#">隱私政策</a>
              </li>
              <li>
                <a href="#">聯絡我們</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
            </ul>
            <Conclude>
              <FooterIcons>
                <a href="#">
                  <img src={line} alt="line" />
                </a>
                <a href="#">
                  <img src={twitter} alt="line" />
                </a>
                <a href="#">
                  <img src={facebook} alt="line" />
                </a>
              </FooterIcons>
              <p>&copy; 2018. All rights reserved.</p>
            </Conclude>
          </FooterInfo>
          <MobileCopyright>© 2018. All rights reserved.</MobileCopyright>
          <CartMemberContainer>
            <FooterCartCombo>
              <Link to="/cart">
                <FooterCartIcon href="#" data-count="3">
                  <img src={cart} alt="Stylish" />
                </FooterCartIcon>
              </Link>
              <CartIconNumber>1</CartIconNumber>

              <div>購物車</div>
            </FooterCartCombo>
            <span></span>
            <FooterMemberCombo>
              <Link to="/login">
                <FooterMemberIcon href="#" data-count="3">
                  <img src={member} alt="Stylish" />
                </FooterMemberIcon>
              </Link>
              <div>會員</div>
            </FooterMemberCombo>
          </CartMemberContainer>
        </FooterContainer>
      </Foot>
    </>
  );
}

export default Footer;
