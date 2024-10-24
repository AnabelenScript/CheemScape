import TextureKeys from "../consts/TextureKeys";
import AnimationKeys from "../consts/AnimationKeys";
import SceneKeys from "../consts/SceneKeys";
import SoundKeys from "../consts/SoundKeys";

enum MouseState {
    Running,
    Killed,
    Dead
}

export default class RocketMouse extends Phaser.GameObjects.Container {
    private mouseState = MouseState.Running;
    private flames: Phaser.GameObjects.Sprite;
    private mouse: Phaser.GameObjects.Sprite;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        this.mouse = scene.add.sprite(0, 0, TextureKeys.RocketMouse)
            .setOrigin(0.5, 1)
            .play(AnimationKeys.RocketMouseRun);

        this.flames = scene.add.sprite(-63, -15, TextureKeys.RocketMouse)
            .play(AnimationKeys.RocketFlamesOn);

        this.enableJetpack(false);
        this.add(this.flames);
        this.add(this.mouse);

        scene.physics.add.existing(this);
        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setSize(this.mouse.width, this.mouse.height);
        body.setOffset(this.mouse.width * -0.5, -this.mouse.height);

        this.cursors = scene.input.keyboard.createCursorKeys();
        body.setSize(this.mouse.width * 0.5, this.mouse.height * 0.7);
        body.setOffset(this.mouse.width * -0.3, -this.mouse.height + 15);
    }

    kill() {
        if (this.mouseState !== MouseState.Running) return;

        this.mouseState = MouseState.Killed;
        this.mouse.play(AnimationKeys.RocketMouseDead);
        this.mouse.scene.sound.play(SoundKeys.Explosion, { volume: 0.5 });

        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setAccelerationY(0);
        body.setVelocity(500, 0);
        this.enableJetpack(false);

        this.scene.time.delayedCall(500, () => {
            this.scene.scene.stop(SceneKeys.Game);
            this.scene.scene.start(SceneKeys.GameOver);
        });
    }


    preUpdate() {
        const body = this.body as Phaser.Physics.Arcade.Body;

        switch (this.mouseState) {
            case MouseState.Running:
                if (this.cursors.space?.isDown) {
                    body.setAccelerationY(-700);
                    this.enableJetpack(true);
                    if (this.mouse.anims.currentAnim?.key !== AnimationKeys.RocketMouseFly) {
                        this.mouse.play(AnimationKeys.RocketMouseFly, true);
                        this.scene.sound.play(SoundKeys.Fire, { volume: 0.1 });
                    }
                } else {
                    body.setAccelerationY(0);
                    this.enableJetpack(false);
                    this.scene.sound.stopByKey(SoundKeys.Fire);
                }

                if (body.blocked.down && this.mouse.anims.currentAnim?.key !== AnimationKeys.RocketMouseRun) {
                    this.mouse.play(AnimationKeys.RocketMouseRun, true);
                } else if (body.velocity.y > 0 && this.mouse.anims.currentAnim?.key !== AnimationKeys.RocketMouseFall) {
                    this.mouse.play(AnimationKeys.RocketMouseFall, true);
                }
                break;

            case MouseState.Killed:
                body.velocity.x *= 0.99;
                this.scene.sound.stopByKey(SoundKeys.Fire);

                if (body.velocity.x <= 5) this.mouseState = MouseState.Dead;
                break;

            case MouseState.Dead:
                body.setVelocity(0, 0);
                this.scene.scene.run(SceneKeys.GameOver);
                break;
        }
    }

    enableJetpack(enabled: boolean) {
        this.flames.setVisible(enabled);
    }
}
