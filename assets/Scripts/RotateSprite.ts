import { _decorator, Component, Node, EventTouch, tween, Vec3 } from 'cc';
import { LevelManager } from './LevelManager';
const { ccclass, property } = _decorator;

@ccclass('RotateSprite')
export class RotateSprite extends Component {
    private rotationAngle: number = 0;

    @property
    correctRotation: number = 0;  // Adicionar a propriedade de rotação correta

    start() {
        this.node.on(Node.EventType.TOUCH_END, this.rotateSprite, this);
        console.log('RotateSprite script initialized for', this.node.name);  // Log de inicialização
    }

    rotateSprite(event: EventTouch) {
        console.log('Sprite clicked:', this.node.name);  // Log de clique
        this.rotationAngle += 90;

        // Adicionar animação de rotação com tween
        tween(this.node)
            .to(0.5, { angle: this.rotationAngle % 360 }, { easing: 'cubicInOut' })
            .call(() => {
                // Notificar o LevelManager sobre a rotação após a animação
                const levelManager = this.node.parent.getComponent(LevelManager) as LevelManager;
                if (levelManager) {
                    levelManager.checkLevelComplete();
                }
            })
            .start();
    }
}
