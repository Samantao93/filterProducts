document.addEventListener("DOMContentLoaded", () => {

    const max = new Date().getFullYear();
    const min = max-10;

    const resultado = document.querySelector('#resultado');
    const marca = document.querySelector('#marca');
    const year = document.querySelector('#year');
    const minimo = document.querySelector('#minimo');
    const maximo = document.querySelector('#maximo');
    const puertas = document.querySelector('#puertas');
    const transmision = document.querySelector('#transmision');
    const color = document.querySelector('#color');
    
    marca.addEventListener("change",readValue);
    year.addEventListener("change",readValue);
    minimo.addEventListener("change",readValue);
    maximo.addEventListener("change",readValue);
    puertas.addEventListener("change",readValue);
    transmision.addEventListener("change",readValue);
    color.addEventListener("change",readValue);

    for (let i=max ; i >= min ; i--) {
        var opt = document.createElement('option');
        opt.value=i;
        opt.innerHTML=i;
        year.appendChild(opt);
    }

    const datosBusqueda = {
        marca: '',
        year: '',
        minimo: '',
        maximo: '',
        puertas: '',
        transmision: '',
        color: ''
    }

    mostrarCoches(autos); // La hacemos función para llamarla después cuando tengamos el array filtrado
    function readValue (e) {
        const id = e.target.id;
        const valor = e.target.value;
        if(id === 'year'){
            datosBusqueda[id] = parseInt(valor);
        } else {
            datosBusqueda[id] = valor;
        }
        const res = autos.filter(filterMarca).filter(filterYear).filter(filterMinimo).filter(filterMaximo).filter(filterPuertas).filter(filterTransmision).filter(filterColor)
        limpiarHTML();
        if(res.length === 0){
            mensaje = document.createElement('DIV');
            mensaje.classList.add('error','alerta')
            mensaje.textContent = 'No existe resultados, cambie la búsqueda';
            mensaje.textContent.toLowerCase;
            resultado.appendChild(mensaje)
        }
        mostrarCoches(res);
    }

    function filterMarca(auto){
        if(datosBusqueda.marca){
            return auto.marca === datosBusqueda.marca;
        }
        return auto        
    }

    function filterYear(auto){
        if(datosBusqueda.year){
            return auto.year === datosBusqueda.year;     
        }
        return auto
    }

    function filterMinimo(auto){
        if(datosBusqueda.minimo){
            return auto.precio >= datosBusqueda.minimo;     
        }
        return auto
    }

    function filterMaximo(auto){
        if(datosBusqueda.maximo){
            return auto.precio <= datosBusqueda.maximo;     
        }
        return auto
    }

    function filterPuertas(auto){
        if(datosBusqueda.puertas){
            return auto.puertas == datosBusqueda.puertas;     
        }
        return auto
    }

    function filterTransmision(auto){
        if(datosBusqueda.transmision){
            return auto.transmision.toLowerCase() === datosBusqueda.transmision;     
        }
        return auto
    }

    function filterColor(auto){
        if(datosBusqueda.color){
            return auto.color == datosBusqueda.color;     
        }
        return auto
    }
    
    function mostrarCoches(autos) {
        autos.forEach((auto) => {
        let {marca,modelo,year,precio,puertas,color,transmision} = auto;

        const elemento = document.createElement('P');
        elemento.textContent =`
        ${marca} ${modelo} | ${year} | ${precio} | ${puertas} | ${transmision} | ${color}
        `       
        resultado.appendChild(elemento);        
        })
    }

    const header = document.createElement('P');
    header.classList.add('bg-color');
    header.textContent =`
    MARCA MODELO | YEAR | PRECIO | PUERTAS | TRANSMISION | COLOR
    `
    resultado.parentNode.insertBefore(header, resultado);    

    function limpiarHTML(){
        while(resultado.firstChild){
            resultado.removeChild(resultado.firstChild);
        }
    }



})