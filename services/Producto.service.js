const fs = require('fs');
const bcrypt = require('./bcrypt.service');

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
    indexId < 0
      ? res.json({ error: 'producto no encontrado' })
      : res.json(data[indexId]);
  }
  async deleteByID(req, res) {
    const data = await JSON.parse(
      fs.readFileSync(`./data/productos.json`, { encoding: 'utf-8' }),
    );
    const indexDelete = data.findIndex(
      (element) => element.id == req.params.id,
    );
    if (indexDelete < 0) {
      res.json({ error: ' producto no encontrado' });
    } else {
      const newData = data.splice(indexDelete, 1);
      await fs.promises.writeFile(
        `./data/productos.json`,
        JSON.stringify(data),
      );
      res.json({ elimino: `el id ${req.params.id}` });
    }
  }

  async updadeById(req, res) {
    console.log('updateById');
    const data = await JSON.parse(
      fs.readFileSync(`./data/productos.json`, { encoding: 'utf-8' }),
    );
    const indexUpdate = data.findIndex(
      (element) => element.id == req.params.id,
    );
    if (indexUpdate < 0) {
      res.json({ error: 'Producto no encontrado' });
    } else {
      const updateData = req.body;
      updateData.id = req.params.id;
      updateData.integrety = await bcrypt.create(JSON.stringify(updateData));
      data[indexUpdate] = updateData;
      await fs.promises.writeFile(
        `./data/productos.json`,
        JSON.stringify(data),
      );
      res.json({ actualizado: `id: ${req.params.id}` });
    }
  }
}

module.exports = new Producto();
