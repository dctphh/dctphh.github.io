async function loadHeaderAndFooter() {
  try {
    const headerResponse = await fetch("header.html");
    const headerHtml = await headerResponse.text();
    document.body.insertAdjacentHTML("afterbegin", headerHtml);

    const footerResponse = await fetch("footer.html");
    const footerHtml = await footerResponse.text();
    document.body.insertAdjacentHTML("beforeend", footerHtml);
  } catch (error) {
    console.error("Lỗi khi tải header hoặc footer:", error);
  }
}

loadHeaderAndFooter();
