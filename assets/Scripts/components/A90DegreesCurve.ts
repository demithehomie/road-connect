import { _decorator } from 'cc';
import { RoadPieceComponent } from './RoadPieceComponent';
import { Connection } from '../models/Connection';
import { Direction } from '../enums/Direction';
const { ccclass } = _decorator;

@ccclass('CurvePiece')
export class A90DegreesCurve extends RoadPieceComponent {
    start() {
        super.start();
        this.setConnections([
            new Connection(Direction.South, true),
            new Connection(Direction.East, true)
        ]);
    }
}
