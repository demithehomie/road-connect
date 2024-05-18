import { RoadPieceType } from '../enums/RoadPieceType';
import { Vec3 } from 'cc';

export class RoadPiece {
    type: RoadPieceType;
    correctRotation: number; // Rotação correta em graus
    position: Vec3; // Posição na grade

    constructor(type: RoadPieceType, correctRotation: number, position: Vec3) {
        this.type = type;
        this.correctRotation = correctRotation;
        this.position = position;
    }
}
