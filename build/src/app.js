import "./loader.js";
import "./checkbox.js";

import { urlCategory, navColorHighlight } from "./category.js";
import { router } from "./router.js";

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");
const totalQuantity = cartFromLocalStorage.reduce((total, item) => total + item.quantity, 0);
document.querySelectorAll(".cart-icon-number").forEach((i) => {
  i.innerHTML =totalQuantity
})


// 判斷要拿的api產品分類
let x = 0;
function generateUrl(Category, y) {
  const baseUrl = "https://api.appworks-school.tw/api/1.0/products/";
  const url = Category
    ? `${baseUrl}${Category}?paging=${y}`
    : `${baseUrl}all?paging=${y}`;
  return url;
}
const url = generateUrl(urlCategory, x);

function ajax(pushurl) {
  return fetch(pushurl, { method: "GET" })
    .then((res) => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then((res) => res.data)
    .catch((err) => err);
}

function render(data) {
  document.getElementsByClassName("products")[0].innerHTML =
    generateProductList(data);
}

function generateProductList(data) {
  const domPlace = data
    .map((items) => {
      const colors = items.colors
        .map((item) => {
          return `
            <div class="color" style="background-color: #${item.code}"></div>`;
        })
        .join("");
      return `
        <div class="product-list1">
        <a href="/product?id=${items.id}">
        <img src="${items.main_image}" alt="Product list" />
        <div class="colors">
        ${colors}
        </div>
        <div class="product-title">
        <span>${items.title}</span><br />
        </div>
        <div class="product-price">
        <span>$${items.price}</span>
        </a>
        </div>
    </div>`;
    })
    .join("");

  return domPlace;
}

// const url =
//   `https://api.appworks-school.tw/api/1.0/products/${urlCategory}?paging=1`;

const loader = document.querySelector(".loader");

const navigateTo = (historyurl) => {
  history.pushState(null, null, historyurl);
  router();

  loader.classList.remove("loader--hidden");
  // console.log(window.location.href);
  // console.log(urlCategory);
  // console.log(url);
  const newUrlParams = new URLSearchParams(window.location.search);
  const newCategory = newUrlParams.get("category");
  // console.log(newCategory);

  const pushUrl = `https://api.appworks-school.tw/api/1.0/products/${newCategory}`;

  ajax(pushUrl).then((data) => {
    render(data);
  });

  x = 0;
  navColorHighlight();
};

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  router();
});

window.addEventListener(
  "popstate",
  () => {
    //檢測到使用者點選瀏覽器返回按鈕，進行操作
    //使用href的形式去用跳轉的形式，跳轉到上一頁
    document.location.href = document.referrer;
  },
  false
);
const state = {
  title: "",
  url: "",
};
window.history.pushState(state, "", "");

const urlParams = new URLSearchParams(window.location.search);
const search = urlParams.get("q");
const searchUrl = `https://api.appworks-school.tw/api/1.0/products/search?keyword=${search}`;

function searchAjax(seurl) {
  return fetch(seurl, { method: "GET" })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      const length = res.data.length;

      return length;
    })
    .catch((err) => err);
}

const searchInput = document.querySelector(".header-search input");
const searchForm = document.querySelector(".header-search");
const searchButton = document.querySelector(".header-search label");
function handleSearchFormSubmit(event) {
  event.preventDefault(); // 阻止表單預設提交行為
  const searchValue = searchInput.value;
  if (searchValue) {
    const searchParams = urlParams;
    searchParams.set("q", searchValue);
    const newUrl = `${window.location.pathname}?${searchParams}`;
    window.location.href = newUrl;
  }
}

searchForm.addEventListener("submit", handleSearchFormSubmit);
searchButton.addEventListener("click", handleSearchFormSubmit);

if (window.location.search.includes("q")) {
  searchAjax(searchUrl)
    .then((length) => {
      if (length === 0) {
        document.getElementsByClassName(
          "products"
        )[0].innerHTML = `${search} not found`;
      } else {
        ajax(searchUrl).then((data) => {
          render(data);
        });
      }
    })
    .catch((error) => error);
} else {
  ajax(url).then((data) => {
    render(data);
  });

  navColorHighlight();
}

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 3 / 4) {
    const newUrlParams = new URLSearchParams(window.location.search);
    const newCategory = newUrlParams.get("category");

    if (x !== "stop" && !window.location.search.includes("q")) {
      // eslint-disable-next-line no-inner-declarations
      function nextPagingAjax(nexturl) {
        return fetch(nexturl, { method: "GET" })
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            if (res.next_paging) {
              const nextPage = res.next_paging;
              return nextPage;
            }
            const nextPage = "stop";
            return nextPage;
          })
          .catch((err) => err);
      }

      // eslint-disable-next-line no-inner-declarations
      function getNextPage() {
        const gurl = generateUrl(newCategory, x);
        nextPagingAjax(gurl).then((nextPage) => {
          x = nextPage;
          const nextUrl = generateUrl(newCategory, x);
          if (x !== "stop") {
            loader.classList.remove("loader--hidden");
            setTimeout(() => {
              ajax(nextUrl).then((data) => {
                document.getElementsByClassName("products")[0].innerHTML +=
                  generateProductList(data);
              });
            }, 400);
          }
        });
      }
      getNextPage();
    }
  }
});

// export{ajax,url,x,generateProductList}

function generateCampaign(data) {
  const domPlace = data
    .map((items) => {
      const arr = items.story.split("\r");

      return `
    <a href="/product?id=${items.product_id}"class="slide">
      <img src="${items.picture}" alt="${items.product_id}" />
      <div class="wrap">
        <div class="campaignsTextCombo">
          <h3 class="text">${arr[0] + arr[1] + arr[2]}</h3>
          <h3 class="textSmall">${arr[3]}</h3>
        </div>
      </div>
    </a>
      `;
    })
    .join("");

  return domPlace;
}
function circleDom(data) {
  const circle = data
    .map(() => {
      return `  
        <div class='manual-btn' ></div> 
        `; //記得改標籤為label
    })
    .join("");
  const circleDiv = `<div class="circle">${circle}</div>`;
  return circleDiv;
}

ajax("https://api.appworks-school.tw/api/1.0/marketing/campaigns").then(
  (data) => {
    campaignRender(data);
    circleDom(data);
  }
);

function campaignRender(data) {
  document.getElementsByClassName("campaigns")[0].innerHTML =
    generateCampaign(data);
  document.getElementsByClassName("campaigns")[0].innerHTML += circleDom(data);
  //點擊換頁事件

  const slides = document.querySelectorAll(".slide");
  const btns = document.querySelectorAll(".manual-btn");
  const addFirstSlideActive = document.querySelector(".slide");
  const addFirstManualBtnActive = document.querySelector(".manual-btn");
  addFirstSlideActive.classList.add("moveActive");
  addFirstManualBtnActive.classList.add("moveActive");

  //手動點擊換頁
  const manualCompaign = function (manual) {
    slides.forEach((slide) => {
      slide.classList.remove("moveActive");

      btns.forEach((btn) => {
        btn.classList.remove("moveActive");
      });
    });

    slides[manual].classList.add("moveActive");
    btns[manual].classList.add("moveActive");
  };

  btns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      manualCompaign(i);
    });
  });

  //自動輪播fn()
  const repeat = () => {
    const active = document.getElementsByClassName("moveActive");
    let i = 1;

    const repeater = () => {
      const timer = setTimeout(() => {
        [...active].forEach((activeSlide) => {
          activeSlide.classList.remove("moveActive");
        });

        slides[i].classList.add("moveActive");
        btns[i].classList.add("moveActive");
        i++;

        if (slides.length === i) {
          i = 0;
        }
        if (i >= slides.length) {
          return;
        }
        repeater();
      }, 5000);

      // 滑鼠移入campaigns時，停止輪播，清除定時器
      const campaigns = document.querySelector(".campaigns");
      campaigns.onmouseenter = function () {
        clearTimeout(timer);
      };

      // 滑鼠移出campaigns時，繼續輪播，重新call定時器

      campaigns.onmouseleave = function () {
        repeater();
      };
    };
    repeater();
  };
  repeat();
}
