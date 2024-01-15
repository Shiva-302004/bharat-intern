const logout = document.querySelector("#logout")
const links = document.querySelector(".links")
const hi = document.querySelector(".hi")
if (sessionStorage.getItem("authtoken")) {
    logout.style.visibility = "visible"
    links.style.visibility = "hidden"
    hi.style.visibility = "hidden"
    logout.addEventListener('click', () => {
        sessionStorage.removeItem('authtoken')
        sessionStorage.removeItem('name')
        logout.style.visibility = "hidden"
        links.style.visibility = "visible"
        hi.style.visibility = "visible"
        location.href = "/loginuser"
    })
}
const blogsection = document.querySelector(".blog-section")
const blogsections = document.querySelector(".blog-sections")

fetch("/blogs/allblogs", {
    method: "GET",
    headers:{
    "Content-Type":"application/json"
    }
}).then((res) => res.json())
.then((data) => {
        data.forEach((el)=>{
         createblog(el)
         console.log(el)
        })
    
})
fetch("/api/blogs/usersblog", {
    method: "GET",
    headers:{
    "Content-Type":"application/json",
    "authtoken":sessionStorage.getItem("authtoken")
    }
}).then((res) => res.json())
.then((data) => {
    
   data.forEach((el)=>{
    createblogs(el)
    console.log(el)
   })
})
const h5=document.querySelector(".h5")

const createblogs=(data)=>{
    if(data===null){console.log("nodatra")}
    else{

        blogsections.innerHTML += `
        <div class="blog-card">
                    <img src="${data.bannerImage}" alt="" class="blog-image">
                    <h2 class="blog-tittle">${data.title}</h2>
                    <p class="blog-description">${data.article.substring(0,20)}</p>
                    <p class="blog-description">author:${sessionStorage.getItem("name")}</p>
                    <a href="/${data._id}" class="btn dark">read more</a>
        </div>
        `
        h5.style.visibility="hidden"
    }
}
const createblog=(data)=>{
    blogsection.innerHTML += `
    <div class="blog-card">
                <img src="${data.bannerImage}" alt="" class="blog-image">
                <h2 class="blog-tittle">${data.title}</h2>
                <p class="blog-description">${data.article.substring(0,20)}</p>
                <a href="/${data._id}" class="btn dark">read more</a>
    </div>
    `
}