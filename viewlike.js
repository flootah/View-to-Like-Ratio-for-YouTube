var ttext = document.createElement("span");
var ratiotext = document.createElement("span");
var ratiodiv = document.createElement("div");
var img = document.createElement("img");
var displaypreference;
get_options();


document.addEventListener('yt-page-data-updated', process);
if(document.readyState != "loading") {
    setTimeout(process, 1000)
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function get_options() {
// Use default value color = 'red' and likesColor = true.
chrome.storage.sync.get({
        displaypreference: 'ratio'
    }, function(items) {
        displaypreference = items.displaypreference
    });
}

function process() {
    if(!document.getElementById("viewlikeratio")) createDiv();   
    getRatios();
};

function createDiv() {
    var info = document.querySelector("#info.ytd-video-primary-info-renderer");
    var menu = document.querySelector("#menu-container.ytd-video-primary-info-renderer");

    ratiodiv.id = "viewlikeratio";
    ratiodiv.classList.add("tooltip");
    ttext.classList.add("tooltiptext")
    // img.id = "viewlikeicon";
    // img.src = chrome.runtime.getURL("viewlike.svg");
    // img.width = "24px";
    // img.height = "24px";
    // ratiodiv.appendChild(img);
    ratiodiv.appendChild(ratiotext);
    ratiodiv.appendChild(ttext);

    info.insertBefore(ratiodiv, menu);
}

function getRatios() {
    var viewstring = document.querySelector(".view-count.style-scope.ytd-video-view-count-renderer").innerHTML.replaceAll(",", "");
    var likestring = document.querySelector("#text.style-scope.ytd-toggle-button-renderer").ariaLabel.replaceAll(",", "");


    var views = parseFloat(viewstring); 
    var likes = parseFloat(likestring); 

    var ratio = Math.ceil(views / likes)
    var percentage = ((likes/views) * 100).toFixed(2)

    if(ratio == NaN) ratio = 0; 
    if(percentage == NaN) percentage = 0; 

    switch(displaypreference) {
        case 'ratio':
            ratiotext.textContent = "1:" + ratio;
            ttext.textContent = "1 like per " + ratio + " views";
            break;
        case 'percent':
            ratiotext.textContent = percentage + "%"; 
            ttext.textContent = percentage + "% of viewers liked";
            break;
        case 'both':
            ratiotext.textContent = "1:" + ratio + " | " + percentage + "%";
            ttext.textContent = "1 like per " + ratio + " views \n";
            ttext.textContent += percentage + "% of viewers liked";
            break;
    }
};  