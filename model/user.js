module.exports = {

    getAll: (connection, callback) => {
        connection.query('select * from usuarios', (err, results) => {
            if (err) {
                callback({ array: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, success: true });
        })
    },

    create: (connection, body, callback) => {
        connection.query('insert into usuarios SET ?', body, (err, results) => {
            if (err) {
                callback({ array: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, success: true });
        });
    },

    getId: (connection, id, callback) => {
        connection.query('select * from usuarios where id = ' + id, (err, results) => {
            if (err) {
                callback({ array: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results || null, success: true });
        })
    },

    getbyemail: (connection, email, callback) => {
        connection.query(`select * from usuarios where email = '${email}'`, (err, results) => {
            if (err) {
                callback({ array: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results || null, success: true });
        })
    },

    delete: (connection, body, callback) => {
        connection.query(`delete from usuarios where email = '${body.email}'`, (err, results) => {
            if (err) {
                callback({ array: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, success: true });
        })
    },

    update: (connection, body, callback) => {
        connection.query('update usuarios set nombre = ?, email = ?, password = ?, apepat = ?, apemat = ? WHERE id = ? ', [body.nombre, body.email, body.password, body.apepat, body.apemat, body.id], (err, results) => {
            if (err) {
                callback({ array: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, success: true });
        });
    },

    getAllProductos: (connection, callback) => {
        connection.query('select * from producto', (err, results) => {
            if (err) {
                callback({ array: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, success: true });
        })
    },

    getIdProducto: (connection, id, callback) => {
        connection.query('select * from producto where id = ' + id, (err, results) => {
            if (err) {
                callback({ array: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results || null, success: true });
        })
    },

    createProducto: (connection, body, callback) => {
        connection.query('insert into producto SET ?', body, (err, results) => {
            if (err) {
                callback({ array: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, success: true });
        });
    },

    deleteProducto: (connection, body, callback) => {
        connection.query(`delete from producto where id = '${body.id}'`, (err, results) => {
            if (err) {
                callback({ array: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, success: true });
        })
    },

    updateProducto: (connection, body, callback) => {
        connection.query('update producto set nombre = ?, imagen = ?, precio = ?, descripcion = ? WHERE id = ? ', [body.nombre, body.imagen, body.precio, body.descripcion, body.id], (err, results) => {
            if (err) {
                callback({ array: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, success: true });
        });
    },

    getPedidosActivos: (connection, estado, callback) => {
        connection.query('select p.id, concat(u.nombre," ",u.apepat," ",u.apemat) as nombre, p.id_usuario, p.fecha, p.total, p.lat, p.lon, p.estado from pedido p, usuarios u where u.id=p.id_usuario and p.estado=' + estado, (err, results) => {
            if (err) {
                callback({ array: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, success: true });
        })
    },

    getDetallesPedidos: (connection, id, callback) => {
        connection.query('select a.nombre, a.imagen, b.precio, b.cantidad, a.descripcion from producto a, producto_pedido b where b.id_producto=a.id and b.id_pedido =' + id, (err, results) => {
            if (err) {
                callback({ array: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results || null, success: true });
        })
    },

    completarPedido: (connection, id, callback) => {
        connection.query('update pedido set estado = 1 where id = ?', [id], (err, results) => {
            if (err) {
                callback({ array: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, success: true });
        });
    },

    getDatosUsuario: (connection, id, callback) => {
        connection.query('select  concat(nombre, " ",apepat," ",apemat) as nombre, email from usuarios where id=' + id, (err, results) => {
            if (err) {
                callback({ array: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results || null, success: true });
        })
    },
}