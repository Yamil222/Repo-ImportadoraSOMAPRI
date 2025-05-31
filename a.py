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

# Conexión a la base de datos
cnx = mysql.connector.connect(**db_config)
cursor = cnx.cursor()

def insert_growth_data():
    # Usaremos 1 solo registro por mes para simplificar la tendencia
    for repuesto_id in range(1, 6):  # 5 repuestos
        base_ventas = random.randint(5, 20)  # ventas base por repuesto (para variarlo)
        for anio in [2022, 2023, 2024]:
            growth_factor = 1 + 0.3 * (anio - 2022)  # 30% crecimiento anual aproximadamente
            for mes in range(1, 13):
                # Ventas crecen linealmente cada mes y año
                ventas = int(base_ventas * growth_factor * (1 + mes/12))
                cantidad = ventas + random.randint(5, 20)  # cantidad >= ventas con algo de variación
                
                query = "INSERT INTO regresion (id_repuesto, ventas, cantidad, mes, anio) VALUES (%s, %s, %s, %s, %s)"
                cursor.execute(query, (repuesto_id, ventas, cantidad, mes, anio))

    cnx.commit()

insert_growth_data()

cursor.close()
cnx.close()

print("Datos con tendencia de crecimiento insertados correctamente.")
