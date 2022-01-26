const fs = require('fs');
const bcrypt = require('./bcrypt');

class Producto {
  async getAll(req, res) {
    const data = await JSON.parse(
      fs.readFileSync(`./data/productos.json`, { encoding: 'utf-8' }),
    );

    res.json(data);
  }
  async create(req, res) {
    const insertData = req.body;
    const data = await JSON.parse(
      fs.readFileSync(`./data/productos.json`, { encoding: 'utf-8' }),
    );
    insertData.id = data[data.length - 1].id + 1;
    let hash = await bcrypt.create(JSON.stringify(insertData));
    insertData.integrety = hash;
    data.push(insertData);
    console.log(hash);
    await fs.promises.writeFile(`./data/productos.json`, JSON.stringify(data));
    return res.json({ producto: 'Producto creado' });
  }
  async getById(req, res) {
    const data = await JSON.parse(
      fs.readFileSync(`./data/productos.json`, { encoding: 'utf-8' }),
    );
    const indexId = data.findIndex((element) => element.id == req.params.id);
    res.json(data[indexId]);
  }
}

module.exports = new Producto();
