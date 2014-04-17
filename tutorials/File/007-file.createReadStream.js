var init,
    TreeWalker,
    oninitdone,
    onwalkerfile,
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
    var stream;
    
    console.log('file.createReadStream()');
    
    stream = file.createReadStream();
    
    console.log('file : ' + file);

    stream.pipe(process.stdout);
    
    stream.once('error', onerror);
};

onerror = console.log.bind(console, 'error');

emitter = init();

emitter.once('done', oninitdone);
emitter.once('error', onerror);