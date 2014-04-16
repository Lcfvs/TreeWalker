var TreeWalker,
    ondirectory,
    onerror,
    treeWalker;

TreeWalker = require('../../TreeWalker');

ondirectory = function ondirectory(directory) {
    console.log('TreeWalker directory cwd');
    console.log('directory : ' + directory);
};

onerror = console.log.bind(console, 'error');

treeWalker = new TreeWalker();

treeWalker.once('directory', ondirectory);
treeWalker.once('error', onerror);
