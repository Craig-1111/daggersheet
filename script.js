
// Button For Armor-----------------------------------------------------
document.querySelectorAll('.armor-slot').forEach(slot => {
  slot.addEventListener('click', () => {
    const selected = slot.dataset.selected === 'true';

    slot.dataset.selected = !selected;
    slot.src = selected
      ? 'images/Armor-Slot-no-bkg.png'
      : 'images/Armor-Filled.png';
  });
});

