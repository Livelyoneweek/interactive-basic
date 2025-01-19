class Character {
  constructor(info) {
    this.mainElem = document.createElement("div");
    this.mainElem.classList.add("character");
    this.mainElem.innerHTML = `
      <div class="character-face-con character-head">
        <div class="character-face character-head-face face-front"></div>
        <div class="character-face character-head-face face-back"></div>
      </div>
      <div class="character-face-con character-torso">
        <div class="character-face character-torso-face face-front"></div>
        <div class="character-face character-torso-face face-back"></div>
      </div>
      <div class="character-face-con character-arm character-arm-right">
        <div class="character-face character-arm-face face-front"></div>
        <div class="character-face character-arm-face face-back"></div>
      </div>
      <div class="character-face-con character-arm character-arm-left">
        <div class="character-face character-arm-face face-front"></div>
        <div class="character-face character-arm-face face-back"></div>
      </div>
      <div class="character-face-con character-leg character-leg-right">
        <div class="character-face character-leg-face face-front"></div>
        <div class="character-face character-leg-face face-back"></div>
      </div>
      <div class="character-face-con character-leg character-leg-left">
        <div class="character-face character-leg-face face-front"></div>
        <div class="character-face character-leg-face face-back"></div>
      </div>
    `;

    document.querySelector(".stage").appendChild(this.mainElem);
    this.mainElem.style.left = `${info.xPos}%`;

    // 스크롤 상태
    this.scrollState = false;

    //바로 이전 스크롤 위치
    this.lastScrollTop = 0;

    this.xPos = info.xPos;
    this.speed = info.speed;

    this.direction;

    // 좌,우 키 누르고 있어도 한번만 실행되게
    this.runningState = false;
    this.rafId;

    // 초기화 메서드 호출
    this.init();
  }

  // init 메서드 정의
  init() {
    const self = this;

    window.addEventListener("scroll", function () {
      window.clearTimeout(self.scrollState);
      if (!self.scrollState) {
        self.mainElem.classList.add("running");
      }

      self.scrollState = window.setTimeout(function () {
        self.scrollState = false;
        self.mainElem.classList.remove("running");
      }, 500);

      if (self.lastScrollTop > window.scrollY) {
        self.mainElem.setAttribute("data-direction", "backward");
      } else {
        self.mainElem.setAttribute("data-direction", "forward");
      }

      self.lastScrollTop = window.scrollY;
    });

    window.addEventListener("keydown", function (e) {
      if (self.runningState) return;

      if (e.key === "ArrowLeft") {
        self.direction = "left";
        self.mainElem.setAttribute("data-direction", "left");
        self.mainElem.classList.add("running");
        self.run(self);
        self.runningState = true;
      } else if (e.key === "ArrowRight") {
        self.direction = "right";
        self.mainElem.setAttribute("data-direction", "right");
        self.mainElem.classList.add("running");
        self.run(self);
        self.runningState = true;
      }
    });

    window.addEventListener("keyup", function () {
      self.mainElem.classList.remove("running");
      cancelAnimationFrame(self.rafId);
      self.runningState = false;
    });
  }

  run = (self) => {
    if (self.direction == "left") {
      self.xPos = self.xPos - self.speed;
    } else if (self.direction == "right") {
      self.xPos = self.xPos + self.speed;
    }

    if (self.xPos < 2) {
      self.xPos = 2;
    }

    if (self.xPos > 88) {
      self.xPos = 88;
    }

    self.mainElem.style.left = `${self.xPos}%`;

    self.rafId = requestAnimationFrame(function () {
      self.run(self);
    });
  };
}
