window.addEventListener('scroll', function() {
  const brief = document.getElementById('aboutBrief');
  const hobbies = document.getElementById('hobbiesSection');
  if(window.scrollY > 30) { // Any scroll triggers the effect
    brief.classList.add('hide');
    hobbies.classList.add('show');
  } else {
    brief.classList.remove('hide');
    hobbies.classList.remove('show');
  }
});
