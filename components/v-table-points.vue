<template>
  <div class="text-center">
    <b-table
      :items="comics"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      stacked="sm"
    >
      <template slot="index" slot-scope="data">
        {{ data.index + 1 }}
      </template>
      <template slot="points" slot-scope="data">
        <template v-if="data.item.points > 0">
          {{ data.item.points }} / {{ totalPoints }}
        </template>
        <template v-else>
          0 / {{ totalPoints }}
        </template>
      </template>
      <template slot="rest" slot-scope="data">
        <template v-if="(totalPoints - data.item.points) < 0">
          0
        </template>
        <template v-else-if="data.item.points > 0">
          {{ totalPoints - data.item.points }}
        </template>
        <template v-else>
          {{ totalPoints }}
        </template>
      </template>
    </b-table>
    <div class="border rounded bg-light shadow-sm p-3"><h4 class="m-0 p-0">Total Puntos : {{ sumPoints() }}</h4></div>
    <b-alert v-if="winner != null" show variant="success">{{ winner.name }} Ganador!.</b-alert>
  </div>
</template>

<script>
export default {
    name: 'VTablePoints',
    props: {
      comics: {
        required: true,
        type: Array
      },
      totalPoints: {
        required: true
      },
      winner: null
    },
    data: function () {
      return {
        sortBy: 'points',
        sortDesc: true,
        fields: [
          { key: 'num', label: '#' },
          { key: 'title', label: 'Cómic', sortable: true },
          { key: 'points', label: 'Puntos', sortable: true }
        ]
      }
    },
    watch: {
    },
    mounted: function () {
    },
    methods: {
      sumPoints: function () {
        let total = 0
        this.comics.forEach(comic => {
          if (comic.points > 0) {
            total = total + parseInt(comic.points)
          }
        })
        return total
      }
    }
}
</script>
