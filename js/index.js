let container = document.querySelector('#app');
let blocks = document.querySelector('#blocks');
let initialData = document.querySelector('.equation');
let items = document.querySelector('.elements');
//let TOP = blocks.offsetTop + container.offsetTop;
//let LEFT = blocks.offsetLeft;
let equation = "5 + x = 7";
let response = "x = 7 - 5";
let characters = equation.split(' ');
const BLOCKS_NUMBER = characters.length;
let draggedItem = null;
let frames = characters.length;
let width = 40;
let height = 40;
let totalCards = null;

initialData.innerHTML = equation;
blocks.style.gridTemplateColumns =  `repeat(${frames}, 1fr)`;
blocks.style.width = (characters.length * width) + 'px';
blocks.style.height = height + 'px';
let nodes = characters.map(char => [null]);

blocks.addEventListener('DOMNodeInserted', () => {
  let wereLoaded = blocks.childNodes.length === characters.length;
  if(wereLoaded){
    totalCards = Object.values(blocks.childNodes)
      .map(card => card.childNodes)
      .filter(card => card.length > 0)
      .length
    
    if(totalCards === characters.length){
      let string = '';
      Object.values(blocks.childNodes)
        .map(card => card.childNodes)
        .map(card => card[0].innerHTML)
        .forEach((char, index) => {
          if (index !== characters.length - 1) {
            string += char + ' ';
          } else {
            string += char;
          }
        })
      
      if(string === response) {
        setTimeout(()=> {
          alert('Congratulations!') 
        }, 500)
      }    

    }
  } 
})

items.addEventListener('dragover', (e) => {
  e.preventDefault();
})

items.addEventListener('drop', (e) => {
  e.preventDefault();

  items.append(draggedItem);
})

function getEqualPosition(chars) {
  let position = null;
  chars.forEach((char, index) => {
    if (char === '=') position = index;
  })

  return position;
}

let EQUAL_POSITION = getEqualPosition(characters);

function generateBlocks(totalBlocks, blocksContainer) {
  let i = 0;
  while (i < totalBlocks) {
    let block = document.createElement('div');
    block.classList.add('block');
    block.setAttribute('id', i);
    block.addEventListener('dragover', (e) => {
      e.preventDefault();
    })

    block.addEventListener('drop', (e) => {
      e.preventDefault();
    
      
     let hasChilds = block.hasChildNodes();

      if(!hasChilds) block.append(draggedItem);
    })

    blocksContainer.appendChild(block);
    i++;
  }
}

generateBlocks(BLOCKS_NUMBER, blocks);

let itemsGroup = ['-','+','*','/','='];
let digits = characters.filter(n => /[0-9]/.test(n) || /[a-z]/.test(n))

for (let i of digits) {
  itemsGroup.push(i);
}

itemsGroup.forEach((char, index) => {
  let card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = char;
  
  card.setAttribute('draggable', true);
  card.addEventListener('dragstart', (e) =>{
    draggedItem = card;
    setTimeout(() => {
      card.style.display = 'none';
    }, 0);

  })

  card.addEventListener('dragend', (e) =>{
    draggedItem = null;
    setTimeout(() => {
      card.style.display = 'flex';
    }, 0);
  })

  items.appendChild(card);
})

