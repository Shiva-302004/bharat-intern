const namee=document.querySelector(".name")

window.onload=()=>{
    if(!sessionStorage.name){
        location.href="/loginuser"
    }else{
        namee.innerHTML=`hello ${sessionStorage.name}`
    }
}
const logout=document.querySelector('.btn')
logout.addEventListener("click",()=>{
    sessionStorage.clear()
    location.reload()
})