var BASE_URL="http://localhost:3000"
// const token=localStorage.getItem("token")
// if(token) window.location.href='/main'
document.addEventListener("DOMContentLoaded", function() {
    let submitBtn = document.getElementById("login-submit-btn");
    if (submitBtn) {
        submitBtn.addEventListener("click",async function(event) {
            event.preventDefault();
            let email = document.querySelector(".login-email-input").value;
            let password = document.querySelector(".login-password-input").value;
            try {
                const response=await axios.post(`${BASE_URL}/login`, {
                    email, password
                })
                if(response.data.success){
                    localStorage.setItem("token",response.data.token);
                    localStorage.setItem("user",JSON.stringify(response.data.user))
                    window.location.href="/main"
                }
            } catch (error) {
                console.log(error);
                swal({ icon: "error", text: error.response.data.message });
            }
        });
    } else {
        console.error("Submit button not found.");
    }
});


