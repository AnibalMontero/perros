/* Utilizando la siguiente API: https://dog.ceo/dog-api/

Que devuelve imágenes aleatorias, habrá que ir coleccionando diferentes razas de perros pulsando un botón e ir rellenando una matriz (4x5) como la que se ve en las imágenes.

Se va añadiendo cada imágen a una casilla, además de almacenar los perros que van apareciendo para poder sacar estadísticas al final.

En caso de que alguna raza esté repetida, no se pondrá en la colección.

Cuando se haya completado todo el álbum aparecerá una gráfica de todas las razas que han salido y la de veces que se han ido contando.

Las imágenes ilustran el funcionamiento, pero la apariencia de la aplicación depende del grupo y se debe cuidar tanto como el funcionamiento; además se deben usar conocimientos de Flexbox y Grid en la medida de las posibilidades del diseño. */

const apiUrl = 'https://dog.ceo/api/breeds/image/random';

const btn = document.querySelector('#perro');

btn.addEventListener('click', () => {
  let arrayURL = [];
  let obj = {};
  let i = 0;
  if (localStorage.getItem('perritos') == null) {
    localStorage.setItem('perritos', JSON.stringify([]));
  }

  fetch(apiUrl)
    .then((response) => response.json())
    .then(({ message }) => {
      let imagen = document.querySelector('.perroprincipal');

      imagen.setAttribute('src', message);
      let array = message.split('/');

      let descripcion = document.querySelector('#descripcion');
      descripcion.textContent = array[4];

      arrayURL = JSON.parse(localStorage.getItem('perritos'));
      let busqueda = arrayURL.find((item) => item.id == array[4]);

      if (busqueda == undefined) {
        obj = { [array[4]]: message };
        arrayURL.push(obj);

        arrayURL.forEach((element) => {
          let valores = Object.values(element);
          valores.forEach((elem) => {
            i++;
            if (i <= 20) {
              let img = document.querySelector(`#img${i}`);
              img.setAttribute('src', elem);
            }

            if (i == 20) {
              btn.disabled = true;
              let razas = [];
              let serie = [];

              arrayURL.forEach((element) => {
                let claves = Object.keys(element);
                claves.forEach((elem) => {
                  razas.push(elem);
                });
              });

              for (let i = 0; i < 20; i++) {
                serie.push(Math.floor(Math.random() * 10));
              }
              console.log(serie);
              // Gráfica
              let data = {
                labels: [...razas],

                series: [[...serie]],
              };
              let options = {
                width: window.screen.width - (window.screen.width * 0, 20),
                height: 400,
              };

              new Chartist.Bar('.ct-chart', data, options).on(
                'draw',
                function (bars) {
                  bars.element.animate({
                    y2: {
                      begin: 0,
                      dur: 500,
                      from: bars.y1,
                      to: bars.y2,
                    },
                  });
                }
              );
            }
          });
        });
        localStorage.setItem('perritos', JSON.stringify(arrayURL));
      } else {
        console.log('ya está');
      }
    });
});
