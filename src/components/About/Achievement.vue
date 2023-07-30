<script setup>
import {computed, defineAsyncComponent, ref} from 'vue'
const achievements = [
{
  text:'Bin Mu#, Yuehan Cui, Shijin Yuan*, et al. Simulation, precursor analysis and targeted observation sensitive area identification for two types of ENSO using ENSO-MC v1.0[J]. Geoscientific Model Development, 2022, 15(10): 4105-4127.',
  url:'https://gmd.copernicus.org/articles/15/4105/2022/gmd-15-4105-2022.pdf'
},
{
  text:'Bin Mu#, Bo Qin, Shijin Yuan*. ENSO-ASC 1.0.0: ENSO deep learning forecast model with a multivariate air–sea coupler[J]. Geoscientific Model Development, 2021, 14(11): 6977-6999.',
  url:'https://gmd.copernicus.org/articles/14/6977/2021/gmd-14-6977-2021.pdf'
},
{
  text:'Shijin Yuan#, Huazhen Zhang, Yaxuan Liu, Bin Mu*. Feature extraction-based intelligent algorithm framework with neural network for solving conditional nonlinear optimal perturbation[J]. Soft Computing, 2022: 1-18.',
  url:'https://link.springer.com/content/pdf/10.1007/s00500-021-06639-8.pdf'
},
{
  text:'Bin Mu#, Jing Li, Shijin Yuan*, et al. The NAO Variability Prediction and Forecasting with Multiple Time Scales Driven by ENSO Using Machine Learning Approaches[J]. Computational Intelligence and Neuroscience, 2022.',
  url:'https://downloads.hindawi.com/journals/cin/2022/6141966.pdf'
},
{
  text:'Bin Mu#, Jing Li, Shijin Yuan*, et al. Optimal precursors identification for North Atlantic oscillation using the parallel intelligence algorithm[J]. Scientific Programming, 2022.',
  url:'https://npg.copernicus.org/preprints/npg-2020-27/npg-2020-27.pdf'
},
{
  text:'Shijin Yuan#, Bo Shi, Zijun Zhao, Bin Mu*, et al. Ensemble Forecast for Tropical Cyclone Based on CNOP-P Method: A Case Study of WRF Model and Two Typhoons[J]. Journal of Tropical Meteorology, 2022, 28(2): 121-138.',
  url:'http://jtm.itmm.org.cn/en/article/doi/10.46267/j.1006-8775.2022.010'
},
{
  text:'Bin Mu#, Bo Qin, Shijin Yuan*, et al. ENSO Deep Learning Forecast Model: A Survey [J]. Clivar Exchange, 2021.',
  url:'https://gmd.copernicus.org/preprints/gmd-2021-213/gmd-2021-213.pdf'
},
{
  text:'Shijin Yuan#, Cheng Wang, Bin Mu*, et al. Typhoon intensity forecasting based on LSTM using the rolling forecast method[J]. Algorithms, 2021, 14(3): 83.',
  url:'http://duanws.lasg.ac.cn/ueditor/php/upload/file/20210312/1615518044541947.pdf'
},
];
</script>

<template>
  <div class="pageContent">
    <h1>成果展示</h1>

    <div v-for="(ach, index) in achievements">
      <a :href="ach.url">({{index+1}}){{ach.text}}</a><br><br>
    </div>

  </div>
</template>

<style scoped lang="scss">
a{
  text-decoration: none;
  color: rgb(13, 13, 13);
}
</style>
