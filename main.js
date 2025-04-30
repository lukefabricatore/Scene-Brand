window.addEventListener("DOMContentLoaded", function () {
  assembleGrid();
  replaceJobTitles();
  setupVideoInitial();
  const capButton = document.querySelector("#cap_button");
  capButton.addEventListener("click", toggleCaptions);
  const captionsPref = getCookie("captions");
  console.log(captionsPref);
  if (captionsPref === false)
    document.body.setAttribute("data-captions", "false");
});

window.addEventListener("resize", function () {
  positionGridItems(true);
});
screen.orientation.addEventListener("change", function () {
  positionGridItems(true);
});

function toggleCaptions() {
  if (document.body.getAttribute("data-captions") === "true") {
    document.body.setAttribute("data-captions", "false");
    setCookie("captions", 0);
  } else {
    document.body.setAttribute("data-captions", "true");
    setCookie("captions", 1);
  }
}

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
  const screenAspect = window.innerWidth / window.innerHeight;
  if (window.innerWidth > 1150) return "desk";
  else if (screenAspect >= 1.2) return "desk";
  else return "mob";
}
function getOpenBreakpoint() {
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
  console.log("panelopen");
  const panelId = event.currentTarget.parentElement.id;
  const panel = document.querySelector(`.panel[id="${panelId}"]`);
  panel.classList.add("open");
  positionGridItems();

  const openData = openPanelData[panelId];
  const openContent = panel.querySelector(".open_content");
  const contentScroll = document.createElement("div");
  contentScroll.classList.add("main_content_scroll");
  openContent.appendChild(contentScroll);
  if (openData.html) contentScroll.innerHTML = openData.html;
  if (openData.action) openData.action();

  readDialogue(openData.dialogue);

  newItemChecks();
}

function newItemChecks() {
  addCorners();
  checkCopyButtons();
  checkDownloadButtons();
}

let resizeTimeout;

function positionGridItems(resize) {
  if (resize) {
    document.documentElement.classList.add("resizing");
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      document.documentElement.classList.remove("resizing");
    }, 500);
  }

  const panels = document.querySelectorAll(".panel");
  const gap = getGap();
  const segmentWidth = getSegment().width;
  const segmentHeight = getSegment().height;

  const bPoint = getBreakpoint();
  const openPanel = document.querySelector(".panel.open");

  panels.forEach((panel) => {
    const itemData = gridItems.find((item) => item.id === panel.id).bpoints[
      bPoint
    ];

    if (openPanel && panel === openPanel) {
      const openBPoint = getOpenBreakpoint();
      const { width, height } = getSize();
      const containerW = width - gap;
      const containerH = height - gap;

      const gridItemData = gridItems.find((item) => item.id === panel.id);
      let panelSize = JSON.parse(JSON.stringify(gridItemData.open[openBPoint]));
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

    if (resize) {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function () {
        document.documentElement.classList.remove("resizing");
      }, 500);
    }
  });
}

function resetGrid() {
  document.activeElement.blur();
  let timeoutTime = 10;

  if (isTouchDevice) {
    const openID = document.querySelector(".panel.open").id;
    if (
      openID === "metadata" ||
      openID === "analogie" ||
      openID === "instrument"
    )
      timeoutTime = 300;
  }
  const openPanel = document.querySelector(".panel.open");
  if (openPanel) openPanel.classList.add("closing");
  const panels = document.querySelectorAll(".panel");
  setTimeout(function () {
    panels.forEach((p) => {
      p.classList.remove("open", "shifted");
    });
    textBoxClose(true);
    positionGridItems();
    vtClearAll();
  }, timeoutTime);
  setTimeout(() => {
    panels.forEach((p) => {
      if (!p.classList.contains("open"))
        p.querySelector(".open_content").innerHTML = "";
    });
    const closingPanel = document.querySelector(".panel.closing");
    if (closingPanel) closingPanel.classList.remove("closing");
  }, timeoutTime + 500);
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
function setupDynamics() {
  let panel = document.querySelector(".panel#dynamics");
  panel.querySelector(".open_content").setAttribute("needs_corners", "true");
  setupCustomSlider(
    document.querySelector("#dynamics .custom_slider"),
    function (value) {
      document.querySelector("#dynamics h1").style.fontVariationSettings =
        `'wght' ${value}`;
      const svgButton = document.querySelector("#dynamics #runes_svg_button");
      svgButton.setAttribute(
        "download_button",
        `assets/downloads/dynamics/${value}.svg`,
      );
      svgButton.setAttribute("download_name", `scene_${value}.svg`);
    },
  );
}
function setupMetadata() {
  if (!isTouchDevice) {
    vtSetupDesktop();
  } else {
    document
      .getElementById("vt_hidden_input")
      .addEventListener("input", (e) => {
        const value = e.target.value;
        if (value.length > 0) {
          vtAddCharacterAtCursor(value);
          e.target.value = "";
        }
      });
  }
  const spacingInput = document.querySelector("#vt_spacing_input");
  const scaleInput = document.querySelector("#vt_scale_input");
  const hiddenInput = document.querySelector("#vt_hidden_input");

  spacingInput.addEventListener("input", generateVertText);
  scaleInput.addEventListener("input", generateVertText);
  spacingInput.addEventListener("input", generateVertText);
  scaleInput.addEventListener("input", generateVertText);

  hiddenInput.addEventListener("keydown", (e) => {
    if (e.key === "Backspace") {
      if (cursorIndex > 0) {
        vtText = vtText.slice(0, cursorIndex - 1) + vtText.slice(cursorIndex);
        cursorIndex--;
        generateVertText();
      }
      e.preventDefault();
    }
  });

  const sliderButtons = document.querySelectorAll(
    ".inline_button.slider_button",
  );
  for (const button of sliderButtons) {
    button.addEventListener("click", vertSliderButtonHandler);
  }
  document
    .querySelector(".panel#metadata button.specialty")
    .addEventListener("click", resetGrid);
  document
    .querySelectorAll(".panel#metadata .button_strip button")
    .forEach((button) => {
      button.addEventListener("click", insertSpecialChar);
    });
  generateVertText();
}

function setupJobs() {
  let panel = document.querySelector(".panel#jobs");
  panel.querySelector(".open_content").setAttribute("needs_corners", "true");
  panel
    .querySelector(".inline_button.emphasis")
    .addEventListener("click", function () {
      replaceJobTitles();
    });
  replaceJobTitles(true);
}

function setupRunes() {
  let panel = document.querySelector(".panel#runes");
  const content = panel.querySelector(".open_content");
  content.setAttribute("time", "future");
  const times = ["past", "present", "future"];
  panel
    .querySelector(".viewport_button")
    .addEventListener("click", function () {
      const currentTime = content.getAttribute("time");
      const nextTime =
        times[(times.indexOf(currentTime) - 1 + times.length) % times.length];
      content.setAttribute("time", nextTime);
    });
}

function setupVideo() {
  const panel = document.querySelector(".panel#video");
  const video = panel.querySelector("video");
  video.setAttribute("controls", "");
}

let videoAspected = false;

function setupVideoInitial() {
  const panel = document.querySelector(".panel#video");
  const video = panel.querySelector("video");
  const videoContainer = panel.querySelector("#main_video_container");
  const loopStart = 0; // seconds
  const loopEnd = 26; // seconds
  video.addEventListener("timeupdate", function () {
    if (video.currentTime >= loopEnd + 1 && panel.classList.contains("open")) {
      if (videoAspected) return;
      videoContainer.classList.add("aspected");
      videoAspected = true;
    } else if (
      video.currentTime >= loopEnd &&
      !panel.classList.contains("open")
    ) {
      video.currentTime = loopStart;
      video.play();
    } else {
      videoContainer.classList.remove("aspected");
      videoAspected = false;
    }
  });
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

// COOKIES

function setCookie(name, value) {
  document.cookie = `${name}=${value ? 1 : 0}; path=/`;
}
function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const [key, val] = cookie.trim().split("=");
    if (key === name) {
      return val === "1" ? true : false;
    }
  }
  return null;
}
