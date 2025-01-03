import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Welcome Back B-57": "Welcome Back B-57",
      "Enter_your_credentials_to_access_Logs": "Enter your credentials to access Logs",
      "Search_by_Name": "Search by Name",
      "email": "Email",
      "password":"password",
      "sign-in":"Sign In",
      "forget_password": "Forget Password?",
      "aastu_topic": "AASTU Door Lock History",
      "moniter":"Monitor and track room access",
      "Filters": "Filters",
      "Search_by_Name":"Search by Name",
      "Room":"Room",
      "Date":"Date",
      "Enter name":"Enter name...",
      "ID": "ID",
      "UID": "UID",
      "Name": "Name",
      "Entry_Time": "Entry Time",
      "Leave_Time": "Leave Time",
      "no_log": "No logs found matching the current filters.",
      "allroom": "All Rooms",
      "room1": "Room 1",
      "room2": "Room 2",
      "room3": "Room 3",
      "acess_log": "Access Logs",
      "logout": "Logout",
      "ongoing":"On Going Class",




      
    

    },
  },
  am: {
    translation: {
      "Welcome Back B-57": "እንኳን ደህና መጡ B-57",
      "Enter_your_credentials_to_access_Logs": "አገልግሎቱን ለመጠቀም መለያዎን ያስገቡ።",
      "Search_by_Name": "በስም ይፈልጉ",
      "email": "ኢሜይል",
      "password":"የይለፍ ቃል",
      "sign-in":"ይግቡ",
      "signing_in" : "Signing in....",
      "forget_password": "የይለፍ ቃል መርሳት?",
      "aastu_topic": "የአአሳቴዩ በር መዝጊያ መዝገብ ",
      "moniter":"የክፍል መዳረሻን መቆጣጠር እና መከታተል",
      "Filters": "ማጣሪያዎች",
      "Search by Name":"በስም ይፈልጉ",
      "Room":"ክፍል",
      "Date":"ቀን",
      "Enter name":"ስም ያስገቡ...",
      "UID": "ዩአይዲ",
      "ID":"አይዲ",
      "Name": "ስም",
      "Entry_Time": "የመግቢያ ጊዜ",
      "Leave_Time": "የመውጫ ጊዜ ",
      "no_log": "ከአሁኑ ማጣሪያዎች ጋር የሚዛመዱ ምዝግብ ማስታወሻዎች አልተገኘም ",
      "allroom": "ሁሉም ክፍሎች",
      "room1": "ክፍል 1",
      "room2": "ክፍል 2",
      "room3": "ክፍል 3",              
      "acess_log": "የመዳረሻ መዝገብ",
      "logout": "ይውጡ",
      "signing_in" : "በሂደት ላይ ነው ....",
      "ongoing":"አገልግሎት ላይ ነው።"




    },
  },
};

i18n
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources,
    lng: 'am', // Default language
    fallbackLng: 'am', // Fallback language
    interpolation: {
      escapeValue: false, // React already escapes values to prevent XSS
    },
  });

export default i18n;
