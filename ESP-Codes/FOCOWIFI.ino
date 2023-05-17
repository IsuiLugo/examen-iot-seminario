#include <HTTPClient.h>
#include <WiFi.h>

const char* REDWIFI = "HULUX-CNF9";
const char* CONTRASENA = "PnhdjKi123";

const char* APIFOCO = "http://192.168.1.75/getFOCOstatus.php";

int foco = 32; //pin del esp32
int focoStatusAnterior=-1; 
int focoStatus; 
int httpCodefoco;
String serverResponsefoco;

HTTPClient httpApifoco;

void setup() {
  Serial.begin(115200);
  pinMode(foco, OUTPUT);

  //AQUI NOS CONECTAMOS AL WIFI
  Serial.print("Conectando a: ");
  Serial.println(REDWIFI);
  WiFi.begin(REDWIFI, CONTRASENA);
  
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("CONECTADO A LA RED");
  Serial.println("DIRECCION IP : ");
  Serial.println(WiFi.localIP());
  //***************************************************
}

void loop() {
  // CONSULTA A LA API DONDE ESTA EL FOCO
  httpApifoco.begin(APIFOCO); 
  httpApifoco.addHeader("Content-Type", "application/x-www-form-urlencoded");
  httpCodefoco = httpApifoco.GET();
  
  // AQUI TRAEMOS EL GET DEL SERVIDOR
  serverResponsefoco = httpApifoco.getString();
  httpApifoco.end();

  // DAMOS EL VALOR DEL TIEMPO CON RESPECTO A LA HORA DEL SERVIOR
  int tiempo = serverResponsefoco.toInt();

  // TRAEMOS LA HORA CON EL FORMATO DE 24 HORAS 
  int hora = tiempo % 24;

  //AQUI DETERMINAMOS EL ESTADO DEL FOCO RESPECTO A LA HORA DESPUES
  focoStatus = (hora >= 8 && hora < 20) ? 1 : 0;

  // AQUI CONTROLAMOS SI EL FOCO ESTA ORENDIDO O APAGADO CON RESPECTO A LA HORA
  if (focoStatus != focoStatusAnterior) {
    if (focoStatus == 1) {
      digitalWrite(foco, HIGH);
      Serial.println("FOCO EN CASA: PRENDIDO");
    } else {
      digitalWrite(foco, LOW);
      Serial.println("FOCO EN CASA: APAGADO");
    }
  }

  focoStatusAnterior = focoStatus;

  delay(2000);
}
