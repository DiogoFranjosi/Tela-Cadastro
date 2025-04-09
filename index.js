// Efeito visual ao clicar no botão
function pressEffect(button) {
    button.style.transform = "scale(0.9)";
    setTimeout(() => button.style.transform = "scale(1)", 200);
}

// Animação ao carregar os campos do formulário
document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll(".input-box");

    inputs.forEach((input, index) => {
        setTimeout(() => {
            input.classList.add("visible");
        }, index * 100);
    });

    document.querySelector(".form").classList.add("visible");
    document.querySelector(".form-image").classList.add("visible");
});

// Função de validação e envio dos dados
function validateForm(event) {
    event.preventDefault();

    const fields = document.querySelectorAll(".input-box input");
    let isValid = true;

    fields.forEach(field => {
        if (field.value.trim() === "") {
            field.classList.add("shake", "error");
            setTimeout(() => field.classList.remove("shake"), 300);
            isValid = false;
        } else {
            field.classList.remove("error");
        }
    });

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmepassword").value;

    if (password !== confirmPassword) {
        const confirmField = document.getElementById("confirmepassword");
        confirmField.classList.add("shake", "error");
        setTimeout(() => confirmField.classList.remove("shake"), 300);
        alert("As senhas não coincidem!");
        return false;
    }

    if (!isValid) {
        alert("Por favor, preencha todos os campos!");
        return false;
    }

    // Coletando os dados
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const nome = `${firstname} ${lastname}`;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("number").value;
    const senha = document.getElementById("password").value;

    // Enviando os dados para o servidor
    fetch("http://localhost:3000/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, telefone, senha }),
    })
    .then(response => response.text())
    .then(data => {
        console.log("Resposta do servidor:", data);
        showPopup(); // Exibe o popup de sucesso
    })
    .catch(error => {
        console.error("Erro ao enviar dados:", error);
        alert("Erro ao cadastrar usuário. Verifique o console.");
    });

    return true;
}

// Exibe o popup de sucesso
function showPopup() {
    const popup = document.getElementById("success-popup");
    popup.style.visibility = "visible";
    popup.style.opacity = "1";
}

// Fecha o popup de sucesso
function closePopup() {
    const popup = document.getElementById("success-popup");
    popup.style.opacity = "0";
    setTimeout(() => {
        popup.style.visibility = "hidden";
    }, 300);
}
