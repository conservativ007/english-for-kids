export const mobile = {
  mobile: false,
  setMobile(value) {
    this.mobile = value;
  },
  getMobile() {
    return this.mobile;
  }
}

export const desktop = {
  desktop: false,
  setDesktop(value) {
    this.desktop = value;
  },
  getDesktop() {
    return this.desktop;
  }
}

export let arrOfInnerNavbar = ["main", "space", "natural", "animals", "home", "colors", "emotion", "food", "city", ""];