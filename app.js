// MSAL configuration
const msalConfig = {
    auth: {
        clientId: "85c5fc2c-f183-43f0-b367-835efe4135ac", // Replace with your Entra ID Application (client) ID
        authority: "https://login.microsoftonline.com/b46f32ba-81fe-490e-b452-9a079102204f", // Replace with your Directory (tenant) ID
        redirectUri: "https://maescotravel-ekdhfeehftcwbha6.canadacentral-01.azurewebsites.net", // Replace with your app's URL
    },
};

const msalInstance = new Msal.UserAgentApplication(msalConfig);

// Elements
const loginButton = document.getElementById("loginButton");
const logoutButton = document.getElementById("logoutButton");
const userInfo = document.getElementById("userInfo");
const content = document.getElementById("content");

// Check if user is already logged in
document.addEventListener("DOMContentLoaded", () => {
    const account = msalInstance.getAccount();
    if (account) {
        showWelcomeMessage(account);
    }
});

// Login function
function login() {
    msalInstance.loginPopup({ scopes: ["User.Read"] })
        .then(response => {
            showWelcomeMessage(response.account);
        })
        .catch(error => {
            console.error("Login failed:", error);
        });
}

// Logout function
function logout() {
    msalInstance.logout();
    loginButton.style.display = "block";
    logoutButton.style.display = "none";
    userInfo.textContent = "";
    content.style.display = "none";
}

// Show welcome message and content after login
function showWelcomeMessage(account) {
    loginButton.style.display = "none";
    logoutButton.style.display = "block";
    userInfo.textContent = `Welcome, ${account.name}!`;
    content.style.display = "block";
}
