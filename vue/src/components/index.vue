<template>
  <div>
    <vs-row vs-justify="center">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
        <vs-card>
          <div slot="header">
            <h3>
              Hello LiM
            </h3>
          </div>
          <div>
            <p class="mb">I scrape IMDB for your lazy ass. Put an IMDB ID in the input below and i will create a html
              template for
              your shitty snahp.it post. have fun you fat fuck, suck a dick you pice of shit.</p>
            <!-- <vs-input vs-icon="fab fa-imdb" placeholder="IMDB ID" v-model="imdb"/> -->
            <vs-row vs-align="flex-start" vs-type="flex" vs-justify="center" vs-w="12">
              <vs-input vs-icon="local_movies" vs-color="warning" placeholder="IMDB ID" v-model="imdb" />
            </vs-row>
          </div>
          <div slot="footer">
            <vs-row vs-justify="flex-end">
              <vs-button vs-color="warning" style="border-radius: 50%" vs-type="filled" vs-icon="search" @click="getImdb(imdb)"></vs-button>
            </vs-row>
          </div>
        </vs-card>
      </vs-col>
    </vs-row>

    <div class="spacer"></div>

    <vs-row v-if="data.title" vs-justify="center">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
        <a @click="copyContent()">

          <vs-card class="pb h">
            <data>
              <div><p align="center"><img :src="data.poster" :title="data.title" width="300" /></p></div><br/>

              <div><p align="center"><strong>{{ data.title }} ({{ data.start_year }})</strong></p></div><br/>

              <div><strong>Summary:</strong> <em>{{ data.plot }}</em></div><br/>

              <div><strong>Director:</strong> {{ data.director }}<br/>
              <strong>Stars:</strong> {{ data.actors }}</div><br/>

              <div><strong>Links:</strong> <a :href="`https://www.imdb.com/title/${data.imdbid}`">IMDB</a> - <a href="https://pastebin.com/xxxx">NFO</a></div><br/>

              <div><strong>Direct Download Links:</strong><br/>
              <a href="https://links.snahp.it/xxxx"><strong>Download from ZIPPYSHARE (Splits) - NO LIMITS</strong></a></div>
            </data>
          </vs-card>

        </a>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'index',
  data () {
    return {
      imdb: '',
      data: {}
    }
  },
  methods: {
    getImdb: function (id) {
      if (/^tt\d{7}$/.test(id)) {
        axios.get(`api/${id}`)
          .then(res => {
            console.log(res.data)
            this.data = res.data
          })
      } else {
        this.$vs.notify({
          title: 'Error',
          text: 'invalide IMDB ID',
          color: 'danger'
        })
      }
    },

    copyContent: function () {
      const copy = document.getElementsByTagName('data')[0].innerHTML
        .replace(/ data-v-[\w\d]{8}=""/g, '')

      this.$copyText(copy).then(() => {
        this.$vs.notify({
          title: `copied ${this.data.title}`,
          text: 'copied to clipboard',
          color: 'warning'
        })
      })
    }
  }
}
</script>

<style scoped>
  .pb {
    padding-bottom: 20px;
  }

  .mb {
    margin-bottom: 20px;
  }

  .h {
    cursor: pointer;
  }

  .h:hover {
    -webkit-transform: translateY(4px);
    transform: translateY(4px);
    -webkit-box-shadow: 0 0 5px 0 rgba(0, 0, 0, .1) !important;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, .1) !important;
  }

  .spacer {
    height: 20px;
  }

</style>

<style>
  * {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

</style>
