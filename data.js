const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

const gridItems = [
  {
    id: "metadata",
    pretty: "Metadata",
    bpoints: {
      desk: { size: [1, 10], pos: [0, 0], endPos: [-5, 0] },
      mob: { size: [2, 4], pos: [0, 3], endPos: [-7, 3] },
    },
    open: {
      desk: [60, 352],
      mob: [60, 352],
    },
    content: {
      background: "linear-gradient(to top, #191919, var(--energyburst))",
      html: `
      <img src="assets/thumbnails/metadata_arrow.svg"/>
      <img src="assets/thumbnails/metadata_action.svg"/>
      `,
    },
  },
  {
    id: "backstory",
    pretty: "Backstory",
    bpoints: {
      desk: { size: [2, 4], pos: [1, 0], endPos: [1, -7] },
      mob: { size: [5, 2], pos: [0, 0], endPos: [0, -6] },
    },
    open: {
      desk: [650, 300],
      mob: [650, 300],
    },
    content: {
      background: "white",
      video: {
        src: "backstory.mp4",
        poster: "https://example.com/poster.jpg",
      },
    },
  },
  {
    id: "instrument",
    pretty: "Instrument",
    bpoints: {
      desk: {
        size: [2, 2],
        pos: [1, 4],
        endPos: [1, -4],
        exception: { id: "backstory", pos: [1, 12] },
      },
      mob: {
        size: [2, 1],
        pos: [0, 2],
        endPos: [-7, 2],
      },
    },
    open: {
      desk: [650, 345],
      mob: [420, 280],
    },
    content: {
      html: `
      <div id='instrument_char_container'>
        <p>Aa<span>|</span></p>
      </div>`,
      background: "var(--energyburst)",
    },
  },
  {
    id: "analogie",
    pretty: "Analogie",
    bpoints: {
      desk: { size: [2, 6], pos: [3, 0], endPos: [3, -7] },
      mob: { size: [5, 3], pos: [5, 0], endPos: [15, 0] },
    },
    open: {
      desk: [650, 410],
      mob: [420, 350],
    },
    content: {
      background: "#2B3400",
      html: "<div id='analogie_char_container'></div>",
      action: function () {
        console.log("Analogie action triggered");
        const charString = "abcdefghijklmnopqrstuvwxyz1234";
        for (let i = 0; i < charString.length; i++) {
          console.log(charString[i], i);
          const letterBox = document.createElement("div");
          letterBox.innerHTML = `<p>${charString[i]}</p>`;
          document
            .getElementById("analogie_char_container")
            .appendChild(letterBox);
        }
      },
    },
  },
  {
    id: "dynamics",
    pretty: "Dynamics",
    bpoints: {
      desk: { size: [4, 4], pos: [1, 6], endPos: [1, 14] },
      mob: { size: [8, 2], pos: [2, 3], endPos: [12, 3] },
    },
    open: {
      desk: [500, 370],
      mob: [400, 300],
    },
    content: {
      video: {
        src: "dynamics.mp4",
        poster: "https://example.com/poster.jpg",
      },
    },
  },
  {
    id: "runes",
    pretty: "Runes",
    bpoints: {
      desk: { size: [3, 5], pos: [5, 0], endPos: [5, -7] },
      mob: {
        size: [4, 2],
        pos: [2, 5],
        endPos: [12, 5],
        exception: { id: "color", pos: [-5, 5] },
      },
    },
    open: {
      desk: [400, 500],
      mob: [400, 500],
    },
    content: {
      background: "black",
      video: {
        src: "runes.mp4",
        poster: "https://example.com/poster.jpg",
      },
      html: `
      <div id='runes_blur'></div>
      <div id='runes_container'>
        <div class='action_bar'></div>
        <div class='action_identifier'><p>FIG. 001</p></div>
      </div>`,
    },
  },
  {
    id: "color",
    pretty: "Color",
    bpoints: {
      desk: { size: [2, 3], pos: [8, 0], endPos: [8, -7] },
      mob: {
        size: [4, 2],
        pos: [6, 5],
        endPos: [16, 5],
      },
    },
    open: {
      desk: [650, 500],
      mob: [650, 500],
    },
    content: {
      html: `
      <h1>Energy Burst</h1>
      <p>ff9d00</p>
      `,
      background: "linear-gradient(to top, var(--energyburst), white)",
    },
  },
  {
    id: "jobs",
    pretty: "Job Titles",
    bpoints: {
      desk: {
        size: [2, 2],
        pos: [8, 3],
        endPos: [8, -4],
        exception: { id: "color", pos: [8, 12] },
      },
      mob: {
        size: [3, 1],
        pos: [2, 2],
        endPos: [-5, 2],
        exception: { id: "instrument", pos: [12, 2] },
      },
    },
    open: {
      desk: [650, 370],
      mob: [500, 310],
    },
    content: {
      background: "#1F1F1F",
      html: `
      <div>
        <h1 class="past"><svg class="arrow_icon" viewBox="0 0 87 47" xmlns="http://www.w3.org/2000/svg">
        <path d="M87 23.5529L63.6245 47V27.5482H2.6226e-06V19.4518H63.6245V0L87 23.5529Z"/>
        </svg><span class="title">Pixel</span></h1>
      </div>
      <div>
        <h1 class="future"><svg class="arrow_icon" viewBox="0 0 87 47" xmlns="http://www.w3.org/2000/svg">
        <path d="M87 23.5529L63.6245 47V27.5482H2.6226e-06V19.4518H63.6245V0L87 23.5529Z"/>
        </svg><span class="title">Alchemist</span></h1>
      </div>
      `,
    },
  },
  {
    id: "video",
    pretty: "Brand Video",
    bpoints: {
      desk: { size: [5, 5], pos: [5, 5], endPos: [5, 15] },
      mob: { size: [10, 3], pos: [0, 7], endPos: [-12, 7] },
    },
    open: {
      desk: ["100%", "100%"],
      mob: ["100%", "100%"],
    },
    content: {
      html: `
      <div id="main_video_container">
        <div class="video_inner">
          <video playsinline autoplay loop muted id="main_video" src="assets/thumbnails/brandvideo.mp4" poster="https://example.com/poster.jpg"></video>
        </div>
      </div>
      `,
    },
  },
];

const openPanelData = {
  metadata: {
    dialogue: {
      prog: 0,
      content: [
        "Hi there, this is just a test.",
        "What's up.",
        "This is so cool if it works.",
        "Honestly, huge if true",
      ],
    },
    html: `
      <div class="all_content">
        <div class='right_content'>
          <div class='vert_slider'>
            <p class='no_highlight'>SIZE</p>
            <button class="inline_button slider_button" type="add"><div class="sceneadd"></div></button>
            <input id="vt_scale_input" type="number" value="5" max="20"/>
            <button class="inline_button slider_button" type="subtract"><div class="scenesubtract"></div></button>
          </div>
          <div class='vert_slider'>
            <p class='no_highlight'>KERN</p>
            <button class="inline_button slider_button" type="add"><div class="sceneadd"></div></button>
            <input id="vt_spacing_input" type="number" value="2" max="10"/>
            <button class="inline_button slider_button" type="subtract"><div class="scenesubtract"></div></button>
          </div>
          <button class="inline_button emphasis square"onclick="downloadVertText()"><div class="scenedownload"></div></button>
        </div>
        <div class="left_content">
            <div class="button_strip">
              <button onclick="insertSpecialChar('■')"><div class="sceneaction"></div></button>
              <button onclick="insertSpecialChar('▤')"><div class="scenesprout"></div></button>
              <button onclick="insertSpecialChar('▢')"><div class="sceneloop"></div></button>
            </div>

            <!--<button onclick="vtClearAll()">Clear All</button>-->
        </div>
        <input id="vt_hidden_input" type="text" />
        <div class="vt_canvas_wrapper">
            <div class='scroller' onclick="vtFocusHiddenInput()">
              <div id="svgContainer"></div>
              <div id="vt_clickable_container"></div>
            </div>
            <button class="exit_btn chip specialty"><h3>X</h3></button>
        </div>
      </div>
    `,
    action: function () {
      setupMetadata();
    },
  },
  backstory: {
    dialogue: {
      prog: 0,
      content: [],
    },
  },
  instrument: {
    dialogue: {
      prog: 0,
      content: [
        "This is the instrument.",
        "It's a long story.",
        "But it's important.",
        "So we'll tell it.",
      ],
    },
    html: `
      <p class="caption">START TYPING BELOW</p>
      <textarea placeholder="Hello World. This is Instrument"></textarea>
      <span class="inline_button_container">
        <button class='inline_button tab_button'>
          <p>SHIFT</p>
          <div class="button_tabs">
            <div class="tab active" tab="serif"><div class="sceneserif"></div>
            </div><div class="tab" tab="sans"><div class="scenesans"></div></div>
          </div>
        </button><button class='inline_button emphasis'>
          <p>GET FONT</p>
          <a href="https://fonts.google.com/?query=instrument" target="_blank"></a>
        </button>
      </span>
    `,
    action: function () {
      setupInstrument();
    },
  },
  analogie: {
    dialogue: {
      prog: 0,
      content: [
        "This is the analogie.",
        "It's a long story.",
        "But it's important.",
        "So we'll tell it.",
      ],
    },
    html: `
      <p class="caption">START TYPING BELOW</p>
      <textarea placeholder="Analogie is your best friend."></textarea>
      <div class="button_strip">
        <button char="▤"><div class="scenesprout"></div></button>
        <button char="▢"><div class="sceneloop"></div></button>
        <button char="▣"><div class="sceneportal"></div></button>
        <button char="□"><div class="sceneflame"></div></button>
        <button char="■"><div class="sceneaction"></div></button>
        <button char="←"><div class="scenearrow-left"></div></button>
        <button char="→"><div class="scenearrow-right"></div></button>
      </div>
      <button class='inline_button'>
        <p>GET TYPE SHEET</p>
        <a href="assets/global/analogie.ttf" download></a>
      </button><button class='inline_button emphasis'>
        <p>GET TTF</p>
        <a href="assets/global/analogie.ttf" download></a>
      </button>
    `,
    action: function () {
      setupAnalogie();
    },
  },
  dynamics: {
    dialogue: {
      prog: 0,
      content: [
        "This is the dynamics.",
        "It's a long story.",
        "But it's important.",
        "So we'll tell it.",
      ],
    },
    html: `
      <div id="dynamic_logo_container">
          <div class="guide_lines">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
          </div>
        <h1 class="no_highlight">A</h1>
      </div>
      <div class="custom_slider no_highlight">
          <div class="track"></div>
          <button class="inline_button slider_button" type="subtract"><div class="scenesubtract"></div></button>
          <div class="slider_fill_container">
            <div class="slider_fill"><p>100</p></div>
            <div class="notches">
                <div class="notch"></div>
                <div class="notch"></div>
                <div class="notch"></div>
            </div>
            <div class="handle_zone"></div>
          </div>
          <button class="inline_button slider_button" type="add"><div class="sceneadd"></div></button>
      </div>
      <span class="inline_button_container">
        <button download_button='assets/downloads/dynamics/100.svg' download_name='scene_100.svg' class='inline_button emphasis white' id='runes_svg_button'>
          <p>GET SVG</p>
        </button><button class='inline_button'>
          <p>GET PNG</p>
        </button><button class='inline_button'>
          <p>GET TTF</p>
          <a href="assets/global/scene_runes.ttf" download></a>
        </button>
      </span>
    `,
    action: function () {
      setupDynamics();
    },
  },
  runes: {
    dialogue: {
      prog: 0,
      content: [
        "This is the runes.",
        "It's a long story.",
        "But it's important.",
        "So we'll tell it.",
      ],
    },
    html: `
      <div class='rune_container sprout'>
        <div class='rune_centerer'>
          <video playsinline src="assets/downloads/runes/sprout.mp4" autoplay loop muted></video>
          <svg viewBox="0 0 28 36" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M19.3422 19.0815C23.9318 16.8112 25.3372 15.1927 25.3372 13.035C25.3372 11.6748 24.1671 10.6664 22.809 10.6664C18.4067 10.5398 12.2705 16.5154 6.46327 16.5154C3.41915 16.5248 0 13.9265 0 9.79885C0 6.58582 1.8272 4.70473 3.32585 3.74786C7.11929 1.32753 8.24254 0 9.36653 0C10.4437 0 11.4283 0.71289 11.4283 2.03562C11.4283 3.62103 8.00911 4.3997 4.96499 6.06015C3.51318 6.86223 1.82757 8.29774 1.82757 10.371C1.82757 11.1684 2.38846 13.5604 4.68326 13.5604C8.61721 13.5604 14.5185 7.71604 20.7472 7.71604C25.3368 7.71604 27.2581 12.2661 27.2581 14.5645C27.2581 19.9352 22.4343 20.62 16.0182 24.6304C14.3791 25.6623 13.1607 26.3518 13.1607 28.0123V29.5129C13.1607 29.9866 12.8325 30.1652 12.5515 30.1652C12.2237 30.1652 11.9423 29.9116 11.9423 29.5129V27.4351C11.9423 24.6302 13.8628 21.802 19.3422 19.0815ZM12.5515 31.9708C13.5818 31.9708 14.4248 32.8201 14.4248 33.8567C14.4248 34.898 13.5818 35.7421 12.5515 35.7421C11.5212 35.7421 10.6782 34.898 10.6782 33.8567C10.6782 32.8201 11.5212 31.9708 12.5515 31.9708Z" fill="white"/>
          </svg>
          <div class="scenesprout"></div>
        </div>
        <a href="assets/downloads/runes/sprout.mp4" download></a>
      </div>
      <div class='rune_container loop'>
        <div class='rune_centerer'>
          <video playsinline src="assets/downloads/runes/loop.mp4" autoplay loop muted></video>
          <svg viewBox="0 0 37 29" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.87107 11.3416C10.9014 11.3416 11.7444 12.1857 11.7444 13.227C11.7444 14.2683 10.9014 15.1128 9.87107 15.1128C8.79392 15.1128 7.95203 14.2683 7.95203 13.227C7.95203 12.1857 8.79392 11.3416 9.87107 11.3416ZM24.2026 7.24195C23.9684 8.19413 23.7343 9.97657 22.0951 9.97657C20.456 9.97657 20.082 8.89289 20.0352 7.93133C20.0352 5.80651 22.517 0 28.5584 0C32.1645 0 36.1925 2.95028 36.1925 8.60239C36.1925 13.3586 32.7261 17.2657 28.4175 17.2657C25.3734 17.2657 22.3758 15.4176 20.3151 13.532C15.304 8.99628 13.1973 1.73514 8.65452 1.73514C5.37624 1.73514 4.06456 8.2222 4.06456 14.5544C4.06456 22.5518 6.78158 25.2914 9.02955 25.2914C11.9332 25.2914 14.3202 21.2715 14.5543 20.6242C14.648 20.4319 14.8364 20.0704 15.2111 20.108C15.7731 20.1689 15.8664 20.7132 15.7727 21.0791C14.6487 26.248 11.6042 28.5322 8.60696 28.5322C3.03387 28.5322 0.131348 21.8813 0.131348 15.4458C0.131348 9.01039 3.17437 0 8.60696 0C14.0395 0 18.0214 8.85537 21.206 12.1528C23.1262 14.151 26.122 15.3096 28.1358 15.2017C31.6482 15.2017 32.7258 12.153 32.7258 8.53185C32.7258 6.71192 32.1173 2.04479 28.4175 2.04479C26.6379 2.04479 25.0456 3.47075 24.2026 7.24195Z" fill="white"/>
          </svg>
          <div class="sceneloop"></div>
        </div>
        <a href="assets/downloads/runes/loop.mp4" download></a>
      </div>
      <div class='rune_container portal'>
        <div class='rune_centerer'>
          <video playsinline src="assets/downloads/runes/portal.mp4?1" autoplay loop muted></video>
          <svg viewBox="0 0 58 29" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M57.6546 25.3006C57.9356 25.9525 57.0461 26.4545 56.8588 26.5483C44.4013 32.4256 37.7039 23.5697 35.8774 18.851C34.4256 14.9298 34.0517 9.69498 34.0517 6.52417C34.0517 4.79804 33.1615 1.60413 28.9934 1.60413C25.9493 1.60413 23.9827 3.97251 23.9827 6.52417C23.9827 10.0468 23.8407 14.7843 22.7167 18.851C21.6864 22.3549 17.5651 28.5276 11.0086 28.5276C2.62552 28.5276 0.00288544 19.6862 0.00288544 18.4525C-0.0439472 17.5285 0.472313 16.1915 2.06462 16.1915C3.7506 16.1915 4.12489 17.6457 4.26539 18.3774C4.82738 21.4263 6.1848 26.2295 11.0086 26.2295C18.8764 26.2295 20.3293 15.1876 20.3293 8.20342C20.3293 5.00447 22.952 0 28.9934 0C35.3626 0 37.7983 5.27183 37.7983 8.20342C37.7983 11.1397 37.4225 14.5641 39.249 18.4525C41.8716 23.978 47.6796 28.5746 56.1563 25.1411C56.6715 24.9207 57.3268 24.6345 57.6546 25.3006Z" fill="white"/>
          </svg>
          <div class="sceneportal"></div>
        </div>
        <a href="assets/downloads/runes/portal.mp4?" download></a>
      </div>
      <div class='rune_container flame'>
        <div class='rune_centerer'>
          <video playsinline src="assets/downloads/runes/flame.mp4" autoplay loop muted></video>
          <svg viewBox="0 0 18 31" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.46829 0.403887C9.7576 0.17295 10.1201 0.183536 10.395 0.527911C10.9859 1.26807 10.6013 5.60672 9.95461 8.28279C7.84269 17.06 0.742766 19.2189 5.20364 24.8062C6.9968 27.0522 10.4164 27.6277 12.6587 25.8375C14.033 24.7402 15.7686 22.2392 16.2388 21.8638C16.6003 21.5754 17.0636 21.5648 17.397 21.982C17.7685 22.4473 17.3622 23.0486 17.1402 23.3638C16.1005 24.8058 14.4236 27.158 12.9771 28.3131C9.64399 30.9622 5.03225 30.6727 2.14797 27.0601C-3.16416 20.4066 3.97339 17.035 6.67141 12.1812C10.0415 6.16689 8.70882 1.01024 9.46829 0.403887Z" fill="white"/>
          </svg>
          <div class="sceneflame"></div>
        </div>
        <a href="assets/downloads/runes/flame.mp4" download></a>
      </div>
      <button needs_corners="true" class="viewport_button">
        <p></p><div class="spectrum"></div>
      </button>
    `,
    action: function () {
      setupRunes();
    },
  },
  color: {
    dialogue: {
      prog: 0,
      content: [
        "This is the color.",
        "It's a long story.",
        "But it's important.",
        "So we'll tell it.",
      ],
    },
    html: `
      <div id="color_grid">
        <div copy_button="true" class="color_cell" color_name="black"><p>BLACK</p><span class='copy_content'>#000000</span></div>
        <div copy_button="true" class="color_cell" color_name="white"><p>WHITE</p><span class='copy_content'>#FFFFFF</span></div>
        <div copy_button="true" class="color_cell" color_name="energy_burst"><p>ENERGY BURST</p><span class='copy_content'>#FF9D00</span></div>
        <div copy_button="true" class="color_cell" color_name="black_spectrum"><p>BLACK SPECTRUM</p>
          <span class='copy_content'>
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="url(#paint0_linear_25_415)"/><defs><linearGradient id="paint0_linear_25_415" x1="50" y1="100" x2="50" y2="0" gradientUnits="userSpaceOnUse"><stop stop-color="#FF9D00"/><stop offset="1" stop-color="black"/></linearGradient></defs></svg>
          </span>
        </div>
        <div copy_button="true" class="color_cell" color_name="white_spectrum"><p>WHITE SPECTRUM</p>
          <span class='copy_content'>
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="url(#paint0_linear_25_415)"/><defs><linearGradient id="paint0_linear_25_415" x1="50" y1="100" x2="50" y2="0" gradientUnits="userSpaceOnUse"><stop stop-color="#FF9D00"/><stop offset="1" stop-color="white"/></linearGradient></defs></svg>
          </span>
        </div>
        <div copy_button="true"class="color_cell" color_name="grayscale"><p>GRAYSCALE</p>
          <span class='copy_content'>
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="url(#paint0_linear_25_415)"/><defs><linearGradient id="paint0_linear_25_415" x1="50" y1="100" x2="50" y2="0" gradientUnits="userSpaceOnUse"><stop stop-color="black"/><stop offset="1" stop-color="white"/></linearGradient></defs></svg>
          </span>
        </div>
        <button download_button="assets/global/action_area.webp" download_name="ScenePalette.png" needs_corners="true" class="viewport_button"><p>DOWNLOAD PALETTE</p><div class="spectrum"></div></button>
      </div>
    `,
  },
  jobs: {
    dialogue: {
      prog: 0,
      content: [
        "This is the jobs.",
        "It's a long story.",
        "But it's important.",
        "So we'll tell it.",
      ],
    },
    html: `
      <p class="caption">CONGRATS! YOU'RE A...</p>
      <h1 type="past">Rotary</h1>
      <h1 type="future">Terraformer</h1>
      <span class="inline_button_container">
        <button class='inline_button'><p>GET PNG</p>
        </button><button class='inline_button emphasis'><p>NEW TITLE</p></button>
      </span>
    `,
    action: function () {
      setupJobs();
    },
  },
  video: {
    dialogue: {
      prog: 0,
      content: [],
    },
    html: `
       `,
    action: function () {
      setupVideo();
    },
  },
};

const letterPaths = {
  "▤": "M80,80v80h80v-80ZM240,400v160h80v-160ZM80,240v-80h-80v80ZM80,240v80h160v-80ZM160,0v80h80v-80ZM320,80v80h160v-80ZM240,160v80h80v-80ZM320,320v80h80v-80ZM400,240v80h80v-80ZM480,160v80h80v-80ZM240,640v80h80v-80Z",
  "■": "M0,0v160h80v-80h80v-80ZM240,80v80h-80v80h-80v80h160v-80h80v-160Z",
  "•": "M80,0v80h-80v160h80v80h160v-80h80v-160h-80v-80Z",
  "@": "M0,640v80h320v-80ZM0,0v80h320v-80ZM240,320v-160h-240v80h320v320h-240v-160h-80v80h240v-80h-160v-80Z",
  "/": "M0,480v240h80v-240ZM80,240v240h80v-240ZM160,0v240h80v-240Z",
  "□": "M80,320v-160h-80v160ZM80,320v80h240v-80ZM320,0v80h80v-80ZM80,80v80h240v-80Z",
  "▢": "M320,160h-80v-80h80ZM320,160v80h80v80h240v-80h80v-160h-240v-80h160v240h-240v-160h80v80ZM240,400v80h-160v-480h160v80h-240v400h80v80h160v-80h80v-80ZM160,240v80h80v-80Z",
  "▣": "M0,400v80h80v-80ZM80,480v80h160v-80ZM1120,400v80h80v-80ZM880,480v-80h-160v80ZM880,480v80h240v-80ZM720,400v-320h-80v320ZM640,80v-80h-160v80ZM400,80v320h80v-320ZM240,400v80h160v-80Z",
  "-": "M0,0v80h320v-80Z",
  ".": "M0,0v80h80v-80Z",
  "→": "M240,80L240,0L160,0L160,80L240,80ZM320,160L320,80L240,80L240,160L320,160ZM320,400L400,400L400,320L480,320L480,240L400,240L400,160L320,160L320,240L0,240L0,320L320,320L320,400ZM240,480L160,480L160,560L240,560L240,480ZM320,400L240,400L240,480L320,480L320,400Z",
  "←": "M240,80L240,0L320,0L320,80L240,80ZM160,160L160,80L240,80L240,160L160,160ZM160,400L80,400L80,320L0,320L0,240L80,240L80,160L160,160L160,240L480,240L480,320L160,320L160,400ZM240,480L320,480L320,560L240,560L240,480ZM160,400L240,400L240,480L160,480L160,400Z",
  // Uppercase letters
  A: "M80,0v80h160V0H80ZM80,720H0V80h80v320h160V80h80v640h-80v-240H80v240Z",
  B: "M240,320v320h80v-320h-80ZM240,80v160h80V80h-80ZM240,720H0V0h240v80H80v160h160v80H80v320h160v80Z",
  C: "M240,80v160h80V80h-80ZM80,0v80h160V0H80ZM240,480v160h80v-160h-80ZM80,640v80h160v-80H80ZM80,640V80H0v560h80Z",
  D: "M240,80v560h80V80h-80ZM0,0h240v80H80v560h160v80H0V0Z",
  E: "M0,0h320v160h-80v-80H80v240h80v-80h80v240h-80v-80H80v240h160v-80h80v160H0V0Z",
  F: "M0,0h320v160h-80v-80H80v240h80v-80h80v240h-80v-80H80v240h80v80H0V0Z",
  G: "M320,640H80v80h160v-320h-80v-80h160v320ZM240,80v80h80v-80h-80ZM240,80V0H80v80h160ZM0,80v560h80V80H0Z",
  H: "M80,0v320h160V0h80v720h-80V400H80v320H0V0h80Z",
  I: "M0,0h320v80h-80v560h80v80H0v-80h160V80H0V0Z",
  J: "M80,640v80h160v-80H80ZM80,640v-80H0v80h80ZM320,640h-80V80h-80V0h160v640Z",
  K: "M240,0v240h80V0h-80ZM160,400h-80v320H0V0h80v320h160v-80h-80v160ZM240,480v240h80v-240h-80ZM240,480v-80h-80v80h80Z",
  L: "M80,0v640h160v-160h80v240H0V0h80Z",
  M: "M0,0h160v720h80V80H80v640H0V0ZM240,0v80h80V0h-80Z",
  N: "M160,480v-160h80V0h80v720h-80v-240h-80ZM80,720H0V0h80v160h80v160h-80v400Z",
  O: "M80,640v80h160v-80H80ZM240,80v560h80V80h-80ZM80,0v80h160V0H80ZM0,80v560h80V80H0Z",
  P: "M240,80v240h80V80h-80ZM0,0h240v80H80v240h160v80H80v320H0V0Z",
  Q: "M240,80v480h80V80h-80ZM240,80V0H80v80h160ZM0,80v480h80V80H0ZM240,640v80h80v-80h-80ZM240,640v-80H80v80h160Z",
  R: "M240,80v240h80V80h-80ZM240,400v320h80v-320h-80ZM240,400H80v320H0V0h240v80H80v240h160v80Z",
  S: "M240,80v160h80V80h-80ZM240,80H80v240h80v-80H0V80h80V0h160v80ZM240,400v240h80v-240h-80ZM240,400v-80h-80v80h80ZM80,640v80h160v-80H80ZM0,480v160h80v-160H0Z",
  T: "M80,160H0V0h320v80h-80v640h-80V80h-80v80Z",
  U: "M80,640v80h160v-80H80ZM0,0v640h80V0H0ZM240,0v640h80V0h-80Z",
  V: "M160,560v160h80v-160h-80ZM240,0v560h80V0h-80ZM80,480v80h80v-80h-80ZM0,0v480h80V0H0Z",
  W: "M240,640v-640h-80v640ZM240,640v80h80v-80ZM80,640v-640h-80v640ZM80,640v80h80v-80Z",
  X: "M240,0v320h80v-320ZM0,400v320h80v-320ZM80,320h-80v-320h80v240h80v80h80v80h80v320h-80v-240h-80v-80h-80Z",
  Y: "M80,320v-320h-80v320ZM80,320v80h80v-80ZM240,0v400h80v-400ZM160,640v-240h80v240h80v80h-240v-80Z",
  Z: "M0,480h80v160h160v-80h80v160h-320ZM80,320v160h80v-160h80v-240h-160v80h-80v-160h320v160h-160v160Z",

  // Lowercase letters
  a: "M240,240v-160h80v480h-240v-80h160v-160h-160v-80ZM0,320v160h80v-160ZM80,0v80h-80v80h80v-80h160v-80Z",
  b: "M80,640h-80v-640h80v160h160v80h-160ZM80,640v80h160v-80h80v-400h-80v400Z",
  c: "M240,400v80h80v-80ZM80,0v80h160v-80ZM240,80v80h80v-80ZM0,80v400h80v-400ZM80,480v80h160v-80Z",
  d: "M0,240v400h80v-400ZM80,640v80h160v-80ZM320,640h-80v-400h-160v-80h160v-160h80Z",
  e: "M80,320v160h-80v-400h80v160h160v-160h80v240ZM80,0v80h160v-80ZM240,400v80h-160v80h160v-80h80v-80Z",
  f: "M160,0v80h160v-80ZM0,160h80v-80h80v80h160v80h-160v400h80v80h-240v-80h80v-400h-80Z",
  g: "M0,80v240h80v-240ZM80,400v-80h240v-240h-80v320h-80v80h160v80h-240v-80h-80v-80ZM240,80v-80h-160v80Z",
  h: "M160,240v80h80v-80ZM80,0v320h80v80h-80v400h-80v-800ZM240,320v480h80v-480Z",
  i: "M0,640h160v80h-160ZM160,0v80h80v-80ZM160,640v-320h-160v-80h160v-80h80v480ZM240,720v-80h80v80Z",
  j: "M80,720v-80h-80v80ZM80,720v80h160v-80ZM320,720h-80v-400h-80v-80h80v-80h80ZM240,0v80h80v-80Z",
  k: "M240,640v-80h-80v80ZM240,640v160h80v-160ZM240,160v160h80v-160ZM80,0v480h160v-160h-80v240h-80v240h-80v-800Z",
  l: "M0,0h160v560h160v80h-320v-80h80v-480h-80Z",
  m: "M80,0v80h80v-80ZM0,80v480h80v-480ZM240,0v80h80v-80ZM160,80v480h80v-480Z",
  n: "M0,80v480h80v-480ZM240,80v-80h-160v80ZM240,80v480h80v-480Z",
  o: "M0,80v400h80v-400ZM80,480v80h160v-80ZM240,80v-80h-160v80ZM240,80v400h80v-400Z",
  p: "M240,80h-160v-80h160ZM240,80v400h-160v80h-80v-480h80v320h240v-320Z",
  q: "M0,80v320h80v-320ZM80,0v80h160v-80ZM240,400v-320h80v480h-80v-80h-160v-80Z",
  r: "M80,480v-400h-80v-80h160v80h80v80h-80v320h80v80h-240v-80ZM240,0v80h80v-80Z",
  s: "M80,480v-160h-80v160ZM80,480v80h160v-80ZM240,320v-80h-80v80ZM240,320v160h80v-160ZM80,80v-80h160v160h80v-80ZM80,80v160h80v-80h-160v-80Z",
  t: "M80,640v-400h-80v-80h80v-160h80v160h80v80h-80v400ZM160,720v-80h80v80ZM240,640v-80h80v80Z",
  u: "M80,560v-80h160v-480h80v560ZM0,0v480h80v-480Z",
  v: "M240,0v480h80v-480ZM160,480v-80h-80v80ZM160,480v80h80v-80ZM0,0v400h80v-400Z",
  w: "M0,0v480h80v-480ZM160,0v480h80v-480ZM80,480v80h80v-80ZM240,480v80h80v-80Z",
  x: "M240,320v-80h-160v80ZM240,320v240h80v-240ZM0,320v240h80v-240ZM80,240v-240h-80v240ZM240,0v240h80v-240Z",
  y: "M240,0v320h80v-320ZM80,480v-80h-80v80ZM80,480v80h80v-80ZM80,240v-240h-80v240ZM80,240v80h80v-80ZM160,320v160h80v-160Z",
  z: "M0,320h80v160h160v-80h80v160h-320ZM80,160h-80v-160h320v160h-80v-80h-160ZM80,240v80h80v-80h80v-80h-80v80Z",

  // Numbers
  0: "M80,640h-80v-560h80v240h80v80h-80ZM80,640v80h160v-400h-80v-80h80v-160h80v560ZM80,0v80h160v-80Z",
  1: "M0,640v80h160v-80ZM240,640h-80v-560h-160v-80h240ZM240,640v80h80v-80Z",
  2: "M160,320v80h80v-80ZM240,80v-80h-160v80ZM240,80v240h80v-240ZM0,80v80h80v-80ZM80,400v160h80v-160ZM0,560h80v80h240v80h-320Z",
  3: "M240,320v-80h-80v80ZM240,320v320h80v-320ZM0,560v80h80v-80ZM240,80v-80h-160v80ZM240,80v160h80v-160ZM80,320v80h80v-80ZM80,640v80h160v-80ZM0,80v80h80v-80Z",
  4: "M240,480h-240v-160h80v80h160v-240h-80v-80h80v-80h80v720h-80ZM80,160v160h80v-160Z",
  5: "M0,560v80h80v-80ZM240,320h-240v-320h320v80h-240v160h160ZM240,320v320h80v-320ZM80,640v80h160v-80Z",
  6: "M160,0v80h160v-80ZM80,640h-80v-480h160v-80h-80v160h160v400h80v-320h-240ZM80,640v80h160v-80Z",
  7: "M80,480v240h80v-240ZM160,240v240h80v-240ZM240,240v-160h-240v-80h320v240Z",
  8: "M0,80v240h80v-240ZM80,0v80h160v-80ZM240,80v240h80v-240ZM80,320v80h160v-80ZM240,400v240h80v-240ZM80,640v-240h-80v240ZM80,640v80h160v-80Z",
  9: "M0,80v240h80v-240ZM80,0v80h160v-80ZM240,320v-240h80v560h-240v80h160v-320h-160v-80Z",
};

const letterHeights = {
  "▤": 720,
  "↕": 80,
  "■": 320,
  "•": 320, // Bullet height
  "@": 720, // @ symbol height
  "/": 720, // Slash height
  "□": 400, // White square height
  "▢": 560, // Alternative white square height
  "▣": 560, // White square with vertical line height
  "-": 80, // Hyphen height (very short)
  ".": 80,
  "→": 560,
  "←": 560,

  // Uppercase letters - all 720
  A: 720,
  B: 720,
  C: 720,
  D: 720,
  E: 720,
  F: 720,
  G: 720,
  H: 720,
  I: 720,
  J: 720,
  K: 720,
  L: 720,
  M: 720,
  N: 720,
  O: 720,
  P: 720,
  Q: 720,
  R: 720,
  S: 720,
  T: 720,
  U: 720,
  V: 720,
  W: 720,
  X: 720,
  Y: 720,
  Z: 720,

  // Lowercase letters - varying heights
  a: 560,
  b: 720,
  c: 560,
  d: 720,
  e: 560,
  f: 720,
  g: 560,
  h: 800,
  i: 720,
  j: 800,
  k: 800,
  l: 640,
  m: 560,
  n: 560,
  o: 560,
  p: 560,
  q: 560,
  r: 560,
  s: 560,
  t: 720,
  u: 560,
  v: 560,
  w: 560,
  x: 560,
  y: 560,
  z: 560,

  // Numbers

  0: 720,
  1: 720,
  2: 720,
  3: 720,
  4: 720,
  5: 720,
  6: 720,
  7: 720,
  8: 720,
  9: 720,

  default: 720,
  space: 160,
};

const letterWidths = {
  "▤": 560, // This character is wider
  "↕": 320,
  "■": 320,
  "•": 320, // Bullet width
  "@": 320, // @ symbol width
  "/": 240, // Slash width (narrower)
  "□": 400, // White square width (wider)
  "▢": 720, // Alt white square width (much wider)
  "▣": 1200, // White square with vertical line (very wide)
  "-": 320, // Hyphen width
  ".": 320,
  "→": 480,
  "←": 480,
  " ": 160,
  default: 320,
};

const wordCategories = {
  nostalgiaStart: [
    "Pixel",
    "Analog",
    "Retro",
    "Cassette",
    "Polaroid",
    "Lo-fi",
    "Arcade",
    "Mosaic",
    "Dial-up",
    "Lantern",
    "Cathode",
    "VHS",
    "Neon",
    "Gramophone",
    "Tape",
    "Floppy",
    "Slide",
    "Radio",
    "Typewriter",
    "Carousel",
    "Projector",
    "Zine",
    "Bakelite",
    "Camcorder",
    "Rotary",
    "Telegraph",
    "Phonograph",
    "Viewfinder",
    "Filmstrip",
    "Tinplate",
  ],
  futurismStart: [
    "Quantum",
    "Astro",
    "Cypher",
    "Hologram",
    "Ether",
    "Plasma",
    "Solar",
    "Vapor",
    "Nano",
    "Neural",
    "Photon",
    "Cryo",
    "Bio",
    "Mecha",
    "Synth",
    "Circuit",
    "Neonwave",
    "Hyperdrive",
    "ZeroG",
    "Augment",
    "Hover",
    "Meta",
    "Exo",
    "Neuro",
    "Pulse",
    "Glitch",
    "Cyber",
    "Fractal",
    "Omega",
    "Singularity",
  ],
  nostalgiaEnd: [
    "Navigator",
    "Tinkerer",
    "Storyteller",
    "Cartographer",
    "Fabricator",
    "Machinist",
    "Archivist",
    "Technician",
    "Collector",
    "Curator",
    "Operator",
    "Illustrator",
    "Mechanic",
    "Recorder",
    "Historian",
    "Animator",
    "Decoder",
    "Preserver",
    "Restorer",
    "Transcriber",
    "Broadcaster",
    "Typist",
    "Editor",
    "Librarian",
    "Conservator",
    "Playwright",
    "Documentarian",
    "Cartoonist",
    "Bellmaker",
    "Projectionist",
  ],
  futurismEnd: [
    "Architect",
    "Alchemist",
    "Voyager",
    "Synthesist",
    "Forger",
    "Dreamweaver",
    "Engineer",
    "Modulator",
    "Visionary",
    "Futurist",
    "Pathfinder",
    "Coder",
    "Strategist",
    "Scriptwriter",
    "Technomancer",
    "Innovator",
    "Biohacker",
    "Cybernaut",
    "Terraformer",
    "Neuroengineer",
    "Dataweaver",
    "HoloSmith",
    "Starforger",
    "Chronomancer",
    "Astrocartographer",
    "Nanodesigner",
    "Whisperer",
    "Technosmith",
    "Roboticist",
    "Datanaut",
  ],
};
