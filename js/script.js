$(document).ready(function () {
    // initialize variables
    let btn = $("#gameBtn");
    let gameArea = $(".memGame")[0];
    let size = 80;
    let numOfSec = 0;
    let sections = "";
    const abc = "abcdef";
    let rnd;
    let rndArr = [];
    let cardArr = [];
    let dupCount = 0;
    let card1;
    let card2;
    let text1;
    let text2;

    function findDup(char, arr) {
        dupCount = 0;
        for (let i = 0; i < arr.length; i++) {
            if (char == arr[i])
                dupCount++;
        }
        if (dupCount < 2)
            return false;   // returns false if letter isnt duplicate
        else
            return true;    // true if duplicate
    }

    function createBox() {
        if (numOfSec < (abc.length * 2)) {
            for (let i = numOfSec; i < numOfSec + 3; i++) {
                rnd = abc[Math.floor(Math.random() * abc.length)];  // gets random letter from abc
                if (i > 0) {
                    while (findDup(rnd, rndArr)) {
                        rnd = abc[Math.floor(Math.random() * abc.length)];  // gets new letter if it already has a pair
                    }
                }
                rndArr.push(rnd);
                sections += `<section class="gameCard"><p class="rndP">${rnd}</p></section>`;

            }
            gameArea.innerHTML = sections;
            numOfSec = gameArea.childNodes.length;
            for (let i = 0; i < numOfSec; i++) {
                $(gameArea.children[i]).css({
                    'height': size + 'px',
                    'width': size + 'px',
                });
                size += 20;
            }
            size = 80;
            if (numOfSec == 12) {
                $(this).find("span").text("done");
                $(this).find("span").css("pointer-events", "none")
            }
            else {
                $(this).find("span").text(`add ${numOfSec}/12`);
                $(this).find("span").css("text-align", "center");
            }
        }

    }

    btn.click(createBox);

    $(document).on('click', '.gameCard', function () {
        if (numOfSec == (abc.length * 2)) {
            $(this).find("p").css("visibility", "visible");
            $(this).css("pointer-events", "none")
            cardArr.push($(this));
            if (cardArr.length == 2) {  // checks match letters
                card1 = cardArr.pop();
                card2 = cardArr.pop();
                text1 = card1.find("p").text();
                text2 = card2.find("p").text();
                if (text1 == text2) {
                    card1.addClass("matching").removeClass("cardGame");
                    card2.addClass("matching").removeClass("cardGame");
                }
                else {
                    $(".gameCard").css("pointer-events", "none")    // disables click until timeout 
                    setTimeout(function () {
                        card1.find("p").css("visibility", "hidden");
                        card2.find("p").css("visibility", "hidden");
                        $(".gameCard").css("pointer-events", "")
                    }, 500);
                }
            }
        }
    })


});
