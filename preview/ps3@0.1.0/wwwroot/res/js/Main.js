import ProjectSettings from './ProjectSettings.js';
import PlayerPersonalSettings from './PlayerPersonalSettings.js';
import Preloader from './mainScenes/Preloader.js';

class Main {
    constructor() {
        this.gameContainer = document.getElementById('gameContainer');
        this.initialize();
    }

    initialize() {
        this.resizeWindow();
        window.addEventListener('resize', evt => {
            this.resizeWindow();
        });
        window.addEventListener('orientationchange', evt => {
            this.resizeWindow();
        });
        window.addEventListener('keyup', e => {
            if (PlayerPersonalSettings.keyboardSettings.okOrTalk.indexOf(e.key.toUpperCase()) != -1) {
                document.activeElement.click();
            }
        });
        new Preloader;
    }

    resizeWindow() {
        let ratio = ProjectSettings.width / ProjectSettings.height;
        let windowRatio = window.innerWidth / window.innerHeight;
        let scale = window.innerWidth / ProjectSettings.width;
        if (windowRatio > ratio) {
            scale = window.innerHeight / ProjectSettings.height;
        }

        this.gameContainer.style.position = 'absolute';
        this.gameContainer.style.left = `${window.innerWidth / 2 - ProjectSettings.width / 2}px`;
        this.gameContainer.style.top = `${window.innerHeight / 2 - ProjectSettings.height / 2}px`;
        this.gameContainer.style.width = `${ProjectSettings.width}px`;
        this.gameContainer.style.height = `${ProjectSettings.height}px`;
        this.gameContainer.style.transform = `scale(${scale})`;
    }
}

new Main;