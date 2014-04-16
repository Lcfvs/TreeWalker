var TreeWalker,
    onfile,
    onerror,
    treeWalker;

TreeWalker = require('../../TreeWalker');

onfile = function onfile(file) {
    console.log('TreeWalker file multiple');
    console.log('file : ' + file);
};

onerror = console.log.bind(console, 'error');

treeWalker = new TreeWalker(__filename, '..', '..', 'init.js');

treeWalker.once('file', onfile);
treeWalker.once('error', onerror);