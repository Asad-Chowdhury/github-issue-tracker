document.getElementById("btn-login").addEventListener("click", () => {
  let userName = document.getElementById("input-username").value;
  let password = document.getElementById("input-password").value;
  if (userName === "admin" && password === "admin123") {
    alert("Login Success!!");
    window.location.assign("./tracker.html");
  } else {
    alert("Login Failed!! Please Try Again");
    document.getElementById("input-username").value = "";
    document.getElementById("input-password").value = "";
  }
});
