/**
 * Grab the raw C# object from the Razor page then parse it into a JSON object. Pass that 
 * parsed object to the downloadVCard function to then down the vCard file.
 * 
 * Note for posterity: This feature is used both on team member pages and on landing pages to enable the
 * downloading of VCards. This is a slightly tricky thing to automate so it is best to manually
 * test both types of pages.
 */
const vcardButton = document.querySelector('.c-vcard-download--link');
if (vcardButton) {
    vcardButton.addEventListener('click', function () {
        const profileJson = document.querySelector("#profile-json").textContent.trim();
        downloadVCard(JSON.parse(profileJson));
    });
}
function downloadVCard(profile) {
    fetch("/cms-core/forms/VCard/DownloadVCard/", {
        method: "POST",
        body: JSON.stringify(profile),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            const filename = response.headers.get('X-Filename'); // Get the filename from the custom header
            return response.blob().then(blob => [blob, filename]);
        })
        .then(([blob, filename]) => {

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');

            link.href = url;
            link.download = filename;

            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
        });
}