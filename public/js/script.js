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
        }
    })
}

// Hết giỏ hàng