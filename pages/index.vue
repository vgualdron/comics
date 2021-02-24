<template>
  <div class="app">
    <b-row class="mr-0 ml-0">
      <b-col class="mt-3 bd-sidebar d-none d-md-block overflow-auto" shadow-sm cols="3">
        <vue-perfect-scrollbar>
          <v-table-points :comics="(comics)" :winner="winner" :total-points="totalPoints" />
        </vue-perfect-scrollbar>
      </b-col>
      <b-col class="col-sm-12 col-md-9 d-block p-0">
        <div class="pt-3 position-fixed w-100" style="z-index: 2;">
          <b-navbar-brand class="w-100 pl-3 shadow" style="background: white; padding-top: 0.7rem; padding-bottom: 0.7rem; z-index: 2;">
            Califica los Cómics
          </b-navbar-brand>
        </div>
        <div class="p-3 text-align-center" style="margin-top: 85px;">
          <b-alert
            show
            class="border rounded shadow-sm"
            variant="light"
          >
            <i class="fa fa-info-circle" aria-hidden="true" /> 
            Ayudanos a calificar nuestros cómics y envía las calificaciones para saber
            que cómics son los que mas gustan. Gana el Cómic que complete {{ totalPoints }} puntos o más
          </b-alert>

          <div class="float-right mt-2 mb-4">
            <b-button id="show-btn" @click="openModal" class="mt-1" title="Ver detalles de puntuación">
              <i class="fa fa-users" aria-hidden="true" /> Puntuación
            </b-button>
            <b-button id="reset-btn" @click="reset" class="mt-1" title="Reiniciar calificaciones">
              <i class="fa fa-refresh" aria-hidden="true" /> Reiniciar calificaciones
            </b-button>
          </div>

          <b-container v-if="comic" fluid>
            <b-row class="justify-content-center">
              <b-col md="12" class="center mt-10">
                <b-container class="center mt-10">
                  <v-imagen :is-winner="winner" :img="comic" @sendPoints="sendPoints" />
                </b-container>
              </b-col>
            </b-row>
          </b-container>
        </div>
      </b-col>
    </b-row>

    <b-modal ref="modalPuntos" v-model="showModal" hide-footer title="Tabla de Puntos">
      <div class="d-block text-center">
        <v-table-points :comics="(comics)" :winner="winner" :total-points="totalPoints" />
      </div>
    </b-modal>
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar"
import VImagen from "../components/v-imagen"
import VTablePoints from "../components/v-table-points"
import { generateRandom } from "../util/number-utils"

export default {
  name: "Inicio",
  layout: "default",
  components: {
    VImagen,
    VTablePoints,
    VuePerfectScrollbar
  },
  data: function() {
    return {
      comic: {},
      comics: [],
      showModal: false,
      winner: null,
      totalPoints: 20
    }
  },
  created: function() {
    if (this.comics && this.comics.length === 0 && this.$localStorage.get('comics')) {
      this.comics = JSON.parse(this.$localStorage.get('comics'))
    }

    this.hasWinner()
  },
  mounted: function() {
  },
  methods: {
    getComic: async function() {
      this.comic = {}
      let number = generateRandom(10, 30)
      try {
        const resp = await this.$http.get(
          `api/${number}/info.0.json`
        )
        let comic = resp.data
        this.comic = { ...comic }
        this.comic.url = comic.img.replace('https', 'http')

      } catch (error) {
        console.log(error)
      }

    },
    sendPoints: async function(img) {
      let ans = false
      try {
        ans = await this.$bvModal.msgBoxConfirm(
          "¿Está seguro que deseas envíar esta calificación?",
          {
            title: "Cómics",
            size: "sm",
            buttonSize: "sm",
            okVariant: "primary",
            okTitle: "SI",
            cancelTitle: "NO",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true
          }
        )
      } catch (err) {
        console.log("ERROR", err)
      }

      if (!ans) {
        return
      }

      let comic = await this.comics.find( element => element.num == img.num)
      if (comic) {
        comic.points = comic.points + img.points
      } else {
        this.comics.push(img)
      }

      this.hasWinner()
      this.$localStorage.set("comics", JSON.stringify(this.comics))
      this.$toast.success("Calificación registrada con éxito")
      this.orderComics()
    },
    hasWinner: async function() {
      let hasWinner = await this.comics.find( element => element.points >= this.totalPoints)

      if (hasWinner) {
        this.winner = { ...hasWinner }
        this.winner.name = hasWinner.title
        this.$toast.success("Hay ganador!!! " + hasWinner.title)
        this.comic = { ...this.winner }
      } else {
        this.getComic()
      }
    },
    orderComics: function() {
      this.comics.sort(function(a, b) {
        return parseFloat(a.points) - parseFloat(b.points)
      })
    },
    reset: function() {
      this.$bvModal
        .msgBoxConfirm("Está seguro de reiniciar la calificación?",
          {
            title: "Cómics",
            size: "sm",
            buttonSize: "sm",
            okVariant: "primary",
            okTitle: "SI",
            cancelTitle: "NO",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true
          })
        .then(value => {
          if (value) {
            this.comics = []
            this.$localStorage.set("comics", "[]")
            this.winner = null
            this.getComic()
            this.$toast.success("Calificación reiniciada con éxito.")
          }
        })
        .catch(err => {
          // An error occurred
          console.log("ERROR", err)
        })
    },
    sumPoints: function() {
      let total = 0
      this.comics.forEach(comic => {
        if (comic.points > 0) {
          total = total + parseInt(comic.points)
        }
      })
      return total
    },
    openModal: function() {
      this.showModal = true
    }
  }
}
</script>
