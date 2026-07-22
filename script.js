const statusElement = document.getElementById("status");

(async function () {

    statusElement.textContent = "Processing..."

    const queryString = window.location.search;
    console.log("Query String: " + queryString);
    const parameters = new URLSearchParams(queryString);

console.log("Parameters: " + parameters);

    const codeParameter = parameters?.get("code");
console.log("codeParameter: " + codeParameter)

    if(!codeParameter) {
        statusElement.textContent = "No 'code' parameter found."
        console.log("No 'code' parameter found.");
        return;
    }

    // statusElement.textContent = `Code is: ${codeParameter}`

    try {
        const response = await fetch("https://asia-south1-meta-access-token-generator.cloudfunctions.net/meta-oauth-function", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({code: codeParameter})
        });

        const data = await response.json();

        if (!response.ok) {
            console.error(`message: `, data.error.error.message);
            console.error("Error: ", data.error.error)
            throw new Error("Network response was not ok");
        }
        console.log(response)

console.log(data);

        statusElement.textContent = `${data.message} : ${data.data.encryptedLongLivedToken}.`

    } catch (error) {
        console.error(error);
        statusElement.textContent = error.message;
    }

    console.log("codeParameter: " + codeParameter);

})()
