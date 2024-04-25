var BASE_URL="http://localhost:3000"
// const token=localStorage.getItem("token")
// if(token) window.location.href='/main'
async function resolve(){
    try {
        const currentURL = window.location.href;
    const parts = currentURL.split("/");
    const token = parts[parts.length - 1];
    console.log(token); 
    const response=await axios.post(`${BASE_URL}/verification/${token}`,{});
    if(response.data.success){
        await swal({icon:"success",text:"Successfully verified"});
        window.location.href='/login'
    }
    } catch (error) {
        console.log(error);
        swal({icon:"error",text:error.response.data.message});
    }

}


resolve();