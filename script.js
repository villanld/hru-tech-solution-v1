
document.addEventListener("DOMContentLoaded", function () {
    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});




async function testReviewConnection() {
    const functionUrl =
        "https://nneqgurexjpnhauxzqbu.supabase.co/functions/v1/submit-review";

    try {
        const response = await fetch(functionUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                customer_name: "Test Customer",
                rating: 5,
                review_text:
                    "Testing HRU Tech Solutions review system.",
                turnstileToken: ""
            })
        });

        const result = await response.json();

        console.log("Review API status:", response.status);
        console.log("Review API response:", result);

    } catch (error) {
        console.error("Connection failed:", error);
    }
}

