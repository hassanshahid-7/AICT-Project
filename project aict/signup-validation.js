// validation.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");

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

    const validateName = () => {
        const nameRegex = /^[a-zA-Z]+$/;
        if (!nameRegex.test(nameInput.value)) {
            createErrorMessage(nameInput, "Username must contain only alphabets.");
            return false;
        }
        clearErrorMessage(nameInput);
        return true;
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

    const validateConfirmPassword = () => {
        if (passwordInput.value !== confirmPasswordInput.value) {
            createErrorMessage(confirmPasswordInput, "Passwords do not match.");
            return false;
        }
        clearErrorMessage(confirmPasswordInput);
        return true;
    };

    const validateForm = () => {
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();

        return isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;
    };

    form.addEventListener("submit", (e) => {
        if (!validateForm()) {
            e.preventDefault(); // Prevent form submission if there are errors
        }
    });

    nameInput.addEventListener("input", validateName);
    emailInput.addEventListener("input", validateEmail);
    passwordInput.addEventListener("input", validatePassword);
    confirmPasswordInput.addEventListener("input", validateConfirmPassword);
});
