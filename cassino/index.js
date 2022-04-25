cassino();

function cassino(){

    let numeroSorte = numeroInicial();
    console.log("Jogando dados...");
    let primeiroNumero = setTimeout(primeiroSorteio,2000);
    let segundoNumero = setTimeout(segundoSorteio,4000);
    setTimeout(() => checarResultado(primeiroNumero, segundoNumero, numeroSorte),5000);
}

function numeroInicial(){
    let numeroSorte = randomNumber(2,12);
    console.log(`Seu número da sorte é: ${numeroSorte}`);
    return numeroSorte;
}

function primeiroSorteio(){
    let primeiroNumero = randomNumber(1,6);
    console.log(`Você tirou ${primeiroNumero} no primeiro dado!`);
    return primeiroNumero;
}

function segundoSorteio(){
    let segundoNumero = randomNumber(1,6);
    console.log(`Você tirou ${segundoNumero} no segundo dado!`);
    return segundoNumero;
}

function checarResultado(num1,num2, numSorte){
    if (num1 === num2 || num1 + num2 === numSorte){
        console.log("Você ganhou!");
    } else {
        console.log("Você perdeu");
    }
}

function randomNumber(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}