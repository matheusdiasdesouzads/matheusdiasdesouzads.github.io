import MainScene from './MainScene.js';
import ProjectSettings from '../ProjectSettings.js';
import PreloadedAssets from '../PreloadedAssets.js';
import PlayerPersonalSettings from '../PlayerPersonalSettings.js';
import {cloneImage} from '../util/ImageHelpers.js';
import {focusNextElement, focusPrevElement} from '../focuslock/index.js';

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

        window.addEventListener('keyup', this.cutscene_skipListener = e => {
            // skip part
            if (PlayerPersonalSettings.keyboardSettings.cancelOrSkip.indexOf(e.keyCode) != -1 && this.cutscene_timeoutFunction != null) {
                clearTimeout(this.cutscene_timeoutId);
                this.cutscene_timeoutFunction();
            }
        });

        this.cutscene_showSkipButton();

        let orakioVersusLayaImg = cloneImage(PreloadedAssets.cutscenes_orakioVersusLaya);
        this.container.appendChild(orakioVersusLayaImg);
        orakioVersusLayaImg.style.opacity = '0';
        orakioVersusLayaImg.style.transition = 'opacity 0.5s';
        orakioVersusLayaImg.style.position = 'absolute';
        orakioVersusLayaImg.style.left = `${ProjectSettings.centerX(orakioVersusLayaImg.offsetWidth)}px`;
        orakioVersusLayaImg.style.top = `${30}px`;

        this.cutscene_nextPart(() => {
            this.cutscene_clearPart();
            orakioVersusLayaImg.style.opacity = '1';
            this.cutscene_nextPart(() => {
                this.cutscene_clearPart();
                this.showMessageDialog('The legends of Landen, your homeland, tell of world-sweeping wars fought 1,000 years ago.');
                this.cutscene_nextPart(() => {
                    this.cutscene_clearPart();
                    this.showMessageDialog('Brave Orakio sought to foil the evil schemes of the dark witch Laya and her hordes of monsters.');
                    this.cutscene_nextPart(() => {
                        this.cutscene_part2(orakioVersusLayaImg);
                    }, 8000);
                }, 8000);
            }, 500);
        }, 500);
    }

    cutscene_part2(orakioVersusLayaImg) {
        this.cutscene_clearPart();
        orakioVersusLayaImg.style.opacity = '0';
        this.showMessageDialog('In the final battle, all combatants were killed, though Orakio and Laya\'s bodies were never found.');
        this.cutscene_nextPart(() => {
            this.cutscene_clearPart();
            orakioVersusLayaImg.remove();
            let womanOnBeachVideo = PreloadedAssets.cutscenes_womanOnBeach.cloneNode(true);
            womanOnBeachVideo.setAttribute('autoplay', 'true');
            womanOnBeachVideo.setAttribute('loop', 'true');
            this.container.appendChild(womanOnBeachVideo);
            womanOnBeachVideo.style.transition = 'opacity 0.5s';
            womanOnBeachVideo.style.opacity = '0';
            womanOnBeachVideo.style.position = 'absolute';
            womanOnBeachVideo.style.left = `${ProjectSettings.centerX(womanOnBeachVideo.offsetWidth)}px`;
            womanOnBeachVideo.style.top = `${30}px`;
            womanOnBeachVideo.click();
            this.showMessageDialog('The passageways between the Layan worlds and the Orakian worlds were sealed.');

            this.cutscene_nextPart(() => {
                this.cutscene_clearPart();
                womanOnBeachVideo.style.opacity = '1';
                this.showMessageDialog('In time, people forgot there were other worlds besides Landen.');
                this.cutscene_nextPart(() => {
                    this.cutscene_clearPart();
                    this.showMessageDialog('Two months ago, a young woman washed up on the shores of Landen.');
                    this.cutscene_nextPart(() => {
                        this.cutscene_clearPart();
                        this.showMessageDialog('The woman remembered nothing of her life prior to waking up on the beach.');
                        this.cutscene_nextPart(() => {
                            this.cutscene_clearPart();
                            this.showMessageDialog('This seemingly minor event sets an epic adventure in motion...');
                            this.cutscene_nextPart(() => {
                                this.cutscene_clearPart();
                                this.hideMessageDialog();
                                womanOnBeachVideo.style.opacity = '0';
                                this.cutscene_nextPart(() => {
                                    this.cutscene_clearPart();
                                    this.cutscene_end();
                                }, 500);
                            }, 8000);
                        }, 8000);
                    }, 8000);
                }, 8000);
            }, 8000);
        }, 8000);
    }

    cutscene_end() {
        this.container.innerHTML = '';
        window.removeEventListener('keyup', this.cutscene_skipListener);
        this.cutscene_skipListener = null;
        this.cutscene_hideSkipButton();

        this.afterCutscene_show();
    }

    afterCutscene_show() {
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
            if (PlayerPersonalSettings.keyboardSettings.up.indexOf(e.keyCode) != -1) {
                if (document.querySelector(':focus') != null) {
                    focusPrevElement(document.activeElement);
                } else document.getElementById('startGameBtn').focus();
            }
            // down
            else if (PlayerPersonalSettings.keyboardSettings.down.indexOf(e.keyCode) != -1) {
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
            if (PlayerPersonalSettings.keyboardSettings.up.indexOf(e.keyCode) != -1
            ||  PlayerPersonalSettings.keyboardSettings.left.indexOf(e.keyCode) != -1) {
                if (document.querySelector(':focus') != null) {
                    focusPrevElement(document.activeElement);
                } else document.getElementById('backBtn').focus();
            }
            // down/right
            else if (PlayerPersonalSettings.keyboardSettings.down.indexOf(e.keyCode) != -1
            ||  PlayerPersonalSettings.keyboardSettings.right.indexOf(e.keyCode) != -1) {
                if (document.querySelector(':focus') != null) {
                    focusNextElement(document.activeElement);
                } else document.getElementById('backBtn').focus();
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