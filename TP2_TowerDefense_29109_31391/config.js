// Registo global das cenas
window.CenaBoot     = CenaBoot;
window.CenaMenu     = CenaMenu;
window.CenaTutorial = CenaTutorial;
window.CenaJogo     = CenaJogo;
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#88c070',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: [CenaBoot, CenaMenu, CenaTutorial, CenaJogo]
};

const game = new Phaser.Game(config);
