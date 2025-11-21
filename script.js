
function gerarBolhas() {
    const container = document.querySelector(".bolhas-site");

    for (let i = 0; i < 18; i++) {
        const bolha = document.createElement("div");
        bolha.classList.add("bolha");

        bolha.style.left = Math.random() * 100 + "vw";
        bolha.style.animationDuration = 12 + Math.random() * 12 + "s";
        bolha.style.animationDelay = Math.random() * 5 + "s";
        bolha.style.transform = `scale(${0.5 + Math.random()})`;

        container.appendChild(bolha);
    }
}
gerarBolhas();

/* ===== CARROSSEL MANUAL ===== */

/* ===== CARROSSEL INFINITO ===== */

const faixa = document.querySelector(".carrosel-faixa");
const cards = document.querySelectorAll(".card");
const anterior = document.querySelector(".anterior");
const proximo = document.querySelector(".proximo");

let indice = 0;
const larguraCard = 360; // 320 card + 40 gap

// Clona os elementos para permitir loop infinito
cards.forEach(card => faixa.appendChild(card.cloneNode(true)));

function atualizar() {
    faixa.style.transform = `translateX(-${indice * larguraCard}px)`;
}

proximo.addEventListener("click", () => {
    indice++;

    // Se chegou no meio (último clone), volta para o original SEM animação
    if (indice >= cards.length) {
        indice = 0;
        faixa.style.transition = "none";
        atualizar();

        // reativa animação depois de 20ms
        setTimeout(() => {
            faixa.style.transition = "transform 0.45s ease";
            indice++;
            atualizar();
        }, 20);
        return;
    }

    atualizar();
});

anterior.addEventListener("click", () => {
    indice--;

    if (indice < 0) {
        // pula para o último clone
        faixa.style.transition = "none";
        indice = cards.length - 1;
        atualizar();

        setTimeout(() => {
            faixa.style.transition = "transform 0.45s ease";
            indice--;
            atualizar();
        }, 20);
        return;
    }

    atualizar();
});


/* ===== enviarmensagem ===== */
function mostrarErro(texto, tempoMs = 3500) {
    const elemento = document.getElementById("ERRORmsg");
    if (!elemento) return;

    elemento.textContent = texto;
    elemento.classList.remove("show");   // reset pra reativar animação
    // força reflow para garantir a animação mesmo se for o mesmo texto
    void elemento.offsetWidth;
    elemento.classList.add("show");

    // opcional: foco visual (não rouba foco do usuário)
    elemento.setAttribute("tabindex", "-1");
    elemento.focus({ preventScroll: true });

    // esconde automaticamente após X ms
    clearTimeout(elemento._timeoutId);
    elemento._timeoutId = setTimeout(() => {
        elemento.classList.remove("show");
        // remove tabindex se quiser
        elemento.removeAttribute("tabindex");
    }, tempoMs);
}


function enviarMensagem() {
    const elementoErro = document.getElementById("ERRORmsg");
    const mensagem = document.getElementById("mensagem").value;

    if (mensagem.trim() === "") {
        mostrarErro("Por favor, escreva seu pedido antes de enviar.");
        return;
    }

    const url = `https://wa.me/558193651862?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
    console.log(mostrarErro)
}


// script aumentar imagem


function iniciarLightbox() {
    const imagens = document.querySelectorAll(".ImgT");

    imagens.forEach(img => {
        img.addEventListener("click", () => abrirLightbox(img));
    });
}

function abrirLightbox(img) {
    // criar o fundo escuro
    const fundo = document.createElement("div");
    fundo.id = "LightboxBG";

    // criar imagem ampliada
    const imgGrande = document.createElement("img");
    imgGrande.src = img.src;

    // impedir scroll do site atrás
    document.body.style.overflow = "hidden";

    // fechar ao clicar fora
    fundo.addEventListener("click", () => {
        fundo.remove();
        document.body.style.overflow = ""; // libera scroll novamente
    });

    fundo.appendChild(imgGrande);
    document.body.appendChild(fundo);
}

document.addEventListener("DOMContentLoaded", iniciarLightbox);


// function aumentarImagem() {
//     const imagens = document.querySelectorAll(".ImgT");

//     imagens.forEach(img => {
//         img.addEventListener("click", () => {
//             img.classList.CriarDiv(img) ("aumentar");
//         });
//     });
// }
document.addEventListener("DOMContentLoaded", aumentarImagem);
