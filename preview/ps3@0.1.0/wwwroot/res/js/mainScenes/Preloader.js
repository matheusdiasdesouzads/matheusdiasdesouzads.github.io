import MainScene from './MainScene.js';
import BrandPresents from './BrandPresents.js';
import ProjectSettings from '../ProjectSettings.js';
import PreloadedAssets from '../PreloadedAssets.js';

export default class Preloader extends MainScene {
    constructor() {
        super();
        this.dots = 0;
        this.m_adviceTickId = 0;
        this.m_queue = new createjs.LoadQueue;
        this.m_queueFailed = false;
        this.initialize();
    }

    initialize() {
        super.initialize();
        this.container.innerHTML = `<div class="textarea" style="width: 300px" id="preloadingAdvice"></div>`;

        this.m_queue.loadFile({id: 'cutscenes.orakioVersusLaya', src: 'res/img/cutscenes/orakio-versus-laya-1.png'});
        this.m_queue.loadFile({id: 'cutscenes.womanOnBeach', src: 'res/img/cutscenes/woman-on-beach.mp4', type: createjs.AbstractLoader.BINARY});
        this.m_queue.loadFile({id: 'cutscenes.outerspace1', src: 'res/img/cutscenes/outerspace-1.png'});
        this.m_queue.loadFile({id: 'logo', src: 'res/img/logo/logo.png'});
        this.m_queue.loadFile({id: 'segaLogo', src: 'res/img/segalogo/logo.svg'});
        this.m_queue.loadFile({id: 'overworldGeneration1', src: 'res/img/overworldcharacters/generation1.png'});
        this.m_queue.loadFile({id: 'overworldGeneration2', src: 'res/img/overworldcharacters/generation2.png'});
        this.m_queue.loadFile({id: 'overworldGeneration3', src: 'res/img/overworldcharacters/generation3.png'});

        this.m_queue.on('error', evt => {
            this.queue_onError(evt);
        });
        this.m_queue.on('complete', evt => {
            this.queue_onComplete(evt);
        });

        this.m_adviceTickId = setInterval(this.adviceTick.bind(this), 200);
        this.adviceTick();
    }

    queue_onComplete(evt) {
        if (this.m_queueFailed) {
            return;
        }
        PreloadedAssets.initializeMisc(this.m_queue);
        PreloadedAssets.initializeOverworldSheets(this.m_queue);
        setTimeout(() => {
            this.destroy();
            new BrandPresents;
        }, 500);
    }

    queue_onError(evt) {
        clearInterval(this.m_adviceTickId);
        this.m_queueFailed = true;
        let advice = this.container.querySelector('#preloadingAdvice');
        advice.innerText = `Failed loading assets. Please try again later.`;
    }

    destroy() {
        super.destroy();
        clearInterval(this.m_adviceTickId);
    }

    adviceTick() {
        let advice = this.container.querySelector('#preloadingAdvice');
        advice.innerText = `Preloading assets${'.'.repeat(this.dots)}`;
        advice.style.position = 'absolute';
        advice.style.left = `${ProjectSettings.centerX(advice.offsetWidth)}px`;
        advice.style.top = `${ProjectSettings.centerY(advice.offsetHeight)}px`;
        this.dots++;
        this.dots %= 4;
    }
}