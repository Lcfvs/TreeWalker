var init,
    TreeWalker,
    oninitdone,
    onwalkerfile,
    ontime,
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
    
    console.log('file.atime()');
    
    handler = file.atime();

    handler.once('time', ontime);
    handler.once('error', onerror);
};

ontime = function ontime(atime, file) {
    console.log('file : ' + file);
    console.log('mtime : ' + atime);
};

onerror = console.log.bind(console, 'error');

emitter = init();

emitter.once('done', oninitdone);
emitter.once('error', onerror);