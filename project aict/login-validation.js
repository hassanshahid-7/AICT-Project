document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const createErrorMessage = (input, message) => {
        let error = input.nextElementSibling;
        if (!error || !error.classList.contains("error-message")) {
            error = document.createElement("p");
            error.className = "error-message";
            input.after(error);
        }
        error.textContent = message;
        error.style.color = "red";
    };

    const clearErrorMessage = (input) => {
        let error = input.nextElementSibling;
        if (error && error.classList.contains("error-message")) {
            error.textContent = "";
        }
    };

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            createErrorMessage(emailInput, "Email must be in a valid format.");
            return false;
        }
        clearErrorMessage(emailInput);
        return true;
    };

    const validatePassword = () => {
        if (passwordInput.value.length <= 8) {
            createErrorMessage(passwordInput, "Password must be greater than 8 characters.");
            return false;
        }
        clearErrorMessage(passwordInput);
        return true;
    };

    const validateForm = () => {
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        return isEmailValid && isPasswordValid;
    };

    form.addEventListener("submit", (e) => {
        if (!validateForm()) {
            e.preventDefault();
        }
    });

    emailInput?.addEventListener("input", validateEmail);
    passwordInput?.addEventListener("input", validatePassword);
});
