class CenaBoot extends Phaser.Scene {
    constructor() {
      super('CenaBoot');
    }
  
    preload() {
      // Tiles principais
      this.load.image('relva', 'assets/relva.png');
      this.load.image('localAliado', 'assets/local_para_aliado.png');
      this.load.image('aliadoNormal', 'assets/aliado_normal.png');
      this.load.image('aliado3', 'assets/aliado3.png');
      this.load.image('inimigo_normal', 'assets/enimigo_normal.png');
      this.load.image('bala', 'assets/bala.png');
      this.load.image('baseAliado', 'assets/base_para_aliado.png');
      this.load.image('inimigo_tanque', 'assets/enimigo_tanque.png');
      this.load.image('inimigo_aviao', 'assets/enimigo_aviao.png');

      // Novo caminho simples (tile único para estrada)
      this.load.image('caminho', 'assets/caminho_simples.png');
  
      // (Opcional: efeitos antigos se ainda forem usados noutros lados)
      this.load.image('curva_direita_baixo', 'assets/curva_estrada_direita_baixo.png');
      this.load.image('curva_direita_cima', 'assets/curva_estrada_direita_cima.png');
      this.load.image('curva_esquerda_baixo', 'assets/curva_estrada_esquerda_baixo.png');
      this.load.image('curva_esquerda_cima', 'assets/curva_estrada_esquerda_cima.png');
      this.load.image('estrada_vertical', 'assets/estrada_vertical.png');

      this.load.image('arbusto1', 'assets/arbusto1.png');
      this.load.image('arbusto2', 'assets/arbusto2.png');
      this.load.image('arbusto3', 'assets/arbusto3.png');
      this.load.image('pedra1', 'assets/pedra1.png');
      this.load.image('pedra2', 'assets/pedra2.png');
      this.load.image('paus', 'assets/paus.png');
    }
  
    create() {
      this.scene.start('CenaMenu');
    }
  }
  