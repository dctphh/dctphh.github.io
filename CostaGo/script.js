document.addEventListener("DOMContentLoaded", function () {
  const chatButton = document.getElementById("chat-button");
  const chatBox = document.getElementById("chat-box");
  const closeChat = document.getElementById("close-chat");
  const chatMessages = document.getElementById("chat-messages");
  const userInput = document.getElementById("user-input");
  const sendButton = document.getElementById("send-button");

  // Hiển thị widget chat khi trang được tải
  chatBox.style.display = "none"; // Ẩn ban đầu

  // Xử lý sự kiện click vào nút chat widget
  chatButton.addEventListener("click", function () {
    chatBox.style.display = "flex";
    chatButton.style.display = "none";
  });

  // Xử lý sự kiện click vào nút đóng chat
  closeChat.addEventListener("click", function () {
    chatBox.style.display = "none";
    chatButton.style.display = "block";
  });

  // Hàm gửi tin nhắn của người dùng và nhận phản hồi (giả lập)
  sendButton.addEventListener("click", function () {
    const message = userInput.value.trim();
    if (message !== "") {
      // Hiển thị tin nhắn của người dùng
      displayMessage(message, "user");
      userInput.value = "";

      // Giả lập phản hồi từ hướng dẫn viên sau một khoảng thời gian ngắn
      setTimeout(function () {
        getBotResponse(message);
      }, 1000); // Giả lập độ trễ 1 giây
    }
  });

  // Xử lý sự kiện nhấn phím Enter trong ô input
  userInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      sendButton.click();
    }
  });

  // Hàm hiển thị tin nhắn lên cửa sổ chat
  function displayMessage(text, sender) {
    const messageDiv = document.createElement("p");
    messageDiv.classList.add(`${sender}-message`);
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Cuộn xuống tin nhắn mới nhất
  }

  // Hàm giả lập phản hồi từ hướng dẫn viên
  function getBotResponse(userMessage) {
    // Đây là nơi bạn có thể tích hợp logic xử lý ngôn ngữ tự nhiên (NLP) hoặc các quy tắc đơn giản
    // để tạo ra phản hồi phù hợp. Trong ví dụ này, chúng ta sẽ có một số phản hồi tĩnh.

    const lowerCaseMessage = userMessage.toLowerCase();

    if (
      lowerCaseMessage.includes("xin chào") ||
      lowerCaseMessage.includes("hello")
    ) {
      displayMessage(
        "Xin chào! Tôi là hướng dẫn viên ảo của Costago. Bạn cần giúp gì không?",
        "bot"
      );
    } else if (
      lowerCaseMessage.includes("tour") ||
      lowerCaseMessage.includes("chi tiết")
    ) {
      displayMessage(
        "Chúng tôi có các tour khám phá thiên nhiên Costa Rica 5 ngày 4 đêm với các điểm đến hấp dẫn như San José, Monteverde, Arenal và Tortuguero. Bạn có muốn biết thêm về lịch trình không?",
        "bot"
      );
    } else if (
      lowerCaseMessage.includes("giá") ||
      lowerCaseMessage.includes("bao nhiêu tiền")
    ) {
      displayMessage(
        "Giá tour sẽ tùy thuộc vào thời điểm đặt và các dịch vụ đi kèm. Vui lòng cho chúng tôi biết thời gian bạn dự định đi và số lượng người để nhận được báo giá chi tiết nhé.",
        "bot"
      );
    } else if (lowerCaseMessage.includes("liên hệ")) {
      displayMessage(
        "Bạn có thể liên hệ với chúng tôi qua số điện thoại +84 947154651 hoặc email phhnguyenminhduc@gmail.com.",
        "bot"
      );
    } else {
      displayMessage(
        "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi bạn trong thời gian sớm nhất.",
        "bot"
      );
    }
  }

  // Hiển thị tin nhắn "How can I help you?" ban đầu từ bot
  displayMessage("How can I help you?", "bot");
});

// Các hàm JavaScript khác từ file gốc (nếu có và cần thiết)
function openModal(modalId) {
  document.getElementById(modalId).style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
  document.body.style.overflow = "auto";
}

document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", function (event) {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();

    if (name === "") {
      alert("Please enter your name.");
      event.preventDefault();
    } else if (email === "") {
      alert("Please enter your email address.");
      event.preventDefault();
    } else if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      event.preventDefault();
    } else if (message === "") {
      alert("Please enter your message.");
      event.preventDefault();
    } else {
      alert("Your message has been sent. Thank you!");
      event.preventDefault();
    }
  });
});

function isValidEmail(email) {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
}
