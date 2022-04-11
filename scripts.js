//Variáveis globais
let jogadas = 0;
let segundo = 0;
let minuto = 0;
let partidas = 0;
let intervalo;
let venceuComQntCartas = [];
let platinado = 0;
let facil = 0;
let flash = 0;

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
        if(qntCartas === 2 && facil === 0) {
            alert("'Para iniciantes'");
            novaConquista();
            facil = 1;
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
    document.querySelector(".voltar-menu").classList.add("escondido");

    listaImagens = listaImagens.sort(() => Math.random() - 0.5);

    for(let i = 0; i < numero/2; i++) {
        listaCartas.push(listaImagens[i]);
    }
    
    listaCartas = listaCartas.concat(listaCartas);
    listaCartas = listaCartas.sort(() => Math.random() - 0.5);

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

// Função serve para avisar da vitória e pontuação e direcionar o jogador para o que fazer em seguida.
function resetar() {

    alert(`Você venceu, parabéns!\nSeu tempo foi: ${minuto}:${segundo}\nVocê precisou de: ${jogadas} jogadas para vencer!`);
    let recomecar = prompt("Você quer jogar novamente?\nResponda com Sim ou Não!");

    if(minuto === 0 && segundo < 3 && flash === 0) {
        flash = 1;
        novaConquista();
    }

    while(recomecar === null || recomecar === "") {
        recomecar = prompt("Não entendi =|\nVocê quer jogar novamente?\nResponda com Sim ou Não!");
    }

    let cards = document.querySelectorAll(".carta");
    for(let i = 0; i < cards.length; i++) {
        cards[i].removeAttribute("onclick");
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
        } 
    }
    document.querySelector(".voltar-menu").classList.remove("escondido");
    document.querySelector(".cronometro").classList.remove("iniciado");
    document.querySelector(".cronometro p").classList.add("escondido");
    document.querySelector(".cronometro").lastChild.classList.add("escondido");
}

// Função apaga todo o histórico do último jogo, garantindo que uma nova partida possa ser feita
function apagarCodigo() {

    partidas++;
    jogadas = 0;
    segundo = 0;
    minuto = 0;

    let teste = 0;
    let numCartas = document.querySelectorAll(".fechada").length;
    venceuComQntCartas.push(numCartas)

    for(let j = 0; j < venceuComQntCartas.length; j++) {
        teste += venceuComQntCartas[j];
        if(teste > 42 && platinado === 0) {
            platinado = 1;
            novaConquista();
        }
    }

    for(let i = 0; i < numCartas; i++) {
        document.querySelector(".fechada").classList.remove("fechada");
    }

    document.querySelector(".cronometro").classList.remove("iniciado");
    document.querySelector(".cronometro p").classList.add("escondido");
    document.querySelector(".cronometro").lastChild.classList.add("escondido");
    
    
}

//Em implementação
function visuais() {
    alert("Virá na nova expansão: Jogo da Memória - Memes anos 90 ");
}

// Função permite zerar o game e voltar ao menu
function voltarMenu() {
    document.querySelector(".pagina").classList.add("escondido");
    document.querySelector(".pagina-inicial").classList.remove("escondido");
    document.querySelector(".conquistas").classList.add("escondido");
    apagarCodigo();
}
 
// Função chama o aviso de conquista e destrava o item
function novaConquista() {
    document.querySelector(".aviso").classList.add("subindo")
    setTimeout(function(){
    document.querySelector(".aviso").classList.remove("subindo")
    },5000)

    if(flash === 1) {
        document.querySelector(".flash").classList.remove("escondido");
        document.querySelector(".flash").classList.add("segredo");
    }
    if(facil === 1) {
        document.querySelector(".facil").classList.remove("escondido");
        document.querySelector(".facil").classList.add("segredo");
    }
    if(platinado === 1) {
        document.querySelector(".platinado").classList.remove("escondido");
        document.querySelector(".platinado").classList.add("segredo");
    }
}

// Função entra no menu conquistas
function conquistas () {
    document.querySelector(".conquistas").classList.remove("escondido");
    document.querySelector(".pagina-inicial").classList.add("escondido");
}