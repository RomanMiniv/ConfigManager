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
  acronyms = ['ID', 'URL', 'JSON', 'HTML', 'HTML5', 'PDF', 'IP', 'SMS', 'ISO', 'ZIP', 'AMP', 'ISP', 'OS', 'IOS', 'UTM', 'UTC', 'GDPR', 'API', 'VAT', 'IVR', 'MRR', 'PO', 'BCC', 'UBL', 'CSS', 'CSS3', 'JS', 'CC'],
  articles = ['at', 'by', 'to', 'on', 'in', 'of', 'for', 'from', 'or', 'via', 'be', 'is', 'with'];

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
  
  obj.label = name
    .split('_')
    .map(word => word.replace(/[A-Z]/g, match => ' ' + match))
    .join(' ')
    .trim()
    .split(' ')
    .map((word, index) => modifyWordForLabel(word, index))
    .join(' ');

  return obj;
}
function modifyWordForLabel(word, index) {
  if (articles.includes(word.toLowerCase())) {
    if (index) {
      return word.toLowerCase();
    }
    return capitalizeFirstLetter(word);
  } else if (acronyms.includes(word.toUpperCase())) {
    return word.toUpperCase();
  } else {
    return capitalizeFirstLetter(word);
  }
}
function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}
