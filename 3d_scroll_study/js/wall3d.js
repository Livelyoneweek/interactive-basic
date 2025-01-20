(function () {
  const stageElem = document.querySelector(".stage");
  const houseElem = document.querySelector(".house");
  const barElem = document.querySelector(".progress-bar");
  const selectCharacterElem = document.querySelector(".select-character");

  const mousePos = { x: 0, y: 0 };
  let maxScrollValue = 0;

  function resizeHandler() {
    maxScrollValue = document.body.offsetHeight - window.innerHeight;
  }

  // 스크롤
  window.addEventListener("scroll", function () {
    const scrollPer = scrollY / maxScrollValue;
    const zMove = scrollPer * 980 - 490;
    houseElem.style.transform = `translateZ(${zMove}vw)`;

    //progress bar
    barElem.style.width = `${scrollPer * 100}%`;
  });

  // 마우스 커서 위치
  window.addEventListener("mousemove", function (e) {
    mousePos.x = -1 + (e.clientX / this.window.innerWidth) * 2;
    mousePos.y = 1 - +(e.clientY / this.window.innerHeight) * 2;

    stageElem.style.transform = `rotateX(${mousePos.y * 5}deg) rotateY(${
      mousePos.x * 5
    }deg)`;
  });

  // 윈도우 창 변경될 때,
  window.addEventListener("resize", resizeHandler);

  // 캐릭터 생성
  stageElem.addEventListener("click", function (e) {
    new Character({
      xPos: (e.clientX / window.innerWidth) * 100,
      speed: Math.random() * 0.4 + 0.2,
    });
  });

  selectCharacterElem.addEventListener("click", function (e) {
    const value = e.target.getAttribute("data-char");
    document.body.setAttribute("data-char", value);
  });

  // 처음 한번 실행
  resizeHandler();
})();
