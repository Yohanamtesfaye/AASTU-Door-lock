from flask import Flask, jsonify
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="#Yohana23",
        database="SmartLock",  # Ensure consistent database name
        charset="utf8mb4",
        collation="utf8mb4_general_ci"
    )

@app.route('/api/rfid-logs', methods=['GET'])
def get_rfid_logs():
    try:
        with get_db_connection() as connection:
            cursor = connection.cursor(dictionary=True)
            cursor.execute('SELECT * FROM RFID_Logs ORDER BY Timestamp DESC')
            rows = cursor.fetchall()
        return jsonify(rows), 200
    except mysql.connector.Error as e:
        return jsonify({"error": f"Database error: {e}"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
