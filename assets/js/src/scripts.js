const posts = (function () {
    const url = "https://5d04064fd1471e00149bb174.mockapi.io/api/v1/blogs";

    return {
        getPosts: function () {
            fetch(url)
                .then(function (response) {
                    if (response.ok) {
                        response.json()
                            .then(
                                function (data) {
                                    var blogWrapper = document.getElementById("demo");
                                    var allPosts = data.map((item) => {
                                        var capitalLetter = item.title.charAt(0).toUpperCase();
                                        var title = `<h2 class='blog-post-title'>${capitalLetter + item.title.slice(1)}</h2>`;
                                        var body = `<p>${item.body}</p>`;
                                        var meta = `<p class='blog-post-meta'>Post #<a href='#'>${item.id}</a></p>`
                                        var blogPost = `<div class='blog-post'>${title + meta + '<hr>' + body + body + body}</div>`;
                                        //console.log("Item => ", item);
                                        return blogPost;
                                    })
                                        .splice(0, 4)
                                        .join("");
                                    blogWrapper.innerHTML = allPosts;
                                }
                            )
                    }
                });
        }
    }

    // function reqListener() {
    //     this.responseText;
    //     console.log(this.responseText);
    // }

    // var oReq = new XMLHttpRequest();
    // oReq.onload = reqListener;
    // oReq.open("GET", "https://5d04064fd1471e00149bb174.mockapi.io/api/v1/blogs", true);
    // oReq.send();

}());

const search = (function(){

    const url = "https://5d04064fd1471e00149bb174.mockapi.io/api/v1/blogs";

    return {

        sendSearch: function(){
            let searchTerm = document.querySelector("#searchTerm");
            fetch(url + `?search=${searchTerm.value}`)
            .then(response => response.json())
            .then(json => {
                let searchResult = document.querySelector("#searchResult")
                let result = json.map(item => {
                  return `<li>${item.title}</li>`
                })
                searchResult.innerHTML = result;
            })
            console.log("Search foi chamada");
        },

        openSearch: function(){
            document.querySelector('#searchLink')
            .addEventListener("click", () => {
                let form = document.querySelector("#searchBox > div");
                let input = document.querySelector("#searchBox > div > input");
                let submitSearch = document.querySelector("#submitSearch");
                form.style.display = "block";
                form.animate(
                    [
                        // keyframes
                        { transform: "translateX(15px)" },
                        { transform: "translateX(0px)" }
                    ],
                    {
                        // timing options
                        duration: 300,
                        iterations: 1
                    }
                );
                input.focus();
                submitSearch.addEventListener("click", function(){
                    search.sendSearch();
                });
            });
        }
    }

}());

search.openSearch();
posts.getPosts();