// const addProdImageBtn = document.getElementById("addProdImage");
const addProductBtn = document.getElementById("add-product");
const myProducts = document.getElementById("my-products");
const guest = document.getElementById("guest");
const cartCounter = document.getElementById("cart-counter");
const wishlistCounter = document.getElementById("wishlist-counter");
const homeBtn = document.getElementById("home-container");
const message = document.getElementsByClassName("successMessage");
const grid = document.getElementById("grid-container");
const cartBtn = document.getElementById("cart");
const wishlist = document.getElementById("wishlist");
const allBtn = document.getElementById("all");
const livingBtn = document.getElementById("living");
const decorBtn = document.getElementById("decor");
const furnishingBtn = document.getElementById("furnishing");
const tablewareBtn = document.getElementById("tableware");
const bathBtn = document.getElementById( "bath");
const lg = document.getElementById("logout");
let prodName , prodPrice , imgsrc , prodCategory;

const getGuest = JSON.parse(sessionStorage.getItem("user")).username;
const users = JSON.parse(localStorage.getItem("users"));
let myProductsArr = [];
//display products
for(u of users){
    if (u.userName == getGuest) {
        myProductsArr = u.myProducts;
        for (p of myProductsArr){
            const product = displayProducts(p.ProductId, p.ImageLink , p.ProductName, p.ProductPrice);
            grid.innerHTML += product;
        };
    };
};



//shows the user's name , no. of items in cart and in wishlist.
if (getGuest === "admin") {
    guest.innerText = "Admin";
    cartCounter.innerText = JSON.parse(localStorage.getItem("admin")).cart.length;
    wishlistCounter.innerText = JSON.parse(localStorage.getItem("admin")).wishlist.length;
} else {
    const users = JSON.parse(localStorage.getItem("users"));
    for (let u of users){
        if(u.userName == getGuest) {
            guest.innerText = u.name;
            cartCounter.innerText = u.cart.length;
            wishlistCounter.innerText = u.wishlist.length;
            break;
        };
    };
};




//call the "toHomepage" function
homeBtn.addEventListener("click" , () => {
    toHomepage(getGuest);
})
//route to "admin.html" if user is admin otherwise to "user.html"
function toHomepage(getGuest) {
    if(getGuest == "admin"){
        window.location.href = "admin.html";
    } else {
        window.location.href = "user.html";
    };
}


//route to cart page
cartBtn.addEventListener("click", () => {
    window.location.href = "cart.html";
});

//route to wishlist page
wishlist.addEventListener("click" , () => {
    location.href = "../components/wishlist.html";
});

//open a form as we click on "add product image"
function addProductsFunction() {
    overlay.style.display = "flex";
}

//add product when click on addProductBtn
addProductBtn.addEventListener("click" , () => {
    prodName = document.getElementById("prodName").value;
    prodPrice = document.getElementById("prodPrice").value;
    imgsrc = document.getElementById("imgsrc").value;
    prodCategory = document.getElementById("category").value;
    const form = document.getElementsByClassName("form");

    for(u of users){
        if (u.userName == getGuest) {
            const products = u.myProducts;
            const [product , productObj]= addProducts(products.length,getGuest,undefined,prodName,imgsrc,prodCategory,prodPrice);
            grid.innerHTML += product;
            u.myProducts.push(productObj);
            localStorage.setItem("users",JSON.stringify(users));
            form[0].reset();
            message[0].innerText = "Product Added successfully";
        }
    }
});

//This function will add product to the dom.
function addProducts(pid , uname , owner="vendor" , productName  , imgsrc , category , productPrice ) {
    const product = {
        ProductId: `${pid * Math.random() + Math.random() }`,
        username: `${uname}`,
        Owner: `${owner}`,
        ProductName: `${productName}`,
        ImageLink: `${imgsrc}`,
        Category: `${category}`,
        ProductPrice: `${productPrice}`
    };

    const products = JSON.parse(localStorage.getItem("products"));
    products.push(product);
    localStorage.setItem("products",JSON.stringify(products));

    return [displayProducts(product.ProductId,imgsrc , productName , productPrice) , product];
}

//close an overlay if we click anywhere on overlay
overlay.addEventListener("click", () => {
    if(event.target===overlay){
        overlay.style.display = "none";
        message[0].innerText = "";
    }
});





function displayProducts(prodId , imgsrc , productName , productPrice) {
    const domTemp = `
    <div class="grid-item">
            <div class="prodImage" onclick="editProduct(${prodId});">
                <img src="${imgsrc}" alt="Product Image" width="200px" height="250px">
            </div>
            <div class="prodName">${productName}</div>
            <div class="prodPrice">${productPrice}</div>
            <div class="removeProd">
                <button  onclick='removeProduct(${prodId})'>
                    <img src="../images/png/remove.png" alt="remove" width="20px" height="20px" >
                </button>
            </div>         
        </div>
    `;

    return domTemp;
}


//edit product functionality
function editProduct(id) {//input is the id of product that we want to add
    const editOverlay = document.getElementById("edit-overlay");
    editOverlay.style.display = "flex";//display the overlay
    for (p of myProductsArr){
        if (p.ProductId == id){//find the product
            const domElement = `<div class="new-form-card">
                    <form class="newProductForm">
                        <fieldset>
                            <legend> Product Form </legend>
                            <label for="newProdName">Product Name:</label></br>
                            <input type="text" id="newProdName" name="prodName" value="${p.ProductName}" required></br>
                            <label for="newProdPrice">Price:</label></br>
                            <input type="text" id="newProdPrice" name="prodPrice" value="${p.ProductPrice}" required></br>
                            <label for="newImgsrc">Img Link:</label></br>
                            <input type="text" id="newImgsrc" value="${p.ImageLink}" name="imgsrc" required></br>
                            <label for="newCategory">Category:</label></br>
                            <select id="newCategory" name="category">
                                <option value="${p.Category}" selected>${p.Category}</option>
                                <option value="livingroom">Living Room</option>
                                <option value="decor">Decor</option>
                                <option value="furnishing">Furnishing</option>
                                <option value="tableware">Tableware</option>
                                <option value="bath">Bath & Laundry</option>
                            </select></br>
                            <input type="button" id="edit-product" value="Edit Product"  >
                        </fieldset>
                    </form>
                </div>`;
            
            editOverlay.innerHTML += domElement;//create an element and add it to the dom
            break;
        }
    }
    const editProductBtn = document.getElementById("edit-product");
    editProductBtn.addEventListener("click" , () => {//add the event listener to the button
        const newProdName = document.getElementById("newProdName").value;
        const newProdPrice = document.getElementById("newProdPrice").value;
        const newImgsrc = document.getElementById("newImgsrc").value;
        const newCategory = document.getElementById("newCategory").value;
        edited(id,newProdName,newProdPrice,newImgsrc,newCategory);//call the edited function
        editOverlay.style.display = "none";
        location.reload();//reload after completion
        editOverlay.innerHTML = "";
    })
    editOverlay.addEventListener("click", () => {//click on overlay to close it
        if(event.target===editOverlay){
            editOverlay.style.display = "none";
            editOverlay.innerHTML = "";
        }
    });
    
}
//take id and new values as arguements
function edited(id,name,price,image,category) {
    const products = JSON.parse(localStorage.getItem("products"));//fetch the products
    for (p of products){//find the products
        if(p.ProductId == id){
            p.ProductName = name;
            p.ProductPrice= price;
            p.ImageLink = image;
            p.Category = category;
            break;
        };
    };
    localStorage.setItem("products",JSON.stringify(products));//set the products with new values
    for (p of myProductsArr){
        if(p.ProductId == id){
            p.ProductName = name;
            p.ProductPrice= price;
            p.ImageLink = image;
            p.Category = category;
            break;
        };
    };
    for (u of users){
        if (getGuest == u.userName){
            u.myProducts = myProductsArr;
            localStorage.setItem("users", JSON.stringify(users));
            break;
        }
    }
}

//remove the product from local storage and display the remaining products.
function removeProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    products = products.filter(p => p.ProductId != id);
    localStorage.setItem("products",JSON.stringify(products));
    filterProduct(id);
    for (let u of users){
        if(u.userName == getGuest){
            u.myProducts = u.myProducts.filter(p => p.ProductId != id);
            localStorage.setItem("users", JSON.stringify(users));
            break;
        };
    };
    location.reload();
}

//remove the product from every cart and wishlist if product is removed by admin or vendor
function filterProduct(id) {//product id as input
    const admin = JSON.parse(localStorage.getItem("admin"));
    const users = JSON.parse(localStorage.getItem("users"));
    admin.cart = admin.cart.filter(p => p!=id);
    admin.wishlist = admin.wishlist.filter(p => p!=id);
    for (let u of users){
        u.cart = u.cart.filter(p => p!=id);
        u.wishlist = u.wishlist.filter(p => p!=id);
    };
    localStorage.setItem("admin", JSON.stringify(admin));
    localStorage.setItem("users", JSON.stringify(users));
}


//call the logout function if click on logout button.
lg.addEventListener("click", logout);
function logout(){
    location.href = "../../index.html";
}