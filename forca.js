"use strict";

const palavras = ["paula", "noel", "kevin", "thyago", "arthur", "vitor", "zheng", "lucas", "bambam moedas"];
let palavra = "";
let letrasCorretas = new Set();
let letrasErradas = new Set();
let tentativas = 6;

function escolherPalavra() {
    palavra = palavras[Math.floor(Math.random() * palavras.length)];
}

function mostrarPalavra() {
    return [...palavra].map(letra => (letrasCorretas.has(letra) ? letra : "_")).join(" ");
}

function exibirStatus() {
    document.getElementById("palavra").textContent = mostrarPalavra();
    document.getElementById("letrasErradas").textContent = `Letras erradas: ${[...letrasErradas].join(", ")}`;
    document.getElementById("tentativas").textContent = `Tentativas restantes: ${tentativas}`;
}

function verificarPalpite(palpite) {
    if (letrasCorretas.has(palpite) || letrasErradas.has(palpite)) {
        alert("Você já tentou essa letra.");
        return;
    }

    if (palavra.includes(palpite)) {
        letrasCorretas.add(palpite);
        exibirStatus();  // Atualiza a exibição da palavra imediatamente

        if ([...palavra].every(letra => letrasCorretas.has(letra))) {
            setTimeout(() => {
                alert("Parabéns! Você adivinhou a palavra: " + palavra);
                reiniciarJogo();
            }, 100);
            return;
        }
    } else {
        letrasErradas.add(palpite);
        tentativas -= 1;
        if (tentativas === 0) {
            setTimeout(() => {
                alert("Você perdeu! A palavra era: " + palavra);
                reiniciarJogo();
            }, 100);
            return;
        }
    }
    exibirStatus();
}

function reiniciarJogo() {
    letrasCorretas.clear();
    letrasErradas.clear();
    tentativas = 6;
    escolherPalavra();
    exibirStatus();
}

document.getElementById("adivinhar").addEventListener("click", () => {
    const palpite = document.getElementById("entradaLetra").value.toLowerCase();
    document.getElementById("entradaLetra").value = "";
    verificarPalpite(palpite);
});

document.getElementById("reiniciar").addEventListener("click", reiniciarJogo);

// Inicializa o jogo ao carregar a página
escolherPalavra();
exibirStatus();
