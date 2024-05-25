document.addEventListener('DOMContentLoaded', () => {
    const parentElement =document.body;

    function checkAndClearDiv() {
        const contentDivs3 = document.getElementById('mpy-editor-1-output');
        const targetElement = contentDivs3.innerText
        console.log(targetElement);
        if (targetElement.length>100) {
            console.log('Looks like you are running an infinite loop, refresh the page');
            contentDivs3.innerHTML = 'Something is wrong refresh the page and try again';
        } else {
        }
    }


// Create a MutationObserver to watch for the addition of dynamicDiv
const observer = new MutationObserver((mutationsList, observer) => {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            // Check if contentDivs has been added
            const contentDivs = document.getElementById('mpy-editor-1-output');
            if (contentDivs) {
                console.log('contentDivs found, setting up content observer.');

                // Set up a new observer for the contentDivs's children
                const contentObserver = new MutationObserver((mutationsList, observer) => {
                    for (let mutation of mutationsList) {
                        if (mutation.type === 'childList') {
                            checkAndClearDiv(contentDivs);
                        }
                    }
                });



                    // Start observing the dynamicDiv for changes to its children
                    contentObserver.observe(contentDivs, { childList: true, subtree: true });

                    // Optionally disconnect the parent observer if dynamicDiv will not be removed and re-added
                    observer.disconnect();
                }
            }
        }
    });

    // Create a MutationObserver to watch for changes in the div
    // Start observing the div for changes to its children
    observer.observe(parentElement, { childList: true, subtree: true });

});