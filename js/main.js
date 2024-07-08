document.querySelector("button").onclick = function () {
  this.classList.toggle("active");
};

let pickBtn = document.querySelectorAll(".pick-btn");
let pickActive = "";
let num = 0;
pickBtn.forEach((btn) => {
  btn.onclick = function () {
    pickBtn.forEach((btn) => {
      btn.classList.remove("active");
    });
    this.classList.add("active");

    if (this.classList.contains("active")) {
      pickActive = this.textContent;
    }
    if (pickActive === "Moon") {
      num = 0;
    }
    if (pickActive === "Mars") {
      num = 1;
    }
    if (pickActive === "Europa") {
      num = 2;
    }
    if (pickActive === "Titan") {
      num = 3;
    }
    fetchData();
    // console.log(pickActive);
  };
});

let navLink = document.querySelectorAll(".nav-link");
let pageName = "";
let regex = /[a-z]+/gi;
for (let i = 0; i < navLink.length; i++) {
  if (navLink[i].classList.contains("active")) {
    pageName = navLink[i].textContent.match(regex).toString().toLowerCase();
    // console.log(pageName);
  }
}

let bullets = document.querySelectorAll(".bullets li");
let imgNum = 4;
let bulletNum = 4;
function changeCrew() {
  if (imgNum >= 0) {
    imgNum--;
    document.querySelector(".crew-image").src = crewImg[imgNum];
    document.querySelector(".name").textContent = crewName[imgNum];
    document.querySelector(".role").textContent = crewRole[imgNum];
    document.querySelector(".bio").textContent = crewBio[imgNum];
    bulletNum--;
    bullets.forEach((bullet) => {
      bullet.classList.remove("active");
    });
    bullets[bulletNum].classList.add("active");
  }
  if (imgNum === 0 && bulletNum === 0) {
    imgNum = 4;
    bulletNum = 4;
  }
  // console.log(imgNum);
}

let crewImg = [];
let crewName = [];
let crewRole = [];
let crewBio = [];

async function fetchData() {
  try {
    let data = await fetch("./data.json");
    // console.log(data);
    let dataJson = await data.json();
    // console.log(dataJson.destinations[0]);

    if (pageName === "home") {
      document.querySelector(".explore button").onclick = function () {
        location.href = "/destination-mars.html";
      };
    }

    if (pageName === "destination") {
      for (let i = 0; i < dataJson.destinations.length; i++) {
        // console.log(dataJson.destinations[i]);
        if (dataJson.destinations[i].name === pickActive) {
          document.querySelector(".destination-image").src =
            dataJson.destinations[num].images.png;
          document.querySelector(".name").textContent =
            dataJson.destinations[num].name;
          document.querySelector(".description").textContent =
            dataJson.destinations[num].description;
          document.querySelector(".distance").textContent =
            dataJson.destinations[num].distance;
          document.querySelector(".travel").textContent =
            dataJson.destinations[num].travel;
        }
      }
    }

    if (pageName === "crew") {
      for (let i = 0; i < dataJson.crew.length; i++) {
        crewImg.push(dataJson.crew[i].images.png);
        crewName.push(dataJson.crew[i].name);
        crewRole.push(dataJson.crew[i].role);
        crewBio.push(dataJson.crew[i].bio);
      }
      let stop = setInterval(changeCrew, 2000);
      let dataNum = 3;

      bullets.forEach((btn) => {
        btn.onclick = function () {
          bullets.forEach((btn) => {
            btn.classList.remove("active");
          });
          this.classList.add("active");
          if (this.classList.contains("active")) {
            dataNum = +this.dataset.num;
            // console.log(dataNum);
          }
          clearInterval(stop);
          // fetchData();
          document.querySelector(".crew-image").src =
            dataJson.crew[dataNum].images.png;
          document.querySelector(".name").textContent =
            dataJson.crew[dataNum].name;
          document.querySelector(".role").textContent =
            dataJson.crew[dataNum].role;
          document.querySelector(".bio").textContent =
            dataJson.crew[dataNum].bio;
        };
      });
    }

    if (pageName === "technology") {
      let technologyBtn = document.querySelectorAll(".technology .num li span");
      let technologyNum = 0;
      technologyBtn.forEach((num) => {
        num.onclick = function () {
          technologyBtn.forEach((num) => {
            num.classList.remove("active");
          });
          this.classList.add("active");
          technologyNum = +this.textContent - 1;
          document.querySelector(".portrait").src =
            dataJson.technology[technologyNum].images.portrait;
          document.querySelector(".landscape").src =
            dataJson.technology[technologyNum].images.landscape;
          document.querySelector(".name").textContent =
            dataJson.technology[technologyNum].name;
          document.querySelector(".description").textContent =
            dataJson.technology[technologyNum].description;
        };
      });
    }
  } catch {
    console.log(Error("data not found"));
  }
}
fetchData();
