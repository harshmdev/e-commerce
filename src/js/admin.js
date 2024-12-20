//we have to click two times to remove the product.
const cartBtn = document.getElementById("cart");
const addProductsBtn = document.getElementById("add-products");
const addProductBtn = document.getElementById("add-product");
const grid = document.getElementById("grid-container");
const message = document.getElementsByClassName("successMessage");
const allBtn = document.getElementById("all");
const livingBtn = document.getElementById("living");
const decorBtn = document.getElementById("decor");
const furnishingBtn = document.getElementById("furnishing");
const tablewareBtn = document.getElementById("tableware");
const bathBtn = document.getElementById( "bath");
const guest = document.getElementById("guest");
// const cartCounter = document.getElementById("cart-counter");
// const wishlistCounter = document.getElementById("wishlist-counter");
const lg = document.getElementById("logout");
// const wishlist = document.getElementById("wishlist");
const homeBtn = document.getElementById("home");
const userDetailsBtn = document.getElementById("user-details");
let prodName , prodPrice , imgsrc , prodCategory;

//get the user check if it is admin/user and display welcome message , cart counter , wishlist counter accordingly.
const getGuest = JSON.parse(sessionStorage.getItem("user")).username;
if (getGuest === "admin") {
    guest.innerText = "Admin";
    // cartCounter.innerText = JSON.parse(localStorage.getItem("admin")).cart.length;
    // wishlistCounter.innerText = JSON.parse(localStorage.getItem("admin")).wishlist.length;
} else {
    const users = JSON.parse(localStorage.getItem("users"));
    for (let u of users){
        if(u.username == getGuest) {
            guest.innerText = u.name;
            // cartCounter.innerText = u.cart.length;
            // wishlistCounter.innerText = u.wishlist.length;
            break;
        };
    };
};


//call the "toHomepage" function
// homeBtn.addEventListener("click" , () => {
//     toHomepage(getGuest);
// })
//route to "admin.html" if user is admin otherwise to "user.html"
// function toHomepage(getGuest) {
//     if(getGuest == "admin"){
//         window.location.href = "admin.html";
//     } else {
//         window.location.href = "user.html";
//     };
// }

//route to cart page
// cartBtn.addEventListener("click", () => {
//     window.location.href = "cart.html";
// });


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


//route to user details page.
userDetailsBtn.addEventListener("click", () => {
    window.location.href = "userDetails.html";
});


//add an empty array in "products" in localStorage.
if (localStorage.getItem("products") === null) {
    const products = [];
    localStorage.setItem("products",JSON.stringify(products));
};

//fetch the products item from local storage and display it on homepage.
const products = JSON.parse(localStorage.getItem("products"));
for (let p of products) {
    const product = displayProducts(p.ProductId , p.ImageLink , p.ProductName , p.ProductPrice);
    grid.innerHTML += product;
};

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

//route to the wishlist
// wishlist.addEventListener("click" , () => {
//     location.href = "../components/wishlist.html";
// })

//call the logout function if click on logout button.
lg.addEventListener("click", logout);
function logout(){
    location.href = "../../index.html";
}

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
            <div class="removeProd">
                <button  onclick='removeProduct(${prodId})'>
                    <img src="../images/png/remove.png" alt="remove" width="20px" height="20px" >
                </button>
            </div>         
        </div>
    `;

    return domTemp;
}

{/* <div class="addButtons">
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
            </div> */}


//remove the product from local storage and display the remaining products.
function removeProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    products = products.filter(p => p.ProductId != id);
    grid.innerHTML = "";
    for (let p of products) {
        const product = displayProducts(p.ProductId,p.ImageLink , p.ProductName , p.ProductPrice);
        grid.innerHTML += product;
    }
    localStorage.setItem("products",JSON.stringify(products));
    filterProduct(id);
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


//add the function to the cart
// function addToCart(id) {
//     const user = JSON.parse(sessionStorage.getItem("user")).username;
//     if (user == "admin") {
//         const adminObj = JSON.parse(localStorage.getItem("admin"));
//         if(adminObj.cart.length === 0) {//check if cart is empty
//             const cartObj = {
//                 pid: id,
//                 unit: 1
//             };
//             adminObj.cart.push(cartObj);
//             localStorage.setItem("admin",JSON.stringify(adminObj));//add the product if cart is empty
//             location.reload();
//             return alert("product successfully added!");
//         } else { 
//             let flag = false;
//             for (let c of adminObj.cart) {//check if product is already present or not if cart is not empty.
//                 if (c.pid==id) {
//                     flag = true;
//                     location.reload();
//                     return alert("Product already added to the cart");//if present
//                 }
//             };
//             if(!flag) {//add the product if not present
//                 const cartObj = {
//                     pid: id,
//                     unit: 1
//                 };
//                 adminObj.cart.push(cartObj);
//                 localStorage.setItem("admin",JSON.stringify(adminObj));
//                 location.reload();
//                 return alert("product successfully added!");
//             };
//         };
//     } else { //if user is not admin
//         const users = JSON.parse(localStorage.getItem("users"));
//         for (let u of users) {
//             if(user == u.username){//check if cart is empty
//                 if(u.cart.length == 0){
//                     const cartObj = {
//                         pid: id,
//                         unit: 1
//                     };
//                     u.cart.push(cartObj);
//                     localStorage.setItem("users", JSON.stringify(users));
//                     location.reload();
//                     return alert("product successfully added!");
//                 } else {
//                     let flag = false;
//                     for (let c of u.cart) {//if not empty check if product is present or not
//                         if (c.pid==id) {
//                             flag = true;
//                             location.reload();
//                             return alert("Product already added to the cart!");
//                         }
//                     };
//                     if(!flag) {//if not present add the product
//                         const cartObj = {
//                             pid: id,
//                             unit: 1
//                         };
//                         u.cart.push(cartObj);
//                         localStorage.setItem("users", JSON.stringify(users));
//                         location.reload();
//                         return alert("product successfully added!");
//                     };
//                 };
//             };
//         };
//     };
// }

//add products to wishlist , works similarly as addTOCart function
// function addToWishlist(id) {
//     const user = JSON.parse(sessionStorage.getItem("user")).username;
//     if (user == "admin") {
//         const adminObj = JSON.parse(localStorage.getItem("admin"));
//         if(adminObj.wishlist.length === 0) {
//             adminObj.wishlist.push(id);
//             localStorage.setItem("admin",JSON.stringify(adminObj));
//             location.reload();
//             return alert("product successfully added to the wishlist!");
//         } else {
//             let flag = false;
//             for (let c of adminObj.wishlist) {
//                 if (c==id) {
//                     flag = true;
//                     location.reload();
//                     return alert("Product already added to the wishlist");
//                 }
//             };
//             if(!flag) {
//                 adminObj.wishlist.push(id);
//                 localStorage.setItem("admin",JSON.stringify(adminObj));
//                 location.reload();
//                 return alert("product successfully added to the wishlist!");
//             };
//         };
//     } else {
//         const users = JSON.parse(localStorage.getItem("users"));
//         for (let u of users) {
//             if(user == u.username){
//                 if(u.wishlist.length == 0){
//                     u.wishlist.push(id);
//                     localStorage.setItem("users", JSON.stringify(users));
//                     location.reload();
//                     return alert("product successfully added!");
//                 } else {
//                     let flag = false;
//                     for (let c of u.wishlist) {
//                         if (c==id) {
//                             flag = true;
//                             location.reload();
//                             return alert("Product already added to the cart!");
//                         }
//                     };
//                     if(!flag) {
//                         u.wishlist.push(id);
//                         localStorage.setItem("users", JSON.stringify(users));
//                         location.reload();
//                         return alert("product successfully added!");
//                     };
//                 };
//             };
//         };
//     };
// }


//edit product functionality
function editProduct(id) {//input is the id of product that we want to add
    const products = JSON.parse(localStorage.getItem("products"));//fetch products from local storage
    const editOverlay = document.getElementById("edit-overlay");
    editOverlay.style.display = "flex";//display the overlay
    for (p of products){
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
}