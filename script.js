document.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector('.viewer');
  const toggle = document.querySelector('.toggle');
  const skipButtons = document.querySelectorAll('[data-skip]');
  const volumeSlider = document.querySelector('.volume');
  const speedSlider = document.querySelector('.playbackSpeed');
  const progress = document.querySelector('.progress');
  const progressFilled = document.querySelector('.progress__filled');

  let isMouseDown = false;

  // Toggle play/pause
  function togglePlay() {
    video.paused ? video.play() : video.pause();
  }

  // Update button icon
  function updateButton() {
    toggle.textContent = video.paused ? '►' : '❚ ❚';
  }

  // Skip video
  function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
  }

  // Volume & Speed
  function handleRangeUpdate() {
    video[this.name] = this.value;
  }

  // Progress bar update
  function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressFilled.style.width = `${percent}%`;
  }

  // Scrubbing
  function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
  }

  // Event listeners
  video.addEventListener('click', togglePlay);
  video.addEventListener('play', updateButton);
  video.addEventListener('pause', updateButton);
  video.addEventListener('timeupdate', handleProgress);

  toggle.addEventListener('click', togglePlay);
  skipButtons.forEach(button => button.addEventListener('click', skip));
  volumeSlider.addEventListener('input', handleRangeUpdate);
  speedSlider.addEventListener('input', handleRangeUpdate);

  progress.addEventListener('click', scrub);
  progress.addEventListener('mousedown', () => isMouseDown = true);
  progress.addEventListener('mouseup', () => isMouseDown = false);
  progress.addEventListener('mousemove', (e) => isMouseDown && scrub(e));
});
