import { _decorator, Component, Node, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LoadAnimation')
export class LoadAnimation extends Component {
    start() {
        // Definir a posição inicial fora da tela
        this.node.setPosition(new Vec3(0, -800, 0));
        
        // Tween para mover o sprite para a posição desejada
        tween(this.node)
            .to(1, { position: new Vec3(0, 0, 0) }, { easing: 'bounceOut' })
            .start();
    }
}
