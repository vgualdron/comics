<template>
  <div class>
    <div class>
      <b-navbar toggleable="lg" type="light" variant="light" class="border" fixed="top">
        <b-navbar-brand href="#">
          <i class="fa fa-globe" aria-hidden="true" /> Cómics
        </b-navbar-brand>
      </b-navbar>
      <nuxt />
    </div>
  </div>
</template>

<style>
.app {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  min-height: 90vh;
  margin-top: 40px;
}
</style>