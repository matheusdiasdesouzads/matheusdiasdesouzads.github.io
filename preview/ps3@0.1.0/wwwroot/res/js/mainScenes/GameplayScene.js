import MainScene from './MainScene.js';
import MainMenuScene from './MainMenuScene.js';
import ProjectSettings from '../ProjectSettings.js';
import PreloadedAssets from '../PreloadedAssets.js';
import PlayerPersonalSettings from '../PlayerPersonalSettings.js';
import {cloneImage} from '../util/ImageHelpers.js';
import {focusNextElement, focusPrevElement} from '../focuslock/index.js';

export default class GameplayScene extends MainScene {
    constructor(slotNum) {
        super();
        this.initialize(slotNum);
    }

    initialize(slotNum) {
        super.initialize();
        if (isNaN(slotNum)) {
            this.cutscene1_show();
        }
    }

    cutscene1_show() {
        document.body.parentElement.setAttribute('outer-space', 'true');
        document.body.setAttribute('outer-space', 'true');

        window.addEventListener('keyup', this.cutscene_skipListener = e => {
            // skip part
            if (PlayerPersonalSettings.keyboardSettings.cancelOrSkip.indexOf(e.keyCode) != -1 && this.cutscene_timeoutFunction != null) {
                clearTimeout(this.cutscene_timeoutId);
                this.cutscene_timeoutFunction();
            }
        });

        this.cutscene_showSkipButton();

        /*
        this.cutscene_nextPart(() => {
            this.cutscene_clearPart();
            //
        }, 7000);
        */

        let outerSpaceImg = cloneImage(PreloadedAssets.cutscenes_outerspace1);
        outerSpaceImg.style.position = 'absolute';
        this.container.appendChild(outerSpaceImg);
        outerSpaceImg.style.width = `${ProjectSettings.width}px`;
        outerSpaceImg.style.height = `${ProjectSettings.height}px`;
        outerSpaceImg.style.transition = `opacity 0.5s`;
        outerSpaceImg.style.opacity = '0';

        this.cutscene_nextPart(() => {
            this.cutscene_clearPart();
            outerSpaceImg.style.opacity = '1';
            this.cutscene_nextPart(() => {
                this.cutscene_clearPart();
                let text1Span = $('<span style="position: absolute; left: 100px; top: 100px; transition: 0.5s opacity; opacity: 0; width: 400px; word-break: normal"></span>').get(0);
                text1Span.innerHTML = `The legends of the past shape our lives and those of our children.`;
                this.container.appendChild(text1Span);
                this.cutscene_nextPart(() => {
                    this.cutscene_clearPart();
                    text1Span.style.opacity = '1';
                    let text2Span = $('<span style="position: absolute; left: 100px; top: 300px; transition: 0.5s opacity; opacity: 0; width: 300px; word-break: normal"></span>').get(0);
                    text2Span.innerHTML = `One such legend is of a struggle that almost destroyed our world.`;
                    this.container.appendChild(text2Span);
                    this.cutscene_nextPart(() => {
                        this.cutscene_clearPart();
                        text2Span.style.opacity = '1';
                        this.cutscene_nextPart(() => {
                            this.cutscene_clearPart();
                            text1Span.style.opacity = '0';
                            text2Span.style.opacity = '0';
                            this.cutscene_nextPart(() => {
                                this.cutscene_clearPart();
                                text1Span.remove();
                                text2Span.remove();
                                this.cutscene1Dot2_show(outerSpaceImg);
                            }, 3000);
                        }, 6000);
                    }, 3000);
                }, 1000);
            }, 1000);
        }, 1000);
    }

    cutscene1Dot2_show(outerSpaceImg) {
        let text1Span = $('<span style="position: absolute; left: 100px; top: 100px; transition: 0.5s opacity; opacity: 0; width: 500px; word-break: normal"></span>').get(0);
        text1Span.innerHTML = `The names of Orakio and Laya echo down through the years, still inspiring love and hatred even now, 1,000 years after their tragic deaths.`;
        this.container.appendChild(text1Span);
        this.cutscene_nextPart(() => {
            this.cutscene_clearPart();
            text1Span.style.opacity = '1';
            this.cutscene_nextPart(() => {
                this.cutscene_clearPart();
                let text2Span = $('<span style="position: absolute; left: 100px; top: 300px; transition: 0.5s opacity; opacity: 0; width: 500px; word-break: normal"></span>').get(0);
                text2Span.innerHTML = `Their conflict wiped out civilization and left the survivors in a world of mutated creatures and warring pockets of men.`;
                this.container.appendChild(text2Span);
                this.cutscene_nextPart(() => {
                    this.cutscene_clearPart();
                    text2Span.style.opacity = '1';
                    this.cutscene_nextPart(() => {
                        this.cutscene_clearPart();
                        text1Span.style.opacity = '0';
                        text2Span.style.opacity = '0';
                        this.cutscene_nextPart(() => {
                            this.cutscene_clearPart();
                            text1Span.remove();
                            text2Span.remove();
                            this.cutscene1Dot3_show(outerSpaceImg);
                        }, 2000);
                    }, 9000);
                }, 1000);
            }, 500);
        }, 500);
    }

    cutscene1Dot3_show(outerSpaceImg) {
        let text1Span = $('<span style="position: absolute; left: 100px; top: 100px; transition: 0.5s opacity; opacity: 0; width: 500px; word-break: normal"></span>').get(0);
        text1Span.innerHTML = `Into this shattered world you are thrust to live or die by your sword and your wits...`;
        this.container.appendChild(text1Span);
        this.cutscene_nextPart(() => {
            this.cutscene_clearPart();
            text1Span.style.opacity = '1';
            this.cutscene_nextPart(() => {
                this.cutscene_clearPart();
                text1Span.style.opacity = '0';
                this.cutscene_nextPart(() => {
                    this.cutscene_clearPart();
                    text1Span.remove();
                    this.cutscene_nextPart(() => {
                        this.cutscene_clearPart();
                        outerSpaceImg.style.opacity = '0';
                        this.cutscene_nextPart(() => {
                            this.cutscene1_end();
                        }, 500);
                    }, 2000);
                }, 500);
            }, 8000);
        }, 1000);
    }

    cutscene1_end() {
        document.body.parentElement.setAttribute('outer-space', 'false');
        document.body.setAttribute('outer-space', 'false');
        this.container.innerHTML = '';
        window.removeEventListener('keyup', this.cutscene_skipListener);
        this.cutscene_skipListener = null;
        this.cutscene_hideSkipButton();
    }

    destroy() {
        super.destroy();
    }
}