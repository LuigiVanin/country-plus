<script lang="ts" setup>
import { Chart } from "chart.js/auto";

type CountryBubbleChartProps = {
  countries?: Country[];
};

const emit = defineEmits(["country-click"]);

const canvasRef = ref<HTMLCanvasElement | null>(null);
const props = defineProps<CountryBubbleChartProps>();

const buildChart = (
  ctx: CanvasRenderingContext2D,
  dataPopulation: any,
  dataArea?: any,
) => {
  new Chart(ctx, {
    type: "bubble",
    data: {
      datasets: [
        // {
        //   label: "Area",
        //   data: dataArea,
        //   backgroundColor: "rgb(249, 115, 22, 0.5)",
        // },
        {
          label: "Population",
          data: dataPopulation,
          backgroundColor: "rgb(255, 247, 237, 0.6)",
          borderColor: "rgb(249, 115, 22)",
          borderWidth: 0.5,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      onClick: (event: any, elements: any) => {
        if (elements.length) {
          const element = elements[0];
          const country = dataPopulation[element.index];
          emit("country-click", country.label);
        }
      },
      plugins: {
        tooltip: {
          // filter: function (tooltipItem) {
          //   return tooltipItem.datasetIndex === 1;
          // },
          callbacks: {
            title: (context: any) => {
              return `${context[0].raw.label} (${context[0].raw.flag || "🇺🇳"})`;
            },
            label: (context: any) => {
              const item = context.dataset.data[context.dataIndex];
              return [
                "Ratio: " + (item.y / item.x).toFixed(1) + " people/km²",
                "Area: " + item.x.toLocaleString() + "km², ",
                "Population: " + item.y.toLocaleString(),
              ];
            },
          },
        },
      },

      scales: {
        x: {
          title: {
            display: true,
            text: "Area (km²)",
          },
          type: "logarithmic",
          position: "bottom",
        },
        y: {
          title: {
            display: true,
            text: "Population",
          },
          type: "logarithmic",
          position: "left",
        },
      },
    },
  });
};

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const countries = props.countries;
  if (!countries) return;

  const dataPopulation = countries.map((country) => ({
    x: country.area,
    y: country.population,
    r: Math.max(Math.sqrt(country.population) / 600, 3),
    label: country.name.common,
    flag: country.flag,
  }));

  // const dataArea = countries.map((country) => ({
  //   x: country.area,
  //   y: country.population,
  //   r: Math.max(Math.sqrt(country.area) / 200, 3),
  //   label: country.name.common,
  // }));

  // Chart.register(BubbleController, LinearScale, PointElement);
  buildChart(ctx, dataPopulation);
});
</script>

<template>
  <div class="flex min-h-24 w-full flex-col items-center justify-center">
    <canvas ref="canvasRef" id="bubble-chart-canvas" />
  </div>
</template>
