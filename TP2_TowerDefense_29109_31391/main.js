// 1. Define as classes de CenaMenu e CenaJogo (ou importa-as, se estiverem em ficheiros separados)

// Definindo CenaMenu
class CenaMenu extends Phaser.Scene {
    constructor() {
      super('CenaMenu');
    }
  
    preload() {
      this.load.image('relva', 'assets/relva.png'); // fundo, opcional
    }
  
    create() {
      // Fundo visual
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
      }).setOrigin(0.5).setInteractive({ useHandCursor: true });
  
      botao.on('pointerdown', () => {
        this.scene.start('CenaJogo');
      });
  
      botao.on('pointerover', () => botao.setStyle({ backgroundColor: '#0056b3' }));
      botao.on('pointerout', () => botao.setStyle({ backgroundColor: '#007bff' }));
    }
  }
  
  // Definindo CenaJogo
  class CenaJogo extends Phaser.Scene {
    constructor() {
      super('CenaJogo');
    }
  
    create() {
      // Inicializa moedas e outros elementos do jogo
      if (!this.textures.exists('moeda')) {
        const gfx = this.make.graphics({ x: 0, y: 0, add: false });
        gfx.fillStyle(0xf5c518, 1); // cor dourada
        gfx.fillCircle(10, 10, 10); // círculo com raio 10px
        gfx.generateTexture('moeda', 20, 20);
        gfx.destroy();
      }
  
      // Fundo de relva
      this.add.tileSprite(400, 300, 800, 600, 'relva');
      this.inimigos = this.physics.add.group();
      this.moedas = 20;
  
      // Ícone de moeda
      this.iconeMoeda = this.add.image(16, 16, 'moeda').setOrigin(0, 0);
      this.iconeMoeda.setScrollFactor(0);
  
      // Texto das moedas
      this.textoMoedas = this.add.text(40, 16, this.moedas, {
        fontSize: '22px',
        fill: '#fff',
        fontFamily: 'monospace',
        fontStyle: 'bold',
        stroke: '#000',
        strokeThickness: 4
      });
      this.textoMoedas.setScrollFactor(0);
  
      // Outras inicializações de jogo...
  
      // 🧱 Desenhar o caminho dos inimigos (exemplo)
      const caminhoTiles = [
        { x: 70, y: 600, rotation: 0, sprite: 'estrada_vertical' },
        { x: 70, y: 560, rotation: 0, sprite: 'estrada_vertical' },
        // ...
      ];
  
      caminhoTiles.forEach(tile => {
        const sprite = this.add.image(tile.x, tile.y, tile.sprite);
        sprite.setRotation(tile.rotation);
        sprite.setScale(0.6);
      });
  
      // Definição do caminho dos inimigos e outros elementos do jogo...
    }
  
    // Lógica de colisões, movimento dos inimigos, etc.
  }
    
  // 2. Configuração do Phaser com a ordem correta das cenas
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        debug: false
      }
    },
    scene: [CenaMenu, CenaJogo] // CenaMenu vem primeiro para ser carregada primeiro
  };
  
  // 3. Criação do jogo
  const game = new Phaser.Game(config);
  