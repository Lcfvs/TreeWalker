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
    var path,
        handler;
    
    path = '../link.txt';
    
    console.log('file.link(\'' + path + '\')');
    
    handler = file.link(path);
    
    handler.once('file', onfile);
    handler.once('error', onerror);
};

onfile = function onfile(copy, original) {
    var handler;
    
    console.log('copy file : ' + copy);
    console.log('original file : ' + original);
    console.log('copy.read()');
    
    handler = copy.read();

    handler.once('data', ondata);
    handler.once('error', onerror);
};

ondata = function ondata(data) {
    console.log('data : ' + data);
};

onerror = console.log.bind(console, 'error');

emitter = init();

emitter.once('done', oninitdone);
emitter.once('error', onerror);