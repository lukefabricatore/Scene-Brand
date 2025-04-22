const textBoxCanvas = document.getElementById("textbox");
const textBoxCtx = textBoxCanvas.getContext("2d");

// Config
const textBoxNextButton = document.querySelector(".textbox_button.next");
const textBoxLetterWidth = 4;
const textBoxLetterHeight = 9;
const textBoxPathBaseHeight = 720;
const textBoxLetterSpacingUnits = 80;
const textBoxScale = textBoxLetterHeight / textBoxPathBaseHeight;
const textBoxSpacingPx = textBoxLetterSpacingUnits * textBoxScale;
const textBoxLineHeightPx = textBoxLetterHeight + 3;
const textBoxCanvasPadding = 7;
let textBoxCharDelay = 10;
let dialogueObject = {};
let lastTextBox = false;

function readDialogue(content) {
  if (content) {
    if (content.prog < content.content.length) content.prog = 0;
    dialogueObject = content;
    lastTextBox = false;
  }
  if (
    !dialogueObject ||
    !(dialogueObject.prog < dialogueObject.content.length)
  ) {
    textBoxClose();
    return;
  }
  textBoxCanvas.parentElement.setAttribute("active", "1");
  if (dialogueObject.prog === dialogueObject.content.length - 1)
    lastTextBox = true;
  textBoxDrawText(dialogueObject.content[dialogueObject.prog]);
  dialogueObject.prog++;
}

function textBoxNext(event) {
  const state = event.currentTarget.getAttribute("state");
  if (state === "fast") textBoxCharDelay = 0;
  else if (state === "next") readDialogue();
  else if (state === "close") {
    textBoxClose();
  }
}

function textBoxClose(keepDialogue) {
  textBoxCanvas.parentElement.setAttribute("active", "0");
  if (!keepDialogue) dialogueObject.prog = dialogueObject.content.length;
}

function textBoxGetLetterSize(char) {
  const rawW = letterWidths[char] || letterWidths.default || 320;
  const rawH =
    letterHeights[char] || letterHeights.default || textBoxPathBaseHeight;

  return {
    width: rawW * textBoxScale,
    height: rawH * textBoxScale,
    rawHeight: rawH,
  };
}

function textBoxDrawLetter(char, x, y) {
  const pathData = letterPaths[char];
  if (!pathData) return;

  const { rawHeight } = textBoxGetLetterSize(char);
  const baselineOffset = textBoxLetterHeight - rawHeight * textBoxScale;

  textBoxCtx.save();
  textBoxCtx.translate(x, y + baselineOffset);
  textBoxCtx.scale(textBoxScale, textBoxScale);
  textBoxCtx.fillStyle = "#FFF";
  textBoxCtx.fill(new Path2D(pathData));
  textBoxCtx.restore();
}

function textBoxDrawText(
  text,
  startX = textBoxCanvasPadding,
  startY = textBoxCanvasPadding + 16,
) {
  textBoxCtx.clearRect(0, 0, textBoxCanvas.width, textBoxCanvas.height);
  textBoxNextButton.setAttribute("state", "fast");
  textBoxCharDelay = 10;
  textBoxDrawNextButton("Fast");
  textBoxDrawTopBar("▤Scene");

  const words = text.split(/(\s+)/);
  let wordIndex = 0;
  let x = startX;
  let y = startY;

  function measureWord(word) {
    return word.split("").reduce((total, char) => {
      const { width } = textBoxGetLetterSize(char);
      return total + width + textBoxSpacingPx;
    }, 0);
  }

  function drawWord(word, callback) {
    let charIndex = 0;

    function drawNextChar() {
      if (charIndex >= word.length) {
        callback();
        return;
      }

      const char = word[charIndex];
      const { width } = textBoxGetLetterSize(char);

      if (!(char === " " && x === startX)) {
        textBoxDrawLetter(char, x, y);
        x += width + textBoxSpacingPx;
      }

      charIndex++;
      if (textBoxCharDelay === 0) {
        drawNextChar();
      } else {
        setTimeout(drawNextChar, textBoxCharDelay);
      }
    }

    drawNextChar();
  }

  function drawNextWord() {
    if (wordIndex >= words.length) {
      if (lastTextBox) {
        textBoxDrawNextButton("Done");
        textBoxNextButton.setAttribute("state", "close");
      } else {
        textBoxDrawNextButton("Next");
        textBoxNextButton.setAttribute("state", "next");
      }
      return;
    }

    const word = words[wordIndex];
    const wordWidth = measureWord(word);

    if (x + wordWidth > textBoxCanvas.width - textBoxCanvasPadding) {
      x = textBoxCanvasPadding;
      y += textBoxLineHeightPx;

      if (y + textBoxLetterHeight > textBoxCanvas.height - textBoxCanvasPadding)
        return;

      if (/^\s+$/.test(word)) {
        wordIndex++;
        drawNextWord();
        return;
      }
    }

    drawWord(word, () => {
      wordIndex++;
      drawNextWord();
    });
  }

  drawNextWord();
}

function textBoxDrawTopBar(title) {
  const barHeight = textBoxLetterHeight + 8;
  const barY = 0;
  const ctx = textBoxCtx;
  const canvas = textBoxCanvas;
  ctx.save();
  ctx.fillStyle = "#000";
  ctx.fillRect(0, barY, canvas.width, barHeight);
  ctx.fillStyle = "#fff";
  for (let i = 0; i < 5; i++) {
    ctx.fillRect(4, 4 + i * 2, canvas.width - 23, 1);
  }
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 1;
  ctx.strokeRect(0.5, 0.5, canvas.width - 1, barHeight - 1);
  ctx.strokeRect(0.5, 0.5, canvas.width - 1, canvas.height - 1);
  ctx.fillStyle = "#000";
  ctx.strokeRect(canvas.width - 15.5, 0.5, 15, 16);
  ctx.strokeRect(canvas.width - 13.5, 2.5, 11, 12);
  ctx.restore();

  textBoxDrawLetter("x", canvas.width - 10, 3);

  const textWidth = title.split("").reduce((sum, char) => {
    const { width } = textBoxGetLetterSize(char);
    return sum + width + textBoxSpacingPx;
  }, -textBoxSpacingPx);

  const textX = Math.floor((canvas.width - textWidth) / 2);
  const textY = Math.floor((barHeight - textBoxLetterHeight) / 2);

  ctx.clearRect(textX - 4, textY - 2, textWidth + 8, textBoxLetterHeight + 4);

  let drawX = textX;
  for (let i = 0; i < title.length; i++) {
    const char = title[i];
    textBoxDrawLetter(char, drawX, textY);
    const { width } = textBoxGetLetterSize(char);
    drawX += width + textBoxSpacingPx;
  }
}

function textBoxDrawNextButton(label = "→") {
  const ctx = textBoxCtx;
  const canvas = textBoxCanvas;

  ctx.clearRect(1, canvas.height - 20, canvas.width - 2, 19);

  const labelWidth = label.split("").reduce((sum, char) => {
    const { width } = textBoxGetLetterSize(char);
    return sum + width + textBoxSpacingPx;
  }, -textBoxSpacingPx);

  const labelHeight = textBoxLetterHeight;
  const padding = 4;
  const totalWidth = labelWidth + padding * 2;
  const totalHeight = labelHeight + padding * 2;

  const x = Math.floor(canvas.width - totalWidth - 2);
  const y = Math.floor(canvas.height - totalHeight - 2);

  ctx.save();
  ctx.rect(x, y, totalWidth, totalHeight);
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1;
  ctx.strokeRect(x - 0.5, y - 0.5, totalWidth, totalHeight);
  ctx.restore();

  ctx.save();
  ctx.setLineDash([1, 2]);
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(3, canvas.height - 19.5);
  ctx.lineTo(canvas.width - totalWidth - 5, canvas.height - 19.5);
  ctx.stroke();
  ctx.restore();

  let drawX = x + padding;
  const drawY = y + padding;

  for (let i = 0; i < label.length; i++) {
    const char = label[i];
    textBoxDrawLetter(char, drawX, drawY);
    const { width } = textBoxGetLetterSize(char);
    drawX += width + textBoxSpacingPx;
  }
}

(function makeTextBoxDraggable() {
  const container = document.getElementById("textbox_container");
  const moveTargets = document.querySelectorAll(".move_textbox");

  const viewportPadding = getGap(); // px from edges
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  function onPointerDown(e) {
    if (e.button !== 0) return;
    const target = e.target;

    // Must be dragging from a move_textbox AND container must be active
    if (
      ![...moveTargets].includes(target) ||
      container.getAttribute("active") !== "1"
    )
      return;

    isDragging = true;

    const rect = container.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);
  }

  function onPointerMove(e) {
    if (!isDragging) return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let newLeft = e.clientX - offsetX;
    let newTop = e.clientY - offsetY;

    // Clamp to viewport with padding
    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;

    newLeft = Math.max(
      viewportPadding,
      Math.min(newLeft, viewportWidth - containerWidth - viewportPadding),
    );
    newTop = Math.max(
      viewportPadding,
      Math.min(newTop, viewportHeight - containerHeight - viewportPadding),
    );

    container.style.left = `${newLeft}px`;
    container.style.top = `${newTop}px`;
  }

  function onPointerUp() {
    isDragging = false;
    document.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerup", onPointerUp);
  }

  // Attach pointerdown to all move handles
  moveTargets.forEach((el) => {
    el.style.cursor = "grab";
    el.addEventListener("pointerdown", onPointerDown);
  });

  window.addEventListener("resize", () => {
    const rect = container.getBoundingClientRect();
    const containerWidth = rect.width;
    const containerHeight = rect.height;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let newLeft = parseFloat(container.style.left || 0);
    let newTop = parseFloat(container.style.top || 0);

    // Clamp to viewport with padding
    newLeft = Math.max(
      viewportPadding,
      Math.min(newLeft, viewportWidth - containerWidth - viewportPadding),
    );
    newTop = Math.max(
      viewportPadding,
      Math.min(newTop, viewportHeight - containerHeight - viewportPadding),
    );

    container.style.left = `${newLeft}px`;
    container.style.top = `${newTop}px`;
  });

  if (!container.style.left) container.style.left = `${viewportPadding}px`;
  if (!container.style.top)
    container.style.top = `${window.innerHeight - viewportPadding - container.getBoundingClientRect().height}px`;
})();

textBoxNextButton.addEventListener("click", textBoxNext, false);
document
  .querySelector(".textbox_button.exit")
  .addEventListener("click", function () {
    textBoxClose();
  });
