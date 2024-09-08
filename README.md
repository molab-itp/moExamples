# [github p5moExamples](https://github.com/molab-itp/p5moExamples.git) ?v=105

- multi-device experiences on handheld and large screens
- creating and updating firebase cloud data

- p5js examples for [p5moLibrary](https://github.com/molab-itp/p5moLibrary.git)

## How is data synchronized in real time in the examples?

Data, such as shared photos, vote counts, and drawing points, is synchronized through [Firebase](firebase.google.com), which serves as a backend/server and has built-in sockets.

The functions that include Firebase setup are in [p5moLibrary](https://github.com/molab-itp/p5moLibrary).

- [video - What is Firebase and how to use it](https://www.youtube.com/watch?v=p9pgI3Mg-So&list=PLl-K7zZEsYLnfwBe4WgEw9ao0J0N1LYDR&index=8)
- [docs - firebase web database](https://firebase.google.com/docs/database/web/start?hl=en&authuser=0)

## p5js versions of examples

- [p5js p5moExamples iframe_player](https://editor.p5js.org/jht9629-nyu/sketches/88yxquMBl): a website playlist made with iframes; play in real-time synchronously on available devices
- [p5js p5moExamples lobby](https://editor.p5js.org/jht9629-nyu/sketches/vP6sWN4Cu): an observer to watch available online devices/users; currently used to observe viewers' devices at the Clive Davis Gallery
- [p5js p5moExamples paint](https://editor.p5js.org/jht9629-nyu/sketches/nBefVKAbH): real-time multi-user drawing canvas controlled with both landscape(desktop) and portrait(cellphone) mode
- [p5js p5moExamples photo-booth](https://editor.p5js.org/jht9629-nyu/sketches/5VKqK34Ps): web-based real-time, multi-user photo sharing app with visual effects
- [p5js p5moExamples pixel-grid](https://editor.p5js.org/jht9629-nyu/sketches/CntV1JQNp): web camera-based pixel effect
- [p5js p5moExamples videoKit](https://editor.p5js.org/jht9629-nyu/sketches/KeRAIMzHN): browser-based dashboard for mixing web camera videos
- [p5js p5moExamples vote_DOMjs](https://editor.p5js.org/jht9629-nyu/sketches/CAgivET8K): real-time voting examples that count your own votes and total votes from available devices. UI created with DOM.js
- [p5js p5moExamples vote](https://editor.p5js.org/jht9629-nyu/sketches/EEafnQwr1): real-time voting examples that count your own votes and total votes from available devices
- [p5js p5moExamples words](https://editor.p5js.org/jht9629-nyu/sketches/23h3z1G82): showing the word of the day websites with iframes by incrementing and decrementing the date

## [github.io versions of examples](https://molab-itp.github.io/p5moExamples?v=105)

- [examples/let-america-rewind](examples/let-america-rewind?v=105)
- [examples/faceMesh](examples/faceMesh?v=105)

- [examples/shout](examples/shout?v=105)
- [examples/video-radial-scan](examples/video-radial-scan?v=105)
- [examples/dice99](examples/dice99?v=105)

- [examples/vote](examples/vote?v=105)
- [examples/vote_DOMjs](examples/vote_DOMjs?v=105)
- [examples/words](examples/words?v=105)
- [examples/videoKit](examples/videoKit?v=105)
- [examples/photo-booth](examples/photo-booth?v=105)
- [examples/iframe_player](examples/iframe_player?v=105)

- [examples/lobby room0](examples/lobby?v=105&room=room0)
- [examples/lobby room0 mo-videoplayer](examples/lobby?v=105&room=room0&app=mo-videoplayer)
- [examples/lobby room1](examples/lobby?v=105&room=room1)

- [examples/paint](examples/paint?v=105)
- [examples/paint remote=0](examples/paint?v=105&remote=0)
- [examples/pixel-grid](examples/pixel-grid?v=105)
- [examples/pixel-grid remote=0](examples/pixel-grid?v=105&remote=0)

## github.io of p5mirror-jht9629-nyu

- [p5mirror-jht9629-nyu](https://jht9629-nyu.github.io/p5mirror-jht9629-nyu/p5projects-index.html): a library for downloading sketches locally from the p5 web editor

## Add your example

- fork this repo
- create a branch with your example
- submit a pull request to this repo

## Notes

```

Copied into to sketches.

> Add Upload File
> select all files in examples/* folder
> edit index.html to remove ?v=xx

```

## Plan

- [] Document VS Code debugging steps

- [] Document vote example

- [] Document lobby example

- [] Document manual version ?v=x to bust the browser cache for github pages deploy

## Done

```

- [x] Consider sharing build.sh to version this code

- [x] lobby delete room function
  - defer: use firebase console

- [x] collab draw example

- [x] Add basic vote sample


```

## Archived

```

// https://editor.p5js.org/jht9629-nyu/sketches/7Wjlo3pPU
// mo-pixel-grid jht9629 fireb_firebase.js

// https://editor.p5js.org/jht9629-nyu/sketches/twgS6eWRZ
// pixel-grid


```

## CRUD

```
alias crud=./p5mirrorLib/bin/crud.sh

crud list

crud export_new --folder "examples" --all

crud export_update --folder "examples/videoKit" --sketch u_Blv5bOK --verbose

crud delete --all --remote

crud watermark --all --remote

```
