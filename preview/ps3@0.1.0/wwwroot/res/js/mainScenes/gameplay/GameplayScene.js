import MainScene from '../MainScene.js';
import MainMenuScene from '../mainMenu/MainMenuScene.js';
import ProjectSettings from '../../ProjectSettings.js';
import PreloadedAssets from '../../PreloadedAssets.js';
import PlayerPersonalSettings from '../../PlayerPersonalSettings.js';
import {cloneImage} from '../../util/ImageHelpers.js';
import {focusNextElement, focusPrevElement} from '../../focuslock/index.js';

import {cutscene1_show} from './cutscene1.js';

export default class GameplayScene extends MainScene {
    constructor(slotNum) {
        super();
        this.initialize(slotNum);
    }

    initialize(slotNum) {
        super.initialize();
        if (isNaN(slotNum)) {
            cutscene1_show(this);
        }
    }

    destroy() {
        super.destroy();
    }
}