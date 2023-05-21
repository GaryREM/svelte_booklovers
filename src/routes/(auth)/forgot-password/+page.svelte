<script>
  import AuthForm from "$lib/components/Auth/AuthForm.svelte";
  import { mailPasswordResetEmail } from "$lib/firebase/auth.client";
  import messagesStore from "$lib/stores/messages.store";
  let hideForm = false;

  async function onForgotPassword(e) {
    try {
      const formData = new FormData(e.target);
      const email = formData.get("email");
      await mailPasswordResetEmail(email);
      hideForm = true;
      messagesStore.showSuccess("Reset password email sent!");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        messagesStore.showError("Email not found, try again!ß");
        return;
      }
      messagesStore.showError("");
    }
  }
</script>

<div class="row">
  <div class="col">
    <h1>Forgot Password</h1>
  </div>
</div>

{#if !hideForm}
  <AuthForm
    on:submit={onForgotPassword}
    forgotPassword={true}
    btnName="Reset Password"
  />{/if}
<svelte:head>
  <title>Book Lovers - Forgot Password</title>
</svelte:head>
