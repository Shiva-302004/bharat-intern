// const blogId=decodeURI(location.pathname.split("/").pop())
// console.log(uri)
// fetch("/blog/:blogtitle",{
//     method:"Get",
//     "Content-Type":"applocation/json"
// }).then((res)=>res.json()).then((data)=>{
//     if(data.success){
//         location.href="/blog"
//         setupBlog(data)
//     }
// })
const body=document.querySelector(".body")
const setupBlog = (data) => {
    const banner = document.querySelector('.banner');
    const title = document.querySelector(".titles");
    const article = document.querySelector(".articles");
    const publishedat = document.querySelector(".publisheat")
    banner.style.backgroundImage = `url(${data.bannerImage})`
    title.innerHTML = data.title
    // article.innerHTML=data.article
    publishedat.innerHTML = data.date.substring(0, 10)
    addArticle(article, data.article)
}
const addArticle = (article, data) => {
    data=data.split("\n").filter((item)=>item.length)
    console.log(data)
    data.forEach((item)=>{
        if(item[0]=="#"){
            let hcount=0;
            let i=0;
            while(item[i]=='#'){
                hcount++;
                i++;
            }
            let tag=`h${hcount}`
            article.innerHTML+=`<${tag}>${item.slice(hcount,item.length)}</${tag}>`
        }else if(item[0]=='!'&& item[1]=='['){
            let sep;
            for(let i=0;i<=item.length;i++){
                if(item[i]==']' && item[i+1]=='(' && item[item.length-1]===")"){
                    sep=i;
                }
            }
            let alt=item.slice(2,sep);
            let src=item.slice(sep+2,item.length-1)
            console.log(src)
            article.innerHTML+=`<img src="${src}" alt="${alt}" class="imagesd">`
            // img.style.width="300px"
            body.style.overflowX="hidden"
            
        }
        else{
            article.innerHTML+=`<p>${item}</p>`
        }
    })
}
function parseRouteParams(path) {
    const params = path.split('/').filter(Boolean);
    const routeParams = {
        page: params[0] || '/',
    };

    return routeParams;
}
const routeParams = parseRouteParams(window.location.pathname)

console.log(routeParams)
if (routeParams.page) {
    fetch(`/blog/${routeParams.page}`, {
        method: "Get",
        "Content-Type": "applocation/json"
    }).then((res) => res.json()).then((data) => {
        console.log(data)
        if (data.success) {
            // location.href="/blog"
            setupBlog(data.data)
        } else {
            location.href = "/"
        }
    })
}
