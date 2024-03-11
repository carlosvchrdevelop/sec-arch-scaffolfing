<script>
  import Spinner from "./Spinner.svelte";
  export let msg;
</script>

<div
  class="text-lg text-gray-500 w-full gap-2 py-20 flex items-center justify-center"
>
  {msg}
  <Spinner />
</div>
