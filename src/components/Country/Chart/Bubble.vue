<script lang="ts" setup>
import { Chart } from "chart.js/auto";
import type { Country } from "~/types/country";

type CountryBubbleChartProps = {
  countries?: Country[];
};

const emit = defineEmits(["country-click"]);

const { isDark } = useTheme();

const canvasRef = ref<HTMLCanvasElement | null>(null);
const props = defineProps<CountryBubbleChartProps>();
const chartScaleValue = ref<"logarithmic" | "linear">("logarithmic");
const datasetType = ref<"population" | "area" | "ratio">("population");

const chartScales = [
  { label: "Linear", value: "linear" },
  { label: "Logarithmic", value: "logarithmic" },
];
let chart: Chart | null = null;

const gridColor = computed(() =>
  isDark.value ? "rgb(55, 65, 81)" : "rgb(209, 213, 219)",
);

const populationDataset = computed(() => {
  return {
    label: "Population",
    backgroundColor: "rgb(255, 247, 237, 0.6)",
    borderColor: "rgb(249, 115, 22)",
    borderWidth: 0.5,
    data: props.countries?.map((country) => ({
      x: country.area,
      y: country.population,
      r: Math.max(Math.sqrt(country.population) / 500, 2),
      label: country.name.common,
      flag: country.flag,
    })),
  };
});

const areaDataset = computed(() => {
  return {
    label: "Area",
    backgroundColor: "rgb(238, 242, 255, 0.6)",
    borderColor: "rgb(99, 102, 241)",
    borderWidth: 0.5,
    data: props.countries?.map((country) => ({
      x: country.area,
      y: country.population,
      r: Math.max(Math.sqrt(country.area) / 50, 3),
      label: country.name.common,
      flag: country.flag,
    })),
  };
});

const ratioDataset = computed(() => {
  return {
    label: "Ratio (people/km²)",
    backgroundColor: "rgb(240, 253, 244, 0.6)",
    borderColor: "rgb(34, 197, 94)",
    borderWidth: 0.5,
    data: props.countries?.map((country) => ({
      x: country.area,
      y: country.population,
      r: Math.max(Math.cbrt(country.population / country.area) * 2.5, 3),
      label: country.name.common,
      flag: country.flag,
    })),
  };
});

const buildChart = (ctx: CanvasRenderingContext2D, dataset: any) => {
  chart = new Chart(ctx, {
    type: "bubble",
    data: {
      datasets: [dataset],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      onClick: (event: any, elements: any) => {
        if (elements.length) {
          const element = elements[0];
          const country = dataset.data[element.index];
          emit("country-click", country.label);
        }
      },
      plugins: {
        tooltip: {
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
          grid: {
            color: gridColor.value,
          },
        },
        y: {
          title: {
            display: true,
            text: "Population",
          },
          type: "logarithmic",
          position: "left",
          grid: {
            color: gridColor.value,
          },
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

  buildChart(ctx, populationDataset.value);
});

onUnmounted(() => {
  if (chart) {
    chart.destroy();
  }
});

function removeDataset(chart: Chart) {
  chart.data.labels?.pop();
  chart.data.datasets = [];
  chart.update();
}

function addDataset(chart: Chart, dataset: any, label: string) {
  chart.data.labels?.push(label);
  chart.data.datasets.push(dataset);
  chart.update();
}

watch(datasetType, (val) => {
  if (!chart) return;
  let dataset = null;

  if (val === "population") dataset = populationDataset.value;
  else if (val === "area") dataset = areaDataset.value;
  else if (val === "ratio") dataset = ratioDataset.value;

  if (!dataset) return;

  removeDataset(chart);
  addDataset(chart, dataset, val);
});

watch(chartScaleValue, (val) => {
  if (!chart) return;
  if (!chart.options.scales?.x || !chart.options.scales?.y) return;
  chart.options.scales.x.type = val;
  chart.options.scales.y.type = val;
  chart.update();
});

watch(isDark, () => {
  if (!chart) return;
  if (!chart.options.scales?.x?.grid || !chart.options.scales?.y?.grid) return;
  chart.options.scales.y.grid.color = gridColor.value;
  chart.options.scales.x.grid.color = gridColor.value;
  chart.update();
});
</script>

<template>
  <div
    class="flex min-h-24 w-full flex-col items-center justify-center gap-6 pb-2"
  >
    <canvas ref="canvasRef" id="bubble-chart-canvas" />

    <UPopover :popper="{ placement: 'top', offsetDistance: 15 }">
      <UButton
        label="Settings"
        icon="i-heroicons-adjustments-horizontal-16-solid"
        color="gray"
        size="md"
        class="px-5"
      />
      <template #panel="{ close }">
        <UCard
          class="relative h-64 w-72 bg-white dark:bg-zinc-900"
          data-testid="chart-settings-panel"
          :ui="{
            header: { padding: 'sm:px-3 py-4' },
            body: { padding: 'sm:px-3 sm:py-4' },
          }"
        >
          <template #header>
            <UButton
              :padded="false"
              class="absolute right-2 top-2"
              icon="i-heroicons-x-mark"
              variant="link"
              color="gray"
              @click="close"
            />
            <h3 class="text-md flex items-center gap-1 font-semibold">
              <UIcon name="i-heroicons-adjustments-horizontal-16-solid" />
              <span class="mr-auto"> Chart Settings </span>
            </h3>
          </template>

          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <h3 class="font-light text-gray-400">Scale Settings</h3>
              <div class="flex flex-col gap-1">
                <URadio
                  v-for="scale of chartScales"
                  :key="scale.value"
                  v-bind="scale"
                  v-model="chartScaleValue"
                />
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <h3 class="font-light text-gray-400">Bubble Settings</h3>
              <UButtonGroup class="flex w-full">
                <UButton
                  class="flex-1 justify-center"
                  :variant="datasetType === 'population' ? 'solid' : 'outline'"
                  label="Population"
                  @click="datasetType = 'population'"
                />
                <UButton
                  class="flex-1 justify-center"
                  :variant="datasetType === 'area' ? 'solid' : 'outline'"
                  label="Area"
                  @click="datasetType = 'area'"
                />
                <UButton
                  class="flex-1 justify-center"
                  :variant="datasetType === 'ratio' ? 'solid' : 'outline'"
                  label="Ratio"
                  @click="datasetType = 'ratio'"
                />
              </UButtonGroup>
            </div>
          </div>
        </UCard>
      </template>
    </UPopover>
  </div>
</template>
