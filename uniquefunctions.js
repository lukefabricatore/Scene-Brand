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

  handleZone.addEventListener(
    "pointerdown",
    (e) => {
      e.preventDefault();
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
    },
    { passive: false },
  );
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

//
//
//
//
//
//
// VERTICAL TYPER
//
//
//
//
//
//

const placeholderText = ["T", "y", "p", "e", " ", "H", "e", "r", "e"];
let vtText = "";
let cursorIndex = 0;
let selectionStart = null;
let selectionEnd = null;

function vtFocusHiddenInput() {
  if (isTouchDevice) {
    const input = document.getElementById("vt_hidden_input");
    input.focus();
  }
}

function isMetaKeyPressed(e) {
  return e.ctrlKey || e.metaKey;
}

function vtAddCharacterAtCursor(chars) {
  if (!chars) return;
  if (selectionStart !== null && selectionEnd !== null) {
    const min = Math.min(selectionStart, selectionEnd);
    const max = Math.max(selectionStart, selectionEnd);
    vtText = vtText.slice(0, min) + chars + vtText.slice(max);
    cursorIndex = min + chars.length;
    selectionStart = selectionEnd = null;
  } else {
    vtText = vtText.slice(0, cursorIndex) + chars + vtText.slice(cursorIndex);
    cursorIndex += chars.length;
  }
  if (vtText.length > 50) vtText = vtText.slice(0, 50);
  generateVertText();
}

function insertSpecialChar(char) {
  vtAddCharacterAtCursor(char);
}

function downloadVertText() {
  const svgElement = document.getElementById("svgTextbox").cloneNode(true);
  svgElement.querySelectorAll(".cursor").forEach((cursor) => cursor.remove());

  const serializer = new XMLSerializer();
  const source = serializer.serializeToString(svgElement);
  const blob = new Blob([source], {
    type: "image/svg+xml;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "vertical-text.svg";
  a.click();

  URL.revokeObjectURL(url);
}

function generateVertText() {
  const spacing =
    parseInt(document.getElementById("vt_spacing_input").value) || 0;
  const scaleInputValue =
    parseInt(document.getElementById("vt_scale_input").value) || 10;
  const scale = scaleInputValue * 0.01;

  const displayText = vtText.length > 0 ? vtText.split("") : placeholderText;

  let yOffset = 0;
  let svgContent = "";
  let highlightContent = "";
  let maxWidth = 0;
  const elements = [];

  for (let i = 0; i < displayText.length; i++) {
    const char = displayText[i];
    const nextChar = displayText[i + 1];
    const isLastChar = i === displayText.length - 1;

    if (!letterPaths[char] && char !== " ") continue;

    const pathData = letterPaths[char] || "";
    const letterHeight = letterHeights[char] || letterHeights.space || 720;
    const letterWidth = letterWidths[char] || 320;

    elements.push({
      pathData,
      yOffset,
      letterWidth,
      letterHeight,
      isPlaceholder: vtText.length === 0,
    });
    if (letterWidth > maxWidth) maxWidth = letterWidth;

    yOffset += letterHeight;
    if (!isLastChar) {
      if (!(char === "■" && nextChar === "■")) {
        yOffset += spacing * 80;
      }
    }
  }

  const totalHeight = yOffset || 720;

  if (
    selectionStart === 0 &&
    selectionEnd === vtText.length &&
    vtText.length > 0
  ) {
    highlightContent = `<rect class="highlight-all" x="0" y="0" width="${maxWidth}" height="${totalHeight}" />\n`;
  }

  for (let i = 0; i < elements.length; i++) {
    const { pathData, yOffset, letterWidth, isPlaceholder } = elements[i];
    const xOffset = (maxWidth - letterWidth) / 2;
    if (pathData) {
      svgContent += `<path d="${pathData}" class="${isPlaceholder ? "placeholder" : ""}" transform="translate(${xOffset},${yOffset})" />\n`;
    }
  }

  let cursorYOffset = 0;
  if (vtText.length > 0) {
    for (let i = 0; i < cursorIndex; i++) {
      const char = vtText[i];
      const nextChar = vtText[i + 1];
      const letterHeight = letterHeights[char] || letterHeights.space || 720;
      cursorYOffset += letterHeight;
      if (!(char === "■" && nextChar === "■")) {
        cursorYOffset += spacing * 80;
      }
    }
    cursorYOffset = Math.min(Math.max(0, cursorYOffset - 80), totalHeight - 80);
  } else {
    cursorYOffset = 0;
  }

  const svg = `
<svg id="svgTextbox" width="${maxWidth * scale}" height="${totalHeight * scale}" viewBox="0 0 ${maxWidth} ${totalHeight}" xmlns="http://www.w3.org/2000/svg">
<g transform="scale(1)">
${highlightContent}
${svgContent}
<rect x="${(maxWidth - 320) / 2}" y="${cursorYOffset}" width="320" height="80" class="cursor" />
</g>
</svg>
`;

  document.getElementById("svgContainer").innerHTML = svg;

  let clickableHTML = "";
  if (vtText.length > 0) {
    for (let i = 0; i <= elements.length; i++) {
      let top = 0;
      let height = 0;
      if (i === 0) {
        top = 0;
        height = elements[0] ? elements[0].letterHeight / 2 : 40;
      } else if (i === elements.length) {
        const prev = elements[i - 1];
        top = prev.yOffset + prev.letterHeight / 2;
        height = prev.letterHeight / 2;
      } else {
        const prev = elements[i - 1];
        const next = elements[i];
        top = prev.yOffset + prev.letterHeight / 2;
        height = next.yOffset + next.letterHeight / 2 - top;
      }
      clickableHTML += `<div style="position:absolute;left:0;top:${top * scale}px;width:${maxWidth * scale}px;height:${height * scale}px;pointer-events:all;" data-index="${i}"></div>`;
    }
  }

  const clickableContainer = document.getElementById("vt_clickable_container");

  clickableContainer.innerHTML = clickableHTML;
  clickableContainer.style.width = `${maxWidth * scale}px`;
  clickableContainer.style.height = `${totalHeight * scale}px`;

  clickableContainer.querySelectorAll("div").forEach((div) => {
    div.addEventListener("click", (e) => {
      cursorIndex = parseInt(e.target.getAttribute("data-index"));
      selectionStart = null;
      selectionEnd = null;
      generateVertText();
    });
  });
}

let finalizeSetupDesktop;

function vtSetupDesktop() {
  finalizeSetupDesktop = function (e) {
    if (e.key.length === 1 && !isMetaKeyPressed(e)) {
      vtAddCharacterAtCursor(e.key);
    } else if (e.key === "Backspace") {
      if (selectionStart !== null && selectionEnd !== null) {
        const min = Math.min(selectionStart, selectionEnd);
        const max = Math.max(selectionStart, selectionEnd);
        vtText = vtText.slice(0, min) + vtText.slice(max);
        cursorIndex = min;
        selectionStart = selectionEnd = null;
      } else if (cursorIndex > 0) {
        vtText = vtText.slice(0, cursorIndex - 1) + vtText.slice(cursorIndex);
        cursorIndex--;
      }
      generateVertText();
    } else if (e.key === "Delete") {
      if (cursorIndex < vtText.length) {
        vtText = vtText.slice(0, cursorIndex) + vtText.slice(cursorIndex + 1);
        generateVertText();
      }
    } else if (e.key === "ArrowUp") {
      if (cursorIndex > 0) {
        cursorIndex--;
        generateVertText();
      }
    } else if (e.key === "ArrowDown") {
      if (cursorIndex < vtText.length) {
        cursorIndex++;
        generateVertText();
      }
    } else if (isMetaKeyPressed(e) && e.key.toLowerCase() === "a") {
      e.preventDefault();
      selectionStart = 0;
      selectionEnd = vtText.length;
      generateVertText();
    } else if (isMetaKeyPressed(e) && e.key.toLowerCase() === "c") {
      if (selectionStart !== null && selectionEnd !== null) {
        const min = Math.min(selectionStart, selectionEnd);
        const max = Math.max(selectionStart, selectionEnd);
        navigator.clipboard.writeText(vtText.slice(min, max));
      }
    } else if (isMetaKeyPressed(e) && e.key.toLowerCase() === "v") {
      navigator.clipboard.readText().then((clipText) => {
        if (vtText.length + clipText.length > 50)
          clipText = clipText.slice(0, 50 - vtText.length);
        vtAddCharacterAtCursor(clipText);
      });
    }
  };
  document.addEventListener("keydown", finalizeSetupDesktop);
}

function vtClearAll() {
  vtText = "";
  cursorIndex = 0;
  selectionStart = null;
  selectionEnd = null;
  document.removeEventListener("keydown", finalizeSetupDesktop);
}

function vertSliderButtonHandler(e) {
  const button = e.currentTarget;
  const input = button.parentElement.querySelector("input");
  const value = parseInt(input.value);
  const max = parseInt(input.getAttribute("max"));
  if (button.getAttribute("type") === "subtract") {
    if (value > 1 && value <= max) {
      input.value = value - 1;
      generateVertText();
    }
  } else {
    if (value < 100 && value < max) {
      input.value = value + 1;
      generateVertText();
    }
  }
}

//
//
//
//
//
//
// JOB TITLES
//
//
//
//
//
//

function generateTitle() {
  const isFirstNostalgia = Math.random() < 0.5;

  const firstWord = isFirstNostalgia
    ? {
        title:
          wordCategories.nostalgiaStart[
            Math.floor(Math.random() * wordCategories.nostalgiaStart.length)
          ],
        type: "past",
      }
    : {
        title:
          wordCategories.futurismStart[
            Math.floor(Math.random() * wordCategories.futurismStart.length)
          ],
        type: "future",
      };

  const secondWord = isFirstNostalgia
    ? {
        title:
          wordCategories.futurismEnd[
            Math.floor(Math.random() * wordCategories.futurismEnd.length)
          ],
        type: "future",
      }
    : {
        title:
          wordCategories.nostalgiaEnd[
            Math.floor(Math.random() * wordCategories.nostalgiaEnd.length)
          ],
        type: "past",
      };

  return [firstWord, secondWord];
}

let jobTitles;

function replaceJobTitles(useExisting) {
  if (!useExisting) jobTitles = generateTitle();
  const panel = document.querySelector(".panel#jobs");
  const innerContainer = panel.querySelector(".open_content");
  if (panel.classList.contains("open")) {
    const title1 = innerContainer.querySelector("h1:nth-child(2)");
    const title2 = innerContainer.querySelector("h1:nth-child(3)");
    title1.textContent = jobTitles[0].title;
    title2.textContent = jobTitles[1].title;
    title1.setAttribute("type", jobTitles[0].type);
    title2.setAttribute("type", jobTitles[1].type);
  }
  const thumbContent = panel.querySelector(".thumb_content");
  const thumbTitle1 = thumbContent.querySelector("div:nth-child(1) h1");
  const thumbTitle2 = thumbContent.querySelector("div:nth-child(2) h1");
  thumbTitle1.classList = jobTitles[0].type;
  thumbTitle2.classList = jobTitles[1].type;
  thumbTitle1.querySelector("span.title").textContent = jobTitles[0].title;
  thumbTitle2.querySelector("span.title").textContent = jobTitles[1].title;
}
