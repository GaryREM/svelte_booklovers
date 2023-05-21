<script>
  import { loginWithGoogle } from "$lib/firebase/auth.client";
  import messageStore from "$lib/stores/messages.store";
  import { page } from "$app/stores";
  import { afterLogin } from "$lib/helpers/route.helper";

  async function loginGoogle() {
    try {
      const user = await loginWithGoogle();
      await afterLogin($page.url, user.uid);
    } catch (e) {
      if (e.code === "auth/popup-closed-by-user") {
        return;
      }
      console.log(e);
      messageStore.showError();
    }
  }
</script>

<div class="row">
  <div class="col">
    <button on:click={loginGoogle} class="btn btn-primary w-100"
      >Login with Google</button
    >
  </div>
</div>
