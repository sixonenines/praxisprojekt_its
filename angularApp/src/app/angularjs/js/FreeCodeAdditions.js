document.addEventListener('DOMContentLoaded', () => {
    const parentElement = document.body;

    function checkAndClearDiv() {
        const contentDivs3 = document.getElementsByClassName('mpy-editor-output')[0];
        const targetElement = contentDivs3.innerText
        if (targetElement.length>1000) {
            console.log('Looks like you are running an infinite loop, refresh the page.');
            alert("You were running an infinite loop, the page will now refresh. Press ok and wait for the page to reload.");
            window.location.reload(true);
        } else {
        }
    }

// Create a MutationObserver to watch for the addition of dynamicDiv
const observer = new MutationObserver((mutationsList, observer) => {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            // Check if contentDivs has been added
            const contentDivs = document.getElementsByClassName('mpy-editor-output')[0];
            if (contentDivs) {
                console.log('contentDivs found, setting up content observer.');
                // Set up a new observer for the contentDivs's children
                const contentObserver = new MutationObserver((mutationsList, observer) => {
                    console.log(observer)
                    for (let mutation of mutationsList) {
                        if (mutation.type === 'childList') {
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