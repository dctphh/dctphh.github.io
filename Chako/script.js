// script.js

// Util: format price as VND
function formatPrice(price) {
  return price.toLocaleString("vi-VN") + "₫";
}

// Data keys (không còn cần thiết cho menu)
// const MENU_KEY = "chako_menu";
const INFO_KEY = "chako_info";
const ORDERS_KEY = "chako_orders";

// Get references
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
const customerInviteInput = document.getElementById("customer-invite");
const orderTimeInput = document.getElementById("order-time");
const foodModal = document.getElementById("food-modal"); // Vẫn giữ lại khai báo nếu bạn có ý định dùng lại sau này
const modalCloseBtn = foodModal.querySelector(".modal-close");
const modalFoodImg = document.getElementById("modal-food-img");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalPrice = document.getElementById("modal-price");
const modalAddCartBtn = document.getElementById("modal-add-cart");

// Cart state (lưu trữ object chứa food variant và quantity)
let cart = [];
// Menu data (thay đổi cấu trúc để hỗ trợ nhiều size và tùy chọn)
let menu = [
  {
    id: "1",
    name: "Sương Sớm (Matcha hoa nhài)",
    description: "Matcha nhài. Thanh mát, béo ngậy, thơm hương hoa nhài",
    variants: [
      { size: "400ml", price: 31000, online: true },
      { size: "550ml", price: 36000, online: true },
    ],
    image: "images/suong.jpg",
  },
  {
    id: "2",
    name: "Quýt Ban Mai (Matcha, nước dừa, & mứt quýt chanh vàng của Nhật)",
    description: "Thanh mát, ngọt vị dừa, thơm hương chanh quýt, lạ miệng",
    variants: [
      { size: "400ml", price: 36000, online: true },
      { size: "550ml", price: 39000, online: true },
    ],
    image: "images/quyt.jpg",
  },
  {
    id: "3",
    name: "Thanh mát (Nước dừa, kem mây matcha)",
    description: "Nước dừa, kem mây matcha. Ngậy, ngọt nhẹ, giải khát",
    variants: [
      { size: "400ml", price: 36000, online: true },
      { size: "550ml", price: 41000, online: true },
    ],
    image: "images/thanh.jpg",
  },
  {
    id: "4",
    name: "Thư Thái (Matcha Latte truyền thống)",
    description: "Matcha latte kiểu truyền thống. Có thể coldwhisk",
    variants: [
      { size: "400ml", price: 31000, online: true },
      { size: "550ml", price: 36000, online: true },
    ],
    image: "images/thuong.jpg",
  },
  {
    id: "5",
    name: "Bồng Bềnh (Matcha kem muối)",
    description: "Matcha kem muối. Béo ngậy, ngọt nhẹ, đậm đà",
    variants: [
      { size: "400ml", price: 36000, online: true },
      { size: "550ml", price: 41000, online: true },
    ],
    image: "images/bong.jpg",
  },
  {
    id: "6",
    name: "KYOTO (Matcha & kem mịn)",
    description: "Matcha & kem mịn. Đậm vị trà, ngậy béo",
    variants: [
      { size: "440ml", price: 39000, online: true },
      { size: "550ml", price: 45000, online: true, pickupOnly: true },
      // Ví dụ món chỉ pick up
    ],
    image: "images/kyoto.jpg",
  },
  // Thêm các món ăn khác với các biến thể (size, giá, online)
];

// Load thông tin chung (logo, banner) từ localStorage
function loadData() {
  const savedInfo = localStorage.getItem(INFO_KEY);
  if (savedInfo) {
    const info = JSON.parse(savedInfo);
    logoImg.src = info.logo || "";
    bannerImg.src = info.banner || "";
  }
  renderMenu(); // Gọi renderMenu sau khi (cố gắng) tải dữ liệu
}

// Display menu items on the page
// function renderMenu() {
//   foodListEl.innerHTML = "";
//   menu.forEach((food) => {
//     const onlineVariants = food.variants.filter((v) => v.online);

//     if (onlineVariants.length > 0) {
//       const item = document.createElement("div");
//       item.className = "food-item";

//       let variantButtonsHTML = onlineVariants
//         .map(
//           (variant) => `
//         <button class="add-cart-btn small" data-food-id="${
//           food.id
//         }" data-variant='${JSON.stringify(variant)}'>
//           ${variant.size} - ${formatPrice(variant.price)}
//         </button>
//       `
//         )
//         .join("");

//       item.innerHTML = `
//         <img src="${food.image}" alt="Ảnh món ${food.name}" />
//         <div class="food-details">
//           <div class="food-name">${food.name}</div>
//           <div class="food-desc">${
//             food.description.length > 60
//               ? food.description.slice(0, 60) + "..."
//               : food.description
//           }</div>
//           <div class="variant-buttons">${variantButtonsHTML}</div>
//         </div>
//       `;

//       foodListEl.appendChild(item);
//     }
//   });

//   // Thêm event listener cho các nút thêm vào giỏ hàng của từng variant
//   const addToCartButtons = foodListEl.querySelectorAll(".add-cart-btn");
//   addToCartButtons.forEach((button) => {
//     button.addEventListener("click", function () {
//       const foodId = this.dataset.foodId;
//       const variant = JSON.parse(this.dataset.variant);
//       addToCart(foodId, variant);
//     });
//   });
// }

// // Add variant to cart
// function addToCart(foodId, variant) {
//   const itemInCart = cart.find(
//     (item) => item.foodId === foodId && item.variant.size === variant.size
//   );
//   if (itemInCart) {
//     itemInCart.quantity++;
//   } else {
//     cart.push({ foodId: foodId, variant: variant, quantity: 1 });
//   }
//   renderCart();
// }

function renderMenu() {
  foodListEl.innerHTML = "";
  menu.forEach((food) => {
    const item = document.createElement("div");
    item.className = "food-item";
    if (food.variants.some((v) => v.pickupOnly)) {
      item.classList.add("pickup-only-item");
      item.setAttribute("aria-label", `${food.name} (Chỉ nhận tại cửa hàng)`);
    } else {
      item.setAttribute("aria-label", `Xem thông tin món ${food.name}`);
    }

    item.innerHTML = `
      <img src="${food.image}" alt="Ảnh món ${food.name}" />
      <div class="food-details">
        <div class="food-name">${food.name} ${
      food.variants.some((v) => v.pickupOnly)
        ? '<span class="pickup-label">(CHỈ BÁN TRỰC TIẾP)</span>'
        : ""
    }</div>
        <div class="food-desc">${
          food.description.length > 60
            ? food.description.slice(0, 60) + "..."
            : food.description
        }</div>
        <div class="variant-buttons">
          ${food.variants
            .filter((v) => v.online)
            .map(
              (variant) => `
            <button class="add-cart-btn small" data-food-id="${
              food.id
            }" data-variant='${JSON.stringify(variant)}' ${
                food.variants.some((v) => v.pickupOnly) ? "disabled" : ""
              }>
              ${variant.size} - ${formatPrice(variant.price)}
            </button>
          `
            )
            .join("")}
        </div>
      </div>
    `;

    foodListEl.appendChild(item);
  });

  // Thêm event listener cho các nút thêm vào giỏ hàng
  const addToCartButtons = foodListEl.querySelectorAll(
    ".add-cart-btn:not([disabled])"
  );
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const foodId = this.dataset.foodId;
      const variant = JSON.parse(this.dataset.variant);
      addToCart(foodId, variant);
    });
  });

  // (Không cần event listener cho các nút disabled)
}

// Add variant to cart
function addToCart(foodId, variant) {
  const foodData = menu.find((f) => f.id === foodId);
  if (foodData?.variants.some((v) => v.pickupOnly)) {
    alert("Món này chỉ có thể nhận trực tiếp tại cửa hàng.");
    return;
  }

  const itemInCart = cart.find(
    (item) => item.foodId === foodId && item.variant.size === variant.size
  );
  if (itemInCart) {
    itemInCart.quantity++;
  } else {
    cart.push({ foodId: foodId, variant: variant, quantity: 1 });
  }
  renderCart();
}

// Remove item from cart (cần so sánh cả foodId và variant)
function removeFromCart(foodId, variantSize) {
  cart = cart.filter(
    (item) => !(item.foodId === foodId && item.variant.size === variantSize)
  );
  renderCart();
}

// Render cart items and total price
function renderCart() {
  cartItemsEl.innerHTML = "";
  let total = 0;
  cart.forEach((item) => {
    const food = menu.find((f) => f.id === item.foodId);
    const foodName = food ? food.name : "Không tìm thấy";
    listItem = document.createElement("li");
    listItem.innerHTML = `
      <span>${foodName} (${item.variant.size}) x ${item.quantity}</span>
      <span>${formatPrice(item.variant.price * item.quantity)}</span>
      <button class="remove-item" aria-label="Xóa món ${foodName} (${
      item.variant.size
    }) khỏi giỏ hàng" data-food-id="${item.foodId}" data-variant-size="${
      item.variant.size
    }">×</button>
    `;
    const removeButton = listItem.querySelector(".remove-item");
    removeButton.addEventListener("click", function () {
      removeFromCart(this.dataset.foodId, this.dataset.variantSize);
    });
    cartItemsEl.appendChild(listItem);
    total += item.variant.price * item.quantity;
  });
  totalPriceEl.textContent = `Tổng: ${formatPrice(total)} + Ship`;
  updateOrderDetailsInput(); // Cập nhật thông tin đơn hàng khi giỏ hàng thay đổi
  document.getElementById("order-paid").value = formatPrice(total);
}

// Update the hidden input field for order details
function updateOrderDetailsInput() {
  const orderDetails = cart
    .map((item) => {
      const foodName =
        menu.find((f) => f.id === item.foodId)?.name || "Không tìm thấy";
      return `${foodName} (${item.variant.size}) x ${item.quantity}`;
    })
    .join(", ");
  document.getElementById("order-details").value = orderDetails;
}

// Handle form submission
orderForm.addEventListener("submit", (event) => {
  if (cart.length === 0) {
    alert("Giỏ hàng của bạn đang trống!");
    event.preventDefault();
    return;
  }
  updateOrderDetailsInput(); // Đảm bảo order details được cập nhật trước khi submit
});

// Gọi loadData và renderCart khi trang web tải
loadData();
renderCart();
