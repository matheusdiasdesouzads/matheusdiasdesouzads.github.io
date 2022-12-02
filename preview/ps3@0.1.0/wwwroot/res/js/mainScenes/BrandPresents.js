import MainScene from './MainScene.js';
import MainMenuScene from './mainMenu/MainMenuScene.js';
import GameplayScene from './gameplay/GameplayScene.js';
import ProjectSettings from '../ProjectSettings.js';
import PreloadedAssets from '../PreloadedAssets.js';

export default class BrandPresents extends MainScene {
    constructor() {
        super();
        this.initialize();
    }

    initialize() {
        super.initialize();
        let segaLogo = PreloadedAssets.segaLogo.cloneNode(true);
        this.container.style.transition = 'opacity 0.5s';
        this.container.style.opacity = '0';
        this.container.innerHTML = '<span style="position: absolute">THIS FAN GAME INCLUDES PROPERTIES OWNED BY</span>';
        this.container.children[0].style.left = `${ProjectSettings.centerX(this.container.children[0].offsetWidth)}px`;
        this.container.children[0].style.top = `${ProjectSettings.centerY(this.container.children[0].offsetHeight) - 100}px`;
        this.container.appendChild(segaLogo);
        segaLogo.style.position = 'absolute';
        segaLogo.style.left = `${ProjectSettings.centerX(segaLogo.offsetWidth)}px`;
        segaLogo.style.top = `${ProjectSettings.centerY(segaLogo.offsetHeight)}px`;
        segaLogo.style.transform = 'scale(1)';
        setTimeout(() => {
            this.container.style.opacity = '1';
            setTimeout(() => {
                this.container.style.opacity = '0';
                setTimeout(() => {
                    this.destroy();
                    new MainMenuScene(GameplayScene);
                }, 500);
            }, 2000);
        }, 500);
    }

    destroy() {
        super.destroy();
    }
}