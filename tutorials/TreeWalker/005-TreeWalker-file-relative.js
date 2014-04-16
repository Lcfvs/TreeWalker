var TreeWalker,
    onfile,
    onerror,
    treeWalker;

TreeWalker = require('../../TreeWalker');

onfile = function onfile(file) {
    console.log('TreeWalker file relative');
    console.log('file : ' + file);
};

onerror = console.log.bind(console, 'error');

treeWalker = new TreeWalker('../temp/directory/subDirectory/hello.txt');

treeWalker.once('file', onfile);
treeWalker.once('error', onerror);