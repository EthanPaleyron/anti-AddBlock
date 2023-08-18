async function detectAdBlockUsingFetch() {
    let adBlockEnabled = false;

    const googleAdsURL = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';

    try {
        await fetch(new Request(googleAdsURL)).catch(_ => {
            adBlockEnabled = true;
        });
    } catch (err) {
        adBlockEnabled = true;
    } finally {
        console.log(`AdBlock enabled: ${adBlockEnabled}`);

        if (adBlockEnabled) {          
            const blurring = document.querySelector("#blurring");
            blurring.classList.add("blurring");
            const position_antiAddBlock = document.querySelector(".position_antiAddBlock");
            position_antiAddBlock.style.backgroundColor = "#00000035";
            const antiAddBlock = document.querySelector(".antiAddBlock");
            antiAddBlock.style.display = "flex";
            antiAddBlock.classList.add("show");

            document.querySelector("#buttonRefresh").addEventListener("click", () => {
                location.reload()
            })
        }
    }
}

detectAdBlockUsingFetch();

function detectAdBlockUsingGlobalVariable() {
    if (window.runningAdsAllowed === undefined) {
        console.log("Detected Ad content Blocker");
        const antiAddBlock = document.querySelector(".antiAddBlock");
        const position_antiAddBlock = document.querySelector(".position_antiAddBlock");
        position_antiAddBlock.style.backgroundColor = "transparent";
        antiAddBlock.style.display = "none";
    }
}

detectAdBlockUsingGlobalVariable();