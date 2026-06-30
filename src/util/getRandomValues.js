const MersenneTwister = require('../lib/mersenne-twister');

const twister = new MersenneTwister(Math.random() * Number.MAX_SAFE_INTEGER);

function randomFloat() {
    return twister.random();
}

function getRandomValues(abv) {
    let l = abv.length;
    while (l--) {
        abv[l] = Math.floor(randomFloat() * 256);
    }
    return abv;
}

module.exports = getRandomValues;
