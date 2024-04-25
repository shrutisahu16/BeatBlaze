var BASE_URL="http://localhost:3000"
document.addEventListener("DOMContentLoaded", function() {
    let submitBtn = document.getElementById("login-submit-btn");
    if (submitBtn) {
        submitBtn.addEventListener("click",async function(event) {
            event.preventDefault();
            let email = document.querySelector(".login-email-input").value;
            let password = document.querySelector(".login-password-input").value;
            if (email && password) {
                await axios.post(`${BASE_URL}/login`,{
                    email,password
                })
                window.location.href = "/hello";
            } else {
                alert("Please enter both email and password.");
            }
        });
    } else {
        console.error("Submit button not found.");
    }
});


