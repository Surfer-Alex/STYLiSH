import {
  MEDIA_QUERY_360,
  MEDIA_QUERY_480,
  MEDIA_QUERY_1279,
} from "./constants/style";
import styled from "styled-components";
import logo from "./images/logo.png";
import search from "./images/search.png";
import cart from "./images/cart.png";
import member from "./images/member.png";
import { Link } from "react-router-dom";

const MainHeader = styled.header`
  background-color: #ffffff;
  height: 100px;
  position: sticky;
  top: 0px;
  width: 100%;
  z-index: 1;
  display: flex;
  align-items: center;

  ${MEDIA_QUERY_480} {
    height: 52px;
  }
`;

const NavAndSearch = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;

  ${MEDIA_QUERY_1279} {
    justify-content: center;
  }
`;

const LogoAndCategory = styled.div`
  display: flex;
  ${MEDIA_QUERY_1279} {
    display: flex;
  }
`;

const Logo = styled.a`
  width: 258px;
  height: 48px;
  margin-left: 60px;

  ${MEDIA_QUERY_1279} {
    margin-left: 0;
  }

  ${MEDIA_QUERY_480} {
    width: 129px;
    height: 24px;
  }
  img {
    max-width: 100%;
  }
`;

const Category = styled.a`
  color: black;
  &.active {
    color: #8b572a;
  }
  &:hover {
    color: #8b572a;
  }
`;

const MainNav = styled.nav`
  display: flex;
  margin-top: 23px;
  margin-left: 57px;
  width: 451px;
  height: 20px;
  ${MEDIA_QUERY_1279} {
    display: none;
  }
  a {
    font-family: "Noto Sans TC";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 28px;
    justify-content: center;
    letter-spacing: 30px;
    display: flex;
  }
  ul {
    width: 451px;
    display: flex;
    li {
      flex-direction: column;
      &:not(:first-child) {
        border-left: 1px solid;
      }
      a {
        width: 150px;
        padding-left: 30px;
      }
    }
  }
`;
const NavSearchCombo = styled.div`
  display: flex;
`;

const HeaderSearch = styled.form`
  display: flex;
  border: 1px solid #979797;
  border-radius: 20px;
  margin-right: 42px;
  height: 46px;
  width: 214px;

  ${MEDIA_QUERY_1279} {
    border: none;
    position: absolute;
    right: 35px;
    top: 35px;
    justify-content: flex-end;
    margin-right: 0;
  }
  ${MEDIA_QUERY_480} {
    right: 21.33px;
    top: 6px;
    align-items: center;
  }
  ${MEDIA_QUERY_360} {
    right: 16px;
    top: 5px;
  }

  label {
    border: none;
    border-radius: 20px;
    background-color: transparent;
    ${MEDIA_QUERY_480} {
      width: 40px;
      padding-left: 6px;
    }
    ${MEDIA_QUERY_360} {
      width: 40px;
    }
  }

  input {
    border: none;
    border-radius: 20px;
    font-family: "Noto Sans TC";
    font-style: normal;
    font-size: 20px;
    width: 148px;
    margin-left: 11px;
    padding-top: 5px;
    padding-left: 9px;
    outline: none;
    caret-color: #8b572a;

    &::-webkit-search-cancel-button {
      display: none;
    }
    &::placeholder {
      color: #8b572a;
    }
    ${MEDIA_QUERY_1279} {
      display: none;
    }
  }

  img {
    width: 100%;
  }
`;

const Menu = styled.input`
  display: none;
`;

const CartCombo = styled.div`
  position: relative;
  ${MEDIA_QUERY_1279} {
    display: none;
  }
`;
const CartIcon = styled.a`
  margin-right: 42px;
  position: relative;
  &:hover {
    filter: brightness(0) saturate(100%) hue-rotate(20deg) invert(20%)
      sepia(100%) saturate(1000%) brightness(110%);
  }
  &::after {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #8b572a;
    color: white;
    text-align: center;
    line-height: 24px;
    font-size: 16px;
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

const MemberIcon = styled.a`
  margin-right: 54px;
  &:hover {
    filter: brightness(0) saturate(100%) hue-rotate(20deg) invert(20%)
      sepia(100%) saturate(1000%) brightness(110%);
  }
  ${MEDIA_QUERY_1279} {
    display: none;
  }
`;
const Split = styled.div`
  background-color: black;
  max-width: 100%;
  height: 40px;
  position: sticky;
  top: 100px;
  z-index: 1;

  ${MEDIA_QUERY_1279} {
    height: 50px;
  }
  ${MEDIA_QUERY_480} {
    top: 52px;
  }
`;

const MobileMainNav = styled.nav`
  display: none;

  ${MEDIA_QUERY_1279} {
    display: flex;
    width: 100%;
    height: 20px;
  }
  ul {
    ${MEDIA_QUERY_1279} {
      width: 100%;
      display: flex;
      height: 16px;
      justify-content: center;
      align-self: center;
      margin-top: 28px;
    }
  }
  li {
    ${MEDIA_QUERY_1279} {
      min-width: 160px;
      &:not(:first-child) {
        border-left: 1px solid white;
      }
    }
  }
  a {
    ${MEDIA_QUERY_1279} {
      font-family: "Noto Sans TC";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      display: flex;
      align-items: center;
      text-align: center;
      color: #ffffff;
    }
  }
  ${MEDIA_QUERY_480} {
    ul {
      width: 100%;
      display: flex;
      height: 16px;
      align-self: center;
      margin-top: 28px;
    }
    li {
      min-width: 160px;
    }
  }
  ${MEDIA_QUERY_360} {
    li {
      min-width: 120px;
    }
  }
`;

function Header({ totalQuantity }) {
  return (
    <>
      <MainHeader>
        <NavAndSearch>
          <LogoAndCategory>
            <Logo href="/home">
              <img src={logo} alt="Stylish" />
            </Logo>
            <MainNav>
              <ul>
                <li>
                  <Category href="/home?category=women" data-link>
                    女裝
                  </Category>
                </li>
                <li>
                  <Category href="/home?category=men" data-link>
                    男裝
                  </Category>
                </li>
                <li>
                  <Category href="/home?category=accessories" data-link>
                    配件
                  </Category>
                </li>
              </ul>
            </MainNav>
          </LogoAndCategory>
          <NavSearchCombo>
            <Menu type="checkbox" id="menu" />
            <HeaderSearch>
              <input type="search" />

              <label>
                <img src={search} alt="Search" />
              </label>
            </HeaderSearch>
            <CartCombo>
              <Link to="/cart">
                <CartIcon data-count="3">
                  <img src={cart} alt="Stylish" />
                </CartIcon>
              </Link>
              <CartIconNumber>{totalQuantity}</CartIconNumber>
            </CartCombo>
            <Link to="/login">
              <MemberIcon href="#" data-count="3">
                <img src={member} alt="Stylish" />
              </MemberIcon>
            </Link>
          </NavSearchCombo>
        </NavAndSearch>
      </MainHeader>
      <Split>
        <MobileMainNav>
          <ul>
            <li>
              <Category href="?category=women" data-link>
                女裝
              </Category>
            </li>
            <li>
              <Category href="?category=men" data-link>
                男裝
              </Category>
            </li>
            <li>
              <Category href="?category=accessories" data-link>
                配件
              </Category>
            </li>
          </ul>
        </MobileMainNav>
      </Split>
    </>
  );
}

export default Header;
