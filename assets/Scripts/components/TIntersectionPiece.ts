import { _decorator } from 'cc';
import { RoadPieceComponent } from './RoadPieceComponent';
import { Connection } from '../models/Connection';
import { Direction } from '../enums/Direction';
const { ccclass } = _decorator;

@ccclass('TIntersectionPiece')
export class TIntersectionPiece extends RoadPieceComponent {
    start() {
        super.start();
        this.setConnections([
            new Connection(Direction.North, true),
            new Connection(Direction.East, true),
            new Connection(Direction.South, true)
        ]);
    }
}
