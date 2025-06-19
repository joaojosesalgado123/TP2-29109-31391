class Aliado extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'aliadoNormal');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.scene = scene;
    this.setScale(0.6);
    this.range = 200;
    this.cooldown = 1000;
    this.lastShot = 0;
    this.upgraded = false;

    // Progresso individual (por acerto)
    this.progress = 0;
    this.progressMax = 5;

    // Barra de progresso (gráfico)
    this.barra = scene.add.graphics();
    this.updateBarra();

    // Adiciona a interação do clique
    this.setInteractive({ useHandCursor: true });
    this.on('pointerdown', this.tentarEvoluir, this); // Agora ao clicar, tenta evoluir
  }

  updateBarra() {
    this.barra.clear();
    this.barra.fillStyle(0x000000, 0.4);
    this.barra.fillRect(this.x - 20, this.y + 35, 40, 5);
    this.barra.fillStyle(0x00ff00, 1);
    this.barra.fillRect(this.x - 20, this.y + 35, (40 * this.progress) / this.progressMax, 5);
  }

  // Método para tentar evoluir o aliado
  tentarEvoluir() {
    if (this.upgraded) return; // Se já estiver evoluído, não faz nada

    if (this.scene.moedas >= 15) {
      // Se o jogador tiver 15 moedas
      this.scene.moedas -= 15; // Deduz 15 moedas
      this.scene.textoMoedas.setText(this.scene.moedas); // Atualiza o texto de moedas
      this.evoluir(); // Evolui o aliado
    } else {
      // Se não tiver moedas suficientes
      alert('Não tens moedas suficientes para evoluir!');
    }
  }

  evoluir() {
    this.setTexture('aliado3');  // Muda a textura do aliado
    this.cooldown = 500;  // Diminui o tempo de cooldown
    this.upgraded = true;  // Marca o aliado como evoluído
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    const alvo = this.scene.inimigos.getChildren().find(i =>
      Phaser.Math.Distance.Between(this.x, this.y, i.x, i.y) <= this.range
    );

    if (alvo) {
      const angulo = Phaser.Math.Angle.Between(this.x, this.y, alvo.x, alvo.y);
      this.setRotation(angulo);

      if (time > this.lastShot + this.cooldown) {
        const bala = new Bala(this.scene, this.x, this.y, alvo);
        bala.dono = this; // importante para progresso por acerto
        this.scene.balas.add(bala);
        this.lastShot = time;
      }
    }
  }

  destroy(fromScene) {
    if (this.barra) this.barra.destroy();
    super.destroy(fromScene);
  }
}
