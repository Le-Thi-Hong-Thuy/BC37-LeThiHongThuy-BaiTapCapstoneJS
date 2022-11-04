let productList = [];

const getProductList = async () => {
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

const addProduct = () => {
  let id = document.getElementById("MaSP").value;
  let name = document.getElementById("TenSP").value;
  let price = document.getElementById("GiaSP").value;
  let screen = document.getElementById("ManHinh").value;
  let backCamera = document.getElementById("CameraSau").value;
  let frontCamera = document.getElementById("CameraTruoc").value;
  let img = document.getElementById("HinhSP").value;
  let desc = document.getElementById("MoTa").value;
  let type = document.getElementById("PhanLoai").value;

  let newProduct = new Products(
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

  try {
    axios({
      url: "https://634d5a61acb391d34a9b1cc0.mockapi.io/Products",
      method: "POST",
      data: newProduct,
    });
    getProductList();
  } catch (error) {
    console.log(error);
  }
};

const mapData = (data) => {
  let result = [];

  data.forEach((product) => {
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
    } = product;

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

const renderProducts = (data) => {
  let productHTML = "";
  for (let i in data) {
    productHTML += data[i].render(+i + 1);
  }

  document.getElementById("tblDanhSachSP").innerHTML = productHTML;
};

const deleteProduct = async (productId) => {
  try {
    let res = await axios({
      url: `https://634d5a61acb391d34a9b1cc0.mockapi.io/Products/${productId}`,
      method: "DELETE",
    });
    getProductList();
  } catch (error) {
    console.log(error);
  }
};

const searchProducts = () => {
  let keyword = document.getElementById("inputTK").value.toLowerCase().trim();
  let result = productList.filter(
    (item) => item.id === keyword || item.name.toLowerCase().includes(keyword)
  );

  renderProducts(result);
};

const getUpdateProduct = async (productId) => {
  try {
    let res = await axios({
      url: `https://634d5a61acb391d34a9b1cc0.mockapi.io/Products/${productId}`,
      method: "GET",
    });

    let product = res.data;

    document.getElementById("MaSP").value = product.id;
    document.getElementById("TenSP").value = product.name;
    document.getElementById("GiaSP").value = product.price;
    document.getElementById("ManHinh").value = product.screen;
    document.getElementById("CameraTruoc").value = product.frontCamera;
     document.getElementById("CameraSau").value = product.backCamera;
    document.getElementById("HinhSP").value = product.img;
    document.getElementById("MoTa").value = product.desc;
    document.getElementById("PhanLoai").value = product.type;

    document.getElementsByClassName("modal-title")[0].innerHTML =
      "Cập nhật sản phẩm";
    document.getElementById("addProduct").style.display = "none";
    document.getElementById("updateProduct").style.display = "inline-block";
    document.getElementById("MaSP").disabled = true;
  } catch (error) {
    console.log(error);
  }
};

const updateStudent = () => {
  let id = document.getElementById("MaSP").value;
  let name = document.getElementById("TenSP").value;
  let price = document.getElementById("GiaSP").value;
  let screen = document.getElementById("ManHinh").value;
  let frontCamera = document.getElementById("CameraTruoc").value;
  let backCamera = document.getElementById("CameraSau").value;
  let img = document.getElementById("HinhSP").value;
  let desc = document.getElementById("MoTa").value;
  let type = document.getElementById("PhanLoai").value;

  let newProduct = new Products(
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

  try {
    axios({
      url: `https://634d5a61acb391d34a9b1cc0.mockapi.io/Products/${id}`,
      method: "PUT",
      data: newProduct,
    });

    getProductList();
    document.getElementsByClassName("modal-title")[0].innerHTML =
      "Thêm sản phẩm";
    document.getElementById("addProduct").style.display = "inline-block";
    document.getElementById("updateProduct").style.display = "none";
    document.getElementById("MaSP").disabled = false;
    document.getElementById("form-products").reset();
  } catch (error) {
    console.log(error);
  }
};

window.onload = () => {
  getProductList();
  document.getElementById("addProduct").addEventListener("click", addProduct);
  document
    .getElementById("updateProduct")
    .addEventListener("click", updateStudent);
};


const validateForm = () => {
  let isValid = true;

  isValid &= required(id, "spanMaSP") && length(account, "tbTKNV", 4, 6);
  isValid &= required(fullName, "tbTen") && string(fullName, "tbTen");
  isValid &= required(email, "tbEmail") && checkEmail(email, "tbEmail");
  isValid &= required(password, "tbMatKhau") && checkPassword(password, "tbMatKhau");
  isValid &= required(day, "tbNgay") && checkDate(day, "tbNgay");
  isValid &= checkSalary(salary, "tbLuongCB", 1000000, 20000000);
  isValid &= checkPosition(positionStaff, "tbChucVu");
  isValid &= checkHour(hour, "tbGiolam", 80, 200);

  return isValid;
};

const required = (value, spanId) => {
  if (value.length === 0) {
    document.getElementById(spanId).innerHTML = "*Bắt buộc nhập!";
    document.getElementById(spanId).style.display = "inline-block";
    return false;
  }

  document.getElementById(spanId).innerHTML = "";
  document.getElementById(spanId).style.display = "none";
  return true;
};

function length(value, spanId, min, max) {
  if (value.length < min || value.length > max) {
    document.getElementById(
      spanId
    ).innerHTML = `*Độ dài phải từ ${min} đến ${max} kí tự`;
    document.getElementById(spanId).style.display = "inline-block";
    return false;
  }

  document.getElementById(spanId).innerHTML = "";
  document.getElementById(spanId).style.display = "none";
  return true;
}

const string = (value, spanId) => {
  var pattern =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/g;
  if (pattern.test(value)) {
    document.getElementById(spanId).innerHTML = "";
    document.getElementById(spanId).style.display = "none";
    return true;
  }

  document.getElementById(spanId).innerHTML =
    "*Chấp nhận kí tự từ a đến z!";
  document.getElementById(spanId).style.display = "inline-block";
  return false;
};


