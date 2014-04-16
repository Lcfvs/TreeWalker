var TreeWalker,
    onfile,
    onerror,
    treeWalker;

TreeWalker = require('../../TreeWalker');

onfile = function onfile(file) {
    console.log('TreeWalker file absolute');
    console.log('file : ' + file);
};

onerror = console.log.bind(console, 'error');

treeWalker = new TreeWalker(__filename);

treeWalker.once('file', onfile);
treeWalker.once('error', onerror);