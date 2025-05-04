// Util: format price as VND
function formatPrice(price) {
  return price.toLocaleString("vi-VN") + "₫";
}

// Data keys (không còn cần thiết cho menu)
// const MENU_KEY = "chako_menu";
const INFO_KEY = "chako_info";
const ORDERS_KEY = "chako_orders";

// Get references (giữ nguyên)
const logoImg = document.getElementById("logo");
const bannerImg = document.getElementById("banner");
const foodListEl = document.getElementById("food-list");
const cartItemsEl = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total-price");
const orderForm = document.getElementById("order-form");
const customerNameInput = document.getElementById("customer-name");
const customerPhoneInput = document.getElementById("customer-phone");
const customerAddressInput = document.getElementById("customer-address");
const orderNoteInput = document.getElementById("order-note");
const foodModal = document.getElementById("food-modal");
const modalCloseBtn = foodModal.querySelector(".modal-close");
const modalFoodImg = document.getElementById("modal-food-img");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalPrice = document.getElementById("modal-price");
const modalAddCartBtn = document.getElementById("modal-add-cart");

// Cart state (giữ nguyên)
let cart = [];
// Menu data (thay đổi cách lấy dữ liệu)
let menu = [
  {
    id: "3",
    name: "JASMINE MATCHA LATTE",
    description:
      "Matcha, sữa, siro nhài. Thanh mát, béo ngậy, thơm hương hoa nhài",
    price: 33000,
    image: "images/jas.jpg",
  },
  {
    id: "4",
    name: "SUNRISE YUZU LATTE",
    description:
      "Matcha latte, mứt quýt chanh vàng của Nhật. Thanh mát, ngậy béo, thơm hương chanh quýt, lạ miệng",
    price: 39000,
    image: "images/sun.jpg",
  },
  {
    id: "5",
    name: "COCO DREAM",
    description: "Nước dừa, kem mây matcha. Ngậy, ngọt nhẹ, giải khát",
    price: 33000,
    image: "images/codream.jpg",
  },
  {
    id: "1",
    name: "MATCHA LATTE",
    description: "Matcha, nước nóng, sữa, pha theo kiểu truyền thống",
    price: 29000,
    image: "images/thuong.jpg",
  },
  {
    id: "2",
    name: "COLDWISK",
    description: "100% sữa lạnh, béo ngậy, ngọt, không có nốt đắng",
    price: 29000,
    image: "images/cw.jpg",
  },
  // {
  //   id: "6",
  //   name: "COCO CLOUD",
  //   description: "Matcha coldwhisked, nước dừa",
  //   price: 33000,
  //   image: "images/cocloud.jpg",
  // },
  // Thêm các món ăn khác vào đây theo cấu trúc tương tự
];
// Currently displayed food in modal (giữ nguyên)
let currentFoodId = null;

// Load thông tin chung (logo, banner) từ localStorage (giữ nguyên)
function loadData() {
  const savedInfo = localStorage.getItem(INFO_KEY);
  if (savedInfo) {
    const info = JSON.parse(savedInfo);
    logoImg.src = info.logo || "";
    bannerImg.src = info.banner || "";
  }
  renderMenu(); // Gọi renderMenu sau khi (cố gắng) tải dữ liệu
}

// Display menu items on the page (giữ nguyên logic hiển thị)
function renderMenu() {
  foodListEl.innerHTML = "";
  menu.forEach((food) => {
    const item = document.createElement("div");
    item.className = "food-item";
    item.setAttribute("tabindex", "0");
    item.setAttribute("role", "button");
    item.setAttribute("aria-label", `Xem thông tin món ${food.name}`);

    item.innerHTML = `
            <img src="${food.image}" alt="Ảnh món ${food.name}" />
            <div class="food-details">
                <div class="food-name">${food.name}</div>
                <div class="food-desc">${
                  food.description.length > 60
                    ? food.description.slice(0, 60) + "..."
                    : food.description
                }</div>
                <div class="food-price">${formatPrice(food.price)}</div>
                <button class="add-cart-btn" aria-label="Thêm món ${
                  food.name
                } vào giỏ hàng">Thêm vào giỏ hàng</button>
            </div>
        `;

    const addBtn = item.querySelector(".add-cart-btn");
    addBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      addToCart(food.id);
    });

    item.addEventListener("click", () => showFoodModal(food.id));
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        showFoodModal(food.id);
      }
    });

    foodListEl.appendChild(item);
  });
}

// Show modal with full food details (giữ nguyên)
function showFoodModal(foodId) {
  const food = menu.find((f) => f.id === foodId);
  if (!food) return;
  currentFoodId = foodId;
  modalFoodImg.src = food.image;
  modalFoodImg.alt = `Ảnh món ${food.name}`;
  modalTitle.textContent = food.name;
  modalDesc.textContent = food.description;
  modalPrice.textContent = formatPrice(food.price);
  foodModal.style.display = "flex";
  foodModal.setAttribute("aria-hidden", "false");
  modalAddCartBtn.focus();
}

// Close modal (giữ nguyên)
function closeModal() {
  foodModal.style.display = "none";
  foodModal.setAttribute("aria-hidden", "true");
  currentFoodId = null;
}

modalCloseBtn.addEventListener("click", closeModal);
foodModal.addEventListener("click", (e) => {
  if (e.target === foodModal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && foodModal.style.display === "flex") {
    closeModal();
  }
});

// Add food to cart (giữ nguyên)
function addToCart(foodId) {
  const food = menu.find((f) => f.id === foodId);
  if (!food) return;
  const itemInCart = cart.find((item) => item.food.id === foodId);
  if (itemInCart) {
    itemInCart.quantity++;
  } else {
    cart.push({ food, quantity: 1 });
  }
  renderCart();
}

// Remove item from cart (giữ nguyên)
function removeFromCart(foodId) {
  cart = cart.filter((item) => item.food.id !== foodId);
  renderCart();
}

// Render cart items and total price (giữ nguyên)
function renderCart() {
  cartItemsEl.innerHTML = "";
  let total = 0;
  cart.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
            <span>${item.food.name} x ${item.quantity}</span>
            <span>${formatPrice(item.food.price * item.quantity)}</span>
            <button class="remove-item" aria-label="Xóa món ${
              item.food.name
            } khỏi giỏ hàng" data-id="${item.food.id}">×</button>
        `;
    const removeButton = listItem.querySelector(".remove-item");
    removeButton.addEventListener("click", () => removeFromCart(item.food.id));
    cartItemsEl.appendChild(listItem);
    total += item.food.price * item.quantity;
  });
  totalPriceEl.textContent = `Tổng: ${formatPrice(total)}`;
}

// Handle form submission (vẫn cần một dịch vụ bên ngoài để xử lý đơn hàng)
orderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (cart.length === 0) {
    alert("Giỏ hàng của bạn đang trống!");
    return;
  }

  const customerName = customerNameInput.value;
  const customerPhone = customerPhoneInput.value;
  const customerAddress = customerAddressInput.value;
  const orderNote = orderNoteInput.value;
  const orderItems = cart.map((item) => ({
    name: item.food.name,
    quantity: item.quantity,
    price: item.food.price,
  }));
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.food.price * item.quantity,
    0
  );

  const orderData = {
    customerName,
    customerPhone,
    customerAddress,
    orderNote,
    items: orderItems,
    totalPrice,
  };

  // Gửi dữ liệu đơn hàng đến một dịch vụ xử lý đơn hàng (ví dụ: Formspree, Google Apps Script, v.v.)
  // Bạn cần cấu hình thuộc tính 'action' của form HTML hoặc sử dụng JavaScript fetch API để gửi dữ liệu.
  // Ví dụ với Formspree (bạn cần thay YOUR_FORM_ENDPOINT):
  fetch("https://formspree.io/f/manoeyjk", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Đơn hàng của bạn đã được gửi thành công!");
      cart = [];
      renderCart();
      orderForm.reset();
    })
    .catch((error) => {
      console.error("Lỗi khi gửi đơn hàng:", error);
      alert("Có lỗi xảy ra khi gửi đơn hàng. Vui lòng thử lại sau.");
    });
});

// Gọi loadData khi trang web tải
loadData();
renderCart(); // Hiển thị giỏ hàng (nếu có dữ liệu từ phiên trước - bạn có thể bỏ qua nếu không muốn lưu giỏ hàng)
