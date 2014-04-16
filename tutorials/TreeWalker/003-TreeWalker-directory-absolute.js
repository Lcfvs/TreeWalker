var TreeWalker,
    ondirectory,
    onerror,
    treeWalker;

TreeWalker = require('../../TreeWalker');

ondirectory = function ondirectory(directory) {
    console.log('TreeWalker directory absolute');
    console.log('directory : ' + directory);
};

onerror = console.log.bind(console, 'error');

treeWalker = new TreeWalker(__dirname);

treeWalker.once('directory', ondirectory);
treeWalker.once('error', onerror);
