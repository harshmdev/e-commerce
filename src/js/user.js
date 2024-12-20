//we have to click two times to remove the product.
const cartBtn = document.getElementById("cart");
const grid = document.getElementById("grid-container");
const allBtn = document.getElementById("all");
const livingBtn = document.getElementById("living");
const decorBtn = document.getElementById("decor");
const furnishingBtn = document.getElementById("furnishing");
const tablewareBtn = document.getElementById("tableware");
const bathBtn = document.getElementById( "bath");
const guest = document.getElementById("guest");
const cartCounter = document.getElementById("cart-counter");
const wishlistCounter = document.getElementById("wishlist-counter");
const wishlist = document.getElementById("wishlist");
const vendorBtn = document.getElementById("vendor-btn");
const myProductsBtn = document.getElementById("add-products");
const lg = document.getElementById("logout");
let prodName , prodPrice , imgsrc , prodCategory;

const getGuest = JSON.parse(sessionStorage.getItem("user")).username;//store the username of the person who logged in.

//shows the user's name , items in cart and items in wishlist.
if (getGuest === "admin") {
    guest.innerText = "Admin";
    cartCounter.innerText = JSON.parse(localStorage.getItem("admin")).cart.length;
    wishlistCounter.innerText = JSON.parse(localStorage.getItem("admin")).wishlist.length;
} else {
    const users = JSON.parse(localStorage.getItem("users"));
    for (let u of users){
        if(u.userName == getGuest) {
            guest.innerText = u.name;
            if(u.category == "user"){
                vendorBtn.style.display = "block";
            }
            cartCounter.innerText = u.cart.length;
            wishlistCounter.innerText = u.wishlist.length;
            break;
        };
    };
};

//make user a vendor
vendorBtn.addEventListener("click" , () => {
    const users = JSON.parse(localStorage.getItem("users"));//fetch the user
    for (let u of users){
        if(u.userName == getGuest) {
            u.category = "vendor";//change the category of user
            break;
        };
    };
    localStorage.setItem("users",JSON.stringify(users));
    location.reload();
});

//route to the cart page
cartBtn.addEventListener("click", () => {
    window.location.href = "cart.html";
});

//route to wishlist page
wishlist.addEventListener("click" , () => {
    location.href = "../components/wishlist.html";
});

//route to my products page
myProductsBtn.addEventListener("click" , () => {
    const users = JSON.parse(localStorage.getItem("users"));//fetch users
    for (let u of users){
        if(u.userName == getGuest){
            if(u.category == "vendor"){//check if user is a vendor or not
                location.href = "myProducts.html";
            } else {
                alert("Become a vendor to add products!");//if not vendor
            };
            break;
        }
    };
});

// //to close the add products window
// overlay.addEventListener("click", () => {
//     if(event.target===overlay){
//         overlay.style.display = "none";
//         message[0].innerText = "";
//     }
// });

//check if products array exist if not it will add an empty array.
if (localStorage.getItem("products") === null) {
    const products = [];
    localStorage.setItem("products",JSON.stringify(products));
};

//show the products to the homepage
const products = JSON.parse(localStorage.getItem("products"));
for (let p of products) {
    const product = displayProducts(p.ProductId , p.ImageLink , p.ProductName , p.ProductPrice);
    grid.innerHTML += product;
};


// addProductBtn.addEventListener("click" , () => {
//     let currentUser = JSON.parse(sessionStorage.getItem("user")).username;
//     prodName = document.getElementById("prodName").value;
//     prodPrice = document.getElementById("prodPrice").value;
//     imgsrc = document.getElementById("imgsrc").value;
//     prodCategory = document.getElementById("category").value;
//     const form = document.getElementsByClassName("productForm");

//     const products = JSON.parse(localStorage.getItem("products"));
//     const product = addProducts(products.length,currentUser,undefined,prodName,imgsrc,prodCategory,prodPrice);
//     grid.innerHTML += product;
//     form[0].reset();
//     message[0].innerText = "Product Added successfully";
// });

//This function will add product to the dom.
// function addProducts(pid , uname , owner="vendor" , productName  , imgsrc , category , productPrice ) {
//     const product = {
//         ProductId: `${pid * Math.random() + Math.random() }`,
//         username: `${uname}`,
//         Owner: `${owner}`,
//         ProductName: `${productName}`,
//         ImageLink: `${imgsrc}`,
//         Category: `${category}`,
//         ProductPrice: `${productPrice}`
//     };

//     const products = JSON.parse(localStorage.getItem("products"));
//     products.push(product);
//     localStorage.setItem("products",JSON.stringify(products));
//     const users = JSON.parse(localStorage.getItem("users"));
//     for (u of users){
//         if(uname == u.userName) {
//             u.myProducts.push(product);
//             localStorage.setItem("users",JSON.stringify(users));
//             break;
//         }
//     };

//     return displayProducts(pid,imgsrc , productName , productPrice);
// }

//show all products
allBtn.addEventListener("click", () => {
    grid.innerHTML = "";
    for (let p of products) {
        const product = displayProducts(p.ProductId , p.ImageLink , p.ProductName , p.ProductPrice);
        grid.innerHTML += product;
    };
});
//shows living room products
livingBtn.addEventListener("click", () => {
    grid.innerHTML = "";
    for (let p of products) {
        if (p.Category === "livingroom"){
            const product = displayProducts(p.ProductId , p.ImageLink , p.ProductName , p.ProductPrice);
            grid.innerHTML += product;
        };
    };
});
//shows decor products
decorBtn.addEventListener("click", () => {
    grid.innerHTML = "";
    for (let p of products) {
        if (p.Category === "decor"){
            const product = displayProducts(p.ProductId , p.ImageLink , p.ProductName , p.ProductPrice);
            grid.innerHTML += product;
        };
    };
});
//shows furnishing products
furnishingBtn.addEventListener("click", () => {
    grid.innerHTML = "";
    for (let p of products) {
        if (p.Category === "furnishing"){
            const product = displayProducts(p.ProductId , p.ImageLink , p.ProductName , p.ProductPrice);
            grid.innerHTML += product;
        };
    };
});
//shows tableware products
tablewareBtn.addEventListener("click", () => {
    grid.innerHTML = "";
    for (let p of products) {
        if (p.Category === "tableware"){
            const product = displayProducts(p.ProductId , p.ImageLink , p.ProductName , p.ProductPrice);
            grid.innerHTML += product;
        };
    };
});
//shows bath products
bathBtn.addEventListener("click", () => {
    grid.innerHTML = "";
    for (let p of products) {
        if (p.Category === "bath"){
            const product = displayProducts(p.ProductId , p.ImageLink , p.ProductName , p.ProductPrice);
            grid.innerHTML += product;
        };
    };
});



//display the products on the screen
function displayProducts(prodId , imgsrc , productName , productPrice) {
    const domTemp = `
        <div class="grid-item">
            <div class="prodImage">
                <img src="${imgsrc}" alt="Product Image" width="200px" height="250px">
            </div>
            <div class="prodName">${productName}</div>
            <div class="prodPrice">${productPrice}</div>
            <div class="addButtons">
                <div class="addWishlist">
                    <button onclick="addToWishlist(${prodId})">
                        <img src="../images/png/love.png" alt="wish" width="24px" height="24px">
                    </button>
                </div>
                <div class="addCart">
                    <button onclick='addToCart(${prodId})'>
                        <img src="../images/png/grocery-store.png" alt="cart" width="24px" height="24px">
                    </button>
                </div>
            </div>        
        </div>
    `;

    return domTemp;
}


//add products to the cart
function addToCart(id) {
    const user = JSON.parse(sessionStorage.getItem("user")).username;//fetch who is currently logged in
    if (user == "admin") {//if admin is logged in
        const adminObj = JSON.parse(localStorage.getItem("admin"));//fetch admin
        if(adminObj.cart.length === 0) {
            const cartObj = {
                pid: id,
                unit: 1
            };
            adminObj.cart.push(cartObj);
            localStorage.setItem("admin",JSON.stringify(adminObj));//push the product to admin if cart is empty
            location.reload();
            return alert("product successfully added!");
        } else {
            let flag = false;
            for (let c of adminObj.cart) {
                if (c.pid==id) {
                    flag = true;
                    return alert("Product already added to the cart");
                }
            };
            if(!flag) {
                const cartObj = {
                    pid: id,
                    unit: 1
                };
                adminObj.cart.push(cartObj);
                localStorage.setItem("admin",JSON.stringify(adminObj));//push the product to admin if cart is not empty
                location.reload();
                return alert("product successfully added!");
            };
        };
    } else {
        const users = JSON.parse(localStorage.getItem("users"));//fetch users item
        for (let u of users) {
            if(user == u.userName){
                if(u.cart.length == 0){//push the product if cart is empty
                    const cartObj = {
                        pid: id,
                        unit: 1
                    };
                    u.cart.push(cartObj);
                    localStorage.setItem("users", JSON.stringify(users));
                    location.reload();
                    return alert("product successfully added!");
                } else {
                    let flag = false;
                    for (let c of u.cart) {//check if product is already added
                        if (c.pid == id) {
                            flag = true;
                            return alert("Product already added to the cart!");
                        };
                    };
                    if(!flag) {//if not added push the product
                        const cartObj = {
                            pid: id,
                            unit: 1
                        };
                        u.cart.push(cartObj);
                        localStorage.setItem("users", JSON.stringify(users));
                        location.reload();
                        return alert("product successfully added!");
                    };
                };
            };
        };
    };
}


//add product to wishlist
function addToWishlist(id) {//works similar as of addToCart function.
    const user = JSON.parse(sessionStorage.getItem("user")).username;
    if (user == "admin") {
        const adminObj = JSON.parse(localStorage.getItem("admin"));
        if(adminObj.wishlist.length === 0) {
            adminObj.wishlist.push(id);
            localStorage.setItem("admin",JSON.stringify(adminObj));
            location.reload();
            return alert("product successfully added to the wishlist!");
        } else {
            let flag = false;
            for (let c of adminObj.wishlist) {
                if (c==id) {
                    flag = true;
                    location.reload();
                    return alert("Product already added to the wishlist");
                }
            };
            if(!flag) {
                adminObj.wishlist.push(id);
                localStorage.setItem("admin",JSON.stringify(adminObj));
                location.reload();
                return alert("product successfully added to the wishlist!");
            };
        };
    } else {
        const users = JSON.parse(localStorage.getItem("users"));
        for (let u of users) {
            if(user == u.userName){
                if(u.wishlist.length == 0){
                    u.wishlist.push(id);
                    localStorage.setItem("users", JSON.stringify(users));
                    location.reload();
                    return alert("product successfully added to the wishlist!");
                } else {
                    let flag = false;
                    for (let c of u.wishlist) {
                        if (c==id) {
                            flag = true;
                            location.reload();
                            return alert("Product already added to the wishlist");
                        }
                    };
                    if(!flag) {
                        u.wishlist.push(id);
                        localStorage.setItem("users", JSON.stringify(users));
                        location.reload();
                        return alert("product successfully added!");
                    };
                };
            };
        };
    };
}

//for logout
lg.addEventListener("click" , () => {
    location.href = "../../index.html";
});