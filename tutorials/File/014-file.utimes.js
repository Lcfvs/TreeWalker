var init,
    TreeWalker,
    oninitdone,
    onwalkerfile,
    onfile,
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
    var now,
        atime,
        mtime,
        handler;
    
    now = Date.now();
    
    atime = now / 1000;
    mtime = now / 1000;
    
    console.log('file.utimes(\'' + atime + ', ' + mtime + '\')');
    
    handler = file.utimes(atime, mtime);

    handler.once('file', onfile);
    handler.once('error', onerror);
};

onfile = function onfile(file) {
    console.log('file : ' + file);
};

onerror = console.log.bind(console, 'error');

emitter = init();

emitter.once('done', oninitdone);
emitter.once('error', onerror);