import Phaser from "phaser";
import TextureKeys from "../consts/TextureKeys";
import SceneKeys from "../consts/SceneKeys";
import AnimationKeys from "../consts/AnimationKeys";
import SoundKeys from "../consts/SoundKeys";

export default class Preloader extends Phaser.Scene {
    constructor() {
        super(SceneKeys.Preloader)
    }

    preload() {
        this.load.image(TextureKeys.Background, 'assets/background.jpg');
        this.load.atlas(TextureKeys.RocketMouse, 'assets/rocket-mouse.png', 'assets/rocket-mouse.json');
        this.load.image(TextureKeys.MouseHole, 'assets/object_mousehole.png');
        this.load.image(TextureKeys.LaserEnd, 'assets/object_laser_end.png');
        this.load.image(TextureKeys.LaserMiddle, 'assets/object_laser.png');
        this.load.image(TextureKeys.Coin, 'assets/object_coin.png');
        this.load.audio(SoundKeys.CoinSound, 'assets/sfx/handleCoins.ogg');
        this.load.audio(SoundKeys.Explosion, 'assets/sfx/explosionCrunch_002.ogg');
        this.load.audio(SoundKeys.Fire, 'assets/sfx/thrusterFire_000.ogg');
        this.load.audio(SoundKeys.Steps, 'assets/sfx/footstep06.ogg');
    }

    create() {
        this.anims.create({
            key: AnimationKeys.RocketMouseRun,
            frames: this.anims.generateFrameNames('rocket-mouse', { start: 1, end: 4, prefix: 'rocketmouse_run', zeroPad: 2, suffix: '.png' }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: AnimationKeys.RocketFlamesOn,
            frames: this.anims.generateFrameNames(TextureKeys.RocketMouse, { start: 1, end: 2, prefix: 'flame', suffix: ".png" }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: AnimationKeys.RocketMouseFall,
            frames: [{ key: TextureKeys.RocketMouse, frame: "rocketmouse_fall01.png" }]
        });

        this.anims.create({
            key: AnimationKeys.RocketMouseFly,
            frames: [{ key: TextureKeys.RocketMouse, frame: "rocketmouse_fly01.png" }]
        });

        this.anims.create({
            key: AnimationKeys.RocketMouseDead,
            frames: this.anims.generateFrameNames(TextureKeys.RocketMouse, { start: 1, end: 2, prefix: 'rocketmouse_dead', zeroPad: 2, suffix: '.png' }),
            frameRate: 10
        });

        this.scene.start(SceneKeys.GameStart);
    }
}
