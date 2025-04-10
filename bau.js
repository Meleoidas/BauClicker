const bau = document.querySelector('#bau');
const bauCounter = document.querySelector('#bauCounter');
let baus = JSON.parse(localStorage.getItem('baus')) || 0;

if(baus){
  bauCounter.innerText = `Baus: ${baus}`;
}

bau.addEventListener('click', () => {
  const bauAudio = new Audio('./bau.mp3');
  bauAudio.play();

  baus++;
  updateBau();
  spawnBauEmoji();
})

function updateBau(){
  localStorage.setItem('baus', JSON.stringify(baus));
  bauCounter.innerText = `Baus: ${baus}`;
}

function spawnBauEmoji() {
  const emoji = document.createElement('img');
  emoji.src = './bauEmoji.webp';
  emoji.style.position = 'absolute';
  emoji.style.width = '30px';
  emoji.style.height = '30px';
  
  const bauRect = bau.getBoundingClientRect();
  emoji.style.left = (bauRect.left + bauRect.width/2 - 15) + 'px';
  emoji.style.top = (bauRect.top + bauRect.height/2 - 50) + 'px';
  
  emoji.style.transition = 'all 1s cubic-bezier(0.25, 0.5, 0.5, 1)';
  document.body.appendChild(emoji);
  
  requestAnimationFrame(() => {
    const random = Math.random();

    const offset = random < 0.5
    ? (Math.random() * -100 - 80)
    : (Math.random() * 100 + 80);

    emoji.style.transform = `translate(${offset}px, -100px)`;
  });
  
  setTimeout(() => {
    emoji.style.transform += 'translateY(200vh)';
    emoji.style.opacity = '0';
  }, 200);
  
  setTimeout(() => {
    emoji.remove();
  }, 400);
}