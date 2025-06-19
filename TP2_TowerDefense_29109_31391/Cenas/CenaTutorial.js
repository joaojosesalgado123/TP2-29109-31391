class CenaTutorial extends Phaser.Scene {
  constructor() {
    super('CenaTutorial');
  }

  create() {
    // 1) Fundo
    this.add.tileSprite(400, 300, 800, 600, 'relva');

    // 2) Painel semi-transparente
    const x0 = 100, y0 = 100;
    const largura = 600, altura = 400;
    const graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 0.6);
    graphics.fillRect(x0, y0, largura, altura);

    // 3) Cabeçalho
    this.add.text(400, y0 + 40, 'COMO JOGAR', {
      fontSize: '36px',
      fill: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    }).setOrigin(0.5, 0);

    // 4) Texto com wordWrap
    const instrucoes = [
      '1. Clique num dos pontos para colocar uma torre (custa 10 moedas).',
      '2. Cada torre atira automaticamente.',
      '3. Acumule moedas destruindo inimigos (+5 cada).',
      '4. Clique no aliado para evoluir (custa 15 moedas).',
      '5. Impede que os inimigos cheguem ao fim do caminho!'
    ].join('\n\n');

    this.add.text(x0 + 20, y0 + 100, instrucoes, {
      fontSize: '24px',
      fill: '#ffffff',
      fontFamily: 'Arial',
      align: 'left',
      wordWrap: {
        width: largura - 40,
        useAdvancedWrap: true
      }
    });

    // 5) Botão COMEÇAR JOGO
    const btnY = y0 + altura + 50;
    const btn = this.add.text(400, btnY, 'COMEÇAR JOGO', {
      fontSize: '28px',
      fill: '#ffffff',
      backgroundColor: '#28a745',
      padding: { x: 20, y: 10 }
    })
    .setOrigin(0.5, 1)
    .setInteractive({ useHandCursor: true });

    btn.on('pointerover',  () => btn.setStyle({ backgroundColor: '#218838' }));
    btn.on('pointerout',   () => btn.setStyle({ backgroundColor: '#28a745' }));
    btn.on('pointerdown', () => this.scene.start('CenaJogo'));
  }
}
window.CenaTutorial = CenaTutorial;
