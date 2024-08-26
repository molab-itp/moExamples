// https://editor.p5js.org/jht9629-nyu/sketches/_3QMiI-fM
// faceMesh mesh_nits v8 bestill

// let faceMesh;
// let faces; //  = [];

let my = {};

function setup() {
  // createCanvas(640, 480);
  createCanvas(windowWidth, windowHeight);

  video_init();

  faceMesh_init();

  my.bestill = new eff_bestill({ factor: 10, input: my.output });
}

function draw() {
  if (!my.faces) return;
  // Draw the webcam video
  // image(video, 0, 0, width, height);

  // background(255);

  // my.output.clear();
  my.output.background(my.avg_color);
  // my.output.background(0);

  // Draw all the tracked face points
  for (let face of my.faces) {
    // draw_face_circle(face);
    draw_face_mesh(face);
    draw_mouth_shape(face);
    draw_lips_line(face);
    draw_eye_shape(face);
    draw_eye_lines(face);
    my.face1 = face;
  }

  // background(my.avg_color);

  // image(my.output, 0, 0);
  my.bestill.prepareOutput();
  image(my.bestill.output, 0, 0);

  overlayEyesMouth();
}

function draw_shape_layer(face, layer) {
  layer.clear();
  layer.fill([255, 255, 255, 255]);

  layer.beginShape();
  draw_vertex_layer(lips_out_top, face, layer);
  draw_vertex_layer(lips_out_bot, face, layer);
  layer.endShape();

  layer.beginShape();
  draw_vertex_layer(left_eye_top, face, layer);
  draw_vertex_layer(left_eye_bot, face, layer);
  layer.endShape();

  my.output.beginShape();
  draw_vertex_layer(right_eye_top, face, layer);
  draw_vertex_layer(right_eye_bot, face, layer);
  layer.endShape();
}

function draw_vertex_layer(lp, face, layer) {
  for (let i = 0; i < lp.length; i++) {
    let ki = lp[i];
    // let { x, y } = faceMesh_inputPtToOutput(face.keypoints[ki]);
    let { x, y } = face.keypoints[ki];
    layer.vertex(x, y);
  }
}

function draw_lips_line(face) {
  my.output.strokeWeight(my.strokeWeight);
  my.output.stroke(255, 0, 0);
  draw_line(lips_out_top, face);

  my.output.stroke(0, 255, 0);
  draw_line(lips_out_bot, face);

  my.output.stroke(255, 255, 0);
  draw_line(lips_in_top, face);

  my.output.stroke(0, 255, 255);
  draw_line(lips_in_bot, face);

  // my.output.stroke(0, 255, 0);
  my.output.stroke(255, 255, 255);
  draw_points(face.lips.keypoints);
}

function draw_eye_shape(face) {
  my.output.strokeWeight(0);
  my.output.fill(0, 0, 0);

  my.output.beginShape();
  draw_vertex(left_eye_top, face);
  draw_vertex(left_eye_bot, face);
  my.output.endShape();

  my.output.beginShape();
  draw_vertex(right_eye_top, face);
  draw_vertex(right_eye_bot, face);
  my.output.endShape();
}

function draw_eye_lines(face) {
  my.output.strokeWeight(my.strokeWeight);
  my.output.stroke('gold');

  draw_line(left_eye_top, face);
  draw_line(left_eye_bot, face);
  draw_line(right_eye_top, face);
  draw_line(right_eye_bot, face);
}

function draw_mouth_shape(face) {
  my.output.fill(0, 0, 0);

  my.output.beginShape();
  draw_vertex(lips_in_top, face);
  draw_vertex(lips_in_bot, face);
  my.output.endShape();
}

function draw_vertex(lp, face) {
  for (let i = 0; i < lp.length; i++) {
    let ki = lp[i];
    let { x, y } = faceMesh_inputPtToOutput(face.keypoints[ki]);
    my.output.vertex(x, y);
  }
}

function draw_points(points) {
  for (let point of points) {
    let { x, y } = faceMesh_inputPtToOutput(point);
    my.output.fill(0, 255, 0);
    my.output.circle(x, y, my.strokeWeight);
  }
}

function draw_line(lp, face) {
  let px, py;
  for (let i = 0; i < lp.length; i++) {
    let ki = lp[i];
    let { x, y } = faceMesh_inputPtToOutput(face.keypoints[ki]);
    if (i != 0) {
      my.output.line(px, py, x, y);
    }
    px = x;
    py = y;
  }
}

function draw_face_circle(face) {
  for (let keypoint of face.keypoints) {
    let { x, y } = faceMesh_inputPtToOutput(keypoint);
    fill(0, 255, 0);
    noStroke();
    circle(x, y, 2);
  }
}

function draw_face_mesh(face) {
  faceMesh_render(my, face.keypoints);
}

// https://editor.p5js.org/ml5/sketches/lCurUW1TT
// faceMesh-keypoints --ml5
/*
 * 👋 Hello! This is an ml5.js example made and shared with ❤️.
 * Learn more about the ml5.js project: https://ml5js.org/
 * ml5.js license and Code of Conduct: https://github.com/ml5js/ml5-next-gen/blob/main/LICENSE.md
 *
 * This example demonstrates face tracking on live video through ml5.faceMesh.
 */

// https://editor.p5js.org/jht9629-nyu/sketches/9fOM25TRl
// faceMesh-keypoints --ml5 copy

// https://editor.p5js.org/jht9629-nyu/sketches/PrJvjyxb6
// faceMesh mesh_nits

// https://editor.p5js.org/jht9629-nyu/sketches/7y2gqHeZz
// faceMesh mesh_nits v2
// scale to height

// https://editor.p5js.org/jht9629-nyu/sketches/hFnQmY-Jy
// faceMesh mesh_nits v3
// fit to width

// frameRate()
// 36.63003701391713

// https://editor.p5js.org/jht9629-nyu/sketches/p4Uu0B2sk
// faceMesh mesh_nits v4
// fill to width and height

// https://editor.p5js.org/jht9629-nyu/sketches/nDEtGRehq
// faceMesh mesh_nits v5

// https://editor.p5js.org/jht9629-nyu/sketches/fsOAbI6SJ
// faceMesh mesh_nits v6 -- stray mask

// https://editor.p5js.org/jht9629-nyu/sketches/PuoF9-3xy
// faceMesh mesh_nits v7 mask
