let noItems , gst , shipping , total;
let addProducts = document.getElementById("add-products");
const addProductBtn = document.getElementById("add-product");
let userDetails = document.getElementById("user-details");
let myProducts = document.getElementById("my-products");
noItems = document.getElementById("no-items");
gst = document.getElementById("gst");
shipping = document.getElementById("shipping");
total = document.getElementById("total");
const user = JSON.parse(sessionStorage.getItem("user")).username;
const cartSection = document.getElementById("cart-section");
const placeOrder = document.getElementById("place-order");
const lout = document.getElementById("logout");
const moreP = document.getElementById("home");
const guest = document.getElementById("guest");
const cartCounter = document.getElementById("cart-counter");
const wishlistCounter = document.getElementById("wishlist-counter");
const homeBtn = document.getElementById("home-container");
const wishlist = document.getElementById("wishlist");

//shows the user's name , no. of items in cart and in wishlist.
const getGuest = JSON.parse(sessionStorage.getItem("user")).username;
if (getGuest === "admin") {
    guest.innerText = "Admin";
    cartCounter.innerText = JSON.parse(localStorage.getItem("admin")).cart.length;
    wishlistCounter.innerText = JSON.parse(localStorage.getItem("admin")).wishlist.length;
} else {
    const users = JSON.parse(localStorage.getItem("users"));
    myProducts.style.display = "block";
    addProducts.style.display = "none";
    userDetails.style.display = "none";
    for (let u of users){
        if(u.userName == getGuest) {
            guest.innerText = u.name;
            cartCounter.innerText = u.cart.length;
            wishlistCounter.innerText = u.wishlist.length;
            break;
        };
    };
};

//open a form as we click on "Add Products"
addProducts.addEventListener("click" , () => {
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

//route to wishlist page
wishlist.addEventListener("click" , () => {
    location.href = "../components/wishlist.html";
});

//route to user details page.
userDetails.addEventListener("click", () => {
    window.location.href = "userDetails.html";
});

//route to myProdutcs page
myProducts.addEventListener("click" ,() => {
    location.href = "../components/myProducts.html"
});


//show added products and calculate bill
if (user === "admin"){//if admin
    const productsArr = [];
    const cart = JSON.parse(localStorage.getItem("admin")).cart;//take cart of admin
    const products = JSON.parse(localStorage.getItem("products"));
    let product;
    for (let c of cart) {
        product = products.find(p => p.ProductId == c.pid );//use find because filter returns the array
        const productObj = {//create product object so we can save one more info no of item.
            pid : product.ProductId,
            imgsrc : product.ImageLink,
            name : product.ProductName,
            price: product.ProductPrice,
            unit: c.unit
        };

        productsArr.push(productObj);
    };
    for (let p of productsArr) {//loop through array to display items
        cartSection.innerHTML += displayProducts(p.pid, p.imgsrc , p.name , p.price , p.unit);
    };


    if(productsArr.length != 0){
        let [totalNoItems , tempgst , tempshipping , temptotal] = calculateBill(productsArr);
        noItems.innerText = totalNoItems;
        gst.innerText = tempgst.toFixed(2);
        shipping.innerText = tempshipping;
        total.innerText = temptotal.toFixed(2);
    };

} else {;
    const users = JSON.parse(localStorage.getItem("users"));
    for (let u of users) {
        if (user == u.userName) {
            const productsArr = [];
            const cart = u.cart;
            const products = JSON.parse(localStorage.getItem("products"));
            let product;
            for (let c of cart) {
                product = products.find(p => p.ProductId == c.pid );//use find because filter returns the array
                const productObj = {//create product object so we can save one more info no of item.
                    pid : product.ProductId,
                    imgsrc : product.ImageLink,
                    name : product.ProductName,
                    price: product.ProductPrice,
                    unit: c.unit
                };

                productsArr.push(productObj);
            };
            for (p of productsArr) {//display all products by loop through all products
                cartSection.innerHTML += displayProducts(p.pid, p.imgsrc , p.name , p.price , p.unit);
            };
            if(productsArr.length != 0){
                let [totalNoItems , tempgst , tempshipping , temptotal] = calculateBill(productsArr);//call calculate bill
                //show the bill
                noItems.innerText = totalNoItems;
                gst.innerText = tempgst.toFixed(2);
                shipping.innerText = tempshipping;
                total.innerText = temptotal.toFixed(2);
            };
        };
    };
};

//take array of product objects
function calculateBill(productsObj){
    let totalNoItems=0 , gst=0 , shipping=0 , subTotal=0 , total=0;
    for (let p of productsObj){
        totalNoItems += +p.unit;//calculate no of items
        subTotal += +p.unit * +p.price;//calculate sub total 
    }
    gst = 0.1 * +subTotal;//calculate gst
    shipping = 40;//calculate shipping
    total = +subTotal + +gst + +shipping;//calculate total
    return [totalNoItems , gst , shipping , total];//return all things
}



//place the order
placeOrder.addEventListener("click", placeOrderFunc);
function placeOrderFunc(){
    if (user === "admin") {
        const admin = JSON.parse(localStorage.getItem("admin"));
        admin.purchase.push(admin.cart);//update purchase
        admin.cart = [];
        localStorage.setItem("admin",JSON.stringify(admin));
    } else {
        const users = JSON.parse(localStorage.getItem("users"));
        for (u of users){
            if (user == u.userName){
                u.purchase.push(u.cart);//update purchase
                u.cart = [];
                localStorage.setItem("users", JSON.stringify(users));
            };
        };
    };
    //reset the page
    cartSection.innerHTML = "";
    noItems.innerText = 0;
    gst.innerText = 0;
    shipping.innerText = 0;
    total.innerText = 0;
    location.reload();
    alert("order has been placed successfully;");
}

//route to homepage
homeBtn.addEventListener("click", () => {
    if(getGuest == "admin") {
        window.location.href = "admin.html";
    } else {
        window.location.href = "user.html";
    };
});

//if we click "add more products" it will take back one step.
moreP.addEventListener("click", () => {
    if (getGuest == "admin") {
        location.href = "admin.html";
    } else {
        location.href = "user.html";
    };
});



//to display the product in cart section
function displayProducts(prodId , imgsrc , productName , productPrice , unit) {
    const domTemp = `
            <div class="cart-item">
                <div class="prodImage">
                    <img src="${imgsrc}" alt="Product Image" width="100px" height="120px">
                </div>
                <div class="prodDetails">
                    <div class="prodName">
                        <p>${productName}</p>
                    </div>
                    <div class="product-amount">
                        <button id="increment" onclick="increment(${prodId});">
                            <img src="../images/png/uarrow.png" alt="Increment" width="10px" height="10px">
                        </button>
                        <p id="amt">${unit}</p>
                        <button id="decrement" onclick="decrement(${prodId},${unit});">
                            <img src="../images/png/darrow.png" alt="Decrement" width="10px" height="10px">
                        </button>
                    </div>
                    <div class="prodPrice">
                        <p id="product-price">
                            ${productPrice * unit} 
                        </p>
                    </div>
                </div>
                <div class="addButtons">
                    <div class="addWishlist">
                        <button onclick="addToWishlist(${prodId})">
                            <img src="../images/png/love.png" alt="wish" width="24px" height="24px">
                        </button>
                    </div>
                    <div class="addCart">
                        <button onclick="removeFromCart(${prodId})">
                            <img src="../images/png/remove.png" alt="cart" width="24px" height="24px">
                        </button>
                    </div>
                </div>
            </div>`;

    return domTemp;
}


//fetch the cart increase the unit and return it.
function increment(p) {
    const getUser = JSON.parse(sessionStorage.getItem("user")).username;//fetch username
    if(getUser == "admin"){//if admin
        const admin = JSON.parse(localStorage.getItem("admin"));//get admin
        for (let c of admin.cart){//loop through cart
            if(p == c.pid){//if product id is same
                c.unit += 1;//increase no. of unit
                localStorage.setItem("admin" , JSON.stringify(admin));//set admin
                location.reload();//reloaad location
                break;
            };
        }
    }else {
        const users = JSON.parse(localStorage.getItem("users"));
        for (let u of users){
            if(u.userName == getUser){
                for(let c of u.cart){
                    if(p == c.pid){
                        c.unit += 1;
                        localStorage.setItem("users" , JSON.stringify(users));
                        location.reload();
                        break;
                    };
                };
            };
        };
    };
}

//fetch the cart decrease the unit and return it.
function decrement(p,u) {
    if (u > 1 ){
        const getUser = JSON.parse(sessionStorage.getItem("user")).username;
        if(getUser == "admin"){
            const admin = JSON.parse(localStorage.getItem("admin"));
            for (let c of admin.cart){
                if(p == c.pid){
                    c.unit -= 1;
                    localStorage.setItem("admin" , JSON.stringify(admin));
                    location.reload();
                    break;
                };
            }
        }else {
            const users = JSON.parse(localStorage.getItem("users"));
            for (let u of users){
                if(u.userName == getUser){
                    for(let c of u.cart){
                        if(p == c.pid){
                            c.unit -= 1;
                            localStorage.setItem("users" , JSON.stringify(users));
                            location.reload();
                            break;
                        };
                    };
                };
            };
        };

    }
}





//to add the product to wishlist
function addToWishlist(id) {
    const user = JSON.parse(sessionStorage.getItem("user")).username;
    if (user == "admin") {
        const adminObj = JSON.parse(localStorage.getItem("admin"));
        if(adminObj.wishlist.length == 0) {
            adminObj.wishlist.push(id);
            localStorage.setItem("admin",JSON.stringify(adminObj));
            location.reload();
            return alert("product successfully added to the wishlist!");
        } else {
            let flag = false;
            for (let c of adminObj.wishlist) {
                if (c==id) {
                    flag = true;
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
                            return alert("Product already added to the Wishlist!");
                        }
                    };
                    if(!flag) {
                        u.wishlist.push(id);
                        localStorage.setItem("users", JSON.stringify(users));
                        location.reload();
                        return alert("product successfully added to the wishlist!");
                    };
                };
            };
        };
    };
}


//remove the product from cart
function removeFromCart(id) {
    const user = JSON.parse(sessionStorage.getItem("user")).username;
    if (user === "admin") {
        let adminObj = JSON.parse(localStorage.getItem("admin"));
        adminObj.cart = adminObj.cart.filter(product => product.pid != id);
        localStorage.setItem("admin",JSON.stringify(adminObj));
        location.reload();
        return alert("Product Successfully removed from the cart!");
    } else {
        const usersObj = JSON.parse(localStorage.getItem("users"));
        for (let u of usersObj){
            if (u.userName == user){
                u.cart = u.cart.filter(product => product.pid != id);
                break;
            }
        };
        localStorage.setItem("users", JSON.stringify(usersObj));
        location.reload();
        return alert("Product Successfully removed from the cart!");
    };
}


//it will logout the current user
lout.addEventListener("click", () => {
    logout();
})
function logout() {
    const username = {
        username: ""
    };
    sessionStorage.setItem("user",JSON.stringify(username));
    location.href = "../../index.html";
}


