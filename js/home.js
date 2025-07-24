
const users = [
    {
        name: 'מרימי',
        email: 'miryamilandman@gmail.com',
        password: '1234'
    },
    {
        name: 'מרים',
        email: 'miriamm41344@gmail.com',
        password: '1111'
    }
];

// שומר את המערך הראשוני ב-localStorage
localStorage.setItem("users", JSON.stringify(users));
// שומר את המשתמשים הבסיסיים רק אם עוד לא נשמרו
if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(users));
}

// שליפת שדות
const nameInput = document.querySelector("#userName");
const emailInput = document.querySelector("#userMale");
const passwordInput = document.querySelector("#pwd");
const loginBtn = document.getElementById("Login_button");

if (loginBtn) {
    loginBtn.addEventListener("click", function (event) {
        event.preventDefault();
        const name = nameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;
        const users = JSON.parse(localStorage.getItem("users")) || [];
      if (!name || !email || !password) {
        alert("חובה למלא את כל השדות!");
        return; // לא נמשיך להרשמה
    }
        const found = users.find(user =>
            user.name === name &&
            user.email === email &&
            user.password === password
        );

        if (found) {
            window.location.href = "../html/game.html";
        } else {
            alert("יש צורך בהרשמה על מנת להתחיל לשחק");
            window.location.href = "../html/sumbit.HTML"; 
        }
    });
}







