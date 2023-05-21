<script>
  import Book from "$lib/components/Books/Book.svelte";
  import { goto } from "$app/navigation";
  import messagesStore from "$lib/stores/messages.store";
  export let data;
</script>

{#each data.books as book (book.id)}
  <Book {book} />
{/each}
