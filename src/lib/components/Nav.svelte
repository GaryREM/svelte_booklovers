<script>
  import { page } from "$app/stores";
  import authStore from "$lib/stores/auth.store";
  import { logout } from "$lib/firebase/auth.client";
  import messagesStore from "$lib/stores/messages.store";
  import { goto } from "$app/navigation";

  import { afterUpdate } from "svelte";
  let showMobil = false;
  function toggleMobil() {
    showMobil = !showMobil;
  }
  // need to do more than just call the logout function
  async function onLogout() {
    try {
      await logout();
      goto("/");
    } catch (e) {
      console.log(e);
      messagesStore.showError();
    }
  }
  let navLinks;
  let thePagePath;
  $: thePagePath = $page.url.pathname;

  afterUpdate(() => {
    let theNavLinks = navLinks.querySelectorAll(".nav-link");
    for (let i = 0; i < theNavLinks.length; i++) {
      theNavLinks[i].classList.remove("active");
      if (i === 0) {
        if (theNavLinks[0].pathname === thePagePath) {
          theNavLinks[0].classList.add("active");
        }
      } else {
        if (thePagePath.includes(theNavLinks[i].pathname)) {
          theNavLinks[i].classList.add("active");
        }
      }
    }
  });
</script>

<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Book Lover</a>
    <button
      on:click={toggleMobil}
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class:show={showMobil} class="collapse navbar-collapse" id="navbarNav">
      <ul bind:this={navLinks} class="navbar-nav">
        {#if $authStore.isLoggedIn}
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/add">Add Book</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/profile">Profile</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/about">About</a>
          </li>
          <li class="nav-item">
            <span on:click={onLogout} on:keydown={onLogout} class="nav-link"
              >Logout</span
            >
          </li>
        {:else}
          <!-- Not Logged In ----------------------------->
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/about">About</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="/login">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/signup">Sign Up</a>
          </li>
        {/if}
      </ul>
    </div>
  </div>
</nav>

<style>
  .nav-item > span {
    cursor: pointer;
  }
</style>
