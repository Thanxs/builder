let car = null;

class Car {
    constructor(model) {
        this.model = model;
    }
}

class CarBuilder {
    constructor(model) {
        this.car = new Car(model);
    }

    setDetails(details, display = 'block') {
        this.car[details] = true;

        if (this.car[details]) {
            document.getElementById(details)
                .style.display = display;
        }

        return this;
    }

    setBodyColor(color) {
        this.car.bodyColor = color;
        document.querySelector('.car').style.backgroundColor = color;
        return this;
    }

    setWheels() {
        this.setDetails('wheels', 'flex');
    }

    setNitro() {
        this.setDetails('nitro');
    }

    setLights() {
        this.setDetails('lights');
    }

    build() {
        document.getElementById('car')
            .style.display = 'flex';

        document.querySelector('.car-text').innerHTML =
            document.getElementById('carName').value;

        return this.car;
    }
}

function setListeners() {
    const controls = createControls();

    document.querySelector('.new-car button')
        .addEventListener('click', () => {
            document.getElementById('builder')
                .style.display = 'flex';

            car = new CarBuilder(
                document.querySelector('.new-car input').value
            );
        });

    document.getElementById('bodyColor')
        .addEventListener('change', ({ target }) => {
            car.setBodyColor(target.value);
        });

    for (const control in controls) {

        const key = controls[control];

        controls[control].name.addEventListener('click', ({ target }) => {
            target.style.background = 'radial-gradient(circle, #00f0e9, #00dfd9, #00cfc9, #00beb9, #00aea9)';
            car[key.callback]();
        });
    }
}

function createControls() {
    return  {
        wheelsBtn: {
            name: document.getElementById('wheels-btn'),
            callback: 'setWheels'
        },
        lightsBtn: {
            name: document.getElementById('lights-btn'),
            callback: 'setLights'
        },
        nitroBtn: {
            name: document.getElementById('nitro-btn'),
            callback: 'setNitro'
        },
        buildBtn: {
            name: document.querySelector('.builder-btn'),
            callback: 'build'
        },
    }
}

setListeners();