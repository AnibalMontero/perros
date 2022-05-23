const apiUrl = 'https://dog.ceo/api/breeds/image/random';

const btn = document.querySelector('#perro');
let repetidos = [];

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
      let claveRaza = array[4].split('-');

      let descripcion = document.querySelector('#descripcion');
      descripcion.textContent = array[4];

      arrayURL = JSON.parse(localStorage.getItem('perritos'));

      let busqueda = false;

      arrayURL.forEach((element) => {
        let claves = Object.keys(element);

        if (claves[0] == claveRaza[0]) {
          busqueda = true;
          repetidos.push(claves[0]);
        }
      });

      if (busqueda == false) {
        obj = { [claveRaza[0]]: message };

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
      let value = repetidos.reduce(
        (acumulador, valorActual) => (
          acumulador[valorActual]
            ? (acumulador[valorActual] += 1)
            : (acumulador[valorActual] = 1),
          acumulador
        ),
        {}
      );

      if (btn.disabled == true) {
        let lista = document.querySelector('#lista');
        lista.textContent = `Repeticiones ${JSON.stringify(value)}`;
      }
    });
});
