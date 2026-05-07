const cities = {
  RHOBH: [
    { name: "Kyle Richards", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Kyle_Richards_2023.jpg/320px-Kyle_Richards_2023.jpg", votes: [8, 7, 9] },
    { name: "Garcelle Beauvais", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Garcelle_Beauvais_2022.jpg/320px-Garcelle_Beauvais_2022.jpg", votes: [9, 8, 8] },
    { name: "Dorit Kemsley", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Dorit_Kemsley_2023.jpg/320px-Dorit_Kemsley_2023.jpg", votes: [7, 8, 6] },
    { name: "Sutton Stracke", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Sutton_Stracke_2022.jpg/320px-Sutton_Stracke_2022.jpg", votes: [8, 7, 8] },
  ],
  RHOC: [
    { name: "Heather Dubrow", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Heather_Dubrow_2022.jpg/320px-Heather_Dubrow_2022.jpg", votes: [7, 8, 7] },
    { name: "Shannon Beador", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Shannon_Beador_2022.jpg/320px-Shannon_Beador_2022.jpg", votes: [8, 9, 7] },
    { name: "Tamra Judge", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Tamra_Judge_2022.jpg/320px-Tamra_Judge_2022.jpg", votes: [9, 8, 9] },
    { name: "Gina Kirschenheiter", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Gina_Kirschenheiter_2022.jpg/320px-Gina_Kirschenheiter_2022.jpg", votes: [6, 7, 7] },
  ],
  RHOSLC: [
    { name: "Heather Gay", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Heather_Gay_2023.jpg/320px-Heather_Gay_2023.jpg", votes: [8, 8, 9] },
    { name: "Lisa Barlow", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Lisa_Barlow_2023.jpg/320px-Lisa_Barlow_2023.jpg", votes: [9, 9, 8] },
    { name: "Whitney Rose", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Whitney_Rose_2023.jpg/320px-Whitney_Rose_2023.jpg", votes: [7, 8, 7] },
    { name: "Meredith Marks", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Meredith_Marks_2023.jpg/320px-Meredith_Marks_2023.jpg", votes: [8, 7, 8] },
  ],
};

let activeCity = "RHOBH";

const tabs = document.getElementById("city-tabs");
const chart = document.getElementById("chart");
const voteForm = document.getElementById("vote-form");
const cityTitle = document.getElementById("city-title");

function average(votes) {
  return votes.reduce((a, b) => a + b, 0) / votes.length;
}

function renderTabs() {
  tabs.innerHTML = "";
  Object.keys(cities).forEach((city) => {
    const btn = document.createElement("button");
    btn.className = `tab ${city === activeCity ? "active" : ""}`;
    btn.textContent = city;
    btn.onclick = () => {
      activeCity = city;
      render();
    };
    tabs.appendChild(btn);
  });
}

function renderChart() {
  chart.innerHTML = "";
  cities[activeCity].forEach((wife) => {
    const score = average(wife.votes);
    const wrap = document.createElement("article");
    wrap.className = "bar-wrap";

    wrap.innerHTML = `
      <div class="score-label">${score.toFixed(1)}/10</div>
      <div class="bar" style="height:${Math.max(30, score * 34)}px"></div>
      <img class="headshot" src="${wife.image}" alt="${wife.name} headshot" loading="lazy" />
      <div class="name">${wife.name}</div>
    `;
    chart.appendChild(wrap);
  });
}

function renderVoteForm() {
  voteForm.innerHTML = "";
  cities[activeCity].forEach((wife, idx) => {
    const row = document.createElement("div");
    row.className = "vote-row";

    row.innerHTML = `
      <label for="vote-${idx}">${wife.name}</label>
      <input id="vote-${idx}" type="number" min="1" max="10" value="8" />
      <button type="button">Submit Vote</button>
    `;
    row.querySelector("button").onclick = () => {
      const value = Number(row.querySelector("input").value);
      if (value < 1 || value > 10 || Number.isNaN(value)) return;
      wife.votes.push(value);
      renderChart();
    };

    voteForm.appendChild(row);
  });
}

function render() {
  cityTitle.textContent = activeCity;
  renderTabs();
  renderChart();
  renderVoteForm();
}

render();
