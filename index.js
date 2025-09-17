// Função para lidar com a geolocalização do usuário
function getUserLocation() {
    const locationInfo = document.getElementById("location-info");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude.toFixed(4);
                const lon = position.coords.longitude.toFixed(4);
                locationInfo.textContent = `Sua localização atual: Latitude ${lat}, Longitude ${lon}`;
            },
            (error) => {
                locationInfo.textContent = "Não foi possível obter a sua localização.";
                console.error("Erro ao obter a geolocalização: ", error);
            }
        );
    } else {
        locationInfo.textContent = "Geolocalização não é suportada por este navegador.";
    }
}

// Lógica de busca em tempo real
const searchInput = document.getElementById("highlight");
const cards = document.querySelectorAll(".card-services");

searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();
    
    cards.forEach(card => {
        const cardContent = card.textContent.toLowerCase();
        
        if (cardContent.includes(searchTerm)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
});

// Lógica para o botão "Conferir lista"
const renderButtons = document.querySelectorAll(".render-button");
const listServices = document.querySelectorAll(".list-services-ul");

// Oculta todas as listas por padrão
listServices.forEach(list => {
    list.style.display = "none";
});

renderButtons.forEach(button => {
    button.addEventListener("click", function () {
        const parentCard = this.closest(".card-services");
        const list = parentCard.querySelector(".list-services-ul");

        if (list.style.display === "none" || list.style.display === "") {
            list.style.display = "flex";
        } else {
            list.style.display = "none";
        }
    });
});

// Chama a função de geolocalização ao carregar a página
document.addEventListener("DOMContentLoaded", getUserLocation);

        // Lógica para os modais de login e cadastro
        document.addEventListener('DOMContentLoaded', function() {
            const loginButton = document.getElementById('loginButton');
            const signupButton = document.getElementById('signupButton');
            const loginModal = document.getElementById('loginModal');
            const signupModal = document.getElementById('signupModal');
            const closeLogin = document.getElementById('closeLogin');
            const closeSignup = document.getElementById('closeSignup');
            const goToSignup = document.getElementById('goToSignup');
            const goToLogin = document.getElementById('goToLogin');
            
            // Abrir modal de login
            loginButton.addEventListener('click', function() {
                loginModal.style.display = 'flex';
            });
            
            // Abrir modal de cadastro
            signupButton.addEventListener('click', function() {
                signupModal.style.display = 'flex';
            });
            
            // Fechar modais
            closeLogin.addEventListener('click', function() {
                loginModal.style.display = 'none';
            });
            
            closeSignup.addEventListener('click', function() {
                signupModal.style.display = 'none';
            });
            
            // Alternar entre login e cadastro
            goToSignup.addEventListener('click', function() {
                loginModal.style.display = 'none';
                signupModal.style.display = 'flex';
            });
            
            goToLogin.addEventListener('click', function() {
                signupModal.style.display = 'none';
                loginModal.style.display = 'flex';
            });
            
            // Fechar modal ao clicar fora dele
            window.addEventListener('click', function(event) {
                if (event.target === loginModal) {
                    loginModal.style.display = 'none';
                }
                if (event.target === signupModal) {
                    signupModal.style.display = 'none';
                }
            });
            
            // Validação do formulário de cadastro
            document.getElementById('signupForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const password = document.getElementById('signupPassword').value;
                const confirmPassword = document.getElementById('confirmPassword').value;
                
                if (password !== confirmPassword) {
                    alert('As senhas não coincidem!');
                    return;
                }
                
                // Aqui você normalmente enviaria os dados para o servidor
                alert('Cadastro realizado com sucesso!');
                signupModal.style.display = 'none';
            });
            
            // Validação do formulário de login
            document.getElementById('loginForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Aqui você normalmente validaria as credenciais com o servidor
                alert('Login realizado com sucesso!');
                loginModal.style.display = 'none';
            });
        });
    
