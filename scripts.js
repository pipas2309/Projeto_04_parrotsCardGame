//Variáveis globais
let jogadas = 0;
let segundo = 0;
let minuto = 0;
let partidas = 0;
let intervalo;
const venceuComQntCartas = [];

// Função do Botão "JOGAR", verifica as entradas e chama a próxima função
function comecarJogo() {
    let qntCartas = prompt("Com quantas cartas você quer jogar?\nDe 4 à 14");
    
    //Verifica se há entreda
    if(qntCartas === '' || qntCartas === null || qntCartas === undefined) {
        alert("Insira um VALOR válido e tente novamente!");
        return comecarJogo();
    }

    qntCartas = Number(qntCartas);

    //Verifica se é um numero
    if(isNaN(qntCartas)) {
        alert("Insira um NÚMERO e tente novamente");
        return comecarJogo();
    }

    //Verifica se é interio o número digitado
    while(Number.isInteger(qntCartas)) {

        //Verifica se o número está entre 2 e 14
        if(qntCartas > 14 || qntCartas < 2) {
            alert("Quantidade inválida, tente novamente");
            return comecarJogo();
        }

        //Verifica se é impar acima de 7
        if(qntCartas%2 !== 0 && qntCartas > 7) {
            alert ("Quantidade inválida, tente novamente");
            return comecarJogo();
        }

        //Verifica se é 2
        if(qntCartas === 2) {
            alert("Você destravou o modo 'Para iniciantes'");
            return darCartas(qntCartas);
        }

        //Verifica se é par, corrige se impar e permitido, e chama a próxima função 
        if(qntCartas%2 !== 0) {
            const erroCartas = prompt(`Você quis dizer: ${qntCartas} pares de cartas, ou seja, ${qntCartas * 2}?\nResponda com SIM ou NÃO`);

            if(erroCartas === null || erroCartas === '') {
                alert("Insira um VALOR válido e tente novamente!");
                return comecarJogo();
            }

            if(erroCartas.toLowerCase() === "sim") {
                alert(`Você ira jogar com ${qntCartas * 2} cartas, bom jogo.`);
                return darCartas(qntCartas * 2);
            } else { 
                alert ("Não foi possível entender como quer jogar, começe novamente");
                return comecarJogo();
            }
        } else {
            alert (`Você ira jogar com ${qntCartas} cartas, bom jogo`);
            return darCartas(qntCartas);
        }

    }
    alert("Insira um valor numérico INTEIRO de 4 à 14!");
    return comecarJogo();
}

// Função que cria a lista de cartas aleatóriamente e distribui na mesa
function darCartas(numero) {
    const areaJogo = document.querySelector(".area-jogo");
    areaJogo.innerHTML = "";
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
        return;
    }

    if(document.querySelector(".virada") === elemento) {
        return;
    }

    if(document.querySelector(".iniciado") === null) {
        segundo = 0;
        cronometro();
    }

    let primeiraCarta;
    let segundaCarta;

    if(document.querySelector(".virada")) {
        primeiraCarta = document.querySelector(".virada");
        segundaCarta = elemento;
        elemento.classList.add("virada");
    } else {
        primeiraCarta = elemento;
        elemento.classList.add("virada");
        
        return contaJogada();
    }
    
    if(primeiraCarta.querySelector(".tras").innerHTML == segundaCarta.querySelector(".tras").innerHTML) {
        primeiraCarta.classList.add("fechada");
        primeiraCarta.classList.remove("virada");
        segundaCarta.classList.add("fechada");
        segundaCarta.classList.remove("virada");
        
        return contaJogada(1);
    }
    setTimeout (desvirar, 1000);
    return contaJogada();
}

// Função chamada pela "virar()" para, caso diferentes, desvirá-las 
function desvirar(carta1, carta2) {
    document.querySelector(".virada").classList.remove("virada");
    document.querySelector(".virada").classList.remove("virada");
}

// Função que ativa o cronometro
function cronometro() {
    document.querySelector(".cronometro").classList.add("iniciado");

    if(venceuComQntCartas.length !== 0) {
        clearInterval(intervalo);
    }

    setTimeout(function() {document.querySelector(".cronometro p").classList.remove("escondido");
    document.querySelector(".cronometro").lastChild.classList.remove("escondido");}, 1000)
    intervalo = setInterval(tempo, 1000);

    function tempo() {
        
        if((segundo += 1) === 60) {
            segundo = 0;
            minuto++;
        }

        document.querySelector(".cronometro p").innerHTML = `${minuto}:${segundo}`;
    }

}

// Contas as jogadas e chama o fim do jogo quando acaba
function contaJogada() {


        jogadas++;
        document.querySelector(".cronometro").lastChild.innerHTML = ` | Jogadas: ${jogadas}`;
    
    
    if(document.querySelectorAll(".fechada").length === document.querySelectorAll(".carta").length) {
        return setTimeout(resetar, 100);
    }
}


function resetar() {

    alert(`Você venceu, parabéns!\nSeu tempo foi: ${minuto}:${segundo}\nVocê precisou de: ${jogadas} jogadas para vencer!`);
    let recomecar = prompt("Você quer jogar novamente?\nResponda com Sim ou Não!");

    while(recomecar === null || recomecar === "") {
        recomecar = prompt("Não entendi =|\nVocê quer jogar novamente?\nResponda com Sim ou Não!");
    }

    if(recomecar.toLowerCase() === "sim") {        
        apagarCodigo();
        return comecarJogo();
    }

    if(recomecar.toLowerCase() === "não" || recomecar.toLowerCase() === "nao") {
        const menu = prompt("Gostaria de voltar ao Menu?\nResponda com Sim ou Não!");
        if(menu.toLowerCase() === "sim") {
            document.querySelector(".pagina").classList.add("escondido");
            document.querySelector(".pagina-inicial").classList.remove("escondido")
            return apagarCodigo();
        } else {
            
        }
    }
}

function apagarCodigo(x) {
       
    partidas++;
    venceuComQntCartas.push(document.querySelectorAll(".fechadas").length)

    jogadas = 0;
    segundo = 0;
    minuto = 0;

    let numCartas = document.querySelectorAll(".fechada").length;

    for(let i = 0; i < numCartas; i++) {
        document.querySelector(".fechada").classList.remove("fechada");
    }

    document.querySelector(".cronometro").classList.remove("iniciado");
    document.querySelector(".cronometro p").classList.add("escondido");
    document.querySelector(".cronometro").lastChild.classList.add("escondido");
    
    
}