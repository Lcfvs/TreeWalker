var init,
    TreeWalker,
    oninitdone,
    onwalkerfile,
    onstats,
    onerror,
    emitter;

init = require('../init');
TreeWalker = require('../../TreeWalker');

oninitdone = function oninitdone(path) {
    var treeWalker;

    treeWalker = new TreeWalker(path, './directory/subDirectory/hello.txt');

    treeWalker.once('file', onwalkerfile);
    treeWalker.once('error', onerror);
};

onwalkerfile = function onwalkerfile(file) {
    var handler;
    
    console.log('file.stat()');
    
    handler = file.stat();

    handler.once('stats', onstats);
    handler.once('error', onerror);
};

onstats = function onstats(stats, file) {
    console.log('file : ' + file);
    console.log('stats : ' + JSON.stringify(stats));
};

onerror = console.log.bind(console, 'error');

emitter = init();

emitter.once('done', oninitdone);
emitter.once('error', onerror);