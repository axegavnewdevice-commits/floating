# Arabic Scrabble — independently floating responsive PWA

This package includes a new premium app icon featuring the Arabic letter ض. It keeps the original game rules, Arabic fonts, board and tile art, and gameplay controls. The board, Player 1 station, Player 2 station, each main action button, and the status area can be moved independently. The board, both player stations/racks, and all main action buttons can also be resized independently with the small corner grips.

## Move the game elements

- **Mouse / trackpad:** drag the board, a player station by its header/background (not a tile), any main action button, or the status area.
- **Touchscreen:** press and hold the element for a moment, then drag it. Quick taps still activate buttons and still select/place game tiles.
- Player stations start on opposite sides of the board on wide screens. On narrow phones the default layout stacks, but every station can still be moved independently.
- Positions and sizes are saved on the current device separately for portrait and landscape orientation. The square board stays square; rack slots stay square; Arabic glyphs scale with board/rack cells while retaining their font family, weight, and colors. Button text keeps its existing font sizing and buttons cannot shrink below the space their labels need. No layout help text or additional visible wording was added to the game display.

## Put it on GitHub

1. Extract the ZIP.
2. Upload **the contents** of the extracted folder to the root of your GitHub repository so `index.html`, `manifest.webmanifest`, `sw.js`, `icons/`, and `vercel.json` are at the repository root.
3. Commit and push.

## Deploy on Vercel

Import the repository into Vercel. Select **Other** as the Framework Preset, leave the Build Command empty, set the Output Directory to `.` and deploy over HTTPS.

## Install

- Android / desktop Chromium: open the deployed HTTPS site and use Install app or Add to Home screen.
- iPhone / iPad: open the site in Safari, tap Share, then Add to Home Screen.
- The PWA manifest allows either portrait or landscape; it does not force the device orientation.

## Offline behavior

The HTML shell and app icons are precached by the service worker. Existing Tailwind, Firebase and Google Fonts dependencies remain external and are cached after successful online loads. Full offline startup is therefore best after the game has been opened online once.


Latest UI update: icon-only controls, persistent dark mode, and corner resize grips that appear after a long press.

## App icon

The launcher icon, Android adaptive/maskable icon, Apple touch icon, browser favicon, and SVG favicon all use the matching ض artwork. The service-worker cache version has been updated so deployed browsers can pick up the new icon.
