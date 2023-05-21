<script>
  import LoginWithGoogle from "$lib/components/Auth/LoginWithGoogle.svelte";
  import AuthForm from "$lib/components/Auth/AuthForm.svelte";
  import messagesStore from "$lib/stores/messages.store";
  import { loginWithEmailAndPassword } from "$lib/firebase/auth.client";
  import { afterLogin } from "$lib/helpers/route.helper";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  async function login(e) {
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

      const user = await loginWithEmailAndPassword(email, password);
      await afterLogin($page.url, user.uid);
    } catch (e) {
      console.log(e);
      if (e.code === "auth/user-not-found") {
        messagesStore.showError("You have not registered!");
        await goto("/signup");
        return;
      }
      if (["auth/invalid-email", "auth/wrong-password"].includes(e.code)) {
        messagesStore.showError("Invalid email or password!");
        return;
      }
      console.log(e);
      messagesStore.showError();
    }
  }
</script>

<div class="row">
  <div class="col">
    <h1>Login</h1>
  </div>
</div>
<hr />
<AuthForm on:submit={login} btnName="Login with email" />
<hr />
<LoginWithGoogle />
<hr />
<div class="row">
  <div class="col">
    <a class="btn btn-warning w-100" href="/forgot-password"
      >Reset your password?</a
    >
  </div>
</div>

<svelte:head><title>Book Lover - Login</title></svelte:head>
