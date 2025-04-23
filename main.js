window.addEventListener("resize", function () {
  positionGridItems(true);
});

function assembleGrid() {
  const grid = document.querySelector("#panels");
  checkPageAspect(grid);
  for (let item of gridItems) {
    let container = document.createElement("div");
    container.setAttribute("id", item.id);
    container.classList.add("panel");
    const openBtn = document.createElement("button");
    openBtn.classList.add("open_btn");
    openBtn.addEventListener("click", openPanel, false);
    const exitBtn = document.createElement("button");
    exitBtn.classList.add("exit_btn", "chip");
    const exitBtnH3 = document.createElement("h3");
    exitBtnH3.textContent = "X";
    exitBtn.appendChild(exitBtnH3);
    exitBtn.addEventListener("click", resetGrid);
    container.appendChild(openBtn);
    container.appendChild(exitBtn);
    const backgroundLayer = document.createElement("div");
    backgroundLayer.classList.add("background_layer");
    backgroundLayer.setAttribute("partofthumb", "true");
    container.appendChild(backgroundLayer);
    const openContent = document.createElement("div");
    openContent.classList.add("open_content");
    container.appendChild(openContent);
    populateThumbnail(container, item);
    grid.appendChild(container);
  }
  positionGridItems();
}

function checkPageAspect(grid) {
  const aspectRatio = window.innerWidth / window.innerHeight;
  if (aspectRatio > 2) {
    document.body.classList.add("landscape");
  } else {
    document.body.classList.add("portrait");
  }
}

function populateThumbnail(container, item) {
  const tooltip = document.createElement("div");
  tooltip.setAttribute("partofthumb", "true");
  tooltip.classList.add("chip", "tooltip");
  const tooltipH3 = document.createElement("h3");
  tooltipH3.textContent = item.pretty.toUpperCase();
  tooltip.appendChild(tooltipH3);
  container.appendChild(tooltip);

  if (!item.content) return;
  if (item.content.video) {
    const video = document.createElement("video");
    video.setAttribute("partofthumb", "true");
    video.setAttribute("src", `assets/thumbnails/${item.content.video.src}`);
    video.setAttribute("playsinline", "");
    video.classList.add("thumb_video");
    video.muted = true;
    video.autoplay = true;
    video.loop = true;
    // video.pause();
    container.appendChild(video);
  }
  if (item.content.html) {
    const html = document.createElement("div");
    html.setAttribute("partofthumb", "true");
    html.classList.add("thumb_content");
    html.innerHTML = item.content.html;
    container.appendChild(html);
  }
  if (item.content.action)
    setTimeout(function () {
      item.content.action();
    }, 20);
  if (item.content.background)
    container.querySelector(".background_layer").style.background =
      item.content.background;
  else container.style.background = "transparent";
}

function getGap() {
  if (window.innerWidth > 850) return 16;
  else if (window.innerWidth > 600) return 10;
  else return 5;
}
function getBreakpoint() {
  if (window.innerWidth > 1150) return "desk";
  else return "mob";
}
function getSize() {
  const grid = document.querySelector("#panels");
  const width = grid.offsetWidth;
  const height = grid.offsetHeight;
  return {
    width,
    height,
  };
}
function getSegment() {
  const { width, height } = getSize();
  const gap = getGap();
  const segmentWidth = (width - gap * 10) / 10;
  const segmentHeight = (height - gap * 10) / 10;
  return {
    width: segmentWidth,
    height: segmentHeight,
  };
}

function openPanel(event) {
  const panelId = event.currentTarget.parentElement.id;
  const panel = document.querySelector(`.panel[id="${panelId}"]`);
  panel.classList.add("open");
  positionGridItems();

  const openData = openPanelData[panelId];
  const openContent = panel.querySelector(".open_content");
  if (openData.html) openContent.innerHTML = openData.html;
  if (openData.action) openData.action();

  readDialogue(openData.dialogue);

  newItemChecks();
}

function newItemChecks() {
  addCorners();
  checkCopyButtons();
  checkDownloadButtons();
}

function positionGridItems(resize) {
  const panels = document.querySelectorAll(".panel");
  const gap = getGap();
  const segmentWidth = getSegment().width;
  const segmentHeight = getSegment().height;

  const bPoint = getBreakpoint();
  const openPanel = document.querySelector(".panel.open");

  panels.forEach((panel) => {
    if (resize) panel.style.transition = "none";
    const itemData = gridItems.find((item) => item.id === panel.id).bpoints[
      bPoint
    ];

    if (openPanel && panel === openPanel) {
      const { width, height } = getSize();
      const containerW = width - gap;
      const containerH = height - gap;

      let panelSize = JSON.parse(
        JSON.stringify(
          gridItems.find((item) => item.id === panel.id).open[bPoint],
        ),
      );
      panelSize[0] =
        panelSize[0] === "100%" || panelSize[0] > containerW
          ? containerW
          : panelSize[0];
      panelSize[1] =
        panelSize[1] === "100%" || panelSize[1] > containerH
          ? containerH
          : panelSize[1];
      setTimeout(function () {
        panel.style.left = `${(containerW - panelSize[0]) / 2}px`;
        panel.style.top = `${(containerH - panelSize[1]) / 2}px`;
        panel.style.width = `${panelSize[0]}px`;
        panel.style.height = `${panelSize[1]}px`;
      }, 150);
    } else if (openPanel) {
      // Move non-open panels out of view
      panel.classList.add("shifted");
      let moveCoords = itemData.endPos;
      const exception = itemData.exception;
      if (exception && exception.id === openPanel.id) {
        moveCoords = exception.pos;
      }
      panel.style.left = `${moveCoords[0] * (segmentWidth + gap)}px`;
      panel.style.top = `${moveCoords[1] * (segmentHeight + gap)}px`;
      panel.classList.remove("open");
    } else {
      // Position panels in their default grid layout
      panel.style.width = `${segmentWidth * itemData.size[0] + gap * (itemData.size[0] - 1)}px`;
      panel.style.height = `${segmentHeight * itemData.size[1] + gap * (itemData.size[1] - 1)}px`;
      panel.style.left = `${itemData.pos[0] * (segmentWidth + gap)}px`;
      panel.style.top = `${itemData.pos[1] * (segmentHeight + gap)}px`;
    }

    if (resize)
      setTimeout(function () {
        panel.style.transition = "";
      }, 200);
  });
}

function resetGrid() {
  const panels = document.querySelectorAll(".panel");
  panels.forEach((p) => {
    p.classList.remove("open", "shifted");
  });
  textBoxClose(true);
  positionGridItems();
  setTimeout(() => {
    panels.forEach((p) => {
      p.querySelector(".open_content").innerHTML = "";
    });
  }, 500);
}

function addCorners() {
  const cornerItems = document.querySelectorAll("[needs_corners='true']");
  cornerItems.forEach((item) => {
    let container = item.querySelector(".corner_container");
    if (container) return;
    container = document.createElement("div");
    container.classList.add("corner_container");
    item.appendChild(container);
    container.innerHTML = `
      <div class="corner top_left"></div>
      <div class="corner top_right"></div>
      <div class="corner bottom_left"></div>
      <div class="corner bottom_right"></div>
    `;
  });
}
function checkCopyButtons() {
  const copyButtons = document.querySelectorAll("[copy_button='true']");
  copyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const text = String(button.querySelector("span.copy_content").innerHTML);
      navigator.clipboard.writeText(text);
    });
  });
}
function checkDownloadButtons() {
  const downloadButtons = document.querySelectorAll("[download_button]");
  downloadButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const url = button.getAttribute("download_button");
      const filename = button.getAttribute("download_name");
      try {
        // Fetch the file as a blob
        const response = await fetch(url, { mode: "cors" });
        const blob = await response.blob();
        // Create a temporary blob URL
        const blobUrl = URL.createObjectURL(blob);
        // Trigger download
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = filename || "download";
        document.body.appendChild(a);
        a.click();
        a.remove();
        // Revoke the blob URL
        URL.revokeObjectURL(blobUrl);
      } catch (err) {
        console.error("Download failed:", err);
      }
    });
  });
}

// INDIVIDUAL SETUPS

function setupInstrument() {
  let panel = document.querySelector(".panel#instrument");
  panel.querySelector(".open_content").setAttribute("needs_corners", "true");
  panel
    .querySelector(".inline_button.tab_button")
    .addEventListener("click", () => {
      const nextTab = getTabInfo(event.currentTarget);
      panel.querySelector("textarea").setAttribute("version", nextTab);
    });
}
function setupAnalogie() {
  let panel = document.querySelector(".panel#analogie");
  panel.querySelector(".open_content").setAttribute("needs_corners", "true");
  panel.querySelector("textarea").addEventListener("input", () => {
    let text = event.currentTarget.value;
    text = replaceSceneSprouts(text);
    event.currentTarget.value = text;
  });
  const stripButtons = panel
    .querySelector(".button_strip")
    .querySelectorAll("button");
  function replaceSceneSprouts(text) {
    text = text.replace(/▤(?=▢)/g, "▥");
    text = text.replace(/▥(?=[^▢])/g, "▤");
    return text;
  }
  for (const button of stripButtons) {
    button.addEventListener("click", (event) => {
      const content = event.currentTarget.getAttribute("char");
      const textarea = panel.querySelector("textarea");
      let start = textarea.selectionStart;
      let end = textarea.selectionEnd;
      let text = textarea.value;
      text = text.slice(0, start) + content + text.slice(end);
      start += content.length;
      text = replaceSceneSprouts(text);
      textarea.value = text;
      textarea.selectionStart = textarea.selectionEnd = start;
      textarea.focus();
    });
  }
}

// TAB BUTTONS

function getTabInfo(container) {
  const activeTab = container.querySelector(".tab.active");
  let nextTab = activeTab.nextElementSibling;
  if (!nextTab)
    nextTab = container.querySelector(".button_tabs .tab:nth-child(1)");
  activeTab.classList.remove("active");
  nextTab.classList.add("active");
  return nextTab.getAttribute("tab");
}

assembleGrid();
