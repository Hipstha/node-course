const express = require('express');
const { verificaToken } = require('../middlewares/autenticacion');

let app = express();
let Producto = require('../models/producto');


// ============================
// Obtener todos los productos
// ============================
app.get('/producto', verificaToken, (req, res)=> {
  // populate: usuario categoria
  let desde = req.query.desde || 0;
  desde = Number(desde);

  Producto.find({disponible: true})
    .skip(desde)
    .limit(5)
    .populate('usuario', 'nombre email')
    .populate('categoria', 'descripcion')
    .exec((err, productos) => {
      if(err){
        return res.status(500).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        productos
      })

    });
});

// ============================
// Obtener un producto por Id
// ============================
app.get('/producto/:id', verificaToken, (req, res)=> {

  let id = req.params.id;

  Producto.findById(id)
    .populate('usuario', 'nombre email')
    .populate('categoria', 'nombre')
    .exec((err, productoDB) => {
      if(err){
        return res.status(500).json({
          ok: false,
          err
        })
      }
      if(!productoDB){
        return res.status(400).json({
          ok: false,
          err: {
            message: 'El ID no existe'
          }
        });
      }

      res.json({
        ok: true,
        producto: productoDB
      })
    });

});

// ============================
// Obtener productos
// ============================
app.get('/producto/buscar/:termino', verificaToken, (req, res) => {

  let termino = req.params.termino;

  let regex = new RegExp(termino, 'i');

  Producto.find({nombre: regex})
  .populate('categoria', 'nombre')
  .exec((err, productos) => {
    if(err){
      return res.status(500).json({
        ok: false,
        err
      })
    }
    res.json({
      ok: true,
      productos
    })
  });

});


// ============================
// Crear un nuevo producto
// ============================
app.post('/producto', verificaToken, (req, res)=> {
  // grabar el usuario
  // Grabar la categoria
  let body = req.body;
  let producto = new Producto({
    usuario: req.usuario._id,
    nombre: body.nombre,
    precioUni: body.precioUni,
    descripcion: body.descripcion,
    disponible: body.disponible,
    categoria: body.categoria
  });

  producto.save((err, productoDB) => {
    if(err){
      return res.status(500).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      producto: productoDB
    })
  });

});

// ============================
// Actualizar un  producto
// ============================
app.put('/producto/:id', verificaToken, (req, res)=> {

  let id = req.params.id;
  let body = req.body;

  let toUpdate = {
    nombre: body.nombre,
    precioUni: body.precioUni,
    descripcion: body.descripcion,
    disponible: body.disponible,
    categoria: body.categoria,
  }

  Producto.findByIdAndUpdate(id, toUpdate, { new: true, runValidators: true }, (err, productoDB) => {
    if(err){
      return res.status(500).json({
        ok: false,
        err
      });
    }
    if(!productoDB){
      return res.status(400).json({
        ok: false,
        err: {
          message: 'El ID no existe'
        }
      })
    }
    res.json({
      ok: true,
      producto: productoDB
    })
  });
});

// ============================
// Borrar un  producto
// ============================
app.delete('/producto/:id', verificaToken, (req, res)=> {
  let id = req.params.id;

  Producto.findById(id, (err, productoDB) => {
    if(err){
      return res.status(500).json({
        ok: false,
        err
      })
    }
    if(!productoDB){
      return res.status(400).json({
        ok: false,
        err: {
          message: 'No existe el ID'
        }
      })
    }

    productoDB.disponible = false;

    productoDB.save((err, productoBorrado) => {
      if(err){
        return res.status(500).json({
          ok: false,
          err
        });
      }
      res.json({
        ok: true,
        producto: productoBorrado,
        mensaje: 'Producto borrado'
      });
    });

  });
});




module.exports = app;
