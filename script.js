
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


/* =====================================
   HRU TECH SOLUTIONS
   APPROVED CUSTOMER REVIEWS
===================================== */

const REVIEW_SUPABASE_URL =
  "https://nneqgurexjpnhauxzqbu.supabase.co";

// Replace with your Supabase Publishable key
const REVIEW_PUBLIC_KEY =
  "sb_publishable_XLZzFtUVSy309WVK4h8JjQ_ZDaKqW7I";

async function loadApprovedReviews() {
  const container = document.getElementById(
    "approvedReviews"
  );

  if (!container) return;

  container.textContent = "Loading customer reviews...";

  try {
    const response = await fetch(
      `${REVIEW_SUPABASE_URL}/rest/v1/customer_reviews` +
      "?select=id,customer_name,rating,review_text,created_at" +
      "&order=created_at.desc&limit=20",
      {
        headers: {
          "apikey": REVIEW_PUBLIC_KEY
        }
      }
    );

    if (!response.ok) {
      throw new Error(
        `Unable to load reviews: ${response.status}`
      );
    }

    const reviews = await response.json();

    container.replaceChildren();

    if (reviews.length === 0) {
      container.textContent =
        "No approved customer reviews yet.";
      return;
    }

    reviews.forEach((review) => {
      const card = document.createElement("div");
      card.className = "review-card";

      const name = document.createElement("h4");
      name.textContent = review.customer_name;

      const stars = document.createElement("p");
      stars.className = "review-stars";

      const rating = Number(review.rating);

      stars.textContent =
        "★".repeat(Math.max(0, Math.min(5, rating))) +
        "☆".repeat(Math.max(0, 5 - rating));

      const message = document.createElement("p");
      message.textContent = review.review_text;

      const date = document.createElement("small");

      date.textContent = new Date(
        review.created_at
      ).toLocaleDateString();

      card.append(name, stars, message, date);
      container.appendChild(card);
    });

  } catch (error) {
    console.error("Review loading error:", error);

    container.textContent =
      "Customer reviews are temporarily unavailable.";
  }
}

document.addEventListener(
  "DOMContentLoaded",
  loadApprovedReviews
);


