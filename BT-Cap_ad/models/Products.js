class Products {
    constructor(
      id,
      name,
      price,
      screen,
      backCamera,
      frontCamera,
      img,
      desc,
      type
    ) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.screen = screen;
      this.backCamera = backCamera;
      this.frontCamera = frontCamera;
      this.img = img;
      this.desc = desc;
      this.type = type;
    }
  
    render(index) {
      return `
          <tr>
              <td>${index}</td>
              <td>${this.name}</td>
              <td>${this.price}vnd</td>
              <td>${this.screen}</td>
              <td>${this.backCamera}</td>
              <td>${this.frontCamera}</td>
              <td>
                  <img src=${this.img} style="width:70px"/>
              </td>
              <td>${this.desc}</td>
              <td>${this.type}</td>
              <td>
                <button class="btn btn-info mb-1" onclick="getUpdateProduct('${this.id}')" data-toggle="modal" data-target="#myModal">Cập nhật</button>
                <button class="btn btn-danger" onclick="deleteProduct('${this.id}')">Xóa</button>
              </td>
          </tr>
      `;
    }
}
