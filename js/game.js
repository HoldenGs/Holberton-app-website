var game = new Phaser.Game(600, 450, Phaser.CANVAS, 'article', { preload: preload, create: create, update: update, render: render });



function preload() {
	game.load.tilemap('level1', '../assets/maps/level1.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.image('tileset', '../assets/images/tileset.png');
	game.load.spritesheet('player', '../assets/images/player.png', 70, 94);
	game.load.spritesheet('enemies', '../assets/images/enemies.png');
	game.load.spritesheet('items', '../assets/images/items.png');
	game.load.spritesheet('HUD', '../assets/images/HUD.png');
}

var map;
var tileset;
var layer;
var player;
var facing = 'left';
var jumpTimer = 0;
var cursors;
var jumpButton;

function create() {

	// Physics Start
	game.physics.startSystem(Phaser.Physics.ARCADE);

	// Background Color
	game.stage.backgroundColor = '#cc99ff';

	// Map
	map = game.add.tilemap('level1', 120);
	map.addTilesetImage('tileset');
	map.setCollisionByExclusion([8, 139]);

	// Layer
	layer = map.createLayer('Tile Layer 1');
	layer.resizeWorld();
	// layer.debug = true;

	// Physics Configure
	game.world.enableBody = true;
	game.physics.arcade.gravity.y = 2300;
	player = game.add.sprite(350, game.world.height - 370, 'player');
	game.physics.enable(player, Phaser.Physics.ARCADE);

	// Player
	player.body.bounce.y = 0;
    player.body.collideWorldBounds = true;
    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.3, 0.3);
    player.body.setSize(50, 94, 10, 5);

    // Controls
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function update() {

	game.physics.arcade.collide(player, layer);
	player.body.velocity.x = 0;
	player.body.maxVelocity.y = 1100;


	if (cursors.left.isDown)
    {
        player.body.velocity.x = -325;

        // if (facing != 'left')
        {
            player.animations.play('left', 20);
            facing = 'left';
        }
    } else if (cursors.right.isDown)
	{
        player.body.velocity.x = 325;

         // if (facing != 'right')
        {
            player.animations.play('right', 20);
            facing = 'right';
        }
    } // else
    {
        if (facing != 'idle')
        {
            player.animations.stop();

            if (facing == 'left')
            {
                player.frame = 5;
            }
            else
            {
                player.frame = 5;
            }

            facing = 'idle';
        }
    }

    // Jump
    if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer)
    {
        player.body.velocity.y = -1600;
        jumpTimer = game.time.now + 200;
    }
}

function render() {

}