import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
    box-sizing: border-box;
    padding: 0;
    list-style: none;
    margin: 0;
    }

    /*把footer在內容未進來前維持置底*/
    html,
    body {
    height: 100%;
    margin: 0;
    }
    #root {
    height: 100%;
    display: flex;
    flex-direction: column;
    }
    
    
    ul li {
    display: flex;
    list-style: none;
    text-align: center;
    justify-content: center;
    }
    
    ul li a {
    text-decoration: none;
    }

    footer {
    margin-top: 49px;
    width: 100%;
    }

    button{
        border:0;
        outline:none;
        background-color: transparent;
    }
`;

export const ContentWraper = styled.div`
  flex-grow: 1; /*可佔滿垂直剩餘的空間*/
`;

export default GlobalStyle;
