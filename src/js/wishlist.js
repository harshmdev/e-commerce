//we have to click two times to remove the product.
const cartBtn = document.getElementById("cart");
const addProductsBtn = document.getElementById("add-products");
const addProductBtn = document.getElementById("add-product");
const myProducts = document.getElementById("my-products");
const grid = document.getElementById("grid-container");
const message = document.getElementsByClassName("successMessage");
const allBtn = document.getElementById("all");
const livingBtn = document.getElementById("living");
const decorBtn = document.getElementById("decor");
const furnishingBtn = document.getElementById("furnishing");
const tablewareBtn = document.getElementById("tableware");
const bathBtn = document.getElementById( "bath");
const guest = document.getElementById("guest");
const cartCounter = document.getElementById("cart-counter");
const wishlistCounter = document.getElementById("wishlist-counter");
const lg = document.getElementById("logout");
const wishlist = document.getElementById("wishlist");
const homeBtn = document.getElementById("home");
const userDetailsBtn = document.getElementById("user-details");
let prodName , prodPrice , imgsrc , prodCategory;

//get the user check if it is admin/user and display welcome message , cart counter , wishlist counter accordingly.
const getGuest = JSON.parse(sessionStorage.getItem("user")).username;
if (getGuest === "admin") {
    guest.innerText = "Admin";
    cartCounter.innerText = JSON.parse(localStorage.getItem("admin")).cart.length;
    wishlistCounter.innerText = JSON.parse(localStorage.getItem("admin")).wishlist.length;
} else {
    const users = JSON.parse(localStorage.getItem("users"));
    myProducts.style.display = "block";
    addProductsBtn.style.display = "none";
    userDetailsBtn.style.display = "none";
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

//route to myProdutcs page
myProducts.addEventListener("click" ,() => {
    location.href = "../components/myProducts.html"
});


//open a form as we click on "Add Products"
addProductsBtn.addEventListener("click" , () => {
    overlay.style.display = "flex";
});
//close an overlay if we click anywhere on overlay
overlay.addEventListener("click", () => {
    if(event.target===overlay){
        overlay.style.display = "none";
        message[0].innerText = "";
    }
});

//add the product to the "products" item in localstorage and display it in dom
addProductBtn.addEventListener("click" , () => {
    let currentUser = JSON.parse(sessionStorage.getItem("user")).username;
    prodName = document.getElementById("prodName").value;
    prodPrice = document.getElementById("prodPrice").value;
    imgsrc = document.getElementById("imgsrc").value;
    prodCategory = document.getElementById("category").value;
    const form = document.getElementsByClassName("productForm");

    const products = JSON.parse(localStorage.getItem("products"));
    const product = addProducts(products.length,currentUser,undefined,prodName,imgsrc,prodCategory,prodPrice);
    grid.innerHTML += product;
    form[0].reset();
    message[0].innerText = "Product Added successfully";
});

//This function will add product to the dom.
function addProducts(pid , uname , owner="admin" , productName  , imgsrc , category , productPrice ) {
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

    return displayProducts(product.ProductId,imgsrc , productName , productPrice);
}



//route to user details page.
userDetailsBtn.addEventListener("click", () => {
    window.location.href = "userDetails.html";
});

//fetch the products item from wishlist and display it on homepage.
if (getGuest == "admin") {
    const admin = JSON.parse(localStorage.getItem("admin"));
    const products = JSON.parse(localStorage.getItem("products")); 
    const productsArr = [];
    for (let q of admin.wishlist){
        const wishlistProduct = products.filter(p => p.ProductId == q);
        productsArr.push(wishlistProduct[0]);
    }
    for (let r of productsArr) {
        const product = displayProducts(r.ProductId , r.ImageLink , r.ProductName , r.ProductPrice);
        grid.innerHTML += product;
    };
} else {
    const users = JSON.parse(localStorage.getItem("users"));
    const products = JSON.parse(localStorage.getItem("products")); 
    for (u of users){
        if (u.userName == getGuest){
            const productsArr = [];
            for(let w of u.wishlist){
                const wishlistProduct = products.filter(p => p.ProductId == w);
                productsArr.push(wishlistProduct[0]);
            };
            for (let r of productsArr) {
                const product = displayProducts(r.ProductId , r.ImageLink , r.ProductName , r.ProductPrice);
                grid.innerHTML += product;
            };
        };
    };
};



//route to the wishlist
wishlist.addEventListener("click" , () => {
    location.href = "../components/wishlist.html";
})


//show all products
allBtn.addEventListener("click", () => {
    grid.innerHTML = "";
    for (let p of products) {
        const product = displayProducts(p.ProductId , p.ImageLink , p.ProductName , p.ProductPrice);
        grid.innerHTML += product;
    };
});

//show products categorized as "livingroom"
livingBtn.addEventListener("click", () => {
    grid.innerHTML = "";
    for (let p of products) {
        if (p.Category === "livingroom"){
            const product = displayProducts(p.ProductId , p.ImageLink , p.ProductName , p.ProductPrice);
            grid.innerHTML += product;
        };
    };
});

//show products categorized as "decor"
decorBtn.addEventListener("click", () => {
    grid.innerHTML = "";
    for (let p of products) {
        if (p.Category === "decor"){
            const product = displayProducts(p.ProductId , p.ImageLink , p.ProductName , p.ProductPrice);
            grid.innerHTML += product;
        };
    };
})

//show products categorized as "furnishing"
furnishingBtn.addEventListener("click", () => {
    grid.innerHTML = "";
    for (let p of products) {
        if (p.Category === "furnishing"){
            const product = displayProducts(p.ProductId , p.ImageLink , p.ProductName , p.ProductPrice);
            grid.innerHTML += product;
        };
    };
})

//show products categorized as "tableware"
tablewareBtn.addEventListener("click", () => {
    grid.innerHTML = "";
    for (let p of products) {
        if (p.Category === "tableware"){
            const product = displayProducts(p.ProductId , p.ImageLink , p.ProductName , p.ProductPrice);
            grid.innerHTML += product;
        };
    };
})

//show products categorized as "bath"
bathBtn.addEventListener("click", () => {
    grid.innerHTML = "";
    for (let p of products) {
        if (p.Category === "bath"){
            const product = displayProducts(p.ProductId , p.ImageLink , p.ProductName , p.ProductPrice);
            grid.innerHTML += product;
        };
    };
})



//format of the product in which we will show it to homepage
function displayProducts(prodId , imgsrc , productName , productPrice) {
    const domTemp = `
    <div class="grid-item">
            <div class="prodImage" onclick="editProduct(${prodId});">
                <img src="${imgsrc}" alt="Product Image" width="200px" height="250px">
            </div>
            <div class="prodName">${productName}</div>
            <div class="prodPrice">${productPrice}</div>
            <div class="addButtons">
                <div class="removeProd">
                    <button  onclick='removeProduct(${prodId})'>
                        <img src="../images/png/remove.png" alt="remove" width="24px" height="24px" >
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


//remove the product from local storage and display the remaining products.
function removeProduct(id) {
    const user = JSON.parse(sessionStorage.getItem("user")).username;
    if (user === "admin") {
        let adminObj = JSON.parse(localStorage.getItem("admin"));
        adminObj.wishlist = adminObj.wishlist.filter(product => product != id);
        localStorage.setItem("admin",JSON.stringify(adminObj));
        location.reload();
        return alert("Product Successfully removed from the wishlist!");
    } else {
        const usersObj = JSON.parse(localStorage.getItem("users"));
        for (let u of usersObj){
            if (u.userName == user){
                u.wishlist = u.wishlist.filter(product => product != id);
                break;
            }
        };
        localStorage.setItem("users", JSON.stringify(usersObj));
        location.reload();
        return alert("Product Successfully removed from the wishlist!");
    };
}




//add the function to the cart
function addToCart(id) {
    const user = JSON.parse(sessionStorage.getItem("user")).username;
    if (user == "admin") {
        const adminObj = JSON.parse(localStorage.getItem("admin"));
        if(adminObj.cart.length === 0) {//check if cart is empty
            const cartObj = {
                pid: id,
                unit: 1
            };
            adminObj.cart.push(cartObj);
            localStorage.setItem("admin",JSON.stringify(adminObj));//add the product if cart is empty
            location.reload();
            return alert("product successfully added!");
        } else { 
            let flag = false;
            for (let c of adminObj.cart) {//check if product is already present or not if cart is not empty.
                if (c.pid==id) {
                    flag = true;
                    location.reload();
                    return alert("Product already added to the cart");//if present
                }
            };
            if(!flag) {//add the product if not present
                const cartObj = {
                    pid: id,
                    unit: 1
                };
                adminObj.cart.push(cartObj);
                localStorage.setItem("admin",JSON.stringify(adminObj));
                location.reload();
                return alert("product successfully added!");
            };
        };
    } else { //if user is not admin
        const users = JSON.parse(localStorage.getItem("users"));
        for (let u of users) {
            if(user == u.username){//check if cart is empty
                if(u.cart.length == 0){
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
                    for (let c of u.cart) {//if not empty check if product is present or not
                        if (c.pid==id) {
                            flag = true;
                            location.reload();
                            return alert("Product already added to the cart!");
                        }
                    };
                    if(!flag) {//if not present add the product
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



//call the logout function if click on logout button.
lg.addEventListener("click", logout);
function logout(){
    location.href = "../../index.html";
}