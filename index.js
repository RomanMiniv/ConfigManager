const
  input = document.getElementById('input'),
  output = document.getElementById('output');

input.focus();

input.addEventListener('input', (e) => {
  const obj = JSON.parse(e.target.value);
  iterateObject(obj);

  output.value = JSON.stringify(obj, null, 4);
  output.select();
});

const
  acronyms = ['ID', 'URL', 'JSON', 'HTML', 'PDF', 'IP', 'SMS', 'ISO', 'ZIP', 'AMP', 'ISP', 'OS', 'IOS', 'UTM', 'UTC', 'GDPR', 'API', 'VAT', 'IVR', 'MRR', 'PO'],
  articles = ['at', 'by', 'to', 'on', 'in', 'of', 'for', 'from', 'or', 'via', 'be'];

function iterateObject(data) {
  if (Array.isArray(data)) {
      data.forEach(item => {
          addLabel(item);
          for (let key in item) {
              if (typeof item[key] === 'object') {
                iterateObject(item[key]);
              }
          }
      });
  } else if (typeof data === 'object') {
      addLabel(data);
      for (let key in data) {
          if (typeof data[key] === 'object') {
            iterateObject(data[key]);
      }
    }
  }
}
function addLabel(obj) {
  const { name } = obj;
  if (!name) {
    return obj;
  }

  const delimiter = guessDelimiter(obj.name);
  let splitName = name.split(delimiter);
  if (!delimiter) {
    if (isAcronym(splitName[0])) {
      obj.label = splitName[0];
      return obj;
    };
    splitName = splitName
      .map(word => word.replace(/[A-Z]/g, match => ' ' + match));
  } else {
    splitName = splitName
      .map(word => word.toLowerCase());
  }
  const label = splitName
    .map(word => word.replace(/\D\d/g, match => `${match[0]} ${match[1]}`))
    .map(word => word.replace(/\d\D/g, match => `${match[0]} ${match[1]}`))
    .join(' ')
    .trim()
    .split(' ')
    .map((word, index) => {
      const resultWord = delimiter
        ? (isUppercase(splitName[index]) ? word.toUpperCase() : word)
        : word;
      return modifyWordForLabel(resultWord);
    })
    .join(' ');

  obj.label = label;
  return obj;
}
function guessDelimiter(word) {
  const delimiters = ['_', '-', ' '];
  let maxAmount = 0;
  let currentDelimiter = '_';
  delimiters.forEach((del) => {
    const { length } = word.split(del);
    if (length > maxAmount) {
      maxAmount = length;
      currentDelimiter = del;
    }
  });
  return maxAmount === 1 ? null : currentDelimiter;
}
function isUppercase(word) {
  return word.split('').map(w => w.toUpperCase()).join('') === word;
}
function isAcronym(word) {
  return acronyms.includes(word.toUpperCase());
}
function modifyWordForLabel(word) {
  if (articles.includes(word.toLowerCase())) {
    return word.toLowerCase();
  } else if (acronyms.includes(word.toUpperCase())) {
    return word.toUpperCase();
  } else {
    return capitalizeFirstLetter(word);
  }
}
function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}
