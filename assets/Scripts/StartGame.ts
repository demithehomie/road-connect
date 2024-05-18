import { _decorator, Component, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StartGame')
export class StartGame extends Component {


   startGame() {
        director.loadScene('scene01');
    }
  
    
}


