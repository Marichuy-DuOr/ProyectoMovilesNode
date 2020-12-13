module.exports = {

    getAll: (connection, callback) => {
        connection.query('select * from users', (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    create: (connection, body, callback) => {
        connection.query('insert into users SET ?', body, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: null, id: null, success: true });
        });
    },

    getId: (connection, id, callback) => {
        connection.query('select * from users where id = ' + id, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: null, id: results || null, success: true });
        })
    },

    getbyemail: (connection, email, callback) => {
        connection.query(`select * from users where email = '${email}'`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: null, id: results || null, success: true });
        })
    },

    delete: (connection, body, callback) => {
        connection.query(`delete from users where email = '${body.email}'`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: null, id: null, success: true });
        })
    },

    update: (connection, body, callback) => {
        connection.query('update users set name = ?, email = ?, password = ?, surname = ?, role = ? WHERE id = ? ', [body.name, body.email, body.password, body.surname, body.role, body.id], (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: null, id: null, success: true });
        });
    },

    getAllMovies: (connection, callback) => {
        connection.query('select * from peliculas', (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getIdMovie: (connection, id, callback) => {
        connection.query('select * from peliculas where id = ' + id, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: null, id: results || null, success: true });
        })
    },

    createMovie: (connection, body, callback) => {
        connection.query('insert into peliculas SET ?', body, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: null, id: null, success: true });
        });
    },

    deleteMovie: (connection, body, callback) => {
        connection.query(`delete from peliculas where id = '${body.id}'`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: null, id: null, success: true });
        })
    },

    updateMovie: (connection, body, callback) => {
        connection.query('update peliculas set nombre = ?, img = ? WHERE id = ? ', [body.nombre, body.img, body.id], (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: null, id: null, success: true });
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