# User Prompts History

This file collates all user prompts from this session in chronological order.

---

## Prompt 1 — Initial Build from Stitch Design

> **Design prompt (`design/prompt.txt`):**  
> Build me an app with screens that look like this. You can hotlink images from the html

> **Task prompt:**  
> This project contains design artifacts exported from Stitch in the 'design/' directory. Build a complete, working web application that faithfully reproduces these designs.

---

## Prompt 2 — Build Error Check

> there's a build error

---

## Prompt 3 — Push to Git

> push to git

---

## Prompt 4 — Vercel Build Log (`npm` Dependency Conflict)

```text
12:08:01.804 Running build in Washington, D.C., USA (East) – iad1
12:08:01.805 Build machine configuration: 2 cores, 8 GB
12:08:01.952 Cloning github.com/whyyinsy/amazon_original (Branch: main, Commit: 058c99f)
12:08:01.953 Previous build caches not available.
12:08:02.386 Cloning completed: 434.000ms
12:08:03.402 Running "vercel build"
12:08:03.414 Vercel CLI 66.6.0
12:08:04.113 Installing dependencies...
12:08:04.844 npm warn Unknown env config "cache-dir". This will stop working in the next major version of npm. See `npm help npmrc` for supported config options.
12:08:16.556 npm error code ERESOLVE
12:08:16.557 npm error ERESOLVE could not resolve
12:08:16.557 npm error
12:08:16.558 npm error Found: esbuild@0.25.12
12:08:16.558 npm error node_modules/esbuild
12:08:16.558 npm error   dev esbuild@"^0.25.0" from the root project
12:08:16.558 npm error
12:08:16.558 npm error Could not resolve dependency:
12:08:16.558 npm error peerOptional esbuild@"^0.27.0 || ^0.28.0" from vite@8.3.8
12:08:16.558 npm error node_modules/vite
12:08:16.558 npm error   vite@"^8.3.0" from the root project
12:08:16.558 npm error   peer vite@"^5.2.0 || ^6 || ^7 || ^8" from @tailwindcss/vite@4.3.5
12:08:16.558 npm error   node_modules/@tailwindcss/vite
12:08:16.559 npm error     @tailwindcss/vite@"^4.3.3" from the root project
12:08:16.559 npm error   1 more (@vitejs/plugin-react)
12:08:16.559 npm error
12:08:16.559 npm error Conflicting peer dependency: esbuild@0.28.2
12:08:16.559 npm error node_modules/tsx/node_modules/esbuild
12:08:16.559 npm error   peerOptional esbuild@"^0.27.0 || ^0.28.0" from vite@8.3.8
12:08:16.559 npm error   node_modules/vite
12:08:16.559 npm error     vite@"^8.3.0" from the root project
12:08:16.559 npm error     peer vite@"^5.2.0 || ^6 || ^7 || ^8" from @tailwindcss/vite@4.3.5
12:08:16.559 npm error     node_modules/@tailwindcss/vite
12:08:16.559 npm error       @tailwindcss/vite@"^4.3.3" from the root project
12:08:16.559 npm error     1 more (@vitejs/plugin-react)
12:08:16.560 npm error
12:08:16.560 npm error Fix the upstream dependency conflict, or retry this command with --force or --legacy-peer-deps to accept an incorrect (and potentially broken) dependency resolution.
12:08:16.560 npm error
12:08:16.560 npm error
12:08:16.560 npm error For a full report see:
12:08:16.560 npm error /vercel/.npm/_logs/2026-11-26T04_08_04_360Z-eresolve-report.txt
12:08:16.564 npm error A complete log of this run can be found in: /vercel/.npm/_logs/2026-11-26T04_08_04_360Z-debug-0.log
12:08:16.603 Error: [BUILD_UTILS_SPAWN_1] Command "npm install" exited with 1
```

---

## Prompt 5 — UX Improvements from Board Image

> make improvements to the website based on the inputs in the image.

**Attached image:** `/public/assets/aistudio/My_First_Board_f9ccb144.jpg`

**Transcribed inputs from board:**
- **Define Amazon → User flow:**
  1. Browse
  2. Search
  3. Select product
  4. Cart out
- **Original replica:** Reference to `https://www.amazon.sg/Razer-Viper-Pro-Sport-Ultralight/...`
- **User pitfalls:**
  1. Hover over image to change the image
  2. Click to zoom in to the image
  3. Keep the item description in view even when zooming in
  4. Minimize the Cart Summary
  5. Add to cart but remain at the product page instead of automatically carting out for ease of shopping more
  6. Quantity scroll issue to be able to key in quantity

---

## Prompt 6 — Save to New GitHub Repository

> save to new github repository

---

## Prompt 7 — Import from GitHub Repository

> This app was imported from GitHub repository whyyinsy/amazon_enhanced.

---

## Prompt 8 — UX & Aesthetic Improvements (6 Usability Heuristics)

> 1. visibility of sytem status  
> - lock the system bar (to reduce the user from scrolling)  
> 2. Match between system and real world -> product name should be more user friendly  
> 3. Consistency (add to wishlist to be a heart emoji, cart symbol to align)  
> 4. Minimalist deisgn (remove product long name)  
> 5. flexibility and efficiency of use (to include other colours and specs as options within same product page - ie. user can toggle black or white mouse)  
> 6. Aesthetic deisgb - to have visual blocks for the product specs, to have the price in line and eye catching  
>  
> changes to be made

---

## Prompt 9 — Locked Top Navigation Task Bar

> All Categories  
> Black Friday Deals  
> Specifications  
> About Viper V4 Pro  
> Customer Reviews  
> at the top task bar to be locked as a navigation

---

## Prompt 10 — Undo Cart Deletes

> undo the deletes in the cart

---

## Prompt 11 — Collate Prompts into `PROMPTS.md`

> collate all the promts into a PROMPTS.md

