class CenaMenu extends Phaser.Scene {
    constructor() {
      super('CenaMenu');
    }
  
    create() {

      // Fundo visual (podes personalizar)
      this.add.tileSprite(400, 300, 800, 600, 'relva');
  
      // Título
      this.add.text(400, 200, 'DEFENDE O CAMINHO', {
        fontSize: '40px',
        fill: '#ffffff',
        fontFamily: 'Arial',
        fontStyle: 'bold'
      }).setOrigin(0.5);
  
      // Botão JOGAR
      const botao = this.add.text(400, 300, 'JOGAR', {
        fontSize: '28px',
        fill: '#ffffff',
        backgroundColor: '#007bff',
        padding: { x: 20, y: 10 }
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });
  
  
      //Eventos do botão
      botao.on('pointerover',  () => botao.setStyle({ backgroundColor: '#0056b3' }));
      botao.on('pointerout',   () => botao.setStyle({ backgroundColor: '#007bff' }));
      botao.on('pointerdown', () => {
        this.scene.start('CenaTutorial');  // ou 'CenaJogo' para saltar o tutorial
      });
    }
  }
  window.CenaMenu = CenaMenu;