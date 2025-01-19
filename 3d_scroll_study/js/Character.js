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

    // 초기화 메서드 호출
    this.init(info);
  }

  // init 메서드 정의
  init(info) {
    const self = this;

    window.addEventListener("scroll", function () {
      this.clearTimeout(self.scrollState);
      if (!self.scrollState) {
        self.mainElem.classList.add("running");
      }

      self.scrollState = this.setTimeout(function () {
        self.scrollState = false;
        self.mainElem.classList.remove("running");
      }, 500);

      if (self.lastScrollTop > scrollY) {
        // 스크롤 올림
        self.mainElem.setAttribute("data-direction", "backward");
      } else {
        // 스크롤 내림
        self.mainElem.setAttribute("data-direction", "forward");
      }

      self.lastScrollTop = scrollY;
    });
  }
}
