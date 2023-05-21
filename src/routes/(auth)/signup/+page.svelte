<script>
  import AuthForm from "$lib/components/Auth/AuthForm.svelte";
  import LoginWithGoogle from "$lib/components/Auth/LoginWithGoogle.svelte";
  import messagesStore from "$lib/stores/messages.store";
  import { registerWithEmailAndPassword } from "$lib/firebase/auth.client";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { afterLogin } from "$lib/helpers/route.helper";

  async function register(e) {
    try {
      const formData = new FormData(e.target);
      const email = formData.get("email");
      const password = formData.get("password");
      if (!email || !password) {
        messagesStore.showError("Please enter a proper email and a password!");
        return;
      }
      if (password.length < 6) {
        messagesStore.showError("Minimum password length is 6 characters!");
        return;
      }

      const user = await registerWithEmailAndPassword(email, password);
      await afterLogin($page.url, user.uid);
    } catch (e) {
      if (e.code === "auth/email-already-in-use") {
        messagesStore.showError("You have already registered!");
        await goto("/login");
        return;
      }
      console.log(e);
      messagesStore.showError();
    }
  }
</script>

<div class="row">
  <div class="col">
    <h1>Sign Up</h1>
  </div>
</div>
<hr />
<AuthForm on:submit={register} btnName="Sign Up" />
<hr />
<LoginWithGoogle />

<svelte:head>
  <title>Book Lovers - Sign Up</title>
</svelte:head>
