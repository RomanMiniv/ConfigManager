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
  acronyms = ['ID', 'URL', 'JSON', 'HTML', 'PDF', 'IP', 'SMS', 'ISO', 'ZIP', 'AMP', 'ISP', 'OS', 'IOS', 'UTM', 'GDPR', 'API', 'VAT', 'IVR', 'MRR'],
  articles = ['at', 'by', 'to', 'on', 'in', 'of', 'for', 'from', 'or', 'via'];

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
    .map(word => word.replace(/\D\d/g, match => `${match[0]} ${match[1]}`))
    .map(word => word.replace(/\d\D/g, match => `${match[0]} ${match[1]}`))
    .join(' ')
    .trim()
    .split(' ')
    .map(word => modifyWordForLabel(word))
    .join(' ');

  return obj;
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
