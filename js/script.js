let valor = document.getElementById("valor");
let resultado = document.getElementById("resultado");       
let calcular = document.getElementById("calcular");
let tempo = document.getElementById("tempo");
let taxa = document.getElementById("taxa");

document.getElementById('calcular').addEventListener('click', function() {
    const valor = parseFloat(document.getElementById('valor').value);
    const taxa = parseFloat(document.getElementById('taxa').value) / 100;
    const tempo = parseInt(document.getElementById('tempo').value, 10);

    if (isNaN(valor) || isNaN(taxa) || isNaN(tempo)) {
      showDialog('Erro! :(', 'Certifique-se de que todos os campos estão preenchidos com números válidos.', '', '');
      return;
    }

    const resultado = valor * Math.pow(1 + taxa, tempo);
    showDialog(
      `R$ ${resultado.toFixed(2)}`,
      `Juros recebidos: R$ ${(resultado - valor).toFixed(2)}`,
      `(em ${tempo} meses, a uma taxa de juros de ${(taxa * 100).toFixed(2)}% ao mês)`
    );
});

function showDialog(message, message2, message3) {
    // Cria o fundo escuro
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(0,0,0,0.5)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';


    // Cria a caixa de diálogo
    const dialog = document.createElement('div');
    dialog.style.background = '#fff';
    dialog.style.padding = '24px 32px';
    dialog.style.borderRadius = '8px';
    dialog.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)'; 
    dialog.style.textAlign = 'center';
    dialog.style.border = '7px solid rgb(196, 196, 196)';

    const title = document.createElement('h2');
    title.textContent = 'Resultado';
    const msg = document.createElement('p');
    msg.textContent = message;
    const subtitle = document.createElement('h3');
    subtitle.textContent = 'Detalhes';
    const msg2 = document.createElement('p');
    msg2.textContent = message2;
    const msg3 = document.createElement('p');
    msg3.textContent = message3;
    const img = document.createElement('img');
    img.src = '/assets/joker.png';

    title.style.color = 'black';
    msg.style.color = 'black';
    subtitle.style.color = 'black';
    msg2.style.color = 'black';
    msg3.style.color = 'black';

    const elements = [title, msg, subtitle, msg2, msg3];
    const originalTexts = elements.map(el => el.textContent);
    elements.forEach(el => el.textContent = '');

    function typeEffect(el, text, delay = 31.5) {
      return new Promise(resolve => {
        let i = 0;
        function typeChar() {
          if (i <= text.length) {
            el.textContent = text.slice(0, i);
            i++;
            setTimeout(typeChar, delay);
          } else {
            resolve();
          }
        }
        typeChar();
      });
    }

    async function typeAll() {
      for (let i = 0; i < elements.length; i++) {
        await typeEffect(elements[i], originalTexts[i]);
      }
    }

    typeAll();

    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.gap = '16px';

    img.style.width = '188px';
    img.style.height = '256px';

    container.appendChild(img);
    container.appendChild(dialog);

    overlay.appendChild(container);

    title.style.fontFamily = 'Inter, sans-serif';
    subtitle.style.fontFamily = 'Inter, sans-serif';
    msg.style.fontSize = '40px';

    msg.style.fontFamily = 'm6x11plus, sans-serif';
    msg2.style.fontSize = '20px';
    msg2.style.marginTop = '5px';

    const btn = document.createElement('button');
    btn.textContent = 'Fechar';
    btn.style.marginTop = '16px';
    btn.onclick = function() {
      document.body.removeChild(overlay);
    };

    dialog.appendChild(title);
    dialog.appendChild(msg);
    dialog.appendChild(subtitle);
    dialog.appendChild(msg2);
    dialog.appendChild(msg3);
    dialog.appendChild(btn);
    document.body.appendChild(overlay);

    dialog.animate(
    [
        { opacity: 0, transform: 'translateY(40px) scale(0.96)' },
        { opacity: 1, transform: 'translateY(0) scale(1)' }
    ],
    {
        duration: 400,
        easing: 'cubic-bezier(.22,1,.36,1)'
    }
    );

    img.animate(
      [
        { transform: 'rotate(-8deg)' },
        { transform: 'rotate(8deg)' },
        { transform: 'rotate(-8deg)' },
        { transform: 'rotate(8deg)' },
        { transform: 'rotate(0deg)' },
      ],
      {
        duration: 502,
        iterations: 7,
        easing: 'ease-in-out'
      }
    );

    const audio = document.createElement('audio');
    audio.src = '/assets/sounds/voices.mp3';
    audio.autoplay = true;
    audio.style.display = 'none';
    overlay.appendChild(audio);
}
  
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.navs').forEach(function(link, idx) {
      const sectionIds = ['inicio', 'one', 'two', 'three'];
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = sectionIds[idx];
        const target = document.getElementById(targetId) || document.getElementById('welcome');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  });