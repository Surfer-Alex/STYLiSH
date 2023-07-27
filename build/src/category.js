const urlParams = new URLSearchParams(window.location.search);

const urlCategory = urlParams.get("category");

// 抓user在哪個分類頁面去增加class 不同color提醒user頁面
function navColorHighlight() {
  const activePage = window.location.search;
  document.querySelectorAll("nav a").forEach((link) => {
    if (link.href.includes(`${activePage}`) && `${activePage}` !== "") {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
export { urlCategory, navColorHighlight };
