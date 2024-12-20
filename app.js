let uName , password , fullName;
const lPanel = document.getElementsByClassName("login-panel");
const sPanel = document.getElementsByClassName("signup-panel");
const loginBtn = document.getElementById("login");
const signBtn = document.getElementById("signup");
const message = document.getElementsByClassName("message");
const togglebtn = document.getElementById("toggle");
const form = document.getElementsByClassName("form");



class User {//user object
    constructor(uid , name , userName , password , category = "user" , cart = [] , wishlist = [] , myProducts = [] , purchase = []) {
        this.uid = uid,
        this.name = name,
        this.userName = userName,
        this.password = password,
        this.category = category,
        this.cart = cart,
        this.wishlist = wishlist,
        this.myProducts = myProducts,
        this.purchase = purchase
    }


};



//hardcoded username and password of admin
const adminUsername = "admin";
const adminPassword = "admin123";

//whole login system , checks the username and password , show error if not exists.
loginBtn.addEventListener("click" , () => {
    uName = document.getElementById("username").value;//get the username 
    password = document.getElementById("password").value;//get the password
    let flag = false;
    const users = localStorage.getItem("users");//fetch users from local storage
    if (uName === adminUsername && password === adminPassword ) {//match the username and password with admin
        window.location.href = "src/components/admin.html";//if matched route towards admin page
        if (localStorage.getItem("admin") === null) {//create an admin item in local storage
            const adminObj = {
                category: "admin",
                wishlist: [],
                cart: [],
                purchase: []
            };
            localStorage.setItem("admin",JSON.stringify(adminObj));
            if(users === null) {//create an users item in local storage 
                const users = [];
                localStorage.setItem("users",JSON.stringify(users));
            };
        };
        const currentUser = {"username":adminUsername};
        sessionStorage.setItem("user",JSON.stringify(currentUser));//set the current user
    } else {

        if (users === null){
            message[0].innerText = "Not a valid user! Register to become a member.";
            form[0].reset();
        } else {
            for (u of JSON.parse(users)) {//fetch users
                if (uName == u.userName && password == u.password) {//match username and password with users
                    window.location.href = "src/components/user.html";//if matched route towards user page
                    const currentUser = {
                        "username" : uName
                    } ;
                    sessionStorage.setItem("user",JSON.stringify(currentUser));
                    flag = true;
                    break;
                };
            };
            if (!flag) {//if not match
                message[0].innerText = "Invalid Username/Password , Please try again";
                form[0].reset();
            };
        };
    };
});

togglebtn.addEventListener("click" , () => {//toggle between login page and registration page
    if (lPanel[0].style.display === "flex" ) {
        lPanel[0].style.display = "none";
        sPanel[0].style.display = "flex";
    } else {
        lPanel[0].style.display = "flex";
        sPanel[0].style.display = "none";
    }
});


signBtn.addEventListener("click" , () => {//register new users and store in local storage
    fullName = document.getElementById("fullName").value;
    uName = document.getElementById("newusername").value;
    password = document.getElementById("newpassword").value;
    
    let flag = false;

    if (localStorage.getItem("users") === null) {
        const users = [];
        localStorage.setItem("users" , JSON.stringify(users));
    };

    const usersParsed = JSON.parse(localStorage.getItem("users"));
    for (u of usersParsed) {
        if (uName === u.userName || uName === adminUsername ) {
            flag = true;
            message[1].innerText = "User already exist!";
            form[1].reset();
            break;
        } 
    };
    
    if (!flag) {
        let uid = JSON.parse(localStorage.getItem("users")).length*Math.random()+Math.random();
        const userObj = new User (
            uid, 
            fullName,
            uName,
            password,
        );
        usersParsed.push(userObj);
        localStorage.setItem("users" , JSON.stringify(usersParsed));//add the new user to data
        message[1].style.color = "green";
        message[1].innerText = "SignUp Completed! Try Login."
        form[1].reset();
    };
    

});








