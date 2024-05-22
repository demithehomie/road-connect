import { _decorator, Component, Node, Vec3 } from 'cc';
import { RoadPiece } from './models/RoadPiece';
import { RoadPieceType } from './enums/RoadPieceType';
import { RotateSprite } from './RotateSprite';
import { RoadPieceComponent } from './components/RoadPieceComponent';
const { ccclass, property } = _decorator;

@ccclass('LevelManager')
export class LevelManager extends Component {
    @property([Node])
    roadPieces: Node[] = [];

    private levels: RoadPiece[][] = [
        // Fase 1: Quatro curvas formando um círculo
        [
            new RoadPiece(RoadPieceType.Curve, 0, new Vec3(-100, 0, 100)),
            new RoadPiece(RoadPieceType.Curve, 90, new Vec3(100, 0, 100)),
            new RoadPiece(RoadPieceType.Curve, 180, new Vec3(100, 0, -100)),
            new RoadPiece(RoadPieceType.Curve, 270, new Vec3(-100, 0, -100)),
        ],
        // Outras fases...
    ];

    private currentLevel: number = 0;

    start() {
        console.log('LevelManager start');
        this.loadLevel(this.currentLevel);
    }

    loadLevel(level: number) {
        console.log('Carregando nível:', level);

        if (level < 0 || level >= this.levels.length) {
            console.error('Nível inválido');
            return;
        }

        const levelData = this.levels[level];
        for (let i = 0; i < levelData.length; i++) {
            const pieceData = levelData[i];
            const pieceNode = this.roadPieces[i];
            console.log('Posicionando peça:', i, pieceData.position);
            pieceNode.setPosition(pieceData.position);
            const rotateSprite = pieceNode.getComponent(RotateSprite);
            if (rotateSprite) {
                // Posicionar as peças aleatoriamente
                const randomRotation = Math.floor(Math.random() * 4) * 90;
                console.log('Rotação correta:', pieceData.correctRotation, 'Rotação inicial aleatória:', randomRotation);
                rotateSprite.correctRotation = pieceData.correctRotation;
                pieceNode.angle = randomRotation;
            }
        }
    }

    checkLevelComplete() {
        console.log('Verificando se o nível está completo');
        let isComplete = true;

        for (let piece of this.roadPieces) {
            const rotateSprite = piece.getComponent(RotateSprite);
            if (rotateSprite) {
                console.log('Verificando peça:', piece.name, 'Rotação atual:', rotateSprite.node.angle, 'Rotação correta:', rotateSprite.correctRotation);
                if (rotateSprite.node.angle !== rotateSprite.correctRotation) {
                    isComplete = false;
                    break;
                }
            }
        }

        if (isComplete) {
            this.levelComplete();
        }
    }

    isPieceConnected(piece: RoadPieceComponent): boolean {
        const neighbors = this.getNeighbors(piece);
        for (let neighbor of neighbors) {
            if (!piece.isConnectedTo(neighbor)) {
                return false;
            }
        }
        return true;
    }

    getNeighbors(piece: RoadPieceComponent): RoadPieceComponent[] {
        const neighbors: RoadPieceComponent[] = [];
        const pos = piece.node.position;

        for (let other of this.roadPieces) {
            const otherComponent = other.getComponent(RoadPieceComponent);
            if (otherComponent && otherComponent !== piece) {
                const otherPos = other.position;
                if ((Math.abs(pos.x - otherPos.x) === 2 && pos.y === otherPos.y) || 
                    (Math.abs(pos.y - otherPos.y) === 2 && pos.x === otherPos.x)) {
                    neighbors.push(otherComponent);
                }
            }
        }

        return neighbors;
    }

    levelComplete() {
        console.log('Nível Completo!');
        // Avance para o próximo nível ou reinicie
        this.currentLevel++;
        if (this.currentLevel < this.levels.length) {
            this.loadLevel(this.currentLevel);
        } else {
            console.log('Todos os níveis completados!');
        }
    }
}
