document.addEventListener('DOMContentLoaded', () => {
    const parentElement = document.body;

    function checkAndClearDiv() {
        const contentDivs3 = document.getElementsByClassName('mpy-editor-output')[0];
        const targetElement = contentDivs3.innerText
        targetElement.replace(/(\r\n|\n|\r|\s)/gm, "");
        if (targetElement.length>200) {
            alert("You were running an infinite loop, the page will now refresh. Press ok and wait for the page to reload.");
            window.location.reload(true);
        }
        else {
        }
    }

// Create a MutationObserver to watch for the addition of dynamicDiv
const observer = new MutationObserver((mutationsList, observer) => {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            // Check if contentDivs has been added
            const contentDivs = document.getElementsByClassName('mpy-editor-output')[0];
            if (contentDivs) {
                //Hier checkt der Observer, ob ein neuer ContentDiv geadded wurde, das heißt hier kannst du das einstellen, dass der Button noch ausgegraut ist
                console.log("Check Button ausgegraut")
                // Set up a new observer for the contentDivs's children
                const contentObserver = new MutationObserver((mutationsList, observer) => {
                    for (let mutation of mutationsList) {
                        if (mutation.type === 'childList') {
                            //Hier dann den Check Button nicht mehr ausgrauen
                            console.log("Check Button nicht mehr ausgegraut")
                            checkAndClearDiv();
                        }
                    }
                });

                    // Start observing the dynamicDiv for changes to its children
                    contentObserver.observe(contentDivs, { childList: true, subtree: true });

                    // Optionally disconnect the parent observer if dynamicDiv will not be removed and re-added
                    // observer.disconnect();
                }
            }
        }
    });

    // Create a MutationObserver to watch for changes in the div
    // Start observing the div for changes to its children
    observer.observe(parentElement, { childList: true, subtree: true });

});