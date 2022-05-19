# comics
Proyecto Vuejs + Nuxt, para consultar api de cómics y calificarlos.

 Your site is published at https://vgualdron.github.io/comics/

El propósito del repositorio es consultar una api de cómics e ir mostrando un cómic aleatoriamente, pedir que se califique
y que el usuario envíe la calificación, se van sumando los puntos y el cómic que llegue a 20 puntos es el que gana.

**Requisitos**
* Se debe tener instalado NodeJS (versión mas reciente), Npm (versión más reciente) y VueJs (versión 2.6 o superior, pero inferior a la 3).

**Instrucciones para ejecutar el proyecto**
* Clonar el proyecto o descargarlo.
* Abrir una terminal y dirigirse a la carpeta del proyecto.
* Ejecutar el comando: "npm install" para instalar las dependecias.
* Ejecutar el comando: "npm run dev" para ininciar la aplicación.
* En la terminal debe salir un recuadro con lo siguiente "Listening on: http://localhost:3000/"
* Abrir "http://localhost:3000/" en el navegador para usar la aplicación.


**Como usar la aplicación**
* Se mostrará el titulo, la imagen del cómic que se cargará aleatoriamente de la api "https://xkcd.com/json.html".
* Debajo de la imagen del cómic hay un panel con estrellas para calificar el cómic, se debe seleccionar una calificación y luego oprimir el botón 
de envíar que aparece debajo de el panel de calificación.
* Luego se mostrará otro cómic aleatorio, que peude ser el mismo, ya que es aleatorio, y se debe volver a calificar.
* Si un cómic se califica por primera vez, se agrega al panel lateral izquierdo con su puntuación.
* Si un cómic sale de nuevo, es decir, ya se calificó antes, al volverlo a calificar se acumulan los puntos nuevos con lo que ya tenía y se vé reflejado el cambio en el panel lateral izquierdo.
* Este proceso se repetirá hasta que alguno de los cómics acumule 20 o más puntos y sea el ganador.

**NOTAS**
* Hay problemas con la API "https://xkcd.com/json.html", no tiene los CORS necesarios para acceder los endpoints.
* Debido a lo anterior me ví en la necesidad de usar proxy en el front para poder realizar la comunicación de la aplicación con la API.

