const player = document.querySelector('.player');
    const video = player.querySelector('.viewer');
    const toggle = player.querySelector('.toggle');
    const volume = player.querySelector('.volume');
    const playbackSpeed = player.querySelector('.playbackSpeed');
    const skipButtons = player.querySelectorAll('[data-skip]');
    const progress = player.querySelector('.progress');
    const progressBar = player.querySelector('.progress__filled');

    // Play / Pause toggle
    function togglePlay() {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }

    // Update button icon
    function updateButton() {
      toggle.textContent = video.paused ? '►' : '❚ ❚';
    }

    // Skip video
    function skip(event) {
      const skipValue = parseFloat(event.target.dataset.skip);
      video.currentTime += skipValue;
    }

    // Volume control
    function handleVolume(event) {
      video.volume = event.target.value;
    }

    // Playback speed control
    function handleSpeed(event) {
      video.playbackRate = event.target.value;
    }

    // Update progress bar
    function handleProgress() {
      const percent = (video.currentTime / video.duration) * 100;
      progressBar.style.width = `${percent}%`;
    }

    // Scrub progress bar (seek)
    function scrub(event) {
      const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
      video.currentTime = scrubTime;
    }

    // Event listeners
    video.addEventListener('click', togglePlay);
    video.addEventListener('play', updateButton);
    video.addEventListener('pause', updateButton);
    video.addEventListener('timeupdate', handleProgress);

    toggle.addEventListener('click', togglePlay);
    skipButtons.forEach(button => button.addEventListener('click', skip));

    volume.addEventListener('input', handleVolume);
    playbackSpeed.addEventListener('input', handleSpeed);

    let mousedown = false;
    progress.addEventListener('click', scrub);
    progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
    progress.addEventListener('mousedown', () => mousedown = true);
    progress.addEventListener('mouseup', () => mousedown = false