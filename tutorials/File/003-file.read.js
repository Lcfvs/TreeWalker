var init,
    TreeWalker,
    oninitdone,
    onwalkerfile,
    ondata,
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
    
    console.log('file.read()');
    handler = file.read();

    handler.once('data', ondata);
    handler.once('error', onerror);
};

ondata = function ondata(data, file) {
    console.log('file : ' + file);
    console.log('data : ' + data);
};

onerror = console.log.bind(console, 'error');

emitter = init();

emitter.once('done', oninitdone);
emitter.once('error', onerror);