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
    var handler;
    
    console.log('file.parent()');
    
    handler = file.parent();

    handler.once('directory', ondirectory);
    handler.once('error', onerror);
};

ondirectory = function ondirectory(directory) {
    console.log('directory : ' + directory);
};

onerror = console.log.bind(console, 'error');

emitter = init();

emitter.once('done', oninitdone);
emitter.once('error', onerror);