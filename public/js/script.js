// tour-images
const tourImages = document.querySelector(".tour-images");
if(tourImages) {
  const swiper = new Swiper(".tour-images", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}
// End tour-images


// Show Alert
const alertAddCartSusscess = () => {
    const elementAlert = document.querySelector("[alert-add-cart-susscess]"); // Lấy ra phần tử show
    if(elementAlert) { // Nếu tồn tại phần tử đó thì chạy vào đây
        elementAlert.classList.remove("alert-hidden"); // Loại bỏ class alert-hidden của phần tử đó để nó xuất hiện ra

        setTimeout(() => {
            elementAlert.classList.add("alert-hidden"); // Thêm class alert-hidden vào phần tử đó để nó ẩn đi
        }, 3000);
    }
}
// End Show Alert

// Hiển thị số lượng sản phẩm vào mini cart
const showMiniCart = () => {
    const miniCart = document.querySelector("[mini-cart]"); // Lấy ra cái mini cart

    if (miniCart) { // Nếu cái mini cart tồn tại
      const cart = JSON.parse(localStorage.getItem("cart")); // Lấy ra cart đã được lưu trong localStorage để tính số lượng sản phẩm trong giỏ hàng
      miniCart.innerHTML = cart.length;
    }
  };
  
showMiniCart(); // gọi lại để nó được thực thi
// Hết Hiển thị số lượng sản phẩm vào mini cart


// Giỏ hàng
const cart = localStorage.getItem("cart");

// Khi vào thì tạo ra cart mới rỗng nếu cart chưa tồn tại
if(!cart) {
    localStorage.setItem("cart", JSON.stringify([]));
}

// Nếu đã có thì chạy vào đây

// Lấy ra ô submit
const formAddToCart = document.querySelector("[form-add-to-cart]");
if(formAddToCart) { // Nếu tồn tại cái này thì chạy vào đây
    formAddToCart.addEventListener("submit", (event) => {
        event.preventDefault(); // Ngăn chặn hàng vi load lại trang khi submit

        const tourId = parseInt(formAddToCart.getAttribute("tour-id")); // Lấy ra tourId từ form
        const quantity = parseInt(formAddToCart.quantity.value); // Lấy ra số lượng tour đã được chọn để gửi lên sau khi ấn vào submit


        if (tourId && quantity > 0) { // Nếu tồn tại cả tourId và số lượng tour gửi lên lớn hơn 0 thì sẽ chạy vào đây 
            const cart = JSON.parse(localStorage.getItem("cart")); // Lấy ra localStorage có sẵn trong đó.

            const exisTour = cart.find(item => item.tourId == tourId); // Tìm xem cái tourId được gửi lên nó đã tồn tại sẵn trong localStorage chưa.

            if (exisTour) {
                exisTour.quantity += quantity; // Nếu đã tồn tại tourId đó thì tăng số lượng tour đã có lên theo số lượng mới. 
            } else {
                cart.push({
                    tourId: tourId, // Thêm tour mới và số lượng theo quantity được gửi lên
                    quantity: quantity
                })
            }
            localStorage.setItem("cart", JSON.stringify(cart)); // sau khi push thêm tour mới hoặc cập nhật thì nó sẽ được lưu lại vào localStorage và được chuyển thành JSON để được lưu vào.
        
            alertAddCartSusscess(); // Sau khi thêm vào giỏ hàng thì nó hiện ra thông báo đã thêm vào giỏ hàng thành công

            showMiniCart(); // Sau khi thêm xong thì show lại số lượng tour vào mini cart
        }
    })
}
// Hết giỏ hàng

// xóa sản phẩm trong giỏ hàng
const deleteItemInCart = () => {
    const listButtonDelete = document.querySelectorAll("[btn-delete]"); // Lấy ra danh sách các nút xóa
    if(listButtonDelete.length > 0) {
        listButtonDelete.forEach(button => {
          button.addEventListener("click", () => {
            const tourId = button.getAttribute("btn-delete");
            const cart = JSON.parse(localStorage.getItem("cart"));
            const newCart = cart.filter(item => item.tourId != tourId);
            localStorage.setItem("cart", JSON.stringify(newCart));
            window.location.reload();
          })
        })
    }
}
// Hết xóa sản phẩm trong giỏ hàng

// Cập nhật số lượng sản phẩm trong giỏ hàng
const updateQuantityItemInCart = () => {
    const listInputQuantity = document.querySelectorAll("input[name='quantity']");
    if(listInputQuantity.length > 0) {
      listInputQuantity.forEach(input => {
        input.addEventListener("change", () => {
          const tourId = parseInt(input.getAttribute("item-id"));
          const quantity = parseInt(input.value);
          if(tourId && quantity > 0) {
            const cart = JSON.parse(localStorage.getItem("cart"));
            const itemUpdate = cart.find(item => item.tourId == tourId);
            if(itemUpdate) {
              itemUpdate.quantity = quantity;
              localStorage.setItem("cart", JSON.stringify(cart));
              window.location.reload();
            }
          }
        })
      })
    }
  }
  // Hết Cập nhật số lượng sản phẩm trong giỏ hàng

// Vẽ tour vào giỏ hàng
// const tableCart = document.querySelector("[table-cart]");
const tableCart = document.querySelector(".table-bordered");
if(tableCart) {
  fetch("/cart/list-json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: localStorage.getItem("cart")
  })
    .then(res => res.json())
    .then(data => {
        if (data.tours) {
            const htmlArray = data.tours.map((item, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>
                        <img src="${item.image}" alt="${item.title}" width="80px" />
                    </td>
                    <td>
                        <a href="/tours/detail/${item.slug}">${item.title}</a>
                    </td>
                    <td>
                        ${item.price.toLocaleString()}đ
                    </td>
                    <td>
                        <input type="number" name="quantity" value="${item.quantity}" min="1" item-id="${item.tourId}" style="width: 60px;" />
                    </td>
                    <td>
                        ${item.total.toLocaleString()}đ
                    </td>
                    <td>
                        <button class="btn btn-sm btn-danger" btn-delete="${item.tourId}">Xóa</button>
                    </td>
                </tr>
            `);
            const tbody = tableCart.querySelector("tbody");
            tbody.innerHTML = htmlArray.join("");
            const totalPrice = document.querySelector("[total-price]");
            totalPrice.innerHTML = data.total.toLocaleString();
        
            deleteItemInCart(); // Sau khi xóa sản phẩm trong giỏ hàng thì nó tự reload lại để cập nhật
        
            updateQuantityItemInCart(); // Cập nhật số lượng sản phẩm trong giỏ hàng
        }
    })
}
// Hết Vẽ tour vào giỏ hàng

// Đặt tour
const formOrder = document.querySelector("[form-order]"); // Lấy ra form thông tin khách hàng cần được gửi lên trên server
if (formOrder) {
  formOrder.addEventListener("submit", (event) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định là load lại trang

    const cart = JSON.parse(localStorage.getItem("cart")); // Lấy ra các sản phẩm đã được lưu trong localStorage

    const dataFinal = {
      info: {
        fullName: formOrder.fullName.value, // Lấy ra tên của khách hàng được gửi lên
        phone: formOrder.phone.value, // Lấy ra số điện thoại của khách hàng
        note: formOrder.note.value, // Lấy ra ghi chú được gửi lên
      },
      cart: cart
    };

    fetch("/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataFinal)
    })
      .then(res => res.json())
      .then(data => {
        if(data.code == 200) {
          console.log("OK");
          localStorage.setItem("cart", JSON.stringify([]));
          window.location.href = `/order/success/${data.orderCode}`;
        }
      })
  });
}
// Hết đặt tour