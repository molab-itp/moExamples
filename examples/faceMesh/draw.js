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
