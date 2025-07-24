document.addEventListener('DOMContentLoaded', () => {
  
  const checkbox = document.getElementById('readRules');
  const button = document.getElementById('submitButton');
  const resArea = document.getElementById("resArea");

  checkbox.addEventListener('change', function () {
    button.disabled = !this.checked;
  });

  document.getElementById("mainForm").addEventListener("submit", function (event) {
    if (!this.checkValidity()) {
      return;
    }

    event.preventDefault();
    const role = document.getElementById("role").value;
    const pass = document.getElementById("password").value;
    const confirm = document.getElementById("confirmPassword").value;


let msg = "";

if (role === "1") {
  msg += "התפקיד שנבחר: מנהל\n";
} else if (role === "2") {
  msg += "התפקיד שנבחר: עובד\n";
} else if (role === "3") {
  msg += "התפקיד שנבחר: אורח\n";
} else {
  msg += "לא נבחר תפקיד\n";
}

if (pass === confirm && pass !== "") {

  msg += "הסיסמה אומתה בהצלחה!";
} else {

  msg += "הסיסמאות אינן תואמות.";
}

resArea.innerText = msg;

  });
});
