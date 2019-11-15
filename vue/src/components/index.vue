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
            <p class="mb">I scrape IMDB for your lazy ass. Put an IMDB ID in the input below and i will create a html template for your shitty snahp.it post. have fun you fat fuck, suck a dick you pice of shit.</p>
            <!-- <vs-input vs-icon="fab fa-imdb" placeholder="IMDB ID" v-model="imdb"/> -->
            <vs-row vs-align="flex-start" vs-type="flex" vs-justify="center" vs-w="12">
              <vs-input v-on:keyup.enter="getImdb(imdb)" vs-icon="local_movies" vs-color="warning" placeholder="IMDB ID" v-model="imdb" />
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

    <vs-row v-if="data" vs-justify="center">

      <vs-col style="margin: 5px" vs-type="flex" vs-justify="center" vs-align="center" vs-w="4"
        v-for="(result, index) in data.results" :key="index">
        <a @click="copyContent(index)">
          <vs-card class="pb h">
            <data>
              <div>
                <div>
                  <p align="center"><img :src="result.poster" :title="result.title" width="300" /></p>
                </div><br/>

                <div>
                  <p align="center"><strong>{{ result.title }} ({{ result.start_year || result.year }})</strong></p>
                </div><br/>
              </div>

              <div>
                <div><strong>Summary:</strong> {{ result.plot }}</div><br/>
                <div><strong>Director:</strong> {{ result.director }}</div>
                <div><strong>Stars:</strong> {{ result.actors }}</div>
                <div><strong>Rating:</strong> {{ result.rating }}/10</div>
                <div><strong>Votes:</strong> {{ result.votes }}</div>
                <div><strong>Genres:</strong> {{ result.genres }}</div>
                <div><strong>Runtime:</strong> {{ result.runtime }}</div>
              </div><br/>

              <div><strong>Links:</strong> <a :href="`https://www.imdb.com/title/${result.imdbid}`">IMDb</a></div><br/>

              <div><strong>Direct Download Links:</strong><br/>
              <strong>Download from <font color="red">ZIPPYSHARE</font> (Splits) - NO LIMITS</strong><br/>
              <a href="https://links.snahp.it/xxxxxx"><strong>RELEASE.NAME.HERE</strong></a><br/>
              <a href="https://links.snahp.it/xxxxxx"><strong>RELEASE.NAME.HERE</strong></a></div><hr/><br/>

              <div><strong><font color="red">Please Note</font></strong>:</div><br/>
              <div><strong><font color="#BD00EB">1.</font></strong> If any <strong>password</strong> is required, it will be the domain of the site - <font color="purple"><strong>sn___.it</strong></font>.</div><br/>
              <div><strong><font color="#BD00EB">2.</font></strong> If you're taken to <strong>FileCrypt</strong> - please enter the password, solve the captcha and click on the download <strong>DLC button</strong> - <img src="https://i.imgur.com/2nYZEbE.png" width="50"><br />Use the DLC on <a href="https://links.snahp.it/eiYWPiVuPKkZltSoJl07anN63GpRftjL1FC"><strong>JDownloader2</strong></a> or <strong>dcrypt it</strong> to get access to the links.</div><br/>
              <div><strong><font color="#BD00EB">3.</font></strong> Please use the <strong>latest version</strong> of 7-Zip or WinRAR (<font color="purple"><strong>Windows</strong></font>), p7zip or unrar (<font color="purple"><strong>Linux</strong></font>) and Unarchiver or Keka (<font color="purple"><strong>Mac</strong></font>) to extract the files, depending on the file format.</div><br/><br/>
              <div>Extra protection has been added to this release as it may have been taken down recently or there is a risk of it being taken down soon. Thank you for your understanding and we hope you enjoy the content.</div>
            </data>
          </vs-card>
        </a>

      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import axios from 'axios'
import beautify from 'js-beautify'
export default {
  name: 'index',
  data () {
    return {
      imdb: '',
      data: {}
    }
  },
  methods: {
    getImdb: function (search) {
      axios.get(`api/${encodeURIComponent(search)}`)
        .then(res => {
          console.log(res.data)
          this.data = res.data
        })
    },

    copyContent: function (index) {
      let copy = document.getElementsByTagName('data')[index].innerHTML
        .replace(/ data-v-[\w\d]{8}=""/g, '')

      copy = beautify.html(copy)

      this.$copyText(copy).then(() => {
        this.$vs.notify({
          title: `copied ${this.data.results[index].title}`,
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
