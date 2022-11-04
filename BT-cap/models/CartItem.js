class CartItem {
    constructor(
      id,
      name,
      price,
      screen,
      backCamera,
      frontCamera,
      img,
      desc,
      type,
      quantity
    ) {
      this.product = new Products(
        id,
        name,
        price,
        screen,
        backCamera,
        frontCamera,
        img,
        desc,
        type
      );
      this.quantity = quantity;
    }
  
    render() {
      return `
      <div class="cart-item">
        <div class="cart-img">
          <img src=${this.product.img} alt="">
        </div>
        <strong class="name">${this.product.name}</strong>
        <span class="qty-change">
          <div>
            <button class="btn-qty" onclick="changeQuantity('${this.product.id}','sub')"><i class="fas fa-chevron-left"></i></button>
            <p class="qty">${this.quantity}</p>
            <button class="btn-qty" onclick="changeQuantity('${this.product.id}','add')"><i class="fas fa-chevron-right"></i></button>
          </div>
        </span>
        <p class="price"> ${this.product.price}</p>
        <button onclick="deleteProductInCart('${this.product.id}')"><i class="fas fa-trash"></i></button>
      </div>
      `;
    }
  }