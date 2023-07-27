import {
  MEDIA_QUERY_360,
  MEDIA_QUERY_480,
  MEDIA_QUERY_1279,
} from "./constants/style";
import styled from "styled-components";

import { API_GET_DATA } from "./constants/constants";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";


async function fetchData(setData) {
  const res = await fetch(API_GET_DATA);
  const data1 = await res.json();
  const data = await data1.data;
  setData(data);
}

function Product({ cart, setCart }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedColorName, setSelectedColorName] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isClicked, setIsClicked] = useState(false); //加入購物車按鈕是否點擊

  console.log(data);

  let newFilteredVariants = [];
  if (data?.variants) {
    newFilteredVariants = data.variants
      .map((variant) => {
        if (variant.color_code != selectedColor) return undefined;
        return { ...variant };
      })
      .filter((variant) => variant != undefined);
  }
  console.log(newFilteredVariants);

  cart.forEach((item) => {
    let colorCode = item.color;
    let size = item.size;
    let quantity = item.quantity;

    for (let i = 0; i < newFilteredVariants.length; i++) {
      let variant = newFilteredVariants[i];
      if (
        variant.color_code == colorCode &&
        variant.size == size &&
        variant.stock > 0
      ) {
        //find!
        console.log("find!!!!!!!");
        variant.stock -= quantity;
      }
    }
  });
  console.log("new after calcaulation", newFilteredVariants);

  const filteredVariants = newFilteredVariants.filter(
    (variant) => variant.size === selectedSize
  );

  const stockQuantity =
    filteredVariants.length > 0 ? filteredVariants[0].stock : 0;
  console.log(`剩餘庫存: ${stockQuantity}`);

  const handleColorSelect = (colorCode, colorName) => {
    setSelectedColor(colorCode);
    setSelectedColorName(colorName);
    setSelectedSize("");
    setQuantity(1);
  };
  const handleSizeSelect = (size) => {
    if (newFilteredVariants.filter((i) => i.size === size)[0].stock !== 0) {
      setSelectedSize(size);
      setQuantity(1);
    }
  };

  const increaseQTY = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  const decreaseQTY = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  const handleAddToCart = () => {
    const item = {
      uniqueId: nanoid(),
      photo: data.main_image,
      title: data.title,
      id: data.id,
      color: selectedColor,
      colorName: selectedColorName,
      size: selectedSize,
      quantity: quantity,
      price: data.price,
      maxQuantity: stockQuantity,
    };

    const existingItem = cart.find(
      (cartItem) =>
        cartItem.id === item.id &&
        cartItem.color === item.color &&
        cartItem.size === item.size
    );
    console.log(existingItem);
    if (existingItem) {
      // 更新
      existingItem.quantity += item.quantity;
      setCart([...cart]);
    } else {
      // 添加
      setCart([...cart, item]);
    }

    setIsClicked(true); //讓點擊狀態true
    setTimeout(() => {
      setIsClicked(false);
    }, 500); //過0.5秒變回false
    setSelectedSize("");
    setQuantity(1);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]); //監聽cart變化

  useEffect(() => {
    setLoading(true);
    fetchData(setData);
    setLoading(false);
  }, []);

  const colorBlock = data?.colors.map((color) => (
    <Color
      key={color.code}
      bg={`#${color.code}`}
      isSelected={selectedColor === color.code}
      onClick={() => handleColorSelect(color.code, color.name)}
    ></Color>
  ));
  const belowImg = data?.images.map((img, index) => (
    <BelowImg src={`${img}`} />
  ));
  const descriptionText = data?.description.split("\r\n");
  const sizeMap = data?.sizes.map((size) => (
    <Size
      isSelected={selectedSize === size}
      isSelectable={
        selectedColor !== "" &&
        newFilteredVariants.filter((i) => i.size === size)[0].stock !== 0
      }
      onClick={() => handleSizeSelect(size)}
    >
      {size}
    </Size>
  ));

  return (
    <>
      {data && (
        <Wraper>
          <Container>
            <Detail>
              <Img src={data.main_image} />
              <DetailContext>
                <Title>{data.title}</Title>
                <Id>{data.id}</Id>
                <Price>TWD {data.price}</Price>
                <Split></Split>
                <CSQCombo>
                  <Colors>
                    <CSQText mgr="24px">顏色</CSQText>
                    {colorBlock}
                    {/* <Color  bg="#ffffff" mgl='13px' mgl480='-2px' otl="1px solid #979797"
    otloff="4px"></Color>
                            <Color  bg="#ddffbb"></Color>
                            <Color  bg="#CCCCCC"></Color> */}
                  </Colors>
                  <Sizes>
                    <CSQText>尺寸</CSQText>
                    {sizeMap}
                    {/* <Size  bg="#000000" col="#FFFFFF" >S</Size>
                            <Size  bg="#ECECEC" col="#3F3A3A">M</Size>
                            <Size  bg="rgba(236, 236, 236, 0.25)" col="rgba(63, 58, 58, 0.25)">L</Size> */}
                  </Sizes>
                  <Qty>
                    <CSQText dis="none">數量</CSQText>
                    <QtySelector>
                      <Minus onClick={decreaseQTY}>-</Minus>
                      <Number>{quantity}</Number>
                      <Plus
                        onClick={increaseQTY}
                        disabled={quantity >= stockQuantity}
                      >
                        +
                      </Plus>
                    </QtySelector>
                  </Qty>
                </CSQCombo>
                <AddToCart
                  disabled={selectedColor === "" || selectedSize === ""}
                  clicked={isClicked}
                  onClick={handleAddToCart}
                >
                  {isClicked ? "已加入，買買買!" : "加入購物車"}
                </AddToCart>
                <div>
                  剩餘庫存:
                  {stockQuantity === 0 ? "請點選顏色及尺寸" : stockQuantity}
                </div>
                <Info>
                  {data.note} <br />
                  <br />
                  {data.texture} <br />
                  {descriptionText &&
                    descriptionText.map((text) => (
                      <>
                        {text}
                        <br />
                      </>
                    ))}
                  <br />
                  <br />
                  清洗：{data.wash} <br />
                  產地：{data.place}
                </Info>
              </DetailContext>
            </Detail>
            <Description>
              <MoreInfoSplit>
                <MoreInfo>更多產品資訊</MoreInfo>
                <BigSplit></BigSplit>
              </MoreInfoSplit>
              <DescriptionContent>{data.story}</DescriptionContent>
            </Description>
            <Photo>
              {belowImg}
              {/* <BelowImg src={zero} />
                <BelowImg src={one}  />  */}
            </Photo>
          </Container>
        </Wraper>
      )}
      <div>
        <h2>{loading ? "...載入中" : null}</h2>
      </div>
    </>
  );
}
export default Product;

const Wraper = styled.div`
  display: flex;
  width: 100%;

  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  max-width: 960px;
  margin-top: 65px;
  flex-direction: column;

  ${MEDIA_QUERY_480} {
    margin-top: 0px;
  }
  ${MEDIA_QUERY_360} {
    width: 360px;
  }
`;

const Detail = styled.div`
  display: flex;
  ${MEDIA_QUERY_1279} {
    flex-wrap: wrap;
  }
`;
const Img = styled.img`
  width: 560px;
  height: 746.67px;

  ${MEDIA_QUERY_1279} {
    width: 100%;
  }

  ${MEDIA_QUERY_480} {
    width: 480px;
    height: 640px;

    align-self: center;
  }
  ${MEDIA_QUERY_360} {
    width: 360px;
    height: 480px;
  }
`;
const BelowImg = styled.img`
  width: 100%;
  height: 540px;
  &:not(:first-child) {
    margin-top: 29px;
  }

  ${MEDIA_QUERY_480} {
    width: 432px;
    height: 243px;

    align-self: center;
    &:not(:first-child) {
      margin-top: 18px;
    }
  }
  ${MEDIA_QUERY_360} {
    width: 312px;
    height: 175.5px;
    margin-top: ${({ mgt360 }) => mgt360};
  }
`;

const DetailContext = styled.div`
  width: 400px;
  height: 747px;
  display: flex;
  flex-direction: column;
  margin-left: 40px;

  ${MEDIA_QUERY_1279} {
    margin-left: 24px;
    width: 312px;
  }

  ${MEDIA_QUERY_360} {
    margin-left: 24px;
    width: 312px;
  }
`;
const Title = styled.div`
  font-family: "Noto Sans TC";
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 38px;
  letter-spacing: 6.4px;
  color: #3f3a3a;
  ${MEDIA_QUERY_1279} {
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 4px;
    margin-top: 17px;
  }
`;
const Id = styled.div`
  font-family: "Noto Sans TC";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 4px;
  color: #bababa;
  margin-top: 16px;
  ${MEDIA_QUERY_1279} {
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 3.2px;
    margin-top: 10px;
  }
  ${MEDIA_QUERY_360} {
  }
`;

const Price = styled.div`
  font-family: "Noto Sans TC";
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  line-height: 36px;
  color: #3f3a3a;
  margin-top: 40px;
  ${MEDIA_QUERY_1279} {
    font-size: 20px;
    line-height: 24px;
    margin-top: 20px;
  }
  ${MEDIA_QUERY_360} {
  }
`;

const Split = styled.div`
  width: 360px;
  border: 1px solid #3f3a3a;
  margin-top: 20px;
  ${MEDIA_QUERY_1279} {
    width: 432px;
    margin-top: 10px;
  }
  ${MEDIA_QUERY_360} {
    width: 312px;
  }
`;
const CSQCombo = styled.div`
  width: 300px;
  margin-top: 36px;
  ${MEDIA_QUERY_360} {
    width: 312px;
  }
`;
const Colors = styled.div`
  width: 300px;

  display: flex;
`;
const Sizes = styled.div`
  width: 300px;
  display: flex;
  margin-top: 40px;
`;
const Qty = styled.div`
  width: 300px;
  align-items: center;
  display: flex;
  margin-top: 21px;
  ${MEDIA_QUERY_1279} {
    width: 432px;
    margin-top: 28px;
  }
  ${MEDIA_QUERY_360} {
    width: 312px;
  }
`;
const CSQText = styled.div`
  font-family: "Noto Sans TC";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 4px;
  color: #3f3a3a;
  border-right: 1px solid black;
  padding-right: 10px;
  margin-right: 24px;
  margin-right: ${({ mgr }) => mgr};
  ${MEDIA_QUERY_1279} {
    font-size: 14px;
    line-height: 17px;
    display: ${({ dis }) => dis};
  }
`;
const Color = styled.button`
  width: 24px;
  height: 24px;
  background-color: ${({ bg }) => bg};
  border: 1px solid #d3d3d3;
  margin-right: 32px;
  outline-offset: ${(props) => (props.isSelected ? "4px" : "none")};
  outline: ${(props) => (props.isSelected ? "1px solid #979797" : "none")};

  &:nth-child(2) {
    margin-left: 13px;
  }
  ${MEDIA_QUERY_1279} {
    margin-right: 27px;
    &:nth-child(2) {
      margin-left: -2px;
    }
  }
`;
const Size = styled.button`
  ${(props) => {
    if (props.isSelected) {
      return "background-color:#000000; color:#FFFFFF;";
    }
    if (props.isSelectable) {
      return "background-color:#ECECEC; color:#3F3A3A;";
    }

    return "background-color:rgba(236, 236, 236, 0.25); color:rgba(63, 58, 58, 0.25);";
  }};

  width: 36px;
  height: 36px;
  border-radius: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Noto Sans TC";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 36px;
  margin-right: 20px;
  margin-top: -5px;
  transition: background-color 0.3s;
  &:nth-child(2) {
    margin-left: 10px;
  }
  ${MEDIA_QUERY_1279} {
    margin-right: 15px;
    margin-top: -7px;
    &:nth-child(2) {
      margin-left: -10px;
    }
  }
`;
const QtySelector = styled.div`
  width: 160px;
  height: 44px;
  background: #ffffff;
  border: 1px solid #979797;
  display: flex;
  justify-content: space-around;
  margin-left: 10px;
  align-items: center;

  ${MEDIA_QUERY_1279} {
    width: 432px;
    height: 44px;
    margin-left: 0px;
    justify-content: space-between;
  }
  ${MEDIA_QUERY_360} {
    width: 312px;
  }
`;
const Minus = styled.button`
  width: 40px;
  height: 32px;
  font-family: "Noto Sans TC";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 32px;
  color: #000000;
  ${MEDIA_QUERY_1279} {
    width: 105px;
  }
`;
const Number = styled.div`
  width: 80px;
  height: 32px;
  font-family: "Noto Sans TC";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 32px;
  color: #8b572a;
  text-align: center;
  ${MEDIA_QUERY_1279} {
    font-size: 20px;
    line-height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const Plus = styled.button`
  width: 40px;
  height: 32px;
  font-family: "Noto Sans TC";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 32px;
  color: #000000;
  ${MEDIA_QUERY_1279} {
    width: 110px;
  }
`;
const AddToCart = styled.button`
  width: 360px;
  height: 64px;
  background: #000000;
  border: 1px solid #979797;
  font-family: "Noto Sans TC";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 4px;
  color: #ffffff;
  margin-top: 26px;
  transition: background 0.3s ease;
  &:hover {
    transform: scale(1.1);
    transition: transform 0.3s ease-in-out;
  }

  ${(props) =>
    props.clicked &&
    `
      background: linear-gradient(to right, #bdc3c7, #2c3e50);
      color: #ffffff;
      transform: scale(1.1);
      
    `};

  ${MEDIA_QUERY_1279} {
    width: 432px;
    height: 44px;
    margin-top: 10px;
    font-size: 16px;
    line-height: 30px;
    letter-spacing: 3.2px;
  }
  ${MEDIA_QUERY_360} {
    width: 312px;
  }
`;
const Info = styled.p`
  height: 240px;
  font-family: "Noto Sans TC";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  color: #3f3a3a;
  margin-top: 40px;
  margin-left: 5px;
  ${MEDIA_QUERY_1279} {
    height: 192px;
    font-size: 14px;
    line-height: 24px;
    margin-top: 28px;
    margin-left: 0;
  }
`;
const Description = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  ${MEDIA_QUERY_1279} {
    align-items: center;
  }
`;
const Photo = styled.div`
  width: 100%;
  margin-top: 30px;

  ${MEDIA_QUERY_1279} {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }
  ${MEDIA_QUERY_360} {
    display: flex;
    flex-direction: column;
    margin-top: 70px;
  }
`;
const MoreInfo = styled.div`
  height: 30px;
  font-family: "Noto Sans TC";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 3px;
  color: #8b572a;
  ${MEDIA_QUERY_1279} {
    font-size: 16px;
    letter-spacing: 3.2px;
  }
`;
const BigSplit = styled.div`
  width: 761px;
  height: 0px;
  border: 1px solid #3f3a3a;
  ${MEDIA_QUERY_1279} {
    width: 100%;
  }
  ${MEDIA_QUERY_480} {
    width: 285px;
  }
  ${MEDIA_QUERY_360} {
    width: 165px;
  }
`;
const MoreInfoSplit = styled.div`
  display: flex;
  align-items: center;
  margin-top: 50.33px;
  justify-content: space-between;
  ${MEDIA_QUERY_1279} {
    margin-top: -118px;
    width: 100%;
    padding: 0 24px;
  }

  ${MEDIA_QUERY_360} {
    padding: 0 24px;
  }
`;
const DescriptionContent = styled.div`
  height: 60px;
  font-family: "Noto Sans TC";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  color: #3f3a3a;
  margin-top: 28px;
  ${MEDIA_QUERY_1279} {
    height: 75px;
    font-size: 14px;
    line-height: 25px;
    margin-top: 15px;
    width: 432px;
  }
  ${MEDIA_QUERY_360} {
    width: 312px;
  }
`;
