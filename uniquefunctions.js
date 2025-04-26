function setupCustomSlider(
  sliderEl,
  linkedFunction,
  { max = 200, snapPoints = [0, 100, 200], snapThreshold = 10 } = {},
) {
  const fill = sliderEl.querySelector(".slider_fill");
  const handleZone = sliderEl.querySelector(".handle_zone");
  const addButton = sliderEl.querySelector(".slider_button[type='add']");
  const subButton = sliderEl.querySelector(".slider_button[type='subtract']");

  let isDragging = false;

  function getPointerX(e, rect) {
    return (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
  }

  function maybeSnap(val) {
    for (let snap of snapPoints) {
      if (Math.abs(val - snap) <= snapThreshold) return [snap, true];
    }
    return [val, false];
  }

  function updateSlider(e) {
    if (!isDragging) return;
    const rect = handleZone.getBoundingClientRect();
    let x = getPointerX(e, rect);
    x = Math.max(0, Math.min(x, rect.width));
    let value = (x / rect.width) * max;
    const [snappedVal, isSnapped] = maybeSnap(value);
    if (isSnapped) {
      fill.classList.add("snapped");
      setTimeout(() => {
        fill.classList.remove("snapped");
      }, 200);
    }
    updateSliderVisuals(Math.round(snappedVal));
  }

  function updateSliderVisuals(value) {
    const percent = (value / max) * 100;
    fill.style.width = `calc(${percent}% + 10px)`;
    fill.querySelector("p").textContent = value;
    linkedFunction(value);
  }

  handleZone.addEventListener("pointerdown", (e) => {
    isDragging = true;
    updateSlider(e);
    window.addEventListener("pointermove", updateSlider);
    window.addEventListener(
      "pointerup",
      () => {
        isDragging = false;
        window.removeEventListener("pointermove", updateSlider);
      },
      { once: true },
    );
  });
  addButton.addEventListener("click", () => {
    const currentValue = parseInt(fill.querySelector("p").textContent);
    const newValue = Math.min(currentValue + 1, snapPoints[2]);
    updateSliderVisuals(newValue);
  });
  subButton.addEventListener("click", () => {
    const currentValue = parseInt(fill.querySelector("p").textContent);
    const newValue = Math.max(currentValue - 1, snapPoints[0]);
    updateSliderVisuals(newValue);
  });

  updateSliderVisuals(snapPoints[1]); // Initial value
}
