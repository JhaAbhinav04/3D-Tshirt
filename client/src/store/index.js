import { proxy } from 'valtio';

const state = proxy({
    intro: true,        //are we at homepage
    color: '#EFBD48',
    isLogoTexture: true, //is logo currently displayed
    isFullTexture: false,
    logoDecal: './threejs.png',
    fullDecal: './threejs.png',
});

export default state;