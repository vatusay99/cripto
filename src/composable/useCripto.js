import { ref, onMounted, computed } from "vue";

export default function useCripto() {
  // const criptoMonedas = ref([]);
  // const cargando = ref(false);
  // const cotizacion = ref({});

  // const monedas = ref([
  //   { codigo: "USD", texto: "Dolar de Estados Unidos" },
  //   { codigo: "MXN", texto: "Peso Mexicano" },
  //   { codigo: "EUR", texto: "Euro" },
  //   { codigo: "GBP", texto: "Libra Esterlina" },
  //   { codigo: "COP", texto: "Peso Colombiano" },
  // ]);

  // onMounted(() => {
  //   const url =
  //     "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=8&tsym=USD";
  //   fetch(url)
  //     .then((respuesta) => respuesta.json())
  //     .then(({ Data }) => (criptoMonedas.value = Data));
  // });

  // const obtenerCotizacion = async (cotizar) => {
  //   cargando.value = true;
  //   cotizacion.value = {};

  //   try {
  //     const { moneda, criptomoneda } = cotizar;
  //     const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

  //     const respuesta = await fetch(url);
  //     const data = await respuesta.json();
  //     cotizacion.value = data.DISPLAY[criptomoneda][moneda];

  //   } catch (error){
	// 		console.log(error);
	// 	}
	// 	cargando.value = false;
  // };

	// const mostrar_cotizacion = computed(()=>{
	// 	return Object.values(cotizacion.value).length > 0;
	// })

	const cotizarPrueba = ()=>{
		console.log('probando ...');
	}

  return 
	{ 
		cotizarPrueba
		// monedas, 
		// criptoMonedas,
		// cargando,
		// cotizacion,
		// obtenerCotizacion,
		// mostrar_cotizacion
	};
}
