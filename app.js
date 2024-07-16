const apikey = 'acc18da45d1b4e40ae9931dab953c15e'; //meri API key hai yeah 

const blogContainer = document.querySelector("#blog-container"); // main wla event select krenge

const searchField=document.getElementById("search-input");
const searchButton=document.getElementById("search-button");


async function fetchRandomNews(){
    try{ /* try will fetch empty array so in catch blog we will return an empty array */
        const apiUrl=`https://newsapi.org/v2/top-headlines?country=us&pageSize=16&apikey=${apikey}`; // using backtick to make the url dynamic ,
                                         //pagesize=10 it is a parameter means out of 100 of pages avalaible in the url we want only 10 of them and we are calling this url to our api key
        const response= await fetch(apiUrl)// fetch the apiurl
        const data= await response.json() //converts response to json format
        return data.articles;




    }catch(error){
        console.error("Error fetching random news", error)
        return [];


    }
}

searchButton.addEventListener("click",async ()=>{
     const query= searchField.value.trim();
    if(query!==""){
        try{
           const articles= await fetchNewsQuery(query);
           displayBlogs(articles);
        }
        catch(error){
            console.log("Error fetching news by query",error);

        }
    }
})
// function to fetch all queries that are given in the search box;
async function fetchNewsQuery(query){
    try{ /* try will fetch empty array so in catch blog we will return an empty array */
        const apiUrl=`https://newsapi.org/v2/everything?q=${query}&pageSize=16&apikey=${apikey}`; // using backtick to make the url dynamic ,
                                         //pagesize=10 it is a parameter means out of 100 of pages avalaible in the url we want only 10 of them and we are calling this url to our api key
        const response= await fetch(apiUrl)// fetch the apiurl
        const data= await response.json() //converts response to json format
        return data.articles;




    }catch(error){
        console.error("Error fetching random news", error)
        return [];


    }

}





// create a function to display articles
//this func will display the fetched data in the crads and if there is some previously fetched data it will display that
function displayBlogs(articles){
    blogContainer.innerHTML=""; // to remove previoulsy written data
    // now we have to create news card one by one therefore we have to use for each
    articles.forEach((article)=>{
        const blogCard= document.createElement("div"); // creating div tag for element 
        blogCard.classList.add("blog-card"); // adding class name to div tag
        
        
        const img=document.createElement("img"); // creating image tag
        img.src = article.urlToImage;// the newapi provides this function which provides img for the articles using urlToImage function
        img.alt = article.title;// we can add alt test to the img using title function provided by the newsapi using the title function
        
        
        const title= document.createElement("h2"); //then we create a new h2
        title.textContent = article.title;// and add the title for a particular url using title func of newsapi to the textcontent of the h2
        const truncatedtitle= article.title.length>30? article.title.slice(0,30)+"......" 
           : article.title;
        title.textContent= truncatedtitle;
        
        const description=document.createElement("p");// create a paragraph tag 
        //description.textContent=article.description; // the the description to the paragraph tag of the card using the descrrption func provided by the newsapi
        const truncatedDes= article.description.length>120? article.description.slice(0,130)+"......" 
           : article.description;
        description.textContent= truncatedDes;


        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener("click",()=>{
            window.open(article.url,"_blank");
        })

        blogContainer.appendChild(blogCard);


    
    
    
    
    
    
    })


}
(async()=>{
    try{
        const articles = await fetchRandomNews();
        displayBlogs(articles);// to display the fetched articles

    }catch(error){
        console.log("Error fetching random news",error);

    }
})();