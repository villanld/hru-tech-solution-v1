
document.addEventListener("DOMContentLoaded", function () {
    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

async function testReviewConnection() {
    const functionUrl =
        "https://nneqgurexjphnauxzqbu.supabase.co/functions/v1/submit-review";

    const tokenInput = document.querySelector(
        '#reviewForm input[name="cf-turnstile-response"]'
    );

    const token = tokenInput?.value;

    if (!token) {
        console.log("No CAPTCHA token available.");
        return;
    }

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
                    "Testing HRU Tech Solutions review verification.",
                turnstileToken: token
            })
        });

        const result = await response.json();

        console.log("HTTP Status:", response.status);
        console.log("Supabase Response:", result);

    } catch (error) {
        console.error("Connection error:", error);
    }
}
