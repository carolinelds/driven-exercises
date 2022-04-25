import randomNumber from './random.js';
import chalk from 'chalk';

cassino();

function cassino(){
    let numeroSorte = randomNumber(2,12);
    console.log(chalk.blue(`Seu número da sorte é: ${numeroSorte}`));
    
    console.log("Jogando dados...");
    
    let primeiroNumero = randomNumber(1,6);
    let segundoNumero = randomNumber(1,6);

    setTimeout(() => console.log(`Você tirou ${primeiroNumero} no primeiro dado!`),2000);

    setTimeout(() => console.log(`Você tirou ${segundoNumero} no segundo dado!`),4000);

    setTimeout(() => {
        if (primeiroNumero === segundoNumero || primeiroNumero + segundoNumero === numeroSorte){
            console.log(chalk.green("Você ganhou!"));
        } else {
            console.log(chalk.red("Você perdeu"));
        }    
    },5000);
}