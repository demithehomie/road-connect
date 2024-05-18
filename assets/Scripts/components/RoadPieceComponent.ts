import { _decorator, Component, Vec3 } from 'cc';
import { RoadPieceType } from '../enums/RoadPieceType';
import { Connection } from '../models/Connection';
import { Direction } from '../enums/Direction';
const { ccclass, property } = _decorator;

@ccclass('RoadPieceComponent')
export class RoadPieceComponent extends Component {
    @property({ type: RoadPieceType })
    type: RoadPieceType = RoadPieceType.Straight;

    @property
    correctRotation: number = 0;

    @property
    position: Vec3 = new Vec3();

    // Conexões da peça
    connections: Connection[] = [];

    start() {
        this.node.setPosition(this.position);
        this.node.angle = this.correctRotation;
    }

    // Definir as conexões da peça
    setConnections(connections: Connection[]) {
        this.connections = connections;
    }

    // Verificar se a peça está conectada corretamente
    isConnectedTo(piece: RoadPieceComponent): boolean {
        // Lógica para verificar as conexões entre as peças
        // Exemplo básico: verificar se as direções estão corretas e se estão conectadas
        for (let connection of this.connections) {
            for (let otherConnection of piece.connections) {
                if (connection.direction === this.getOppositeDirection(otherConnection.direction) &&
                    connection.connected && otherConnection.connected) {
                    return true;
                }
            }
        }
        return false;
    }

    // Obter a direção oposta
    getOppositeDirection(direction: Direction): Direction {
        switch (direction) {
            case Direction.North:
                return Direction.South;
            case Direction.South:
                return Direction.North;
            case Direction.East:
                return Direction.West;
            case Direction.West:
                return Direction.East;
        }
    }
}
