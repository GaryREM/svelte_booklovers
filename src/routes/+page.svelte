<script>
  // @ts-ignore: suppress implicit any errors
  import { goto } from "$app/navigation";
  import Book from "$lib/components/Books/Book.svelte";
  import messagesStore from "$lib/stores/messages.store";

  export let data;

  // let books = data.books;
  // let goBack = data.previous;
  // let goForward = data.next;
  // let page = data.page;

  async function back() {
    try {
      await goto(`/?page=${+data.page - 1}`);
    } catch (e) {
      messagesStore.showError();
    }
  }

  async function forward() {
    try {
      await goto(`/?page=${+data.page + 1}`);
    } catch (e) {
      messagesStore.showError();
    }
  }
</script>

<div class="container">
  <div class="row">
    <section class="col-12 text-center">
      <h1>Books</h1>
      <h3>Page {data.page}</h3>

      {#each data.books as book (book.id)}
        <!-- <li>{book.title}</li> -->
        <Book {book} />
      {/each}
    </section>
  </div>
  <div class="row mt-3">
    <div class="col-6 text-center">
      <button
        on:click={back}
        class="btn btn-primary w-50"
        disabled={!data.previous}>Previous</button
      >
    </div>
    <div class="col-6 text-center">
      <button
        on:click={forward}
        class="btn btn-primary w-50"
        disabled={!data.next}>Next</button
      >
    </div>
  </div>
</div>
