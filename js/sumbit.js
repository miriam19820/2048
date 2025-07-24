// שליפת שדות
const nameInput = document.querySelector("#userName");
const emailInput = document.querySelector("#userMale");
const passwordInput = document.querySelector("#pwd");
const registerBtn = document.getElementById("Register_button");

function addUser(name, email, password) {
    const stored = JSON.parse(localStorage.getItem("users")) || [];
    stored.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(stored));
}

if (registerBtn) {
    registerBtn.addEventListener("click", function(event) {
        // event.preventDefault();
        const name = nameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;
 
          if (!name || !email || !password) {
        alert("חובה למלא את כל השדות!");
        return; // לא נמשיך להרשמה
    }

    
        addUser(name, email, password);
        window.location.href = "../html/nextpage.html"; 
    });
}





