// Function to fetch data from the blood bank API
function fetchBloodBankAvailability(state, city, bloodGroup) {
    const apiUrl = `API_URL_HERE`; // Replace with the actual API URL

    // Make a GET request to the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Process the API response and update the availabilityResults div
            const availabilityResults = document.getElementById("availabilityResults");
            // Update availabilityResults.innerHTML with the data from the API response
            availabilityResults.innerHTML = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

// Attach event listener to the form submit button
document.getElementById("availabilityForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get selected values from the form
    const selectedState = document.getElementById("state").value;
    const selectedCity = document.getElementById("").value;
    const selectedBloodGroup = document.getElementById("BloodGroup").value;

    // Call the API function with selected values
    fetchBloodBankAvailability(selectedState, selectedCity, selectedBloodGroup);
});
