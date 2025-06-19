class Inimigo extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, tipo = 'normal') {
    let spriteKey = 'inimigo_normal';
    super(scene, x, y, spriteKey);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setScale(0.6);
    this.scene = scene;

    this.tipo = tipo;

    // Define a vida máxima com base no tipo
    this.hpMax = tipo === 'tanque' ? 20 : (tipo === 'aviao' ? 3 : 5);
    this.hp = this.hpMax;

    // Textura correta consoante o tipo
    if (tipo === 'tanque') {
      this.setTexture('inimigo_tanque');
    } else if (tipo === 'aviao') {
      this.setTexture('inimigo_aviao');
      

      // Movimento para aviões
      const alvoX = scene.sys.canvas.width + 50;
      const alvoY = Phaser.Math.Between(50, scene.sys.canvas.height - 50);
      scene.physics.moveTo(this, alvoX, alvoY, 100);
    } else {
      this.setTexture('inimigo_normal');
    }

    // Criação da barra de vida
    this.barraVida = scene.add.graphics();
    this.updateBarraVida();
  }

  updateBarraVida() {
    if (!this.barraVida) return;

    this.barraVida.clear();

    const largura = 40;
    const altura = 5;
    const offsetY = 30;
    const percentagem = Phaser.Math.Clamp(this.hp / this.hpMax, 0, 1);

    // Fundo
    this.barraVida.fillStyle(0x000000, 0.8);
    this.barraVida.fillRect(this.x - largura / 2, this.y - offsetY, largura, altura);

    // Vida
    this.barraVida.fillStyle(0xff0000, 1);
    this.barraVida.fillRect(this.x - largura / 2, this.y - offsetY, largura * percentagem, altura);
  }

  hit(dano) {
    this.hp -= dano;
    if (this.hp <= 0) {
      this.destroy();
    } else {
      this.updateBarraVida();
    }
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    // Atualizar a posição da barra a cada frame
    this.updateBarraVida();

    // Remover barra se o inimigo morreu
    if (this.hp <= 0 && this.barraVida) {
      this.barraVida.destroy();
      this.barraVida = null;
    }
  }

  destroy(fromScene) {
    if (this.barraVida) {
      this.barraVida.destroy();
      this.barraVida = null;
    }
    super.destroy(fromScene);
  }
}
