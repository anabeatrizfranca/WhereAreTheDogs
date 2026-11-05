
const contactForm = document.getElementById("contactForm");
const inquiryFeedback = document.getElementById("inquiryFeedback");

if (contactForm && inquiryFeedback) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (!contactForm.reportValidity()) return;

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        const originalButtonText = submitButton.innerHTML;

        submitButton.disabled = true;
        submitButton.textContent = "SENDING...";

        inquiryFeedback.textContent = "";
        inquiryFeedback.className = "inquiry-feedback";

        const formData = new FormData(contactForm);

        // Define o assunto do e-mail
        formData.set(
            "_subject",
            "Where Are the Dogs? - " + formData.get("inquiryType")
        );

        // Permite responder diretamente ao visitante
        formData.set(
            "_replyto",
            formData.get("emailAddress")
        );

        try {
            const response = await fetch(
                "https://formspree.io/f/xpppnygb",
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        Accept: "application/json"
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Submission failed.");
            }

            inquiryFeedback.textContent =
                "Your inquiry has been sent successfully. Thank you for contacting us!";

            inquiryFeedback.classList.add("success");

            contactForm.reset();

        } catch (error) {
            console.error(error);

            inquiryFeedback.textContent =
                "Something went wrong. Please try again later.";

            inquiryFeedback.classList.add("error");

        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }
    });
}
