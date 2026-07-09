var conexion = new Mongo("mongodb+srv://saridquiroga01_db_user:Lfe5xQxIY9fz9vf4@cluster0.6unrbya.mongodb.net/");
var db = conexion.getDB("tienda_sena");

print("Conexion Exitosa");

db.inventario.createIndex({codigo_barras: 1});