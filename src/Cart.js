import React, { useState, useEffect } from "react";
import {
  MEDIA_QUERY_360,
  MEDIA_QUERY_480,
  MEDIA_QUERY_1279,
} from "./constants/style";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Cart = ({ cart, setCart, setPrime }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    TPDirect.card.setup({
      fields: {
        number: {
          // css selector
          element: "#card-number",
          placeholder: "**** **** **** ****",
        },
        expirationDate: {
          // DOM object
          element: document.getElementById("card-expiration-date"),
          placeholder: "MM / YY",
        },
        ccv: {
          element: "#card-ccv",
          placeholder: "ccv",
        },
      },
      styles: {
        // Style all elements
        input: {
          color: "gray",
        },
        // Styling ccv field
        "input.ccv": {
          // 'font-size': '16px'
        },
        // Styling expiration-date field
        "input.expiration-date": {
          // 'font-size': '16px'
        },
        // Styling card-number field
        "input.card-number": {
          // 'font-size': '16px'
        },
        // style focus state
        ":focus": {
          // 'color': 'black'
        },
        // style valid state
        ".valid": {
          color: "green",
        },
        // style invalid state
        ".invalid": {
          color: "red",
        },
        // Media queries
        // Note that these apply to the iframe, not the root window.
        "@media screen and (max-width: 400px)": {
          input: {
            color: "orange",
          },
        },
      },
      // 此設定會顯示卡號輸入正確後，會顯示前六後四碼信用卡卡號
      isMaskCreditCardNumber: true,
      maskCreditCardNumberRange: {
        beginIndex: 6,
        endIndex: 11,
      },
    });
  }, []);

  async function onSubmit(event) {
    // 取得 TapPay Fields 的 status
    const tappayStatus = TPDirect.card.getTappayFieldsStatus();

    // 確認是否可以 getPrime
    if (tappayStatus.canGetPrime === false) {
      alert("can not get prime");
      return;
    }

    // Get prime
    try {
      const result = await new Promise((resolve, reject) => {
        TPDirect.card.getPrime((result) => {
          resolve(result);
        });
      });

      if (result.status !== 0) {
        alert("get prime error " + result.msg);
        return;
      }

      alert("get prime 成功，prime: " + result.card.prime);
      console.log(result.card.prime);
      setPrime(result.card.prime);

      // send prime to your server, to pay with Pay by Prime API.
      // Pay By Prime Docs: https://docs.tappaysdk.com/tutorial/zh/back.html#pay-by-prime-api
      navigate("/Thankyou");
    } catch (error) {
      alert("get prime error " + error);
    }
  }

  const cartSection = cart?.map((i) => {
    const handleQuantityChange = (
      image,
      title,
      id,
      color,
      colorName,
      size,
      quantity,
      price
    ) => {
      console.log(id + ":" + quantity);

      const item = {
        photo: image,
        title: title,
        id: id,
        color: color,
        colorName: colorName,
        size: size,
        quantity: quantity,
        price: price,
      };
      const existingItem = cart.find(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.color === item.color &&
          cartItem.size === item.size
      );
      if (existingItem) {
        // 更新
        existingItem.quantity = parseInt(item.quantity);
        setCart([...cart]);
      } else {
        // 添加
        setCart([...cart, item]);
      }
    };

    return (
      <CartInfoCombo>
        <Img src={i.photo} />
        <ProductCombo>
          <ProductName>{i.title}</ProductName>
          <ProductID>{i.id}</ProductID>
          <ProductColorName>顏色｜{i.colorName}</ProductColorName>
          <ProductSize>尺寸｜{i.size}</ProductSize>
        </ProductCombo>
        <SelectCombo>
          <MobileCombo>
            <MobileTitleText pdr="41px" pdr360="0px">
              數量
            </MobileTitleText>
            <MobileTitleText>單價</MobileTitleText>
            <MobileTitleText pdl="40px" pdl360="0px">
              小計
            </MobileTitleText>
          </MobileCombo>
          <SPSCombo>
            <SmallContainer pdr="39px" pdr360="0px">
              <Select
                value={i.quantity}
                onChange={(e) =>
                  handleQuantityChange(
                    i.photo,
                    i.title,
                    i.id,
                    i.color,
                    i.colorName,
                    i.size,
                    e.target.value,
                    i.price
                  )
                }
              >
                {Array.from({ length: i.maxQuantity }).map((_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </Select>
            </SmallContainer>
            <SmallContainer>
              <Price>TWD.{i.price}</Price>
            </SmallContainer>
            <SmallContainer pdl="39px !important" pdl360="0px">
              <Sum>TWD.{i.quantity * i.price}</Sum>
            </SmallContainer>
          </SPSCombo>
        </SelectCombo>
        <DelectButton onClick={() => removeFromCart(i.uniqueId)}></DelectButton>
      </CartInfoCombo>
    );
  });

  const total = cart?.reduce(
    (accumulator, item) => accumulator + item.price * item.quantity,
    0
  );

  const removeFromCart = (uniqueId) => {
    const updatedCart = cart.filter((item) => item.uniqueId !== uniqueId);
    setCart(updatedCart);
  };

  function nameChange(e) {
    setName(e.target.value);
  }
  function phoneChange(e) {
    if (e.target.value.length <= 10) {
      setPhone(e.target.value);
    } else if (e.target.value.length > 10) {
      window.alert("電話最多輸入10個數字");
    }
  }
  function addressChange(e) {
    setAddress(e.target.value);
  }
  function emailChange(e) {
    setEmail(e.target.value);
  }

  return (
    <>
      <Wraper>
        <CartInfo>
          <CartTitleCombo>
            <CartTitle>購物車</CartTitle>
            <DesktopCombo>
              <DesktopTitleText>數量</DesktopTitleText>
              <DesktopTitleText>單價</DesktopTitleText>
              <DesktopTitleText>小計</DesktopTitleText>
            </DesktopCombo>
          </CartTitleCombo>
          <CartContainer>
            {cartSection}

            {/* <CartInfoCombo>
              <Img src={main} />
              <ProductCombo>
                <ProductName>前開衩扭結洋裝</ProductName>
                <ProductID>201807201824</ProductID>
                <ProductColorName>顏色｜白</ProductColorName>
                <ProductSize>尺寸｜M</ProductSize>
              </ProductCombo>
              <SelectCombo>
                <MobileCombo>
                  <MobileTitleText pdr="41px" pdr360="0px">
                    數量
                  </MobileTitleText>
                  <MobileTitleText>單價</MobileTitleText>
                  <MobileTitleText pdl="40px" pdl360="0px">
                    小計
                  </MobileTitleText>
                </MobileCombo>
                <SPSCombo>
                  <SmallContainer pdr="39px" pdr360="0px">
                    <Select>
                      <option value="1" selected>
                        1
                      </option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </Select>
                  </SmallContainer>
                  <SmallContainer>
                    <Price>TWD.799</Price>
                  </SmallContainer>
                  <SmallContainer pdl="39px !important"  pdl360="0px">
                    <Sum>TWD.799</Sum>
                  </SmallContainer>
                </SPSCombo>
              </SelectCombo>
              <DelectButton></DelectButton>
            </CartInfoCombo>

            <CartInfoCombo>
              <Img src={main} />
              <ProductCombo>
                <ProductName>前開衩扭結洋裝</ProductName>
                <ProductID>201807201824</ProductID>
                <ProductColorName>顏色｜白</ProductColorName>
                <ProductSize>尺寸｜M</ProductSize>
              </ProductCombo>
              <SelectCombo>
                <MobileCombo>
                  <MobileTitleText pdr="41px" pdr360="0px">
                    數量
                  </MobileTitleText>
                  <MobileTitleText>單價</MobileTitleText>
                  <MobileTitleText pdl="40px" pdl360="0px">
                    小計
                  </MobileTitleText>
                </MobileCombo>
                <SPSCombo>
                  <SmallContainer pdr="39px" pdr360="0px">
                    <Select>
                      <option value="1" selected>
                        1
                      </option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </Select>
                  </SmallContainer>
                  <SmallContainer>
                    <Price>TWD.799</Price>
                  </SmallContainer>
                  <SmallContainer pdl="39px !important"  pdl360="0px">
                    <Sum>TWD.799</Sum>
                  </SmallContainer>
                </SPSCombo>
              </SelectCombo>
              <DelectButton></DelectButton>
            </CartInfoCombo> */}
          </CartContainer>
        </CartInfo>
        <OrderInfo>
          <InfoTitle>訂購資料</InfoTitle>
          <OrderInfoCombo>
            <InfoLabel mgt="25px">
              <Text>收件人姓名</Text>
              <Input value={name} onChange={nameChange} />
            </InfoLabel>
            <Tips>務必填寫完整收件人姓名，避免包裹無法順利簽收</Tips>
            <InfoLabel>
              <Text>手機</Text>
              <Input value={phone} onChange={phoneChange} />
            </InfoLabel>
            <InfoLabel>
              <Text>地址</Text>
              <Input value={address} onChange={addressChange} />
            </InfoLabel>
            <InfoLabel>
              <Text>Email</Text>
              <Input value={email} onChange={emailChange} />
            </InfoLabel>
            <InfoLabel mgt="34px">
              <Text>配送時間</Text>
              <CircleInputCombo>
                <CircleInput />
                08:00-12:00
                <CircleInput />
                14:00-18:00
                <CircleInput />
                不指定
              </CircleInputCombo>
            </InfoLabel>
          </OrderInfoCombo>
        </OrderInfo>
        <PaymentInfo>
          <InfoTitle>付款資料</InfoTitle>
          <PaymentInfoCombo>
            <InfoLabel mgt="25px">
              <Text>信用卡號碼</Text>
              <TpField id="card-number"></TpField>
            </InfoLabel>
            <InfoLabel>
              <Text>有效期限</Text>
              <TpField id="card-expiration-date"></TpField>
            </InfoLabel>
            <InfoLabel>
              <Text>安全碼</Text>
              <TpField id="card-ccv"></TpField>
            </InfoLabel>
          </PaymentInfoCombo>
        </PaymentInfo>
        <CheckoutInfo>
          <CalCombo>
            <CalLinecombo>
              <CalText>總金額</CalText>
              <CACombo pdr="4px">
                <CalText>NT.</CalText>
                <Amount>{total}</Amount>
              </CACombo>
            </CalLinecombo>
            <CalLinecombo>
              <CalText>運費</CalText>
              <CACombo pdr="2px">
                <CalText>NT.</CalText>
                <Amount>{total && 30}</Amount>
              </CACombo>
            </CalLinecombo>
            <CalLinecombo bdb="1px solid #3F3A3A" mgb="19px"></CalLinecombo>
            <CalLinecombo>
              <CalText mgl480="3px">應付金額</CalText>
              <CACombo pdr="1px">
                <CalText>NT.</CalText>
                <Amount>{total && total + 30}</Amount>
              </CACombo>
            </CalLinecombo>
          </CalCombo>

          <ComfirmToPay onClick={onSubmit}>確認付款</ComfirmToPay>
        </CheckoutInfo>
      </Wraper>
    </>
  );
};

export default Cart;

const Wraper = styled.div`
  max-width: 1160px;
  justify-content: center;
  margin: 51px auto 100px;
  ${MEDIA_QUERY_1279} {
    margin: 20px auto -5px;
    padding: 0 24px;
  }
`;

const CartInfo = styled.div`
  max-width: 1160px;
  width: 100%;
`;

const OrderInfo = styled.div`
  max-width: 1160px;
  width: 100%;
  margin-top: 50px;
  ${MEDIA_QUERY_1279} {
    margin-top: 20px;
  }
`;

const PaymentInfo = styled.div`
  max-width: 1160px;
  width: 100%;
  margin-top: 53px;
  ${MEDIA_QUERY_1279} {
    margin-top: 20px;
  }
`;

const CheckoutInfo = styled.div`
  max-width: 1160px;
  width: 100%;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  ${MEDIA_QUERY_1279} {
    margin-top: 22px;
  }
`;

const InfoTitle = styled.div`
  max-width: 1160px;
  width: 100%;
  height: 35px;
  vertical-align: top;
  border-bottom: 1px solid black;
  font-family: "Noto Sans TC";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #3f3a3a;
  ${MEDIA_QUERY_1279} {
    height: 29px;
  }
`;

const OrderInfoCombo = styled.div`
  max-width: 1160px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Tips = styled.div`
  font-family: "Noto Sans TC";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #8b572a;
  max-width: 696px;
  text-align: end;
  margin-top: 10px;
  ${MEDIA_QUERY_1279} {
    font-size: 14px;
    line-height: 17px;
    margin-top: 6px;
    text-align: start;
  }
`;

const PaymentInfoCombo = styled.div`
  max-width: 1160px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const InfoLabel = styled.label`
  width: 100%;
  display: flex;
  font-family: "Noto Sans TC";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #3f3a3a;
  margin-top: 30px;
  margin-top: ${({ mgt }) => mgt};
  ${MEDIA_QUERY_1279} {
    font-size: 14px;
    line-height: 17px;
    flex-wrap: wrap;
    margin-top: 20px;
  }
`;

const Text = styled.div`
  width: 120px;
  align-self: center;
  ${MEDIA_QUERY_1279} {
    margin-bottom: 10px;
    width: 100%;
  }
`;

const Input = styled.input.attrs({
  type: "text",
})`
  width: 576px;
  height: 32px;
  border: 1px solid #979797;
  border-radius: 8px;
  font-family: "Noto Sans TC";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 32px;

  padding-left: 6px;
  &::placeholder {
    color: #d3d3d3;
  }
`;

const CircleInputCombo = styled.div`
  align-items: baseline;
  ${MEDIA_QUERY_1279} {
    line-height: 26px;
  }
`;

const CircleInput = styled.input.attrs({
  type: "radio",
  name: "options",
})`
  width: 16px;
  height: 16px;
  border: 1px solid #979797;
  margin-right: 8px;
  &:not(:first-child) {
    margin-left: 32px;
  }
  ${MEDIA_QUERY_1279} {
    margin-right: 6px;
    &:not(:first-child) {
      margin-left: 26px;
    }
  }
`;

const CalText = styled.div`
  font-family: "Noto Sans TC";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #3f3a3a;
  align-self: center;
  margin-right: ${({ mgr }) => mgr};
  ${MEDIA_QUERY_480} {
    margin-left: ${({ mgl480 }) => mgl480};
  }
`;

const CACombo = styled.div`
  display: flex;
  margin-left: auto;
  margin-left: ${({ mgl }) => mgl};
  padding-right: ${({ pdr }) => pdr};
`;

const CalCombo = styled.div`
  width: 240px;
`;

const CalLinecombo = styled.div`
  display: flex;
  margin-bottom: 20px;
  margin-bottom: ${({ mgb }) => mgb};
  border-bottom: ${({ bdb }) => bdb};
  &:last-child {
    margin-bottom: 0px;
  }
`;

const Amount = styled.div`
  font-family: "Noto Sans TC";
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  line-height: 36px;
  color: #3f3a3a;
  margin-left: 8px;
`;

const ComfirmToPay = styled.button`
  font-family: "Noto Sans TC";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 4px;
  color: #ffffff;
  background: #000000;
  width: 240px;
  height: 64px;
  margin-top: 50px;
  padding-left: 4px;
  ${MEDIA_QUERY_1279} {
    width: 100%;
    height: 44px;
    font-size: 16px;
    line-height: 30px;
    margin-top: 36px;
    letter-spacing: 3.2px;
  }
`;

const CartTitle = styled.div`
  font-family: "Noto Sans TC";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #3f3a3a;
`;

const CartTitleCombo = styled.div`
  display: flex;
`;

const DesktopCombo = styled.div`
  display: flex;
  margin-left: 490px;
  ${MEDIA_QUERY_1279} {
    display: none;
  }
`;

const DesktopTitleText = styled.div`
  display: flex;
  font-family: "Noto Sans TC";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  color: #3f3a3a;
  &:not(:first-child) {
    margin-left: 160px;
  }
`;

const CartInfoCombo = styled.div`
  width: 100%;
  max-width: 1160px;
  display: flex;
  margin-bottom: 30px;
  &:last-child {
    margin-bottom: 0;
  }
  ${MEDIA_QUERY_1279} {
    flex-wrap: wrap;
    border-top: 1px solid #000000;
    padding-top: 20px;
    margin-bottom: 19px;
  }
`;

const Img = styled.img`
  width: 114px;
  height: 152px;
  vertical-align: top;
  ${MEDIA_QUERY_1279} {
    order: 1;
  }
`;

const ProductName = styled.div`
  font-family: "Noto Sans TC";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #3f3a3a;
  ${MEDIA_QUERY_1279} {
    font-size: 14px;
    line-height: 17px;
  }
`;

const ProductID = styled.div`
  font-family: "Noto Sans TC";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  margin-top: 18px;
  ${MEDIA_QUERY_1279} {
    font-size: 14px;
    line-height: 17px;
    color: #3f3a3a;
    margin-top: 20px;
  }
`;

const ProductColorName = styled.div`
  font-family: "Noto Sans TC";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  margin-top: 22px;
  ${MEDIA_QUERY_1279} {
    font-size: 14px;
    line-height: 17px;
    margin-top: 24px;
    color: #3f3a3a;
  }
`;

const ProductSize = styled.div`
  font-family: "Noto Sans TC";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  margin-top: 10px;
  ${MEDIA_QUERY_1279} {
    font-size: 14px;
    line-height: 17px;
    margin-top: 12px;
    color: #3f3a3a;
  }
`;

const ProductCombo = styled.div`
  margin-left: 16px;
  ${MEDIA_QUERY_1279} {
    width: calc(100% - 226px);
    order: 1;
    margin-left: 10px;
  }
  ${MEDIA_QUERY_480} {
    width: calc(100% - 215px);
  }
  ${MEDIA_QUERY_360} {
    width: calc(100% - 214px);
  }
`;

const SelectCombo = styled.div`
  margin-left: auto;
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  ${MEDIA_QUERY_1279} {
    order: 2;
    flex-direction: column;
    margin-left: 0;
    width: 100%;
    margin-top: 20px;
  }
`;

const Select = styled.select.attrs({
  name: "number",
})`
  width: 80px;
  height: 32px;
  background: #f3f3f3;
  border: 1px solid #979797;
  border-radius: 8px;
  padding-left: 11px;
  font-family: "Noto Sans TC";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #3f3a3a;
  ${MEDIA_QUERY_1279} {
    height: 30px;
  }
`;

const Price = styled.div`
  font-family: "Noto Sans TC";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #3f3a3a;
  width: 192px;
  text-align: center;
  margin-left: 56px;
  ${MEDIA_QUERY_1279} {
    width: 100%;
    margin-left: 0;
    font-size: 14px;
    line-height: 17px;
  }
`;

const Sum = styled.div`
  font-family: "Noto Sans TC";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #3f3a3a;
  width: 192px;
  text-align: center;
  ${MEDIA_QUERY_1279} {
    width: 100%;
    font-size: 14px;
    line-height: 17px;
  }
`;

const SPSCombo = styled.div`
  display: flex;
  align-items: center;
  ${MEDIA_QUERY_1279} {
    order: 2;
    margin-top: 12px;
  }
`;

const DelectButton = styled.button`
  background-image: url(./images/cart-remove.png);
  width: 44px;
  height: 44px;
  margin-left: 52px;
  align-self: center;
  ${MEDIA_QUERY_1279} {
    order: 1;
    margin-left: 58px;
    align-self: flex-start;
  }
  ${MEDIA_QUERY_480} {
    margin-left: 46px;
  }
  ${MEDIA_QUERY_360} {
    margin-left: 46px;
  }
`;

const MobileTitleText = styled.div`
  font-family: "Noto Sans TC";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #3f3a3a;
  ${MEDIA_QUERY_1279} {
    width: calc(100% / 3);
    text-align: center;
    padding-right: ${({ pdr }) => pdr};
    padding-left: ${({ pdl }) => pdl};
  }
  ${MEDIA_QUERY_360} {
    padding-right: ${({ pdr360 }) => pdr360};
    padding-left: ${({ pdl360 }) => pdl360};
  }
`;

const MobileCombo = styled.div`
  display: none;
  //display:flex;
  ${MEDIA_QUERY_1279} {
    display: flex;
  }
`;

const CartContainer = styled.div`
  border: 1px solid #979797;
  padding: 39px 29px;
  margin-top: 16px;
  ${MEDIA_QUERY_1279} {
    border: none;
    margin-top: 10px;
    padding: 0 0;
  }
`;

const SmallContainer = styled.div`
  ${MEDIA_QUERY_1279} {
    width: calc(100% / 3);
    display: flex;
    justify-content: center;
    /* justify-content: ${({ jc }) => jc}; */
    padding-right: ${({ pdr }) => pdr};
    padding-left: ${({ pdl }) => pdl};
  }
  ${MEDIA_QUERY_360} {
    padding-right: ${({ pdr360 }) => pdr360};
    padding-left: ${({ pdl360 }) => pdl360};
  }
`;

const TpField = styled.div`
  width: 576px;
  height: 32px;
  border: 1px solid #979797;
  border-radius: 8px;
  font-family: "Noto Sans TC";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 32px;

  padding-left: 6px;
`;
