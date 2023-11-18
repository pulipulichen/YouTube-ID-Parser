let app = {
  props: ['db'],
  components: {
    // DataTaskManager: () => import(/* webpackChunkName: "components/DataTaskManager" */ './DataTaskManager/DataTaskManager.vue')
  },
  data () {    
    this.$i18n.locale = this.db.localConfig.locale
    return {
    }
  },
  watch: {
    'db.localConfig.locale'() {
      this.$i18n.locale = this.db.localConfig.locale;
    },
  },
  computed: {
    computedYouTubeID () {
      let htmlSourceCode = this.db.localConfig.sourceCode
      // Regular expression to match YouTube video IDs in different URL formats
      let regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      
      // Match the first YouTube video ID in the HTML source code
      let match = htmlSourceCode.match(regex);

      // Check if a match is found
      if (match && match[1]) {
          // Return the extracted YouTube video ID
          return match[1];
      } else {
          // Return null if no YouTube video ID is found
          return null;
      }
    },
    computedYouTubeURL () {
      if (this.computedYouTubeID) {
        return `https://youtu.be/` + this.computedYouTubeID
      }
    },
    computedOpenYouTubeButton () {
      if (this.computedYouTubeURL) {
        return null
      }
      return 'disabled'
    },
    computedDownsubURL() {
      if (!this.computedYouTubeURL) {
        return null
      }
      return `https://downsub.com/?url=` + encodeURIComponent(this.computedYouTubeURL)
    },
    computedOpenDownsubButton () {
      if (this.computedDownsubURL) {
        return null
      }
      return 'disabled'
    }
  },
  mounted() {
    
  },
  methods: {
    
  }
}

export default app