enchant();

    window.onload = function() {
        const PLAYER = 'player.png';
        const COIN = 'coin.png';
        const ENEMY = 'enemy.png';
        const DISP_SIZE = 640;
        const TIME = 30;
        var score = 0;

        var core = new Core(DISP_SIZE, DISP_SIZE);
        core.preload(PLAYER, COIN, ENEMY);
        core.fps = 30;
        core.onload = function() {
            var player = new Sprite(100, 100);
            player.x = DISP_SIZE / 2;
            player.y = DISP_SIZE - player.height * 2;
            player.image = core.assets[PLAYER];

            player.on('enterframe', function() {
               if (core.input.left) {
                    this.x -= 5;
                }

                if (core.input.right) {
                    this.x += 5;
                }
            });

            core.rootScene.addChild(player);
            
            var scoreLabel = new Label('Score: ' + score);
            scoreLabel.x = 10;
            scoreLabel.y = 10;
            core.rootScene.addChild(scoreLabel);
            
            var Coin = Class.create(Sprite, {
                initialize: function(x, y) {
                    Sprite.call(this, 16, 16);
                    this.x = x;
                    this.y = y;
                    this.image = core.assets[COIN];

                    this.on('enterframe', function() {
                        this.y += 5;
                        if (this.intersect(player)) {
                            core.rootScene.removeChild(this);
                            score++;
                        }
                    });
                }
            });
            var Enemy = Class.create(Sprite, {
                initialize: function(x, y) {
                    Sprite.call(this, 50, 50);
                    this.x = x;
                    this.y = y;
                    this.image = core.assets[ENEMY];

                    this.on('enterframe', function() {
                        this.y += 3;
                        if (this.intersect(player)) {
                            core.pushScene(gameOverScene)
                        }
                    });
                }
            });

            core.rootScene.on('enterframe', function() {
                scoreLabel.text = 'Score: ' + score;
                if (core.frame % 15 === 0) {
                    var coin = new Coin(rand(DISP_SIZE - 16), 0);
                    core.rootScene.addChild(coin);
                }
                if (core.frame % 30 === 0) {
                    var enemy = new Enemy(rand(DISP_SIZE - 32), 0);
                    core.rootScene.addChild(enemy);
                }
                if (core.frame === core.fps * TIME) {
                    core.stop();
                }
            });

            
            var gameOverScene = new Scene();
            gameOverScene.backgroundColor = 'black';

            var GOlabel = new Label();
            GOlabel.x = 180;
            GOlabel.y = 200;
            GOlabel.font = '40px Hiragino';
            GOlabel.text = "GAME OVER";
            GOlabel.color = 'white';
            gameOverScene.addChild(GOlabel);
    
        };
    core.start();

    };

    function rand(n) {
        return Math.floor(Math.random() * (n + 1));
    }