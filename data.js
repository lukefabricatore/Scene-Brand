const gridItems = [
  {
    id: "metadata",
    pretty: "Metadata",
    bpoints: {
      desk: { size: [1, 10], pos: [0, 0], endPos: [-5, 0] },
      mob: { size: [2, 4], pos: [0, 3], endPos: [-7, 3] },
    },
    open: {
      desk: [650, 300],
      mob: [650, 300],
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
      desk: [650, 360],
      mob: [650, 360],
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
      desk: [650, 430],
      mob: [650, 430],
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
      desk: [650, 300],
      mob: [650, 300],
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
      desk: [650, 300],
      mob: [650, 300],
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
      mob: [650, 300],
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
      desk: [650, 300],
      mob: [650, 300],
    },
    content: {
      background: "#1F1F1F",
      html: `
      <div>
        <h1 class="past"><span class="icon"></span><span class="title">Pixel</span></h1>
      </div>
      <div>
        <h1 class="future"><span class="icon"></span><span class="title">Alchemist</span></h1>
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
      video: {
        src: "brandvideo.mp4",
        poster: "https://example.com/poster.jpg",
      },
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
      <button class='inline_button tab_button'>
        <p>SHIFT</p>
        <div class="button_tabs">
          <div class="tab active" tab="serif"><div class="sceneserif"></div>
          </div><div class="tab" tab="sans"><div class="scenesans"></div></div>
        </div>
      </button><button class='inline_button emphasis'>
        <p>GET GOOGLE FONT</p>
        <a href="https://fonts.google.com/?query=instrument" target="_blank"></a>
      </button>
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
    html: {},
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
        <button download_button="assets/global/action_area.webp" download_name="ScenePalette.png" needs_corners="true" class="viewport_button"><p>DOWNLOAD PALETTE</p><div class="spectrum"</div></button>
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
  },
  video: {
    dialogue: {
      prog: 0,
      content: [],
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
  space: 720,
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
