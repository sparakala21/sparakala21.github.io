document.querySelectorAll('[data-expand]').forEach((btn) => {
  const panelId = btn.getAttribute('aria-controls');
  const panel = document.getElementById(panelId);
  if (!panel) return;

  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    const nextOpen = !isOpen;

    btn.setAttribute('aria-expanded', String(nextOpen));
    btn.classList.toggle('open', nextOpen);
    panel.classList.toggle('open', nextOpen);
    panel.setAttribute('aria-hidden', String(!nextOpen));
  });
});
