// Função do Botão "JOGAR", verifica as entradas e chama a próxima função
function comecarJogo() {
    const qntCartas = Number(prompt("Com quantas cartas você quer jogar?\nDe 4 à 14"));
    
    while(Number.isInteger(qntCartas)) {

        if(isNaN(qntCartas)) {
            alert("Insira um valor numérico INTEIRO de 4 à 14!");
            return ;
        }

        if(qntCartas > 14 || qntCartas < 2) {
            alert("Quantidade inválida, tente novamente");
            return ;
        }

        if(qntCartas%2 !== 0 && qntCartas > 7) {
            alert ("Quantidade inválida, tente novamente");
            return ;
        }

        if(qntCartas === 2) {
            alert("Você destravou o modo 'Para iniciantes'");
            return darCartas(qntCartas);
        }

        if(qntCartas%2 !== 0) {
            const erroCartas = prompt(`Você quis dizer: ${qntCartas} pares de cartas, ou seja, ${qntCartas * 2}?\nResponda com SIM ou NÃO`);

            if(erroCartas.toLowerCase() === "sim") {
                alert(`Você ira jogar com ${qntCartas * 2} cartas, bom jogo.`);
                return darCartas(qntCartas * 2);
            } else { 
                alert ("Não foi possível entender como quer jogar, começe novamente");
                return ;
            }
        } else {
            alert (`Você ira jogar com ${qntCartas} cartas, bom jogo`);
            return darCartas(qntCartas);
        }

    }
    alert("Insira um valor numérico INTEIRO de 4 à 14!");
    return ;
}

// Função que cria a lista de cartas aleatóriamente e distribui na mesa
function darCartas(numero) {
    const areaJogo = document.querySelector(".area-jogo");
    let listaImagens = [1,2,3,4,5,6,7];
    let listaCartas = [];
    console.log(listaImagens + "\nLista com numero de imagens disponíveis\n")

    listaImagens = listaImagens.sort(() => Math.random() - 0.5);
    console.log(listaImagens + "\nLista RANDOMIZADA\n");

    for(let i = 0; i < numero/2; i++) {
        listaCartas.push(listaImagens[i]);
    }
    console.log(listaCartas + "\nLista de cartas para esse jogo, já randomizada\n");
    
    listaCartas = listaCartas.concat(listaCartas);
    listaCartas = listaCartas.sort(() => Math.random() - 0.5);
    console.log(listaCartas + "\nLista de cartas Dobrada e randomizada\n");

    document.querySelector(".pagina-inicial").classList.add("escondido");
    document.querySelector(".pagina").classList.remove("escondido");
    
    for(let j = 0; j < numero; j++) {
        areaJogo.innerHTML += `
        <div class="carta" onclick="virar(this)">
            <div class="frente face"><img src="/Projeto_04_parrotsCardGame/imagens/front.png"></div>
            <div class="tras face"><img src="/Projeto_04_parrotsCardGame/imagens/${listaCartas[j]}.gif"></div>
        </div>
        `;
    }
}

// Função que vira as cartas e confere se são iguais ou diferentes
function virar(elemento) {

    if(document.querySelectorAll(".virada").length === 2) {
        return
    }

    let primeiraCarta;
    let segundaCarta;

    if(document.querySelector(".virada")) {
        primeiraCarta = document.querySelector(".virada");
        segundaCarta = elemento;
    } else {
        primeiraCarta = elemento;
        elemento.classList.add("virada");
        return;
    }

    elemento.classList.add("virada");
    
    if(primeiraCarta.querySelector(".tras").innerHTML == segundaCarta.querySelector(".tras").innerHTML) {
        primeiraCarta.classList.add("fechada");
        primeiraCarta.classList.remove("virada");
        segundaCarta.classList.add("fechada");
        segundaCarta.classList.remove("virada");
        return
    }
    setTimeout (desvirar, 800);
    return;
}

// Função chamada pela "virar()" para, caso diferentes, desvirá-las 
function desvirar(carta1, carta2) {
    document.querySelector(".virada").classList.remove("virada");
    document.querySelector(".virada").classList.remove("virada");
}