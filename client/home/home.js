function home() {
    const ww1 = document.getElementById("worldWarI");
    const ww2 = document.getElementById("worldWarII");
    const ancientRome = document.getElementById("ancientRome");
    const renaissance = document.getElementById("renaissance");
    const playBtn = document.getElementById("play");

    ww1.addEventListener("click", highlightElement);
    ww2.addEventListener("click", highlightElement);
    ancientRome.addEventListener("click", highlightElement);
    renaissance.addEventListener("click", highlightElement);
    playBtn.addEventListener("click", redirectToPage);

    function highlightElement(event) {
    [ww1, ww2, ancientRome, renaissance].forEach(element => {
        element.classList.remove("selected");
    });

    event.target.classList.add("selected");
    }

    function redirectToPage() {
    if (ww1.classList.contains("selected")) {
        alert("This topic is not yet available.");
    } else if (ww2.classList.contains("selected")) {
        window.location.href = "../puzzle/puzzle.html";
    } else if (ancientRome.classList.contains("selected")) {
        alert("This topic is not yet available.");
    } else if (renaissance.classList.contains("selected")) {
        alert("This topic is not yet available.");
    } else {
        alert("Please select a topic.");
    }
    }
}

module.exports = home