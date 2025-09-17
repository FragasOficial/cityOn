const API_BASE = "http://localhost:3000/api";
let currentCityId = null; // Armazena o _id da cidade atual

// Buscar ID da cidade pelo nome
async function getCityId(cityName) {
    try {
        const res = await fetch(`${API_BASE}/cities`);
        const cities = await res.json();
        const city = cities.find(c => c.name.toLowerCase() === cityName.toLowerCase());
        if (city) {
            currentCityId = city._id;
            console.log("Cidade carregada:", city.name, "ID:", currentCityId);
        } else {
            console.error("Cidade não encontrada no banco.");
        }
    } catch (err) {
        console.error("Erro ao buscar cidade:", err);
    }
}

// Lógica para modais (igual antes)
function setupModals() {
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const closeLogin = document.getElementById('closeLogin');
    const closeSignup = document.getElementById('closeSignup');
    const goToSignup = document.getElementById('goToSignup');
    const goToLogin = document.getElementById('goToLogin');
    
    loginButton.addEventListener('click', () => loginModal.style.display = 'flex');
    signupButton.addEventListener('click', () => signupModal.style.display = 'flex');
    closeLogin.addEventListener('click', () => loginModal.style.display = 'none');
    closeSignup.addEventListener('click', () => signupModal.style.display = 'none');

    goToSignup.addEventListener('click', () => {
        loginModal.style.display = 'none';
        signupModal.style.display = 'flex';
    });

    goToLogin.addEventListener('click', () => {
        signupModal.style.display = 'none';
        loginModal.style.display = 'flex';
    });

    window.addEventListener('click', (event) => {
        if (event.target === loginModal) loginModal.style.display = 'none';
        if (event.target === signupModal) signupModal.style.display = 'none';
    });
}

// Geolocalização
function getUserLocation() {
    const locationInfo = document.getElementById("location-info");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude.toFixed(4);
                const lon = position.coords.longitude.toFixed(4);
                locationInfo.textContent = `Sua localização atual: Latitude ${lat}, Longitude ${lon}`;
            },
            () => locationInfo.textContent = "Não foi possível obter a sua localização."
        );
    } else {
        locationInfo.textContent = "Geolocalização não é suportada por este navegador.";
    }
}

// Buscar estabelecimentos da API
async function loadEstablishments(category) {
    if (!currentCityId) {
        console.error("CityId ainda não carregado.");
        return;
    }

    try {
        const res = await fetch(`${API_BASE}/establishments/${currentCityId}/${category}`);
        const establishments = await res.json();

        const container = document.querySelector(".config-card");
        container.innerHTML = "";

        if (!establishments.length) {
            container.innerHTML = "<p>Nenhum estabelecimento encontrado.</p>";
            return;
        }

        establishments.forEach(est => {
            const card = document.createElement("div");
            card.className = "card-services";
            card.innerHTML = `
                <h1 class="header-category">${est.category}</h1>
                <h2>${est.name}</h2>
                <p>${est.description}</p>
                <p><strong>Endereço:</strong> ${est.address}</p>
                <p><strong>Telefone:</strong> ${est.phone}</p>
            `;
            container.appendChild(card);
        });
    } catch (err) {
        console.error("Erro ao carregar estabelecimentos:", err);
    }
}

// Botões "Buscar"
function setupListButtons() {
    const renderButtons = document.querySelectorAll(".render-button");
    renderButtons.forEach(button => {
        button.addEventListener("click", () => {
            const parentCard = button.closest(".card-services");
            const category = parentCard.querySelector(".header-category").textContent;
            loadEstablishments(category);
        });
    });
}

// Inicialização
document.addEventListener("DOMContentLoaded", async () => {
    await getCityId("Frecheirinha"); // 🔹 busca ID da cidade no banco
    getUserLocation();
    setupListButtons();
    setupModals();
});
