#include <SPI.h>
#include <MFRC522.h>
#include <Servo.h>
#include <LiquidCrystal_I2C.h>

#define SS_PIN 10  // SPI Slave Select
#define RST_PIN 9  // Reset pin for RFID
#define buzzer 2    // Buzzer pin
#define servoPin 3  // Servo motor pin

Servo servo;
LiquidCrystal_I2C lcd(0x27, 16, 2); // LCD I2C address
MFRC522 rfid(SS_PIN, RST_PIN);

byte lock = 0; // Lock state: 0 = Locked, 1 = Unlocked
String currentUser = ""; // To keep track of the logged-in user

// Struct to store UID and associated user names
struct User {
  String uid;
  String name;
};

// List of authorized users
User authorizedUsers[] = {
  {"72 57 AC 51", "Elias M."},
  {"B8 08 2A 12", "Pop Smoke"},
  {"11 22 33 44", "Abera Molla"}
};
const int userCount = sizeof(authorizedUsers) / sizeof(authorizedUsers[0]);

void setup() {
  Serial.begin(9600);  // Initialize Serial Monitor
  servo.attach(servoPin);
  servo.write(0);  // Start in locked position
  lcd.init();
  lcd.backlight();
  SPI.begin();      // Initialize SPI
  rfid.PCD_Init();  // Initialize RFID module
  pinMode(buzzer, OUTPUT);

  lcd.setCursor(0,0);
  lcd.print("Welcome to R:101");
  lcd.setCursor(1, 1);
  lcd.print("Scan Your Card");
}

void loop() {
  // Check for new card
  if (!rfid.PICC_IsNewCardPresent()) return;
  if (!rfid.PICC_ReadCardSerial()) return;

  // Read UID
  String scannedUID = "";
  for (byte i = 0; i < rfid.uid.size; i++) {
    if (rfid.uid.uidByte[i] < 0x10) scannedUID += "0";
    scannedUID += String(rfid.uid.uidByte[i], HEX);
    if (i < rfid.uid.size - 1) scannedUID += " ";
  }
  scannedUID.toUpperCase();

  Serial.print("Scanning UID... ");

  // Display scanned UID on LCD
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Scanning.....");
  lcd.setCursor(0, 1);
  delay(2000);

  // Check if UID is authorized and find user
  String userName = "";
  for (int i = 0; i < userCount; i++) {
    if (scannedUID == authorizedUsers[i].uid) {
      userName = authorizedUsers[i].name;
      break;
    }
  }

  if (userName != "") {
    // Send the UID and Name to Serial
    handleAccess(userName, scannedUID);
  } else {
    denyAccess();
     lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Welcome to R:101");
      lcd.setCursor(1, 1);
      lcd.print("Scan Your Card");
  }

  // Prompt to scan again
 ;
}

void handleAccess(String userName, String scannedUID) {
  String roomNumber = "Room101"; // Example room number

  if (lock == 0) {
    // Entry scenario
    servo.write(110);  // Unlock position
    lock = 1;
    currentUser = userName; // Set the current user

    // Send UID, Name, Room, and Entry event to Serial
    Serial.println(scannedUID + "," + userName + "," + roomNumber + ",ENTRY");

    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Welcome,");
    lcd.setCursor(0, 1);
    lcd.print(userName);
    delay(2000);

    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Room: ");
    lcd.setCursor(6, 0);
    lcd.print(roomNumber);
  } else if (userName == currentUser) {
    // Leave scenario
    servo.write(0);  // Lock position
    lock = 0;
    currentUser = ""; // Clear the current user

    // Send UID, Name, Room, and Leave event to Serial
    Serial.println(scannedUID + "," + userName + "," + roomNumber + ",LEAVE");

    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Goodbye,");
    lcd.setCursor(0, 1);
    lcd.print(userName);
    delay(2000);
    setup();
  } else {
    // Deny if a different user tries to leave
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Access Denied");
    lcd.setCursor(0, 1);
    lcd.print("User Active!");
    delay(2000);
  }

  digitalWrite(buzzer, HIGH);
  delay(100);
  digitalWrite(buzzer, LOW);
  delay(100);
}

void denyAccess() {
  // Deny access and display message
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Access Denied");
  lcd.setCursor(0, 1);
  lcd.print("Invalid Card!");

  // Triple beep for denied access
  for (int i = 0; i < 3; i++) {
    digitalWrite(buzzer, HIGH);
    delay(200);
    digitalWrite(buzzer, LOW);
    delay(200);
  }

  delay(2000);
}
