export function renderPrivate(container) {
  container.innerHTML = `
    <div class="private-msg">
      <div class="private-msg__icon">🔒</div>
      <p class="private-msg__text">Você não é íntimo o suficiente para isso.</p>
      <p class="private-msg__hint">Continue explorando o quarto...</p>
    </div>`;
}
