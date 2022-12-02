import ProjectSettings from '../../ProjectSettings.js';
import PreloadedAssets from '../../PreloadedAssets.js';
import PlayerPersonalSettings from '../../PlayerPersonalSettings.js';
import {cloneImage} from '../../util/ImageHelpers.js';

export function cutscene1_show(scene) {
    scene.cutscene_configBegin();

    let orakioVersusLayaImg = cloneImage(PreloadedAssets.cutscenes_orakioVersusLaya);
    scene.container.appendChild(orakioVersusLayaImg);
    orakioVersusLayaImg.style.opacity = '0';
    orakioVersusLayaImg.style.transition = 'opacity 0.5s';
    orakioVersusLayaImg.style.position = 'absolute';
    orakioVersusLayaImg.style.left = `${ProjectSettings.centerX(orakioVersusLayaImg.offsetWidth)}px`;
    orakioVersusLayaImg.style.top = `${30}px`;

    scene.cutscene_nextPart(() => {
        orakioVersusLayaImg.style.opacity = '1';
        scene.cutscene_nextPart(() => {
            scene.showMessageDialog('The legends of Landen, your homeland, tell of world-sweeping wars fought 1,000 years ago.');
            scene.cutscene_nextPart(() => {
                scene.showMessageDialog('Brave Orakio sought to foil the evil schemes of the dark witch Laya and her hordes of monsters.');
                scene.cutscene_nextPart(() => {
                    cutscene_part2(scene, orakioVersusLayaImg);
                }, 8000);
            }, 8000);
        }, 500);
    }, 500);
}

function cutscene_part2(scene, orakioVersusLayaImg) {
    orakioVersusLayaImg.style.opacity = '0';
    scene.showMessageDialog('In the final battle, all combatants were killed, though Orakio and Laya\'s bodies were never found.');
    scene.cutscene_nextPart(() => {
        orakioVersusLayaImg.remove();
        let womanOnBeachVideo = PreloadedAssets.cutscenes_womanOnBeach.cloneNode(true);
        womanOnBeachVideo.setAttribute('autoplay', 'true');
        womanOnBeachVideo.setAttribute('loop', 'true');
        scene.container.appendChild(womanOnBeachVideo);
        womanOnBeachVideo.style.transition = 'opacity 0.5s';
        womanOnBeachVideo.style.opacity = '0';
        womanOnBeachVideo.style.position = 'absolute';
        womanOnBeachVideo.style.left = `${ProjectSettings.centerX(womanOnBeachVideo.offsetWidth)}px`;
        womanOnBeachVideo.style.top = `${30}px`;
        womanOnBeachVideo.click();
        scene.showMessageDialog('The passageways between the Layan worlds and the Orakian worlds were sealed.');

        scene.cutscene_nextPart(() => {
            womanOnBeachVideo.style.opacity = '1';
            scene.showMessageDialog('In time, people forgot there were other worlds besides Landen.');
            scene.cutscene_nextPart(() => {
                scene.showMessageDialog('Two months ago, a young woman washed up on the shores of Landen.');
                scene.cutscene_nextPart(() => {
                    scene.showMessageDialog('The woman remembered nothing of her life prior to waking up on the beach.');
                    scene.cutscene_nextPart(() => {
                        scene.showMessageDialog('This seemingly minor event sets an epic adventure in motion...');
                        scene.cutscene_nextPart(() => {
                            scene.hideMessageDialog();
                            womanOnBeachVideo.style.opacity = '0';
                            scene.cutscene_nextPart(() => {
                                cutscene1_end(scene);
                            }, 500);
                        }, 8000);
                    }, 8000);
                }, 8000);
            }, 8000);
        }, 8000);
    }, 8000);
}

function cutscene1_end(scene) {
    scene.container.innerHTML = '';
    scene.cutscene_configEnd();

    scene.afterCutscene1_show();
}