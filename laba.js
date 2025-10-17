const treki = [
    {
      title: "Letyat poeza",
      artist: "Elvira T, MVGMA",
      src: "music/Elvira T, MVGMA - Летят поезда (Remix) (zaycev.net).mp3",
      cover: "covers/train.webp",
      lyrics: "Шёпот, губы, ты мир хрупкий...\nЛетят поезда, самолёты плывут...\n"
    },
    {
        title: "Песня Лабубу",
        artist: "Алиса Шмелева",
        src: "music/Алиса Шмелева - Песня Лабубу (zaycev.net).mp3",
        cover: "covers/labubu.webp",
        lyrics: "Ты хочешь подкатить, но ты совсем ведь не плюшевый...\nВау! Лабу, лабу-бу, лабу, лабу...\n"
      },
      
    {
      title: "Фонк по дорогам",
      artist: "МУЗЫКА В МАШИНУ",
      src: "music/МУЗЫКА В МАШИНУ - Фонк по дорогам (zaycev.net).mp3",
      cover: "covers/car.webp",
      lyrics: "текст песни Фонк по дорогам"
    }
  ];
  
  
  let tekIndex = 0;
  
  const spisok = document.getElementById("spisok");
  const blok1 = document.getElementById("blok1");
  const blok2 = document.getElementById("blok2");
  const audio = document.getElementById("audio");
  const oblozhka = document.getElementById("oblozhka");
  const nazvanie = document.getElementById("nazvanie");
  const ispolnitel = document.getElementById("ispolnitel");
  const gromkost = document.getElementById("gromkost");
  
  treki.forEach((trek, i) => {
    const li = document.createElement("li");
    li.textContent = trek.title + " — " + trek.artist;
    li.onclick = () => igrat(i);
    spisok.appendChild(li);
  });
  
  function igrat(i) {
    tekIndex = i;
    const trek = treki[i];
    oblozhka.src = trek.cover;
    nazvanie.textContent = trek.title;
    ispolnitel.textContent = trek.artist;
    audio.src = trek.src;
    blok1.classList.remove("aktiv");
    blok2.classList.add("aktiv");
    document.getElementById("tekst").textContent = "";
    audio.play();
  }
  
  function pauzaIliPlay() {
    if (audio.paused) audio.play();
    else audio.pause();
  }
  
  function pred() {
    tekIndex = (tekIndex - 1 + treki.length) % treki.length;
    igrat(tekIndex);
  }
  
  function sled() {
    tekIndex = (tekIndex + 1) % treki.length;
    igrat(tekIndex);
  }
  
  function peremeshat() {
    if (treki.length === 0) return;
    let rand = Math.floor(Math.random() * treki.length);
    if (treki.length > 1 && rand === tekIndex) {
      rand = (rand + 1) % treki.length;
    }
    igrat(rand);
    treki.sort(() => Math.random() - 0.5);
    spisok.innerHTML = "";
    treki.forEach((trek, i) => {
      const li = document.createElement("li");
      li.textContent = trek.title + " — " + trek.artist;
      li.onclick = () => igrat(i);
      spisok.appendChild(li);
    });
  }
  
  gromkost.addEventListener("input", () => {
    audio.volume = gromkost.value;
  });
  
  function pokazatTekst() {
    const trek = treki[tekIndex];
    const tekstDiv = document.getElementById("tekst");
    tekstDiv.textContent = trek.lyrics || "Текст недоступен";
  }
  
  function skachat() {
    const trek = treki[tekIndex];
    const a = document.createElement("a");
    a.href = trek.src;
    a.download = trek.title + ".mp3";
    a.click();
  }
  