import MainScene from '../MainScene.js';
import ProjectSettings from '../../ProjectSettings.js';
import PreloadedAssets from '../../PreloadedAssets.js';
import PlayerPersonalSettings from '../../PlayerPersonalSettings.js';
import {cloneImage} from '../../util/ImageHelpers.js';
import {focusNextElement, focusPrevElement} from '../../focuslock/index.js';
import {cutscene1_show} from './cutscene1.js';

export default class MainMenuScene extends MainScene {
    constructor(gameplaySceneClass) {
        super();
        this.m_keyPressListener = null;
        this.m_mainTextArea = null;
        this.m_startGameTextArea = null;
        this.m_gameplaySceneClass = gameplaySceneClass;

        this.initialize();
    }

    initialize() {
        super.initialize();
        cutscene1_show(this);
    }

    afterCutscene1_show() {
        let logo = cloneImage(PreloadedAssets.logo);
        logo.style.transition = 'opacity 0.5s';
        logo.style.transform = 'scale(0.7)';
        logo.style.opacity = '0';
        logo.style.position = 'absolute';
        this.container.appendChild(logo);
        logo.style.left = `${ProjectSettings.centerX(logo.offsetWidth)}px`;
        logo.style.top = `100px`;
        setTimeout(() => {
            logo.style.opacity = '1';
            this.mainTextArea_show();
        }, 500);
    }

    mainTextArea_show() {
        if (this.m_mainTextArea != null) {
            return;
        }
        this.m_mainTextArea = document.createElement('div');
        this.m_mainTextArea.classList.add('textarea');
        this.m_mainTextArea.style.display = 'flex';
        this.m_mainTextArea.style['flex-direction'] = 'column';
        this.m_mainTextArea.style['gap'] = '5px';
        this.m_mainTextArea.style.position = 'absolute';
        this.m_mainTextArea.style.width = `500px`;
        this.container.appendChild(this.m_mainTextArea);
        this.m_mainTextArea.style.left = `${ProjectSettings.centerX(this.m_mainTextArea.offsetWidth)}px`;
        this.m_mainTextArea.style.top = `${ProjectSettings.centerY(500) + 200}px`;
        this.m_mainTextArea.innerHTML = `
            <button class="btn" id="startGameBtn" style="text-align: left">Start Game</button>
            <button class="btn" id="exitGameBtn" style="text-align: left">Exit Game</button>
        `;
        window.addEventListener('keyup', this.m_keyPressListener = e => {
            // up
            if (PlayerPersonalSettings.keyboardSettings.up.indexOf(e.key.toUpperCase()) != -1) {
                if (document.querySelector(':focus') != null) {
                    focusPrevElement(document.activeElement);
                } else document.getElementById('startGameBtn').focus();
            }
            // down
            else if (PlayerPersonalSettings.keyboardSettings.down.indexOf(e.key.toUpperCase()) != -1) {
                if (document.querySelector(':focus') != null) {
                    focusNextElement(document.activeElement);
                } else document.getElementById('startGameBtn').focus();
            }
        });
        document.getElementById('startGameBtn').addEventListener('click', () => {
            this.mainTextArea_hide();
            this.startGameTextArea_show();
        });
        document.getElementById('exitGameBtn').addEventListener('click', () => {
            window.close();
        });
        document.getElementById('startGameBtn').focus();
    }

    mainTextArea_hide() {
        this.m_mainTextArea.remove();
        this.m_mainTextArea = null;

        window.removeEventListener('keyup', this.m_keyPressListener);
        this.m_keyPressListener = null;
    }

    startGameTextArea_show() {
        if (this.m_startGameTextArea != null) {
            return;
        }
        this.m_startGameTextArea = document.createElement('div');
        this.m_startGameTextArea.classList.add('textarea');
        this.m_startGameTextArea.style.display = 'flex';
        this.m_startGameTextArea.style['flex-direction'] = 'column';
        this.m_startGameTextArea.style['gap'] = '5px';
        this.m_startGameTextArea.style.position = 'absolute';
        this.m_startGameTextArea.style.width = `700px`;
        this.container.appendChild(this.m_startGameTextArea);
        this.m_startGameTextArea.style.left = `${ProjectSettings.centerX(this.m_startGameTextArea.offsetWidth)}px`;
        this.m_startGameTextArea.style.top = `${ProjectSettings.centerY(500) + 200}px`;
        this.m_startGameTextArea.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 5px; overflow-x: scroll; width: 600px">
                <button class="btn btn-primary" id="newGameBtn" style="width: 130px; height: 100px; text-align: left">New Game</button>
                ${
                    [].map(slot => `<button class="btn" style="width: 130px; height: 100px; text-align: left">n</button>`)
                }
            </div>
            <button class="btn" id="backBtn" style="text-align: left">Back</button>
        `;
        window.addEventListener('keyup', this.m_keyPressListener = e => {
            // up/left
            if (PlayerPersonalSettings.keyboardSettings.up.indexOf(e.key.toUpperCase()) != -1
            ||  PlayerPersonalSettings.keyboardSettings.left.indexOf(e.key.toUpperCase()) != -1) {
                if (document.querySelector(':focus') != null) {
                    focusPrevElement(document.activeElement);
                } else document.getElementById('backBtn').focus();
            }
            // down/right
            else if (PlayerPersonalSettings.keyboardSettings.down.indexOf(e.key.toUpperCase()) != -1
            ||  PlayerPersonalSettings.keyboardSettings.right.indexOf(e.key.toUpperCase()) != -1) {
                if (document.querySelector(':focus') != null) {
                    focusNextElement(document.activeElement);
                } else document.getElementById('backBtn').focus();
            }
            // cancel
            else if (PlayerPersonalSettings.keyboardSettings.cancelOrSkip.indexOf(e.key.toUpperCase()) != -1) {
                this.startGameTextArea_hide();
                this.mainTextArea_show();
            }
        });
        document.getElementById('newGameBtn').addEventListener('click', () => {
            this.destroy();
            new this.m_gameplaySceneClass(NaN);
        });
        document.getElementById('backBtn').addEventListener('click', () => {
            this.startGameTextArea_hide();
            this.mainTextArea_show();
        });
        document.getElementById('newGameBtn').focus();
    }

    startGameTextArea_hide() {
        this.m_startGameTextArea.remove();
        this.m_startGameTextArea = null;

        window.removeEventListener('keyup', this.m_keyPressListener);
        this.m_keyPressListener = null;
    }

    destroy() {
        super.destroy();
    }
}