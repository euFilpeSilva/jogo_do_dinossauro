const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) {
 // o keyCode é a codificação dos botões do teclado
// abaixo usamos o event.keyCode e comparamos para saber se é igual ao keyCode da tecla espaço
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;
// setInterval é uma função utilizada pra definir intervalos, tudo que estiver dentro do
// parametro dela vai ser executado de acordo com o tempo que eu definir
  let upInterval = setInterval(() => {
    if (position >= 150) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          // a baixo usamos propriedades css para fazer com que o nosso dino  suba
          // pegamos a nossa constante dino e adicionamos o stylo bootom e armazenamos a variavel
          //  position concatenado com "px"
          dino.style.bottom = position + 'px';
        }
 // estou definindo o tempo do setIntervalo aqui a baixo, ele esta setado com 20segundos.
      }, 20);
    } else {
      // Subindo
      // toda vez que o intervalo se repetir vamos adicionar 20 a variavel position
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement('div');
  // 1000 equivale a um mili segundo
  let cactusPosition = 1000;
  // a função Math.random serve pra gerar valores aleatorios
  // a baixo vamos gerar numeros aleatorios de 0 até 6 mil
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;
// adicionando clasee
  cactus.classList.add('cactus');
  // inserindo elemento filho
  // o cacto vai ficar sobreposto no background
  background.appendChild(cactus);

  // toda vez que eu for adicionar um estilo pelo js sera assim
  cactus.style.left = cactusPosition + 'px';

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);
