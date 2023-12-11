<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import Alerta from './components/Alerta.vue';
import Spiner from './components/Spiner.vue';

const error = ref('');
const criptoMonedas = ref([]);
const cargando = ref(false);
const cotizacion = ref({});

const monedas = ref([
  { codigo: "USD", texto: "Dolar de Estados Unidos" },
  { codigo: "MXN", texto: "Peso Mexicano" },
  { codigo: "EUR", texto: "Euro" },
  { codigo: "GBP", texto: "Libra Esterlina" },
  { codigo: "COP", texto: "Peso Colombiano" },
]);

onMounted(() => {
  const url =
    "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=8&tsym=USD";
  fetch(url)
    .then((respuesta) => respuesta.json())
    .then(({ Data }) => (criptoMonedas.value = Data));
});

const cotizar = reactive({
  moneda:'',
  criptomoneda: ''
})

const cotizarCripto = ()=>{
  if(Object.values(cotizar).includes(''))
  {
    error.value = 'Todos los campos deben ser obligatorios';
    return
  }
  error.value='';
  obtenerCotizacion(cotizar);
}

const obtenerCotizacion = async (cotizar) => {
    cargando.value = true;
    cotizacion.value = {};

    try {
      const { moneda, criptomoneda } = cotizar;
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

      const respuesta = await fetch(url);
      const data = await respuesta.json();
      cotizacion.value = data.DISPLAY[criptomoneda][moneda];

    } catch (error){
			console.log(error);
		}
		cargando.value = false;
  };

	const mostrar_cotizacion = computed(()=>{
		return Object.values(cotizacion.value).length > 0;
	})
</script>

<template>
  <div class="contenedor">
    <h1 class="titulo"> Cotizador de <span>CriptoMonedas</span></h1>
    <div class="contenido">
      <Alerta v-if="error">
        {{ error }}
      </Alerta>
      <form class="formulario" @submit.prevent="cotizarCripto">
        <div class="campo">
          <label for="moneda">Moneda:</label>
          <select name="moneda" id="moneda" v-model="cotizar.moneda">
            <option value="">-- selecciona --</option>
            <option 
              v-for="moneda in monedas" :value="moneda.codigo">{{ moneda.texto }}</option>
          </select>
        </div>

        <div class="campo">
          <label for="cripto">CriptoMoneda:</label>
          <select name="cripto" id="cripto" v-model="cotizar.criptomoneda">
            <option value="">-- selecciona --</option>
            <option 
              v-for="cripto in criptoMonedas" :value="cripto.CoinInfo.Name">{{ cripto.CoinInfo.FullName }}</option>
          </select>
        </div>
        
        <input type="submit" value="COTIZAR">
      </form>
      <Spiner v-if="cargando.values" />

      <div class="cotizador-resultado" v-if="mostrar_cotizacion">
        <h2>Cotizacion</h2>
        <div class="resultado">
          <img 
            :src="'https://www.cryptocompare.com'+ cotizacion.IMAGEURL" 
            alt="img cripto" />
          <div>
            <p>Precio es: <span>{{ cotizacion.PRICE }}</span></p>
            <p>Precio mas bajo del dia: <span>{{ cotizacion.LOWDAY }}</span></p>
            <p>Precio mas alto del dia: <span>{{ cotizacion.HIGHDAY }}</span></p>
          </div>
        </div>
      </div>

    </div>
  </div>
  
</template>

<style >

</style>
