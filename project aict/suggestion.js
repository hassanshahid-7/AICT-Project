document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const recipeInput = document.getElementById("recipe");
    const detailsInput = document.getElementById("details");

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

    // Validate Name (only alphabets)
    const validateName = () => {
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameRegex.test(nameInput.value)) {
            createErrorMessage(nameInput, "Name must contain only alphabets.");
            return false;
        }
        clearErrorMessage(nameInput);
        return true;
    };

    // Validate Email (correct email format)
    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            createErrorMessage(emailInput, "Please enter a valid email address.");
            return false;
        }
        clearErrorMessage(emailInput);
        return true;
    };

    // Validate Recipe (non-empty)
    const validateRecipe = () => {
        if (recipeInput.value.trim().length === 0) {
            createErrorMessage(recipeInput, "Recipe name cannot be empty.");
            return false;
        }
        clearErrorMessage(recipeInput);
        return true;
    };

    // Validate Details (at least 10 characters)
    const validateDetails = () => {
        if (detailsInput.value.trim().length < 10) {
            createErrorMessage(detailsInput, "Recipe details must be at least 10 characters long.");
            return false;
        }
        clearErrorMessage(detailsInput);
        return true;
    };

    // Prevent form submission if validation fails
    form.addEventListener("submit", (e) => {
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isRecipeValid = validateRecipe();
        const isDetailsValid = validateDetails();

        if (!isNameValid || !isEmailValid || !isRecipeValid || !isDetailsValid) {
            e.preventDefault();
        }
    });

    // Event listeners for real-time validation
    nameInput.addEventListener("input", validateName);
    emailInput.addEventListener("input", validateEmail);
    recipeInput.addEventListener("input", validateRecipe);
    detailsInput.addEventListener("input", validateDetails);
});
