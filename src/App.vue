<template>
  <!-- App.vue -->
  <v-app>
    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <v-card>
          <v-tabs color="black accent-4" right>
            <v-tab>Price Monitor</v-tab>
            <v-tab>Conversions</v-tab>

            <v-tab-item>
              <v-container fluid>
                <v-row justify="center" class="subtitle-2">Last Updated</v-row>
                <v-row justify="center" class="subtitle-1">{{
                  loading ? loadingText : testDataSets.createdAt
                }}</v-row>
                <v-row justify="center" class="subtitle-1"
                  >Market Cap :
                  {{ loading ? loadingText : testDataSets.marketCap }}</v-row
                >
                <v-row justify="center" class="subtitle-1"
                  >Reserve Model :
                  {{ loading ? loadingText : testDataSets.reserveModel }}</v-row
                >
                <v-row justify="center" class="subtitle-1"
                  >Reserve Ratio :
                  {{ loading ? loadingText : testDataSets.reserveRatio }}</v-row
                >
                <v-row justify="center" class="subtitle-1"
                  >Total Supply :
                  {{ loading ? loadingText : testDataSets.totalSupply }}</v-row
                >
                <v-row dark>
                  <v-container
                    ><coingecko-coin-price-static-headline-widget
                      coin-ids="bitcoin,ethereum,saga"
                      currency="usd"
                      locale="en"
                    ></coingecko-coin-price-static-headline-widget>
                  </v-container>
                </v-row>
                <v-container dark fluid>
                  <coingecko-coin-price-chart-widget
                    currency="usd"
                    coin-id="saga"
                    locale="en"
                    height="300"
                  ></coingecko-coin-price-chart-widget>
                </v-container>
                <v-container dark fluid>
                  <coingecko-coin-price-chart-widget
                    currency="eth"
                    coin-id="saga"
                    locale="en"
                    height="300"
                  ></coingecko-coin-price-chart-widget>
                  <coingecko-coin-price-chart-widget
                    currency="btc"
                    coin-id="saga"
                    locale="en"
                    height="300"
                  ></coingecko-coin-price-chart-widget>
                </v-container>
              </v-container>
            </v-tab-item>
            <v-tab-item>
              <v-container fluid>
                <coingecko-coin-converter-widget
                  coin-id="saga"
                  currency="usd"
                  background-color="#ffffff"
                  font-color="#4c4c4c"
                  locale="en"
                ></coingecko-coin-converter-widget>
              </v-container>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import moment from "moment";
import axios from "axios";
export default {
  data: () => ({
    lastUpdated: moment().format("MMMM Do YYYY, h:mm:ss a"),
    cryptos: [],
    cryptoNames: ["ETH", "BTC", "USD"],
    seriesUSDSGR: [],
    seriesVolumes: [],
    chartOptionsArea: {},
    chartOptionsBrush: {},
    chartOptions: {
      chart: {
        type: "area",
        height: 350,
        stacked: true,
        events: {
          selection: function (chart, e) {
            console.log(new Date(e.xaxis.min));
          },
        },
      },
      colors: ["#008FFB", "#00E396", "#CED4DC"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.6,
          opacityTo: 0.8,
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
      },
      xaxis: {
        type: "number",
      },
    },
    testDataSets: [],
    loadingText: "Fetching data...",
    loading: true,
  }),
  mounted() {
    this.$nextTick(function () {
      window.setInterval(() => {
        this.init();
      }, 60000);
    });
  },
  methods: {
    init: async function () {
      this.loading = true;
      let _this = this;
      axios
        .get(" https://sogur-info.sogur.com/sogur_rates_info.json")
        .then(function (response) {
          // handle success
          console.log(response.data);
          _this.testDataSets = response.data;
          _this.testDataSets.createdAt = moment(response.data.createdAt).format(
            "MMMM Do YYYY, h:mm:ss a"
          );
        })
        .catch(function (error) {
          // handle error
          console.log(error);

          _this.loadingText = "Something went wrong..";
        })
        .then(function () {
          _this.loading = false;
          // always executed
        });
    },
  },
};
</script>

<style>
</style>