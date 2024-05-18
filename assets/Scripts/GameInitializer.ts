import { _decorator, Component, director } from 'cc';
const { ccclass } = _decorator;

@ccclass('GameInitializer')
export class GameInitializer extends Component {
    start() {
        director.loadScene('StartScene');
    }
}

