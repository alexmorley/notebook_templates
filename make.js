"use strict"
const fs =  require('fs');
const path =  require('path');

function update(filetype, ext) {
  const path_ = path.join('templates',filetype);

  fs.readdir(path_, (_, files) => {
    let json = {}
    for(let f of files) {
      let fext = path.extname(f);
      if(fext == ext) {
        let name = path.basename(f,ext);
        json[name] = {
          pretty_name: name, // this should be parsed from the file
          path: path.join(path_ ,f),
          parameters: [{name: 'Jealousy', default: 'no'}] // these also have to be parsed from the file
        }
      }
    }
    let data = JSON.stringify(json, null, '  ');
    fs.writeFileSync(path.join('info/',filetype + '.json'), data);
  });
}

update('notebook', '.ipynb')
update('markdown', '.md')
