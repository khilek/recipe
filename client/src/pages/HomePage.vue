<script setup>

</script>

<template>
  <div class="container">
    <section class="row bg-success text-center p-5 fw-bold ">
      <div class="col">
        <h1>RECIPE</h1>
      </div>
    </section>
    <div class="container ">
      <section class="row card flex-row ">
        <div role="button" class="col-4 d-flex justify-content-evenly">
          <h2>HOME</h2>
        </div>
        <div role="button" class="col-4 d-flex justify-content-evenly">
          <h2>My Recipes</h2>
        </div>
        <div role="button" class="col-4 d-flex justify-content-evenly">
          <h2>RECIPES</h2>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.magic-card {
  position: relative;
  bottom: -15vh;
}

.hero-img {
  max-height: 80%;
  max-width: 100%;
  background-size: cover;
  display: block;
  object-fit: contain;
  object-position: cover;
}



.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: clamp(500px, 50vw, 100%);

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
