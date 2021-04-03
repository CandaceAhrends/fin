const createNode = (data, isCompleteWord) => {
  return {
    data,
    isCompleteWord,
    children: [],
  };
};

const findAllWords = (node) => {
  const children = Object.keys(node.children);
  const rootLetter = node.data;
  let res = [];

  if (!children.length) {
    return [rootLetter];
  } else if (node.isCompleteWord) {
    res.unshift(node.data);
  }

  res = children.reduce((collection, letterKey) => {
    const childNode = node.children[letterKey];

    const childLetters = findAllWords(childNode);

    collection = [
      ...collection,
      ...childLetters.map((letter) => {
        return `${rootLetter}${letter}`;
      }),
    ];

    return collection;
  }, res);

  return res;
};

function SearchTrie() {
  this.root = createNode(null);
  this.current = this.root;
}

SearchTrie.prototype.insertWord = function (word) {
  for (let i = 0; i < word.length; i++) {
    const ch = word[i];

    if (!this.current.children[ch]) {
      this.current.children[ch] = createNode(ch, i === word.length - 1);
    }
    this.current = this.current.children[ch];
  }
  this.current = this.root;
};
function iterateTrie(node) {
  Object.keys(node.children).map((key) => {
    const child = node.children[key];
    if (child.isWord) console.log(child.data);
    iterateTrie(child);
  });
}
SearchTrie.prototype.showAll = function () {
  const node = this.root;
  iterateTrie(node);
};
SearchTrie.prototype.autoCompleteWords = function (typedChars) {
  let node = this.root;
  let lastNode = this.root;
  const path = Array.from(typedChars);

  while (lastNode && path.length) {
    const ch = path.shift();
    lastNode = node.children[ch] || null;

    if (lastNode) {
      node = lastNode;
    }
  }

  return lastNode
    ? findAllWords(node).map((word) => `${typedChars}${word.slice(1)}`)
    : [];
};

export default SearchTrie;
