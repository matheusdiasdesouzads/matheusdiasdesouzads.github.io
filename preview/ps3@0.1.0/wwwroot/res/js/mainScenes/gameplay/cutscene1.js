import ProjectSettings from '../../ProjectSettings.js';
import PreloadedAssets from '../../PreloadedAssets.js';
import PlayerPersonalSettings from '../../PlayerPersonalSettings.js';
import {cloneImage} from '../../util/ImageHelpers.js';

export function cutscene1_show(scene) {
    document.body.parentElement.setAttribute('outer-space', 'true');
    document.body.setAttribute('outer-space', 'true');

    scene.cutscene_configBegin();

    /*
    scene.cutscene_nextPart(() => {
        //
    }, 7000);
    */

    let outerSpaceImg = cloneImage(PreloadedAssets.cutscenes_outerspace1);
    outerSpaceImg.style.position = 'absolute';
    scene.container.appendChild(outerSpaceImg);
    outerSpaceImg.style.width = `${ProjectSettings.width}px`;
    outerSpaceImg.style.height = `${ProjectSettings.height}px`;
    outerSpaceImg.style.transition = `opacity 0.5s`;
    outerSpaceImg.style.opacity = '0';

    scene.cutscene_nextPart(() => {
        outerSpaceImg.style.opacity = '1';
        scene.cutscene_nextPart(() => {
            let text1Span = $('<span style="position: absolute; left: 100px; top: 100px; transition: 0.5s opacity; opacity: 0; width: 400px; word-break: normal"></span>').get(0);
            text1Span.innerHTML = `The legends of the past shape our lives and those of our children.`;
            scene.container.appendChild(text1Span);
            scene.cutscene_nextPart(() => {
                text1Span.style.opacity = '1';
                let text2Span = $('<span style="position: absolute; left: 100px; top: 300px; transition: 0.5s opacity; opacity: 0; width: 300px; word-break: normal"></span>').get(0);
                text2Span.innerHTML = `One such legend is of a struggle that almost destroyed our world.`;
                scene.container.appendChild(text2Span);
                scene.cutscene_nextPart(() => {
                    text2Span.style.opacity = '1';
                    scene.cutscene_nextPart(() => {
                        text1Span.style.opacity = '0';
                        text2Span.style.opacity = '0';
                        scene.cutscene_nextPart(() => {
                            text1Span.remove();
                            text2Span.remove();
                            cutscene1Dot2_show(scene, outerSpaceImg);
                        }, 3000);
                    }, 6000);
                }, 3000);
            }, 1000);
        }, 1000);
    }, 1000);
}

function cutscene1Dot2_show(scene, outerSpaceImg) {
    let text1Span = $('<span style="position: absolute; left: 100px; top: 100px; transition: 0.5s opacity; opacity: 0; width: 500px; word-break: normal"></span>').get(0);
    text1Span.innerHTML = `The names of Orakio and Laya echo down through the years, still inspiring love and hatred even now, 1,000 years after their tragic deaths.`;
    scene.container.appendChild(text1Span);
    scene.cutscene_nextPart(() => {
        text1Span.style.opacity = '1';
        scene.cutscene_nextPart(() => {
            let text2Span = $('<span style="position: absolute; left: 100px; top: 300px; transition: 0.5s opacity; opacity: 0; width: 500px; word-break: normal"></span>').get(0);
            text2Span.innerHTML = `Their conflict wiped out civilization and left the survivors in a world of mutated creatures and warring pockets of men.`;
            scene.container.appendChild(text2Span);
            scene.cutscene_nextPart(() => {
                text2Span.style.opacity = '1';
                scene.cutscene_nextPart(() => {
                    text1Span.style.opacity = '0';
                    text2Span.style.opacity = '0';
                    scene.cutscene_nextPart(() => {
                        text1Span.remove();
                        text2Span.remove();
                        cutscene1Dot3_show(scene, outerSpaceImg);
                    }, 2000);
                }, 9000);
            }, 1500);
        }, 1500);
    }, 500);
}

function cutscene1Dot3_show(scene, outerSpaceImg) {
    let text1Span = $('<span style="position: absolute; left: 100px; top: 100px; transition: 0.5s opacity; opacity: 0; width: 500px; word-break: normal"></span>').get(0);
    text1Span.innerHTML = `Into this shattered world you are thrust to live or die by your sword and your wits...`;
    scene.container.appendChild(text1Span);
    scene.cutscene_nextPart(() => {
        text1Span.style.opacity = '1';
        scene.cutscene_nextPart(() => {
            text1Span.style.opacity = '0';
            scene.cutscene_nextPart(() => {
                text1Span.remove();
                scene.cutscene_nextPart(() => {
                    outerSpaceImg.style.opacity = '0';
                    scene.cutscene_nextPart(() => {
                        cutscene1_end(scene);
                    }, 500);
                }, 2000);
            }, 500);
        }, 8000);
    }, 1000);
}

function cutscene1_end(scene) {
    document.body.parentElement.setAttribute('outer-space', 'false');
    document.body.setAttribute('outer-space', 'false');
    scene.container.innerHTML = '';
    scene.cutscene_configEnd();
}