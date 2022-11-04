let productList = [];
let cart = [];

const getProducts = async () => {
  try {
    const res = await axios({
      url: "https://634d5a61acb391d34a9b1cc0.mockapi.io/Products",
      method: "GET",
    });
    productList = mapData(res.data);
    renderProducts(productList);
  } catch (error) {
    console.log(error);
  }
};

const renderProducts = (data) => {
  let productHTML = "";
  for (let i in data) {
    productHTML += data[i].render();
  }

  document.getElementById("main-cart").innerHTML = productHTML;
};

const renderCart = (data) => {
  let cartHTML = "";
  for (let i in data) {
    cartHTML += data[i].render();
  }

  let total = calcTotalInCart();
  total > 0
    ? (document.getElementsByClassName("cart-items")[0].innerHTML = cartHTML)
    : (document.getElementsByClassName("cart-items")[0].innerHTML )
       
  calcTotalCash();
};

const mapData = (dataFromAPI) => {
  const result = [];

  dataFromAPI.forEach((oldProduct) => {
    const {
      id,
      name,
      price,
      screen,
      backCamera,
      frontCamera,
      img,
      desc,
      type,
    } = oldProduct;

    result.push(
      new Products(
        id,
        name,
        price,
        screen,
        backCamera,
        frontCamera,
        img,
        desc,
        type
      )
    );
  });
  return result;
};

const mapDataCart = (dataCart) => {
  const result = [];

  dataCart.forEach((oldCart) => {
    const {
      id,
      name,
      price,
      screen,
      backCamera,
      frontCamera,
      img,
      desc,
      type,
    } = oldCart.product;

    result.push(
      new CartItem(
        id,
        name,
        price,
        screen,
        backCamera,
        frontCamera,
        img,
        desc,
        type,
        oldCart.quantity
      )
    );
  });
  return result;
};

const filterTypeOfPhone = () => {
  let result = [];
  let typeOfPhone = document.getElementById("filter-product").value;
  if (typeOfPhone === "samsung") {
    result = productList.filter((item) => item.type === "Samsung");
  } else if (typeOfPhone === "iphone") {
    result = productList.filter((item) => item.type === "Iphone");
  } else {
    result = productList;
  }

  renderProducts(result);
};

const addToCart = (idProduct) => {
  const foundIndex = productList.findIndex((item) => item.id === idProduct);
  const foundItemInCart = cart.find((item) => item.product.id === idProduct);
  const { id, name, price, screen, backCamera, frontCamera, img, desc, type } =
    productList[foundIndex];
    console.log(foundIndex)
  const cartItem = new CartItem(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type,
    1
  );
  if (foundItemInCart) {
    foundItemInCart.quantity += 1;
  } else {
    cart.push(cartItem);
  }

  setCart(cart);
  renderCart(cart);
  calcTotalInCart();
};

const sideNav = (e) => {
  let sidenav = document.getElementsByClassName("side-nav")[0];
  let cover = document.getElementsByClassName("cover")[0];
  sidenav.style.right = e ? "0" : "-100%";
  cover.style.display = e ? "block" : "none";
};

const calcTotalInCart = () => {
  let calcTotalQuantity = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  document.getElementsByClassName("total-qty")[0].innerHTML = calcTotalQuantity;
  return calcTotalQuantity;
};

const changeQuantity = (idProduct, type) => {
  const foundIndex = cart.findIndex((item) => item.product.id === idProduct);
  if (type === "add") {
    cart[foundIndex].quantity += 1;
  } else if (type === "sub" && cart[foundIndex].quantity > 1) {
    cart[foundIndex].quantity -= 1;
  } else {
    cart.splice(foundIndex, 1);
  }

  setCart(cart);
  renderCart(cart);
  calcTotalInCart();
};

const calcTotalCash = () => {
  let totalCash = cart.reduce((total, item) => {
    return total + item.quantity * item.product.price;
  }, 0);

  document.getElementsByClassName("total")[0].innerHTML = totalCash;
  return totalCash;
};

const getCarts = () => {
  let cartJSON = localStorage.getItem("Cart");
  if (!cartJSON) return;
  cart = mapDataCart(JSON.parse(cartJSON));

  renderCart(cart);
};

const setCart = (cart) => {
  return localStorage.setItem("Cart", JSON.stringify(cart));
};

const removeCart = () => {
  return localStorage.removeItem("Cart");
};



const clearCart = () => {
  cart = [];
  renderCart(cart);
  setCart(cart);
  
};

const purchase = () => {
  let invoiceHTML = `
    <div class="invoice">
      <div class="shipping-items">
        <div class="item-names">${renderItemNames(cart)}</div>
        <div class="items-price">${renderItemPrices(cart)}</div>
      </div>
      <hr>
      <div class="payment">
        <em>Thanh toán</em>
        <div>
          <p>total amount to be paid:</p><span class="pay">$ ${calcTotalCash()}</span>
        </div>
      </div>
      <div class="order">
        <button onclick="order()" class="btn-order btn">Order Now</button>
        <button onclick="cancelInvoice()" class="btn-cancel btn">Cancel</button>
      </div>
    </div>
  `;
  let total = calcTotalInCart();
  if (total > 0) {
    document.getElementsByClassName("order-now")[0].innerHTML = invoiceHTML;
    document.getElementsByClassName("order-now")[0].style.width = "100%";
    sideNav(0);
  } else {
    document.getElementsByClassName("order-now")[0].innerHTML = "";
  }
};





window.onload = () => {
  getProducts();
  getCarts();
  document
    .getElementById("filter-product")
    .addEventListener("change", filterTypeOfPhone);
  calcTotalInCart();
  document
    .getElementsByClassName("btn clear")[0]
    .addEventListener("click", clearCart);
 
};
