function randomBG() {
    if (!document.querySelector("style")) {
        let style = document.createElement("style");
        document.head.append(style);
    }
    const color = randomColor.hsl();
    document.querySelector("style").innerHTML = "html {--color:" + color[0] + "; --darkerColor: " + color[1] + ";}";
}

var randomColor = {
    hsl() {
        let hue, saturation, lightness, color, darkerColor;
        hue = Math.floor(Math.random() * 359); //HUE 0-359
        saturation = Math.floor(Math.random() * 70); //SATURATION 0-100%
        lightness = Math.floor(Math.random() * 40 + 30); //LIGHTNESS 0-100%
        let result = [];
        result[0] = "hsl(" + hue + ", " + saturation + "%, " + lightness + "%)";
        result[1] = "hsl(" + hue + ", " + (saturation / 2) + "%, " + (lightness * 1.2) + "%)";
        return result;
    }
};



function getQuote() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://andruxnet-random-famous-quotes.p.mashape.com/", true);
    xhr.setRequestHeader("X-Mashape-Key", "BcnlKwiLL2msh2jtLKQlmn0S9o4Ep1ALUUrjsnWTTLEhhaAgyB");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            result = JSON.parse(xhr.response);
            let quoteOutput = document.querySelector("#quoteOutput");
            quoteOutput.innerHTML = "<i class='fa fa-quote-left' id='quote-sign' aria-hidden='true'></i>&nbsp" + "<span style = 'display: inline'>" + result.quote + "</span>";
            author.innerHTML = result.author;
            loader.setAttribute("style", "visibility: hidden");
            setTimeout(function(){})
            quoteOutput.classList.toggle("to-white");
            author.classList.toggle("animate");
        }
    }
    loader.setAttribute("style", "visibility: visible");
    author.classList.toggle("animate");
    quoteOutput.classList.toggle("to-white");
    return quoteOutput.innerHTML;
}

var loader = document.querySelector("#loader");
var button = document.querySelector("#generuj");
var quoteOutput = document.querySelector("#quoteOutput");
var author = document.querySelector("#author>p");
var tweet = document.querySelector(".twitter-share-button");
var tumblr = document.querySelector(".tumblr-share-button");

randomBG();
quoteOutput.innerHTML = getQuote();


button.addEventListener("click", function() {
    randomBG();
    quoteOutput.innerHTML = getQuote();
})

tweet.addEventListener("click", function () {
    this.setAttribute("href", "https://twitter.com/intent/tweet?text=" + quoteOutput.querySelector("span").innerHTML + " -" + author.innerHTML);
});

tumblr.addEventListener("click", function() {
    this.setAttribute("href", "https://www.tumblr.com/widgets/share/tool?posttype=quote&content=" + quoteOutput.querySelector("span").innerHTML + "&caption=" + author.innerHTML + "&canonicalUrl=http://damianszocik.tk");
});


