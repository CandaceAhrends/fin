const createNode = (data, isWord) => {
  return {
    data,
    isWord,
    children: [],
  };
};

const findAllWords = (node) => {
  const children = Object.keys(node.children);
  const rootLetter = node.data;
  if (!children.length) {
    return [rootLetter];
  }

  const res = children.reduce((collection, letterKey) => {
    const childNode = node.children[letterKey];
    const currentLetter = node.data;

    const letters = findAllWords(childNode);

    collection = [
      ...collection,
      ...letters.map((letter) => {
        return `${currentLetter}${letter}`;
      }),
    ];

    return collection;
  }, []);

  if (node.isWord) {
    res.unshift(node.data);
  }

  return res;
};

function Tree() {
  this.root = createNode(null);
  this.current = this.root;
}

Tree.prototype.insertWord = function (word) {
  for (let i = 0; i < word.length; i++) {
    const ch = word[i];

    if (!this.current.children[ch]) {
      this.current.children[ch] = createNode(ch, i === word.length - 1);
    }
    this.current = this.current.children[ch];
  }
  this.current = this.root;
};

Tree.prototype.autoCompleteWords = function (typedChars) {
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

  if (lastNode)
    return lastNode
      ? findAllWords(node).map((word) => `${typedChars}${word}`)
      : [];
};

export default Tree;
