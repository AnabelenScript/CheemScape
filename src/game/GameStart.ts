import Phaser from "phaser";
import SceneKeys from "../consts/SceneKeys";

export default class GameStart extends Phaser.Scene
{
    constructor()
    {
        super(SceneKeys.GameStart)
    }

    create()
    {
        //destructuracion de objetos
        const {width, height} = this.scale
        /* Esto es lo mismo que haber escrito 
        const width = this.scale.width
        const height = this.scale.height

        */

        //x,y seran el medio de la pantalla
        const x = width * 0.5
        const y = height * 0.5

        //agregamos el texto
        this.add.text(x,y,"CheemsCape",{
            fontSize:"32px",
            color:"#FFFFFF",
            backgroundColor:"#000000",
            shadow:{ fill: true, blur:0, offsetY:0},
            padding: {left:15, right:15, top:0, bottom:400}
        })
        .setOrigin(0.5)

        this.add.text(x,y,"Espacio para empezar a jugar",{
            fontSize:"25px",
            color:"#FFFFFF",
            backgroundColor:"#000000",
            shadow:{ fill: true, blur:0, offsetY:0},
            padding: {left:0, right:2000, top:200, bottom:10}
        })
        .setOrigin(0.1)

        //Haremos que cuando se aprete el space bar se pueda volver a jugar
        this.input.keyboard.once("keydown-SPACE", () =>{
            //parar la scene de GameStart
            this.scene.stop(SceneKeys.GameStart)

            //Reiniciar la escena de juego
            this.scene.start(SceneKeys.Game)
        })
    }
}