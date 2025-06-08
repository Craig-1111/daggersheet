//Saving to LocalStorage
document.querySelectorAll('input').forEach(input => {
  const key = input.id;
  input.value = localStorage.getItem(key) || '';
  input.addEventListener('input', () => {
    localStorage.setItem(key, input.value);
  });
});


// Button For Traits-----------------------------------------------------
document.querySelectorAll('.trait-selection-btn').forEach(slot => {
  slot.addEventListener('click', () => {
    const selected = slot.dataset.selected === 'true';

    slot.dataset.selected = !selected;
    slot.src = selected
      ? 'images/Trait-Empty-Button.png'
      : 'images/Trait-Filled-Button-Test-10px-2.png';
  });
});

// Button For Armor-----------------------------------------------------
document.querySelectorAll('.armor-slot').forEach(slot => {
  slot.addEventListener('click', () => {
    const selected = slot.dataset.selected === 'true';

    slot.dataset.selected = !selected;
    slot.src = selected
      ? 'images/Armor-Slot-no-bkg.png'
      : 'images/Armor-Filled-Test-8px.png';
  });
});

// Button For Hope-----------------------------------------------------
document.querySelectorAll('.hope-slot').forEach(slot => {
  slot.addEventListener('click', () => {
    const selected = slot.dataset.selected === 'true';

    slot.dataset.selected = !selected;
    slot.src = selected
      ? 'images/Hope-Slot-Empty.png'
      : 'images/Hope-Slot-Full-Test-12px-2.png';
  });
});



// HP / Stress Button-----------------------------------------------------
function hpStressSlots(){
  const stateImages = {
    blank: 'images/Stress-Btn-Blank.png',
    empty: 'images/Stress-Btn-Empty.png',
    filled: 'images/Stress-Btn-Filled-Test-10px.png'
  };

  document.querySelectorAll('.hp-stress-btn').forEach(slot => {
    slot.addEventListener('contextmenu', e => e.preventDefault());

    slot.addEventListener('click', () => {
      let state = slot.dataset.state;

      if(state==='blank'){
        slot.src = stateImages.filled;
        slot.dataset.state = 'filled';
      }
      else if(state==='filled'){
        slot.src = stateImages.blank;
        slot.dataset.state = 'blank';
      }
      else{
        slot.src = stateImages.blank;
        slot.dataset.state = 'blank';     
      }
    });

    slot.addEventListener('contextmenu', e => {
      let state = slot.dataset.state;
      
      if(state==='blank' || state==='filled'){
        slot.src = stateImages.empty;
        slot.dataset.state = 'empty';    
      }
    });
  });
}

// call it once DOM is ready
window.addEventListener('DOMContentLoaded', hpStressSlots);
