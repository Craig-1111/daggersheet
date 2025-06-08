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



window.addEventListener('DOMContentLoaded', () => {
  // Run all setup functions in one go
  hpStressSlots();

  // Armor buttons
  savedImgBtnToggle('.armor-slot', './images/Armor-Filled-Test-8px.png', './images/Armor-Slot-no-bkg.png');

  // Trait buttons
  savedImgBtnToggle('.trait-selection-btn', './images/Trait-Filled-Button-Test-10px-2.png', 'images/Trait-Empty-Button.png');

  // Hope buttons
  savedImgBtnToggle('.hope-slot', './images/Hope-Slot-Full-Test-12px-2.png', './images/Hope-Slot-Empty.png');

  // Proficiency buttons
  savedImgBtnToggle('.proficiency-slot', './images/Prof-Filled.png', './images/Prof-Empty.png');
});
