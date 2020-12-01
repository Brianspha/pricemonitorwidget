<template>
  <!-- App.vue -->
  <v-app>
    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <v-card>
          <v-tabs color="deep-purple accent-4" right>
            <v-tab>Price Monitor</v-tab>
            <v-tab>Conversions</v-tab>

            <v-tab-item>
              <v-container fluid>
                <v-row justify="center" class="subtitle-2">Last Updated</v-row>
                <v-row justify="center" class="subtitle-1">{{
                  lastUpdated
                }}</v-row>
                <v-row dark>
                  <v-col
                    v-for="(crypto, index) in cryptos"
                    :key="index"
                    cols="12"
                    sm="4"
                  >
                    <v-card style="height: 100%" outlined class="mx-auto">
                      <v-card-text>
                        <v-row justify="center" class="headline">
                          <v-avatar>
                            <img :src="crypto.icon" />
                          </v-avatar>
                        </v-row>
                        <v-row justify="center" class="headline"
                          >1 {{ crypto.name }}</v-row
                        ><v-row justify="center" class="body-1 font-weight-bold"
                          >{{ parseFloat(crypto.price).toFixed(2) }} SGR</v-row
                        ></v-card-text
                      >
                    </v-card>
                  </v-col>
                </v-row>
                <v-container dark fluid>
                  <apexchart
                    type="area"
                    height="500"
                    :options="chartOptions"
                    :series="seriesUSDSGR"
                  />
                </v-container>
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
import prices from "crypto-price";
import moment from "moment";
export default {
  data: () => ({
    lastUpdated: moment().format("MMMM Do YYYY, h:mm:ss a"),
    cryptos: [],
    cryptoNames: ["ETH", "ETC", "BTC", "USD"],
    seriesUSDSGR: [],
    seriesVolumes: [],
    chartOptionsArea: {},
    chartOptionsBrush: {},
    chartOptions: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        title: {
          text: "USD",
        },
      },
      yaxis: {
        title: {
          text: "ETH",
        },
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  }),
  mounted() {
    this.init();
    this.caluclatePrices();
  },
  methods: {
    init: async function () {
      var data = await Promise.resolve(this.generateDayWiseTimeSeries());
      var data2 = await Promise.resolve(this.generateDayWiseTimeSeriesETHSGR());
      var length = Math.min(data[0].length, data2[0].length);
      var dataUSDSGR = data[0].slice(0, length);
      var dataETHSGR = data2[0].slice(0, length);
      var dataUSDSGRVol = data[1].slice(0, length);
      var dataETHSGRVol = data2[1].slice(0, length);
      console.log("dataUSDSGR ", dataUSDSGR);
      console.log("dataETHSGR ", dataETHSGR);
      var usd = dataUSDSGR.map((val) => {
        console.log("val: ", val[1]);
        return val[1];
      });
      var eth = dataETHSGR.map((val) => {
        return val[1];
      });
      this.seriesUSDSGR = [
        {
          data: usd,
        },
        {
          data: eth,
        },
      ];
      console.log(" this.seriesUSDSGR: ", this.seriesUSDSGR);
      this.seriesVolumes = [
        {
          data: dataUSDSGRVol,
          name: "Volume(USD)",
        },
        {
          data: dataETHSGRVol,
          name: "Volume(ETH)",
        },
      ];
      console.log("length: ", length);
    },
    caluclatePrices() {
      this.cryptoNames.map((name) => {
        prices
          .getCryptoPrice("SGR", name)
          .then((obj) => {
            // Base for ex - USD, Crypto for ex - ETH
            console.log("PRICE: ", obj.price);
            this.cryptos.push({
              name: name,
              price: obj.price,
              icon: `https://cryptoicons.org/api/icon/${name.toLowerCase()}/200`,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    generateDayWiseTimeSeriesETHSGR: async function () {
      return new Promise((resolve) => {
        var volumes = [];
        var series = [];
        const dataETHSGR = require("../src/assets/json/testUSDSGR.json");
        dataETHSGR.prices.map((priceGroup) => {
          //console.log("group: ", priceGroup);
          series.push([priceGroup[0].toFixed(0), priceGroup[1].toFixed(2)]);
        });
        dataETHSGR.total_volumes.map((data) => {
          volumes.push([data[0].toFixed(0), data[1].toFixed(2)]);
        });
        resolve([series, volumes]);
      });
    },
    generateDayWiseTimeSeries: async function () {
      return new Promise((resolve) => {
        const dataUSDSGR = require("../src/assets/json/testETHSGR.json");
        var volumes = [];
        var series = [];
        dataUSDSGR.prices.map((priceGroup) => {
          //console.log("group: ", priceGroup);
          series.push([priceGroup[0].toFixed(0), priceGroup[1].toFixed(2)]);
        });
        dataUSDSGR.total_volumes.map((data) => {
          volumes.push([data[0].toFixed(0), data[1].toFixed(2)]);
        });
        resolve([series, volumes]);
      });
    },
  },
};
</script>

<style>
</style>