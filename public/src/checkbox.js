const menuCheckbox = document.getElementById("menu");
const searchLabel = document.querySelector(".header-search label");
const logo = document.querySelector(".logo");
let clickCount = 0;

searchLabel.addEventListener("click", (event) => {
  clickCount++;

  if (window.innerWidth < 1280 && clickCount % 2 === 1) {
    // 第一次點擊 label，切换 checkbox 的狀態
    menuCheckbox.checked = !menuCheckbox.checked;
    logo.style.display = "none";
  } else {
    // 第二次點擊 label，搜索功能
    event.stopPropagation(); // 阻止事件冒泡
    clickCount = 1; //設回1避免搜索框縮回去
  }
});
