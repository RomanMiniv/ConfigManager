function addLabel(obj) {
  const { name } = obj;
  if (!name) {
      return obj;
  }
  
  const exceptions = /id/g;

  if (name === 'id') {
      obj.label = name.toUpperCase();
  } else {
      obj.label = name
          .split('_')
          .map(item => item
              .replace(/[A-Z]/g, (match) => ' ' + match.toLowerCase())
              .replace(exceptions, (match) => match.toUpperCase()))
          .join(' ');

      obj.label = obj.label[0].toUpperCase() + obj.label.slice(1);
  }
  
  return obj;
}   

function iterateObj(data) {
  if (Array.isArray(data)) {
      data.forEach(item => {
          addLabel(item);
          for (let key in item) {
              if (typeof item[key] === 'object') {
                iterateObj(item[key]);
              }
          }
      });
  } else if (typeof data === 'object') {
      addLabel(data);
      for (let key in data) {
          if (typeof data[key] === 'object') {
            iterateObj(data[key]);
          }
      }
  }
}

const
  input = document.getElementById('input'),
  output = document.getElementById('output');

input.focus();

input.addEventListener('input', (e) => {
  const obj = JSON.parse(e.target.value);
  iterateObj(obj);

  output.value = JSON.stringify(obj, null, 4);
  output.select();
});
