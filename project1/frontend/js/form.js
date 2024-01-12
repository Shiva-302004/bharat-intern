const form=[...document.querySelector('.form').children]
form.forEach((item,i)=>{
    setTimeout(() => {
        item.style.opacity=1
    }, i*100);
})
window.onload=()=>{
    if(sessionStorage.name){
        location.href="/"
    }
}
const namee=document.querySelector('.name')||null
const email=document.querySelector('.email')
const password=document.querySelector('.password')
const submitbtn=document.querySelector('.submit')
if(namee===null){
    submitbtn.addEventListener("click",()=>{
        fetch("http://localhost:8000/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:email.value,
                password:password.value
            })
        }).then((res)=>res.json()).then((data)=>{
           validatedata(data)
        }).catch((err)=>console.log(err))
    })
}else{
    submitbtn.addEventListener("click",()=>{
        fetch("http://localhost:8000/signin",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:namee.value,
                email:email.value,
                password:password.value
            })
        }).then((res)=>res.json()).then((data)=>{
            validatedata(data)
        }).catch((err)=>console.log(err))
    })
}
const validatedata=(data)=>{
    if(!data.success){
        alertBox(data.msg)
    }else{
        sessionStorage.name=data.data.name
        sessionStorage.email=data.data.email
        location.href="/"
    }
}
const alertBox=(data)=>{
    const alert=document.querySelector('.alertbox')
    const alertmsg=document.querySelector('.alert')
    alertmsg.innerHTML=data
    alert.style.top="10%"
    setTimeout(()=>{
        alert.style.top="-100%"
    },5000)
}