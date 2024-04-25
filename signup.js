var BASE_URL = "http://localhost:3000"
// const token=localStorage.getItem("token")
// if(token) window.location.href='/main'
document.addEventListener("DOMContentLoaded", function () {
    let submitBtn = document.getElementById("signup-submit-btn");
    if (submitBtn) {
        submitBtn.addEventListener("click", async function (event) {
            event.preventDefault();
            let email = document.querySelector(".signup-email-input").value;
            let password = document.querySelector(".signup-password-input").value;
            let name = document.querySelector(".signup-name-input").value;
            try {
                const response=await axios.post(`${BASE_URL}/register`, {
                    email, password, name
                })
                if(response.data.success){
                    await swal({icon:"success",title:response.data.message})
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