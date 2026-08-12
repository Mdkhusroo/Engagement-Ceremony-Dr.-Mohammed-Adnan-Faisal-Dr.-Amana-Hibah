const openingScreen = document.getElementById("openingScreen");
const openInvitation = document.getElementById("openInvitation");

openInvitation.addEventListener("click", () => {
  openingScreen.classList.add("hidden");
  document.body.style.overflow = "auto";
});

document.body.style.overflow = "hidden";

const target = new Date("2026-09-02T20:00:00+05:30").getTime();

function updateCountdown() {
  const now = Date.now();
  const distance = target - now;

  if (distance <= 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);


// Invitation music: browsers require a user gesture, so music begins
// when the visitor presses "Open Invitation".
const bgMusic = document.getElementById("bgMusic");
const musicPlayer = document.getElementById("musicPlayer");
const musicToggle = document.getElementById("musicToggle");

async function playInvitationMusic() {
  try {
    await bgMusic.play();
    musicToggle.classList.add("playing");
    musicToggle.textContent = "❚❚";
    musicToggle.setAttribute("aria-label", "Pause music");
    musicPlayer.classList.add("visible");
  } catch (error) {
    musicPlayer.classList.add("visible");
  }
}

openInvitation.addEventListener("click", playInvitationMusic);

musicToggle.addEventListener("click", async () => {
  if (bgMusic.paused) {
    await playInvitationMusic();
  } else {
    bgMusic.pause();
    musicToggle.classList.remove("playing");
    musicToggle.textContent = "♫";
    musicToggle.setAttribute("aria-label", "Play music");
  }
});
