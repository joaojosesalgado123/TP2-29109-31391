class CenaJogo extends Phaser.Scene {
    constructor() {
      super('CenaJogo');
    }
  
    create() {
      // Criar moeda
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
      // Inicializa moedas
      this.moedas = 20;

      // Contador total de inimigos mortos
      this.totalKilled = 0;
      // Flag para saber se o boss já foi lançado
      this.bossSpawned = false;

      // Desenhar ícone da "moeda"
      this.iconeMoeda = this.add.image(16, 16, 'moeda').setOrigin(0, 0);
      this.iconeMoeda.setScrollFactor(0);

      // Texto ao lado do ícone
      this.textoMoedas = this.add.text(40, 16, this.moedas, {
        fontSize: '22px',
        fill: '#fff',
        fontFamily: 'monospace',
        fontStyle: 'bold',
        stroke: '#000',
        strokeThickness: 4
      });
      this.textoMoedas.setScrollFactor(0);

      this.balas = this.physics.add.group();
  
      // 🧱 Desenhar o caminho usando caminho_simples.png
      const caminhoTiles = [
        { x: 70, y: 600, rotation: 0, sprite: 'estrada_vertical' },
        { x: 70, y: 560, rotation: 0, sprite: 'estrada_vertical' },
        { x: 70, y: 520, rotation: 0, sprite: 'estrada_vertical' },
        { x: 70, y: 480, rotation: 0, sprite: 'estrada_vertical' },
        { x: 70, y: 440, rotation: 0, sprite: 'estrada_vertical' },
        { x: 70, y: 390, rotation: 0, sprite: 'curva_direita_cima' },
        { x: 140, y: 390, rotation: Phaser.Math.DegToRad(90), sprite: 'estrada_vertical' },
        { x: 190, y: 390, rotation: 0, sprite: 'curva_esquerda_baixo' },
        { x: 190, y: 320, rotation: 0, sprite: 'estrada_vertical' },
        { x: 190, y: 280, rotation: 0, sprite: 'estrada_vertical' },
        { x: 190, y: 240, rotation: 0, sprite: 'estrada_vertical' },
        { x: 190, y: 200, rotation: 0, sprite: 'estrada_vertical' },
        { x: 190, y: 160, rotation: 0, sprite: 'estrada_vertical' },
        { x: 190, y: 100, rotation: 0, sprite: 'curva_direita_cima' },
        { x: 260, y: 100, rotation: Phaser.Math.DegToRad(90), sprite: 'estrada_vertical' },
        { x: 310, y: 100, rotation: Phaser.Math.DegToRad(90), sprite: 'estrada_vertical' },
        { x: 350, y: 100, rotation: Phaser.Math.DegToRad(90), sprite: 'estrada_vertical' },
        { x: 390, y: 100, rotation: Phaser.Math.DegToRad(90), sprite: 'estrada_vertical' },
        { x: 430, y: 100, rotation: Phaser.Math.DegToRad(90), sprite: 'estrada_vertical' },
        { x: 470, y: 100, rotation: Phaser.Math.DegToRad(90), sprite: 'estrada_vertical' },
        { x: 510, y: 100, rotation: Phaser.Math.DegToRad(90), sprite: 'estrada_vertical' },
        { x: 540, y: 100, rotation: Phaser.Math.DegToRad(90), sprite: 'estrada_vertical' },
        { x: 580, y: 100, rotation: Phaser.Math.DegToRad(90), sprite: 'estrada_vertical' },
        { x: 620, y: 100, rotation: Phaser.Math.DegToRad(90), sprite: 'estrada_vertical' },
        { x: 660, y: 100, rotation: 0, sprite: 'curva_esquerda_cima' },
        { x: 660, y: 170, rotation: 0, sprite: 'estrada_vertical' },
        { x: 660, y: 240, rotation: 0, sprite: 'estrada_vertical' },
        { x: 660, y: 260, rotation: 0, sprite: 'curva_esquerda_baixo' },
        { x: 590, y: 260, rotation: Phaser.Math.DegToRad(90), sprite: 'estrada_vertical' },
        { x: 530, y: 260, rotation: Phaser.Math.DegToRad(90), sprite: 'estrada_vertical' },
        { x: 460, y: 260, rotation: Phaser.Math.DegToRad(90), sprite: 'estrada_vertical' },
        { x: 420, y: 260, rotation: Phaser.Math.DegToRad(90), sprite: 'estrada_vertical' },
        { x: 360, y: 260, rotation: 0, sprite: 'curva_direita_cima' },
        { x: 360, y: 330, rotation: 0, sprite: 'estrada_vertical' },
        { x: 360, y: 380, rotation: 0, sprite: 'estrada_vertical' },
        { x: 360, y: 420, rotation: 0, sprite: 'estrada_vertical' },
        { x: 360, y: 460, rotation: 0, sprite: 'estrada_vertical' },
        { x: 360, y: 490, rotation: 0, sprite: 'curva_direita_baixo' },
        { x: 430, y: 490, rotation: Phaser.Math.DegToRad(90), sprite: 'estrada_vertical' },
        { x: 490, y: 490, rotation: 0, sprite: 'curva_esquerda_baixo' },
        { x: 490, y: 420, rotation: 0, sprite: 'estrada_vertical' },
        { x: 490, y: 380, rotation: 0, sprite: 'curva_direita_cima' },
        { x: 560, y: 380, rotation: Phaser.Math.DegToRad(90), sprite: 'estrada_vertical' },
        { x: 580, y: 380, rotation: Phaser.Math.DegToRad(90), sprite: 'estrada_vertical' },
        { x: 620, y: 380, rotation: Phaser.Math.DegToRad(90), sprite: 'estrada_vertical' },
        { x: 660, y: 380, rotation: 0, sprite: 'curva_esquerda_cima' },
        { x: 660, y: 450, rotation: 0, sprite: 'estrada_vertical' },
        { x: 660, y: 470, rotation: 0, sprite: 'estrada_vertical' },
        { x: 660, y: 490, rotation: 0, sprite: 'curva_direita_baixo' },
        { x: 730, y: 490, rotation: Phaser.Math.DegToRad(90), sprite: 'estrada_vertical' },
        { x: 790, y: 490, rotation: Phaser.Math.DegToRad(90), sprite: 'estrada_vertical' },
      ];
  
      caminhoTiles.forEach(tile => {
        const sprite = this.add.image(tile.x, tile.y, tile.sprite);
        sprite.setRotation(tile.rotation);
        sprite.setScale(0.6);
      });

// Locais dos aliados

      this.locaisAliado = [
        { x: 250, y: 350 },
        { x: 305, y: 520 },
        { x: 100, y: 200 },
        { x: 550, y: 180 },
        { x: 550, y: 35 },
        { x: 200, y: 35 },
        { x: 750, y: 300 },
        { x: 750, y: 400 },
        { x: 570, y: 450 },
        { x: 425, y: 330 },
      ];
      this.locaisAliado.forEach(loc => {
        const local = this.add.image(loc.x, loc.y, 'localAliado').setInteractive();
        local.setScale(0.5);
        local.colocado = false;
      
        local.on('pointerdown', () => {
          if (!local.colocado && this.moedas >= 10) {
            const baseAliado = this.add.image(loc.x, loc.y, 'baseAliado');
            baseAliado.setScale(0.5);
      
            const aliado = new Aliado(this, loc.x, loc.y);
            this.children.bringToTop(aliado);
      
            this.moedas -= 10;
            this.textoMoedas.setText(+ this.moedas);
      
            local.colocado = true;
          }
        });
      });
      
// 🌿 Decoração com arbustos, pedras e paus
const decoracoes = [
    { x: 100, y: 100 },
    { x: 350, y: 30 },
    { x: 450, y: 180 },
    { x: 700, y: 560 },
    { x: 750, y: 200 },
    { x: 600, y: 320 },
    { x: 420, y: 570 },
    { x: 425, y: 420 },
    { x: 250, y: 450 },
    { x: 150, y: 500 },
    { x: 90, y: 300 },
    { x: 290, y: 200 },
    { x: 570, y: 550 },
    { x: 740, y: 60 },
  ];
  
  decoracoes.forEach((pos, index) => {
    const sprites = ['pedra1', 'pedra2', 'arbusto3', 'paus','arbusto1'];
    const spriteKey = sprites[index % sprites.length];
    this.add.image(pos.x, pos.y, spriteKey).setScale(0.5);
  });
 
      // 📍 Caminho real dos inimigos
      // 📍 Caminho real dos inimigos
this.pathPoints = [
    { x: 70, y: 600 },
    { x: 70, y: 560 },
    { x: 70, y: 520 },
    { x: 70, y: 480 },
    { x: 70, y: 440 },
    { x: 70, y: 390 },
    { x: 140, y: 390 },
    { x: 190, y: 390 },
    { x: 190, y: 320 },
    { x: 190, y: 280 },
    { x: 190, y: 240 },
    { x: 190, y: 200 },
    { x: 190, y: 160 },
    { x: 190, y: 100 },
    { x: 260, y: 100 },
    { x: 310, y: 100 },
    { x: 350, y: 100 },
    { x: 390, y: 100 },
    { x: 430, y: 100 },
    { x: 470, y: 100 },
    { x: 510, y: 100 },
    { x: 540, y: 100 },
    { x: 580, y: 100 },
    { x: 620, y: 100 },
    { x: 660, y: 100 },
    { x: 660, y: 170 },
    { x: 660, y: 240 },
    { x: 660, y: 260 },
    { x: 590, y: 260 },
    { x: 530, y: 260 },
    { x: 460, y: 260 },
    { x: 420, y: 260 },
    { x: 360, y: 260 },
    { x: 360, y: 330 },
    { x: 360, y: 380 },
    { x: 360, y: 420 },
    { x: 360, y: 460 },
    { x: 360, y: 490 },
    { x: 430, y: 490 },
    { x: 490, y: 490 },
    { x: 490, y: 420 },
    { x: 490, y: 380 },
    { x: 560, y: 380 },
    { x: 580, y: 380 },
    { x: 620, y: 380 },
    { x: 660, y: 380 },
    { x: 660, y: 450 },
    { x: 660, y: 470 },
    { x: 660, y: 490 },
    { x: 730, y: 490 },
    { x: 790, y: 490 },
  ];
  
      // 🕹️ Spawn de inimigos
      this.time.addEvent({
        delay: 2000,
        loop: true,
        callback: () => {
          const tipoAleatorio = Phaser.Math.Between(0, 2);
          let inimigo;
      
          if (tipoAleatorio === 0) {
            inimigo = new Inimigo(this, this.pathPoints[0].x, this.pathPoints[0].y, 'normal');
            this.followPath(inimigo, this.pathPoints);
          } else if (tipoAleatorio === 1) {
            inimigo = new Inimigo(this, this.pathPoints[0].x, this.pathPoints[0].y, 'tanque');
            this.followPath(inimigo, this.pathPoints);
          } else {
            const y = Phaser.Math.Between(80, 520);
            inimigo = new Inimigo(this, -30, y, 'aviao');
          }
      
          this.inimigos.add(inimigo);
        }
      });
      
      
  
      // 💥 Colisões
    this.physics.add.overlap(this.balas, this.inimigos, (bala, inimigo) => {
      bala.destroy();
      inimigo.hp -= 1;
      

      if (inimigo.hp <= 0) {
      // Se for boss (detectado por tipo ou escala)
      if (inimigo.tipo === 'boss' || inimigo.scaleX > 1) {
        inimigo.destroy();
        this.victory();
        return;
      }

        // Inimigo normal morto
        inimigo.destroy();
        this.moedas += 10;
        this.textoMoedas.setText(this.moedas);

        // Incrementa o contador e, ao atingir o limiar, spawna o boss
        this.totalKilled++;
        if (!this.bossSpawned && this.totalKilled >= 20) {
          this.spawnBoss();
          this.bossSpawned = true;
        }
      }
    });
            
      // 🛑 Zonas proibidas: estrada e decorações
    this.zonaProibidaEstrada = caminhoTiles.map(t => ({ x: t.x, y: t.y }));
    this.zonaProibidaDecoracao = decoracoes.map(d => ({ x: d.x, y: d.y }));

    }

    spawnBoss() {
      // Cria “boss” como se fosse um inimigo normal
      const start = this.pathPoints[0];
      const boss = new Inimigo(this, start.x, start.y, 'normal');


      boss.hpMax = boss.hp = 50;       // ou o valor que quiseres
      boss.setScale(1.5);              // maior que os demais
      boss.barraVida.clear();          // reposiciona a barra
      boss.updateBarraVida();

      this.followPath(boss, this.pathPoints);

      // Podes adicionar um texto na HUD:
      this.add.text(400, 16, '!!! BOSS !!!', {
        fontSize: '28px', fill: '#ff0000', fontStyle: 'bold'
      }).setOrigin(0.5, 0).setScrollFactor(0);

      this.inimigos.add(boss);
    }
  
    // Movimento dos inimigos ao longo do caminho
    followPath(sprite, points) {
      let i = 0;
      const moveNext = () => {
        if (i < points.length - 1) {
          this.tweens.add({
            targets: sprite,
            x: points[i + 1].x,
            y: points[i + 1].y,
            duration: 1000,
            onComplete: () => {
              i++;
              moveNext();
            }
          });
        } else {
          // Chegou ao fim da estrada
          sprite.destroy();

          // Só derrota a cena se for o boss
          if (sprite.tipo === 'boss') {
            this.gameOver();
          }
          // senão, não faz nada e o jogo continua
        }
      };
      moveNext();
    }


    gameOver() {
      this.physics.pause(); // pausa o movimento
    
      // Fundo escuro
      this.add.rectangle(400, 300, 400, 200, 0x000000, 0.8);
    
      // Texto de GAME OVER
      this.add.text(400, 260, 'GAME OVER', {
        fontSize: '48px',
        fill: '#ff0000',
        fontFamily: 'Arial',
        fontStyle: 'bold'
      }).setOrigin(0.5);
    
      // Botão RECOMEÇAR
      const botaoRecomeçar = this.add.text(400, 330, 'RECOMEÇAR', {
        fontSize: '24px',
        fill: '#ffffff',
        backgroundColor: '#007bff',
        padding: { x: 20, y: 10 }
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });
    
      botaoRecomeçar.on('pointerdown', () => {
        // 💥 Limpa balas, inimigos, aliados
        this.inimigos.clear(true, true);
        this.balas.clear(true, true);
    
        // 💥 Remove aliados e os seus timers
        this.children.list.forEach(obj => {
          if (obj instanceof Aliado) {
            if (obj.timer) obj.timer.remove(); // remove upgrade timer
            if (obj.barra) obj.barra.destroy();
            obj.destroy();
          }
        });
    
        // Reinicia a cena limpa
        this.scene.restart();
      });
    
      botaoRecomeçar.on('pointerover', () => botaoRecomeçar.setStyle({ backgroundColor: '#0056b3' }));
      botaoRecomeçar.on('pointerout', () => botaoRecomeçar.setStyle({ backgroundColor: '#007bff' }));
    
      // Botão para VOLTAR AO MENU
      const botaoMenu = this.add.text(400, 380, 'VOLTAR AO MENU', {
        fontSize: '24px',
        fill: '#ffffff',
        backgroundColor: '#28a745',
        padding: { x: 20, y: 10 }
      }).setOrigin(0.5).setInteractive({ useHandCursor: true });

      botaoMenu.on('pointerdown', () => {
          this.scene.start('CenaMenu');
        });

      botaoMenu.on('pointerover', () => botaoMenu.setStyle({ backgroundColor: '#218838' }));
      botaoMenu.on('pointerout', () => botaoMenu.setStyle({ backgroundColor: '#28a745' }));

    }

    victory() {
      this.physics.pause();
      this.add.rectangle(400, 300, 400, 200, 0x000000, 0.8);
      this.add.text(400, 260, 'YOU WIN!', {
        fontSize: '48px', fill: '#00ff00', fontFamily: 'Arial', fontStyle: 'bold'
      }).setOrigin(0.5);
      
      const btnMenu = this.add.text(400, 330, 'VOLTAR AO MENU', {
        fontSize: '24px', fill: '#fff', backgroundColor: '#28a745',
        padding: { x: 20, y: 10 }
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.scene.start('CenaMenu'));
    }
}
  