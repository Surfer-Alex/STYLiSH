// window.addEventListener("load", () =>{
//   const loader = document.querySelector(".loader");
//   // const parent = loader.parentNode;
//   loader.classList.add("loader--hidden");
//   // loader.addEventListener("transitionend", () => {
//   //   parent.removeChild(parent.firstChild);
//   // });
// });

function loaderListener() {
  // 選擇要監聽的區塊
  const targetNode = document.querySelector(".products");

  // 創建一個MutationObserver實例
  const observer = new MutationObserver((mutationsList) => {
    // 遍歷所有的變化
    for (const mutation of mutationsList) {
      // 如果有子元素被添加，則執行相應的function
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        const loader = document.querySelector(".loader");

        loader.classList.add("loader--hidden");
      }
    }
  });

  // 開始監聽目標區塊的變化
  observer.observe(targetNode, { childList: true });
}
loaderListener();
