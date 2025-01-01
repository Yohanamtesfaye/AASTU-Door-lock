import mysql.connector
import serial  # For reading data from the RFID scanner
from datetime import datetime

def get_db_connection():
    """Establishes a connection to the database."""
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='#Yohana23',  # Replace with your actual password
        database='SmartLock',
        charset="utf8mb4",
        collation="utf8mb4_general_ci"
    )

def process_serial_data(data):
    """Processes the scanned RFID data and stores it in the database."""
    parts = data.strip().split(",")
    if len(parts) != 4:
        print(f"Invalid data format: {data}")
        return

    uid, name, room, event = parts
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        if event == "ENTRY":
            query = """
                INSERT INTO RFID_Logs (UID, Name, Room, Timestamp) 
                VALUES (%s, %s, %s, %s)
            """
            cursor.execute(query, (uid, name, room, timestamp))
        elif event == "LEAVE":
            query = """
                UPDATE RFID_Logs 
                SET LeaveTime = %s 
                WHERE UID = %s AND LeaveTime IS NULL
            """
            cursor.execute(query, (timestamp, uid))

        connection.commit()
        print(f"Processed: {data}")
    except mysql.connector.Error as e:
        print(f"Database error: {e}")
    finally:
        cursor.close()
        connection.close()

def listen_to_serial(port='/dev/ttyUSB0', baud_rate=9600):
    """Listens to the RFID scanner for data."""
    try:
        ser = serial.Serial(port, baud_rate, timeout=1)
        print(f"Listening on {port}...")

        while True:
            if ser.in_waiting > 0:
                data = ser.readline().decode('utf-8').strip()
                if data:
                    print(f"Received: {data}")
                    process_serial_data(data)
    except serial.SerialException as e:
        print(f"Serial error: {e}")
    finally:
        if ser.is_open:
            ser.close()

if __name__ == "__main__":
    listen_to_serial(port='/dev/ttyUSB0', baud_rate=9600)
