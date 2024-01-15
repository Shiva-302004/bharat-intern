// const { title } = require("process");

const blogtitle=document.querySelector('.title')
const article=document.querySelector('.article')

const bannnerimage=document.querySelector('#banner-upload')
const banner=document.querySelector('.banner')
let bannerpath;
const publishbutton=document.querySelector(".publish-btn")
const uploadbutton=document.querySelector("#image-upload")
bannnerimage.addEventListener('change',()=>{
    uploadImage(bannnerimage,"banner")
})
uploadbutton.addEventListener("change",()=>{
    uploadImage(uploadbutton,"image")
})
const uploadImage=(uploadFile,uploadType)=>{
    const [file]=uploadFile.files;
    if(file && file.type.includes("image")){
        const formdata=new FormData();
        formdata.append('image',file)
        fetch("/upload",{
            method:"POST",
            body:formdata
        }).then((res)=>res.json()).then((data)=>{
            if(uploadType=="image"){
                addImage(data,file.name)
            }else{
                bannerpath=`${location.origin}/${data}`
                banner.style.backgroundImage=`url("${bannerpath}")`
            }
        })
    }
}
const addImage=(imagepath,alt)=>{
    let curpos=article.selectionStart;
    console.log(curpos)
    let texttoinsert=`\r![${alt}](${imagepath})\r`
    article.value=article.value.slice(0,curpos)+texttoinsert+article.value.slice(curpos)
    console.log(article.value)
    console.log(article.value.slice(curpos))
}
publishbutton.addEventListener('click',()=>{
    fetch("/addblog",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "authtoken":sessionStorage.getItem("authtoken")
        },
        body:JSON.stringify({
            title:blogtitle.value,
            article:article.value,
            bannerImage:bannerpath
        })
    }).then(res=>res.json()).then((data)=>{
        console.log(data)
        blogtitle.value=null
        article.value=null
        bannerpath=null
        banner.style.backgroundImage=`initial`
    })
})
