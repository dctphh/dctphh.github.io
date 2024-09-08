//Nhập đúng email mới nhả thông tin
function formValidate() {
  let email = document.querySelector("#exampleFormControlInput1").value;
  //Kiểm tra email
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //Sử dụng match để kiểm tra
  if (!email.match(regex)) alert("Email không hợp lệ!");
  else {
    document.querySelector(".dom-email").classList.remove("d-none");
    document.querySelector(".dom-email-nhap").classList.add("d-none");
  }
}
document
  .querySelector(".dom-email-but")
  .addEventListener("click", formValidate);
// Hiển thị / Ẩn Job
const x = function () {
  document.querySelector(".dom-kn").classList.toggle("d-none");
  if (!document.querySelector(".dom-kn").classList.contains("d-none")) {
    document.querySelector(".dom-kn-but").textContent = "View less";
  } else {
    document.querySelector(".dom-kn-but").textContent = "View more";
  }
};
document.querySelector(".dom-kn-but").addEventListener("click", x);
const y = function () {
  document.querySelector(".dom-hv").classList.toggle("d-none");
  if (!document.querySelector(".dom-hv").classList.contains("d-none")) {
    document.querySelector(".dom-hv-but").textContent = "View less";
  } else {
    document.querySelector(".dom-hv-but").textContent = "View more";
  }
};
document.querySelector(".dom-hv-but").addEventListener("click", y);
const z = function () {
  document.querySelector(".dom-hd").classList.toggle("d-none");
  if (!document.querySelector(".dom-hd").classList.contains("d-none")) {
    document.querySelector(".dom-hd-but").textContent = "View less";
  } else {
    document.querySelector(".dom-hd-but").textContent = "View more";
  }
};
document.querySelector(".dom-hd-but").addEventListener("click", z);
const a = function () {
  document.querySelector(".dom-st").classList.toggle("d-none");
  if (!document.querySelector(".dom-st").classList.contains("d-none")) {
    document.querySelector(".dom-st-but").textContent = "View less";
  } else {
    document.querySelector(".dom-st-but").textContent = "View more";
  }
};
document.querySelector(".dom-st-but").addEventListener("click", a);
const b = function () {
  document.querySelector(".dom-nn").classList.toggle("d-none");
  if (!document.querySelector(".dom-nn").classList.contains("d-none")) {
    document.querySelector(".dom-nn-but").textContent = "View less";
  } else {
    document.querySelector(".dom-nn-but").textContent = "View more";
  }
};
document.querySelector(".dom-nn-but").addEventListener("click", b);
const c = function () {
  // console.log(1);
  document.querySelector(".dom-kna").classList.toggle("d-none");
  if (!document.querySelector(".dom-kna").classList.contains("d-none")) {
    document.querySelector(".dom-kna-but").textContent = "View less";
  } else document.querySelector(".dom-kna-but").textContent = "View more";
};
document.querySelector(".dom-kna-but").addEventListener("click", c);
