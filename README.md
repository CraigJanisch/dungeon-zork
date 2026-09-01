# Dungeon

A mobile-friendly browser presentation of **Zork I**, built around the Parchment web interpreter and the MIT-licensed historical Zork I source release.

## Features

- Authentic Zork I parser, rooms, objects, puzzles, scoring, and game logic
- Responsive desktop, tablet, and phone layout
- Touch-friendly compass and quick-command controls
- Green and amber terminal themes
- Z-machine save and restore support
- Installable progressive web app with offline play
- Static Netlify deployment with no backend required

## Run locally

Serve the repository with any static web server. For example:

```bash
npx serve .
```

Opening `index.html` directly with a `file://` URL will not work because the game runs inside a same-origin frame.

## Deploy to Netlify

Connect this GitHub repository to Netlify. The included `netlify.toml` publishes the repository root, so no build command is required.

## Credits and licensing

Zork I was written by Marc Blank, Dave Lebling, Bruce Daniels, and Tim Anderson and originally published by Infocom. Its historical source release is MIT licensed. The browser interpreter is [Parchment](https://github.com/curiousdannii/parchment), also MIT licensed. License texts are included in [`licenses/`](licenses/).

The Zork name and related trademarks remain the property of their respective owners. This is an independent preservation and personal-use project and is not affiliated with or endorsed by Activision or Microsoft.
