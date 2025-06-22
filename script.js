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
      showDialog('Erro! :(', 'Certifique-se de que todos os campos estão preenchidos com números válidos.');
      return;
    }

    const resultado = valor * Math.pow(1 + taxa, tempo);
    showDialog(`Resultado: R$ ${resultado.toFixed(2)}`, 'Juros: R$ ' + (resultado - valor).toFixed(2));
});

function showDialog(message, message2) {
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
    overlay.style.zIndex = 1000;

    // Cria a caixa de diálogo
    const dialog = document.createElement('div');
    dialog.style.background = '#fff';
    dialog.style.padding = '24px 32px';
    dialog.style.borderRadius = '8px';
    dialog.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
    dialog.style.textAlign = 'center';

    const msg = document.createElement('p');
    msg.textContent = message;
    const msg2 = document.createElement('p');
    msg2.textContent = message2;

    msg.style.fontSize = '18px';
    msg2.style.fontSize = '16px';
    
    const btn = document.createElement('button');
    btn.textContent = 'Fechar';
    btn.style.marginTop = '16px';
    btn.onclick = function() {
      document.body.removeChild(overlay);
    };

    dialog.appendChild(msg);
    dialog.appendChild(msg2);
    dialog.appendChild(btn);
    overlay.appendChild(dialog);
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
}

