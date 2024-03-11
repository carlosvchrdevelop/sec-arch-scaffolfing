<script>
  import TimesIcon from "../icons/TimesIcon.svelte";

  export let msg;
  export let kind;
  export let close;

  let color = kind === "error" ? "red" : "blue" ?? "green";
</script>

<p
  class="fixed shadow p-8 bg-red-100 rounded text-red-700 top-32 left-[50%] translate-x-[-50%] w-half min-w-[800px] max-w-[90%] overflow-auto"
>
  {msg}
  <em class="text-sm text-red-600"
    ><br /><br />
    - Error messages still in beta, sorry :&rpar;</em
  >
  <button
    class="fixed top-3 right-3 hover:rotate-90 duration-300 w-4 h-4 flex justify-center items-center fill-red-400"
    on:click={close}><TimesIcon /></button
  >
</p>
