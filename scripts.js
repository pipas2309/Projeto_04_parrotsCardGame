function comecarJogo() {
    const qntCartas = Number(prompt("Com quantas cartas você quer jogar?\nDe 2 à 14"));
    
    while(Number.isInteger(qntCartas)) {

        if(isNaN(qntCartas)) {
            alert("Insira um valor numérico INTEIRO de 2 à 14!");
            return;
        }

        if(qntCartas > 14 || qntCartas < 1) {
            alert("Quantidade inválida, tente novamente");
            return;
        }

        if(qntCartas%2 !== 0 && qntCartas > 7) {
            alert ("Quantidade inválida, tente novamente");
            return;
        }

        if(qntCartas%2 !== 0) {
            const erroCartas = prompt(`Você quis dizer: ${qntCartas} pares de cartas, ou seja, ${qntCartas*2}?\nResponda com SIM ou NÃO`);
            if (erroCartas.toLowerCase() === "sim") {
                alert(`Você ira jogar com ${qntCartas * 2} cartas, bom jogo.`);
                return darCartas(qntCartas*2);
            } else { 
                alert ("Não foi possível entender como quer jogar, começe novamente");
                return;
            }
        } else {
            alert (`Você ira jogar com ${qntCartas} cartas, bom jogo`);
            return darCartas(qntCartas);
        }

    }
    alert("Insira um valor numérico INTEIRO de 2 à 14!");
    return;
}

function darCartas(numero) {
    const areaJogo = document.querySelector(".area-jogo");
    
    let primeiraCarta = (Math.floor(Math.random() * 7))+1;
    console.log(primeiraCarta)
    let alea = [primeiraCarta,primeiraCarta];
    lista = numero/2;

    for (let i = 1; i<lista; i++) {
        alea.push(i+1);
        alea.push(i+1);
    }
    console.log(alea + "\nFim da criação da lista");

    alea = alea.sort(() => Math.random() - 0.5);

    console.log(alea + "\nJá randomizado");


    document.querySelector(".pagina-inicial").classList.add("escondido");
    document.querySelector(".pagina").classList.remove("escondido");
    
    for(let j = 0; j < numero; j++) {
        areaJogo.innerHTML += `
        <div class="carta">
            <div class="frente face"><img src="/Projeto_04_parrotsCardGame/imagens/front.png"></div>
            <div class="tras face"><img src="/Projeto_04_parrotsCardGame/imagens/${alea[j]}.gif"></div>
        </div>
        `;
    }
}