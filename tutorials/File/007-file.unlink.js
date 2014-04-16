var init,
    TreeWalker,
    oninitdone,
    onwalkerfile,
    ondone,
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
    
    console.log('file.unlink()');
    
    handler = file.unlink();

    handler.once('done', ondone);
    handler.once('error', onerror);
};

ondone = function ondone(path) {
    console.log('path : ' + path);
};

onerror = console.log.bind(console, 'error');

emitter = init();

emitter.once('done', oninitdone);
emitter.once('error', onerror);