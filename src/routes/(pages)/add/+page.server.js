import { addBook } from "$lib/firebase/database.server";
import validateBook from "$lib/validators/book.validator";
import { fail, redirect } from "@sveltejs/kit";

/** @type {import('./$types').Actions} */
export const actions = {
  // request contains form data
  // locals contains user data
  default: async ({ request, locals }) => {
    const formData = await request.formData();
    const validatedData = await validateBook(formData);
    console.log(validatedData);
    if (!validatedData.success) {
      return fail(422, validatedData);
    }

    // return { success: true };
    const bookId = await addBook(validatedData.book, locals.user.id);

    throw redirect(303, `/book/${bookId}`);
  },
};
