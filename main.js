import {loadGLTF, loadVideo} from "../../libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {

  let video = null;
  const init = async() => {
    const video = await loadVideo("assets/videos/tinywow_Pensole Video Demo - Final - 03.02.2023_15284026.mp4");
    video.play();
    video.pause();
  }

  const start = async() => {
    document.querySelector(".button").remove();
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.querySelector("#container"),
      uiScanning: "#scanning",
      uiLoading: "no",
      imageTargetSrc: 'assets/targets/targets.mind',
      filterMinCF: 10,
      filterBeta: 1000
    });
    const {renderer, scene, camera} = mindarThree;

    const video = await loadVideo("assets/videos/tinywow_Pensole Video Demo - Final - 03.02.2023_15284026.mp4");
    const texture = new THREE.VideoTexture(video);

    const geometry = new THREE.PlaneGeometry(1, 792/1268);
    const material = new THREE.MeshBasicMaterial({map: texture});
    const plane = new THREE.Mesh(geometry, material);

    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(plane);

    anchor.onTargetFound = () => {
      video.play();
    }
    anchor.onTargetLost = () => {
      video.pause();
    }
    // video.addEventListener( 'play', () => {
    //   video.currentTime = 0;
    // });

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }

  const startButton = document.createElement("button");
  startButton.textContent = "Start";
  startButton.className= "button button4"
  startButton.addEventListener("click", start);
  
  document.body.appendChild(startButton);
  //start();
});

