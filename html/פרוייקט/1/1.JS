const nameInput = document.querySelector("#userName");
const emailInput = document.querySelector("#userMale");
const passwordInput = document.querySelector("#pwd");
const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", function (event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const found = users.find(user =>
        user.name === name &&
        user.email === email &&
        user.password === password
    );

    if (found) {
        // המשתמש קיים – עובר למשחק
        window.location.href = "game.html";
    } else {
        // המשתמש לא קיים – נרשם
        users.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(users));
        alert("נרשמת בהצלחה!");
        window.location.href = "submit.html";
    }
});


