class Bala extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, alvo) {
    // Criar textura dinâmica se ainda não existir
    const key = 'bala_circulo';
    if (!scene.textures.exists(key)) {
      const gfx = scene.make.graphics({ x: 0, y: 0, add: false });
      gfx.fillStyle(0x000000, 1); // preto
      gfx.fillCircle(5, 5, 5);    // círculo com raio 5px
      gfx.generateTexture(key, 10, 10); // tamanho da textura
      gfx.destroy(); // já não é necessário
    }

    super(scene, x, y, key);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setScale(1);
    this.alvo = alvo;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (!this.alvo || !this.alvo.active) {
      this.destroy();
      return;
    }

    this.scene.physics.moveToObject(this, this.alvo, 300);
    const angulo = Phaser.Math.Angle.Between(this.x, this.y, this.alvo.x, this.alvo.y);
    this.setRotation(angulo);

    const dist = Phaser.Math.Distance.Between(this.x, this.y, this.alvo.x, this.alvo.y);
    if (dist < 12) {
      this.alvo.hit(1);
      this.destroy();
    }
  }
}
