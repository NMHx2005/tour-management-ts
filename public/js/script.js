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
        const cart = JSON.parse(localStorage.getItem(cart)); // Lất ra cart đã được lưu trong localStorage để tính được số lượng sản phẩm trong giỏ hàng
        miniCart.innerHTML = cart.length;        
    }
}
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
