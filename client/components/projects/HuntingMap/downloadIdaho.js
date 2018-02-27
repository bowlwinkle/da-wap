var https = require('https');
var fs = require('fs');

const link = 'https://idfg.idaho.gov/ifwis/huntplanner/stats.aspx?season=general&game=deer&yr=2016&method=archery&filetype=csv';
const types = ['general', 'controlled', 'muzzleloader'];
const weapons = ['any%20weapon', 'archery', ];
const animals = ['deer', 'elk', 'pronghorn', 'bear', 'lion', 'moose', 'sheep', 'goat', 'turkey'];
const years = ['2016'];

const constructURL = (type, weapon, animal, year) => {
    return {
        url: `https://idfg.idaho.gov/ifwis/huntplanner/stats.aspx?season=${type}&game=${animal}&yr=${year}&method=${weapon}&filetype=csv`,
        fileName: `${type}_${weapon}_${animal}_${year}.csv`
    };
}

const constructPaths = () => {
    let paths = [];
    types.forEach(type => {
        weapons.forEach(weapon => {
            animals.forEach(animal => {
                years.forEach(year => {
                    paths.push(constructURL(type, weapon, animal, year));
                });
            });
        });
    });

    return paths;
};

const downloadContent = (paths) => {
    paths.forEach(path => {
        https.get(path.url, response => {
            var file = fs.createWriteStream(path.fileName);
            response.pipe(file);
            response.on('error', (e) => {
                console.log(path.fileName + ' failed to download');
                console.error(e);
            });
            // response.on('end', () => {
            //     file.close();
            // })
        });
    });
};

const paths = constructPaths();
downloadContent(paths);