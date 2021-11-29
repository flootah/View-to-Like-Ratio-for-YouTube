document.addEventListener('yt-page-data-updated', process);
if(document.readyState != "loading") {
    process();
};

var ratiodiv = document.createElement("div");

function process() {
    if(!document.getElementById("viewlikeratio")) createDiv();   
    getRatios();
};

function createDiv() {
    var info = document.querySelector("#info.ytd-video-primary-info-renderer");
    var menu = document.querySelector("#menu-container.ytd-video-primary-info-renderer");

    ratiodiv = document.createElement("div");
    ratiodiv.id = "viewlikeratio";
    info.insertBefore(ratiodiv, menu);
}

function getRatios() {
    var viewstring = document.querySelector(".view-count.style-scope.ytd-video-view-count-renderer").innerHTML.replaceAll(",", "");
    var likestring = document.querySelector("#text.style-scope.ytd-toggle-button-renderer").ariaLabel.replaceAll(",", "");


    var views = parseFloat(viewstring); 
    var likes = parseFloat(likestring); 

    var ratio = Math.floor(views / likes)
    var percentage = ((likes/views) * 100).toFixed(2)

    if(ratio == NaN) ratio = 0; 
    if(percentage == NaN) percentage = 0; 

    ratiodiv.innerHTML = ratio + ":1" + " | " + percentage + "%"

    console.log("views: " + views)
    console.log("likes: " + likes)
    console.log(ratio + ":1")
    console.log(percentage + "%")
};  