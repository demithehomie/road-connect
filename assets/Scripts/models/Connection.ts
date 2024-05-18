import { Direction } from '../enums/Direction';

export class Connection {
    direction: Direction;
    connected: boolean;

    constructor(direction: Direction, connected: boolean) {
        this.direction = direction;
        this.connected = connected;
    }
}
