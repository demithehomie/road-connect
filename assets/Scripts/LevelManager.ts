import { _decorator, Component, Node } from 'cc';
import { RotateSprite } from './RotateSprite'; // Importar RotateSprite
const { ccclass, property } = _decorator;

@ccclass('LevelManager')
export class LevelManager extends Component {
    @property([Node])
    roadPieces: Node[] = [];

    @property
    levelConfigs: any[] = [];

    private currentLevel: number = 0;

    start() {
        this.loadLevel(this.currentLevel);
    }

    loadLevel(level: number) {
        const config = this.levelConfigs[level];
        if (config) {
            for (let i = 0; i < this.roadPieces.length; i++) {
                const piece = this.roadPieces[i];
                const rotateSprite = piece.getComponent(RotateSprite);
                if (rotateSprite) {
                    rotateSprite.correctRotation = config.correctRotations[i];
                    piece.angle = config.initialRotations[i];
                }
            }
        }
        this.checkLevelComplete();
    }

    checkLevelComplete() {
        let isComplete = true;

        for (let piece of this.roadPieces) {
            if (!this.isPieceConnected(piece)) {
                isComplete = false;
                break;
            }
        }

        if (isComplete) {
            this.levelComplete();
        }
    }

    isPieceConnected(piece: Node): boolean {
        const rotateSprite = piece.getComponent(RotateSprite);
        if (rotateSprite) {
            if (rotateSprite.node.angle !== rotateSprite.correctRotation) {
                return false;
            }
        }
        return true;
    }

    levelComplete() {
        console.log('Nível Completo!');
        this.currentLevel++;
        if (this.currentLevel < this.levelConfigs.length) {
            this.loadLevel(this.currentLevel);
        } else {
            console.log('Todos os níveis completados!');
        }
    }
}
