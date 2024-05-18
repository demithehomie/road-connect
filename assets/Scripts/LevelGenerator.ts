import { _decorator, Component, Node, Vec3 } from 'cc';
import { RoadPiece } from './models/RoadPiece';
import { RoadPieceType } from './enums/RoadPieceType';
import { RotateSprite } from './RotateSprite';
const { ccclass, property } = _decorator;

@ccclass('LevelGenerator')
export class LevelGenerator extends Component {
    @property([Node])
    roadPieces: Node[] = [];

    // Definição das fases
    private levels: RoadPiece[][] = [
        // Fase 1
        [
            new RoadPiece(RoadPieceType.Straight, 0, new Vec3(0, 0, 0)),
            new RoadPiece(RoadPieceType.Curve, 90, new Vec3(1, 0, 0)),
            new RoadPiece(RoadPieceType.Straight, 0, new Vec3(2, 0, 0)),
            // Adicione mais peças conforme necessário
        ],
        // Fase 2
        [
            new RoadPiece(RoadPieceType.Curve, 0, new Vec3(0, 0, 0)),
            new RoadPiece(RoadPieceType.TIntersection, 90, new Vec3(1, 0, 0)),
            new RoadPiece(RoadPieceType.Curve, 180, new Vec3(2, 0, 0)),
            // Adicione mais peças conforme necessário
        ],
        // Adicione mais fases conforme necessário
    ];

    private currentLevel: number = 0;

    start() {
        this.loadLevel(this.currentLevel);
    }

    loadLevel(level: number) {
        if (level < 0 || level >= this.levels.length) {
            console.error('Nível inválido');
            return;
        }

        const levelData = this.levels[level];
        for (let i = 0; i < levelData.length; i++) {
            const pieceData = levelData[i];
            const pieceNode = this.roadPieces[i];
            pieceNode.setPosition(pieceData.position);
            const rotateSprite = pieceNode.getComponent(RotateSprite);
            if (rotateSprite) {
                rotateSprite.correctRotation = pieceData.correctRotation;
                pieceNode.angle = pieceData.correctRotation;
            }
        }
    }
}
