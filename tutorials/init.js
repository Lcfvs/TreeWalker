var EventEmitter,
    resolve,
    TreeWalker,
    init,
    ontwdirectory,
    onremovedone,
    onparentdirectory,
    onsubdirectory,
    onsubfile,
    onemptydirectory;
    
require('node-strict');

EventEmitter = require('events').EventEmitter;
resolve = require('path').resolve;

TreeWalker = require('../TreeWalker');

init = function init() {
    var emitter,
        emit,
        path,
        deferred;
    
    emitter = new EventEmitter();

    emit = emitter.emit;
    path = resolve(__dirname, 'temp');
    
    emitter.ondone = emit.bind(emitter, 'done', path);
    emitter.onerror = emit.bind(emitter, 'error');
    
    deferred = createTreeWalker.bind(emitter, path);
    
    setImmediate(deferred);
    
    return emitter;
};

createTreeWalker = function createTreeWalker(path) {
    var treeWalker,
        ondirectory;
        
    treeWalker = new TreeWalker(path);

    ondirectory = ontwdirectory.bind(this);
    
    treeWalker.once('directory', ondirectory);
    treeWalker.once('error', this.onerror);
};

ontwdirectory = function ontwdirectory(directory) {
    var handler,
        ondone;

    handler = directory.removeRecursive();
    
    ondone = onremovedone.bind(this, directory);
    
    handler.once('done', ondone);
    handler.once('error', this.onerror);
};

onremovedone = function onremovedone(directory) {
    var handler,
        ondirectory;

    handler = directory.parent();
    
    ondirectory = onparentdirectory.bind(this);
    
    handler.once('directory', ondirectory);
    handler.once('error', this.onerror);
};

onparentdirectory = function onparentdirectory(directory) {
    var handler,
        ondirectory;
    
    handler = directory.makeRecursive('./temp/directory/subDirectory');
    
    ondirectory = onsubdirectory.bind(this);
    
    handler.once('directory', ondirectory);
    handler.once('error', this.onerror);
};

onsubdirectory = function onsubdirectory(directory) {
    var filename,
        data,
        handler,
        onfile;
    
    filename = 'hello.txt';
    data = 'Hello world!';
    
    handler = directory.writeFile(filename, data);
    
    onfile = onsubfile.bind(this, directory);
    
    handler.once('file', onfile);
    handler.once('error', this.onerror);
    
};

onsubfile = function onsubfile(directory, file) {
    var handler,
        ondirectory;
    
    handler = directory.make('./subSubDirectory');
    
    ondirectory = onemptydirectory.bind(this);
    
    handler.once('directory', ondirectory);
    handler.once('error', this.onerror);
};

onemptydirectory = function onemptydirectory() {
    this.ondone();
};

module.exports = init;