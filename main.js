const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJump = false;
let isGameOver = false;
let position = 0;

function acaoKeyup(event) {
    if (event.keyCode === 38) {
        if (!isJump) {
            jump();
        }
    }
}

function jump() {
    isJump = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            //desce o dino
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJump = false;
                } else {
                   
                position -= 20;
                dino.style.bottom = position + 'px';
                }
            }, 20); 
        } else {
             //dino subindo
            position += 20;
            dino.style.bottom = position + 'px';
        }
   
    }, 20);
}
  // gerar objetos interativos

function creatoCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randonTime = Math.random() * 6000;

    if (isGameOver) return;


    cactus.classList.add('cactus');
    background.appendChild(cactus);
    cactus.style.left = cactusPosition + 'px';
  
    let leftInterval = setInterval(() => {
        
        if (cactusPosition < -60) {
            //cactus sai da tela
            clearInterval(leftInterval);
            background.removeChild(cactus);

        }else if(cactusPosition > 0 && cactusPosition < 60 && position < 60){

            clearInterval(leftInterval);
            isGameOver = true;
            document.body.innerHTML = '<h1 class="game-over"> Fim de jogo</h1>';
        }
        else{
               cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    },20);
    
    setTimeout(creatoCactus, randonTime);
}
creatoCactus(); 
document.addEventListener("keyup", acaoKeyup);


