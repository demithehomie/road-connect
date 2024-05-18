import { _decorator, Component, Node, EventTouch } from 'cc';
const { ccclass, property } = _decorator;
import { LevelManager } from './LevelManager'; // Importar LevelManager

@ccclass('RotateSprite')
export class RotateSprite extends Component {
    private rotationAngle: number = 0;

    @property
    correctRotation: number = 0;  // Adicionar a propriedade de rotação correta

    start() {
        this.node.on(Node.EventType.TOUCH_END, this.rotateSprite, this);
    }

    rotateSprite(event: EventTouch) {
        this.rotationAngle += 90;
        this.node.angle = this.rotationAngle % 360;

        // Notificar o LevelManager sobre a rotação
        const levelManager = this.node.parent.getComponent(LevelManager) as LevelManager;
        if (levelManager) {
            levelManager.checkLevelComplete();
        }
    }
}
