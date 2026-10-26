
document.addEventListener("DOMContentLoaded", function () {
    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});


async function testReviewConnection() {
    const functionUrl =
        "https://nneqgurexjpnhauxzqbu.supabase.co/functions/v1/submit-review";

    const widget = document.querySelector(
        "#reviewForm .cf-turnstile"
    );

    if (!widget) {
        console.log("Turnstile widget not found.");
        return;
    }

    if (typeof turnstile === "undefined") {
        console.log("Turnstile has not loaded.");
        return;
    }

    const token = turnstile.getResponse(widget);

    if (!token) {
        console.log(
            "No CAPTCHA token available. Complete the CAPTCHA and try again."
        );
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
    } finally {
        turnstile.reset(widget);
    }
}

