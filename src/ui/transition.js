const delay = ms => new Promise(r => setTimeout(r, ms));

export async function playCRTTransition(username) {
  const form  = document.getElementById('monitorForm');
  const boot  = document.getElementById('monitorBoot');
  const l1    = document.getElementById('bootLine1');
  const l2    = document.getElementById('bootLine2');
  const l3    = document.getElementById('bootLine3');
  const txt   = document.getElementById('bootText');

  // Esconde o formulário imediatamente e mostra o boot
  form.setAttribute('hidden', '');

  boot.removeAttribute('hidden');

  await delay(100);  l1.style.width = '100%';
  await delay(220);  l2.style.width = '100%';
  await delay(220);  l3.style.width = '100%';
  await delay(120);  txt.textContent = '◉ INICIALIZANDO...';
  await delay(600);  txt.textContent = `◉ BEM-VINDO(A), ${username.toUpperCase()}`;
  await delay(700);

  // Restaura estado para próximo uso
  boot.setAttribute('hidden', '');
  l1.style.width = l2.style.width = l3.style.width = '0%';
  txt.textContent = '';
  form.removeAttribute('hidden');
}
