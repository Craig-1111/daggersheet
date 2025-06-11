const diceArray = [];



//Saving Text inputs to LocalStorage
document.querySelectorAll('input').forEach(input => {
  const key = input.id;
  input.value = localStorage.getItem(key) || '';
  input.addEventListener('input', () => {
    localStorage.setItem(key, input.value);
  });
});


function savedImgBtnToggle(btnClass, filledImage, emptyImage) {
  document.querySelectorAll(btnClass).forEach(slot => {
    const key = slot.id || slot.dataset.id;

    // Load saved state from localStorage
    const savedState = localStorage.getItem(key);
    const isSelected = savedState === 'true';

    // Set visual state on page load
    if (savedState !== null) {
      slot.dataset.selected = savedState;
      slot.src = isSelected ? filledImage : emptyImage;
    }

     // Save updated state on click
    slot.addEventListener('click', () => {
      const selected = slot.dataset.selected === 'true';
      const nextState = !selected;

      slot.dataset.selected = nextState;
      slot.src = nextState ? filledImage : emptyImage;

      localStorage.setItem(key, nextState);
    });
  });
}

// HP / Stress Button-----------------------------------------------------
function hpStressSlots() {
  const stateImages = {
    blank: './images/Stress-Btn-Blank.png',
    empty: './images/Stress-Btn-Empty.png',
    filled: './images/Stress-Btn-Filled-Test-10px.png'
  };

  // Loop through every stress button on the page
  document.querySelectorAll('.hp-stress-btn').forEach(slot => {
    const key = slot.id || slot.dataset.id;

    // Load saved state if it exists
    const savedState = localStorage.getItem(key);
    if(savedState){
      setState(slot, savedState); // Apply saved visual state
    }
    // Left click: toggle between blank <-> filled
    slot.addEventListener('click', () => {
      const current = slot.dataset.state;
      const next = current === 'blank' ? 'filled' : 'blank';
      setState(slot, next);
      localStorage.setItem(key, next);
    });

    // Right click: switch to 'empty'
    slot.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      const current = slot.dataset.state;

      // Only allow switching to empty from blank or filled
      if (current === 'blank' || current === 'filled') {
        setState(slot, 'empty');
        localStorage.setItem(key, 'empty');
      }
    });
  });

  // Helper function to update button state and image
  function setState(slot, state) {
    slot.dataset.state = state;
    slot.src = stateImages[state];
  }
}

function setupMouseTooltip(className, tooltipText) {
  // Create tooltip element
  const tooltip = document.createElement('div');
  tooltip.style.position = 'fixed';
  tooltip.style.pointerEvents = 'none';
  tooltip.style.background = '#333';
  tooltip.style.color = 'white';
  tooltip.style.padding = '5px 8px';
  tooltip.style.borderRadius = '4px';
  tooltip.style.fontSize = '0.8rem';
  tooltip.style.opacity = '0';
  tooltip.style.transition = 'opacity 0.2s ease';
  tooltip.style.zIndex = '9999';
  tooltip.style.whiteSpace = 'nowrap';
  tooltip.textContent = tooltipText;
  document.body.appendChild(tooltip);

  // Move tooltip with mouse when visible
  document.addEventListener('mousemove', (e) => {
    if (tooltip.style.opacity === '1') {
      const offsetX = 15;
      const offsetY = 15;
      tooltip.style.left = e.clientX + offsetX + 'px';
      tooltip.style.top = e.clientY + offsetY + 'px';
    }
  });

  // Show/hide tooltip on hover of elements with className
  document.querySelectorAll(`.${className}`).forEach(elem => {
    elem.addEventListener('mouseenter', () => {
      tooltip.style.opacity = '1';
    });
    elem.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
    });
  });
}



// dice roller? 

// Put them into the array as an object 
// Object would have 
// name 
// sides
// hope? 
// GM adv
// Button to the array + display
// Roll initiates calculations 




function diceSides(diceType){
  if (diceType === "hope" || diceType === "fear"){
    return 12;
  }
  else if(diceType === "adv" || diceType === "dis"){
    return 6;
  }
  else{
    return Number(diceType.slice(1));
  }
}

function diceAmount(diceType){
  let diceObject = diceArray.find(die => die.type === diceType);

  if (!diceObject){
    return 1;
  }
  else{
    return diceObject.amount++;
  }
}

function diceHope(diceType){
  if (diceType === "hope"){
    return true
  }
  else{
    return false
  }
}

function diceFear(diceType){
  if (diceType === "fear"){
    return true
  }
  else{
    return false
  }
}

function createDiceObject(diceType){
  const diceObject = {
    type: diceType,
    sides: diceSides(diceType),
    amount: 1,
    hope: diceHope(diceType),
    fear: diceFear(diceType),
  }

  return diceObject;
}

function addDiceToArray(diceTypeRaw){
  const diceType = diceTypeRaw.slice(9);
  let diceObject = diceArray.find(die => die.type === diceType);

  if (!diceObject){
    diceArray.push(createDiceObject(diceType));
  }
  else{
    diceObject.amount++;
  }
}


function displayDiceArrayAsText (diceArray){
  // Add some sorting function to make it look nice here

  let textArray = [];

  for (let i = 0; i < diceArray.length; i++){
    textArray.push(`${diceArray[i].amount + diceArray[i].type}`);
  }

  return textArray.join(" + ");
}

document.querySelectorAll(".dice_button").forEach(button => {
  button.addEventListener("click", function() {
    const id = this.id;
    addDiceToArray(id);
    
    // prob should be a callback somewhere but like I dunno dude 
    document.getElementById("dice_array").textContent = displayDiceArrayAsText(diceArray);
  });
});

document.querySelector(".dice_roll").forEach(button => {
  button.addEventListener("click", function() {
    // put stuff here 
  });
});

function displayToConsole(text){
  console.log(text)
}








window.addEventListener('scroll', function () {
    const scrollPosition = window.scrollY;
    const targetDiv = document.getElementById('dice-roller__container');
    targetDiv.style.height = (window.innerHeight - 100) + Math.min(scrollPosition, 100) + 'px';
});


window.addEventListener('DOMContentLoaded', () => {
  // Run all setup functions in one go
  hpStressSlots();

  // Armor buttons
  savedImgBtnToggle('.armor-slot', './images/Armor-Filled-Test-8px.png', './images/Armor-Slot-no-bkg.png');

  // Trait buttons
  savedImgBtnToggle('.trait-selection-btn', './images/Trait-Filled-Button-Test-10px-2.png', './images/Trait-Empty-Button.png');

  // Hope buttons
  savedImgBtnToggle('.hope-slot', './images/Hope-Slot-Full-Test-12px-2.png', './images/Hope-Slot-Empty.png');

  // Proficiency buttons
  savedImgBtnToggle('.proficiency_btn', './images/Trait-Filled-Button-Test-10px-2.png', './images/Trait-Empty-Button.png');

  // Hover tooltop
  setupMouseTooltip('hp-stress-btn', 'Left click to remove');

  // Hand Left Toggle
  savedImgBtnToggle('.weapon_hand-left', './images/Active-Weapons-Title-Left-Hand-No-Bkg-15px.png', './images/Active-Weapons-Title-Left-Hand-No-Bkg.png');

  // Hand Right Toggle
  savedImgBtnToggle('.weapon_hand-right', './images/Active-Weapons-Title-Right-Hand-No-Bkg-15px.png', './images/Active-Weapons-Title-Right-Hand-No-Bkg.png');
});
