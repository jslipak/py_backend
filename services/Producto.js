const fs = require('fs');

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
    console.log(insertData);
    insertData.id = data[data.length - 1].id + 1;
    console.log(insertData);
    data.push(insertData);
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
