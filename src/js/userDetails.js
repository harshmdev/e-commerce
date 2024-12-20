const productsOverlay = document.getElementById("products-overlay");
let users = JSON.parse(localStorage.getItem("users"));
const vendorProducts = document.getElementById("vendor-products");
const tbody = document.getElementById("tbody");
const wishlistPage = document.getElementById("wishlist");

for(u of users){
    tbody.innerHTML += displayUsers(u.name , u.userName , u.category);
};


//route to wishlist page
// wishlistPage.addEventListener("click" , () => {
//     location.href = "../components/wishlist.html";
// });

//exit from the overlay , if u click anywhere on overlay
productsOverlay.addEventListener("click", () => {
    if(event.target===productsOverlay){
        productsOverlay.style.display = "none";
    }
});

//remove the user
function removeUser(username){
    users = users.filter(u => u.userName != username);
    localStorage.setItem("users", JSON.stringify(users));
    location.reload();
}


//return the dom element which contains the details of user.
function displayUsers(fullName,userName,category){
    const domElement = `<tr>
                    <td>${fullName}</td>
                    <td>${userName}</td>
                    <td>${category}</td>
                    <td><button id="show-products" onclick="showProducts('${userName}');"><b>Show products</b></button></td>
                    <td><button id="remove" onclick="removeUser('${userName}');"><b>Remove</b></button></td>
                </tr>`;
    return domElement;
}

// show the products of selected user on an overlay screen.
function showProducts(username) {
    let products = [];
    productsOverlay.style.display = "flex";
    for (u of users) {
        if(u.userName == username){
            products = u.myProducts;
            break;
        }
    }
    for (p of products){
        vendorProducts.innerHTML += displayProducts(p.ImageLink,p.ProductName,p.Category,p.ProductPrice);
    }
}

//return the dom element which contains the details of products
function displayProducts(imgsrc , productName , productCategory , productPrice){
    domElement = `<div class="product-item">
                <div class="prodImage">
                    <img src="${imgsrc}" alt="Product Image" width="100px" height="120px">
                </div>
                <div class="prodName">
                    <p>${productName}</p>
                </div>
                <div class="prodCategory">
                    <p>${productCategory}</p>
                </div>
                <div class="prodPrice">
                    <p id="product-price">
                        ${productPrice}
                    </p>
                </div>
            </div>`;

    return domElement;
}

//for logout
const logOut = document.getElementById("logout");
logOut.addEventListener("click" , () => {
    location.href = "../../index.html";
});