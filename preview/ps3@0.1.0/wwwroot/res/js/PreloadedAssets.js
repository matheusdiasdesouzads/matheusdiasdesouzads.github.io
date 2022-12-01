import {createVideoFromBinary} from './util/VideoHelpers.js';

const PreloadedAssets = {
    /**
     * Image element.
     */
    logo: null,
    /**
     * SVG object element.
     */
    segaLogo: null,
    /**
     * Image element.
     */
    overworldGeneration1: null,
    /**
     * Image element.
     */
    overworldGeneration2: null,
    /**
     * Image element.
     */
    overworldGeneration3: null,

    /**
     * Image element.
     */
    cutscenes_orakioVersusLaya: null,
    /**
     * Video element.
     */
    cutscenes_womanOnBeach: null,
    /**
     * Image element.
     */
    cutscenes_outerspace1: null,

    initializeMisc(loadQueue) {
        // logo
        PreloadedAssets.logo = loadQueue.getResult('logo');
        PreloadedAssets.logo.draggable = false;

        // segaLogo
        PreloadedAssets.segaLogo = loadQueue.getResult('segaLogo');

        // cutscenes_orakioVersusLaya
        PreloadedAssets.cutscenes_orakioVersusLaya = loadQueue.getResult('cutscenes.orakioVersusLaya');

        // cutscenes_womanOnBeach
        PreloadedAssets.cutscenes_womanOnBeach = createVideoFromBinary(loadQueue.getResult('cutscenes.womanOnBeach'));
        PreloadedAssets.cutscenes_womanOnBeach.width = 608;
        PreloadedAssets.cutscenes_womanOnBeach.height = 380;

        // cutscenes_outerspace1
        PreloadedAssets.cutscenes_outerspace1 = loadQueue.getResult('cutscenes.outerspace1');
    },

    initializeOverworldSheets(loadQueue) {
        let tags = [
            PreloadedAssets.overworldGeneration1 = loadQueue.getResult('overworldGeneration1'),
            PreloadedAssets.overworldGeneration2 = loadQueue.getResult('overworldGeneration2'),
            PreloadedAssets.overworldGeneration3 = loadQueue.getResult('overworldGeneration3'),
        ];
        for (let img of tags) {
            img.style['image-rendering'] = 'pixelated';
        }
    },
};

export default PreloadedAssets;