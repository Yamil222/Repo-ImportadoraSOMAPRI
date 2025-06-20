import mysql.connector
import random

# Configuración de la base de datos local con Laragon
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'somapri',
    'port': 3306
}

# Diccionario de nombres de repuestos
repuestos_nombres = {
    1: "Filtro de aceite",
    2: "Bomba de inyección",
    3: "Sensor de presión de aceite",
    4: "Convertidor de torque",
    5: "Discos de freno"
}

# Conexión a la base de datos
cnx = mysql.connector.connect(**db_config)
cursor = cnx.cursor()

def insert_growth_data():
    for repuesto_id, nombre_repuesto in repuestos_nombres.items():
        base_ventas = random.randint(5, 20)
        for anio in [2022, 2023, 2024]:
            growth_factor = 1 + 0.3 * (anio - 2022)
            for mes in range(1, 13):
                ventas = int(base_ventas * growth_factor * (1 + mes/12))
                cantidad = ventas + random.randint(5, 20)
                
                query = """
                INSERT INTO regresion (id_repuesto, repuesto, ventas, cantidad, mes, anio)
                VALUES (%s, %s, %s, %s, %s, %s)
                """
                cursor.execute(query, (repuesto_id, nombre_repuesto, ventas, cantidad, mes, anio))

    cnx.commit()

insert_growth_data()

cursor.close()
cnx.close()

print("Datos con tendencia de crecimiento insertados correctamente.")
