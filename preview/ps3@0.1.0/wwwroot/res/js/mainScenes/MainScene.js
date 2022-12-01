import ProjectSettings from '../ProjectSettings.js';

export default class MainScene {
    constructor() {
        this.container = document.createElement('div');
        this.messageDialogElement = null;
        this.messageDialogIntervalId = -1;

        this.cutscene_skipListener = null;
        this.cutscene_timeoutFunction = null;
        this.cutscene_timeoutId = -1;
    }

    initialize() {
        document.getElementById('gameContainer').appendChild(this.container);
        this.m_tickIntervalId = 0;
        this.m_tickIntervalId = setInterval(() => {
            this.tick();
        }, 1_000 / ProjectSettings.frameRate);
        this.tick();
    }

    destroy() {
        clearInterval(this.m_tickIntervalId);
        document.getElementById('gameContainer').removeChild(this.container);
    }

    tick() {
    }

    cutscene_clearPart() {
        clearInterval(this.cutscene_timeoutId);
        this.cutscene_timeoutId = -1;
        this.cutscene_timeoutFunction = null;
    }

    cutscene_nextPart(fn, nextPartMilli = 1000) {
        this.cutscene_timeoutId = setTimeout(this.cutscene_timeoutFunction = fn, nextPartMilli);
    }

    showMessageDialog(text) {
        if (this.messageDialogIntervalId != -1) {
            clearInterval(this.messageDialogIntervalId);
            this.messageDialogIntervalId = -1;
        }
        if (this.messageDialogElement != null) {
            this.messageDialogElement.remove();
            this.messageDialogElement = null;
        }
        this.messageDialogElement = $(`<div class="message-dialog" style="
            position: absolute; width: 470px; height: 50px;
        "></div>`).get(0);
        this.container.appendChild(this.messageDialogElement);
        this.messageDialogElement.style.left = `${ProjectSettings.centerX(this.messageDialogElement.offsetWidth)}px`;
        this.messageDialogElement.style.top = `${ProjectSettings.height - this.messageDialogElement.offsetHeight - 30}px`;
        let split = text.split('');
        this.messageDialogIntervalId = setInterval(() => {
            if (split.length == 0) {
                clearInterval(this.messageDialogIntervalId);
                this.messageDialogIntervalId = -1;
                return;
            }
            let s = split.shift();
            this.messageDialogElement.innerText += s == ' ' ? ' ' + split.shift() : s;
        }, 10);
    }

    hideMessageDialog() {
        if (this.messageDialogIntervalId != -1) {
            clearInterval(this.messageDialogIntervalId);
            this.messageDialogIntervalId = -1;
        }
        if (this.messageDialogElement != null) {
            this.messageDialogElement.remove();
            this.messageDialogElement = null;
        }
    }
}