const urlParams = new URLSearchParams(window.location.search);
const search = urlParams.get("id");

export const API_HOST = "https://api.appworks-school.tw/api/1.0";
export const API_GET_DATA = `${API_HOST}/products/details?id=${search}`;
// console.log(API_GET_DATA)
