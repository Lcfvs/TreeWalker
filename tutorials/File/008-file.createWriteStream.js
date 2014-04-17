var init,
    TreeWalker,
    oninitdone,
    onwalkerfile,
    onstdindata,
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
    var stream,
        ondata;
    
    console.log('file.createWriteStream()');
    
    stream = file.createWriteStream();
    
    console.log('file : ' + file);
    
    ondata = onstdindata.bind(stream);
    
    process.stdin.on('data', ondata);
    
    stream.once('error', onerror);
};

onstdindata = function onstdindata(data) {
    if (data === '\u0003') {
        this.end();
    } else {
        this.write(data);
    }
};

onerror = console.log.bind(console, 'error');

emitter = init();

emitter.once('done', oninitdone);
emitter.once('error', onerror);