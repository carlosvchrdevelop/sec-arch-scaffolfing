<script>
  import { clusterEndpoint } from "../../../config/endpoints";
  import Loading from "../../../components/Loading.svelte";
  import DeleteIcon from "../../../icons/DeleteIcon.svelte";

  const getNodes = async () => {
    const res = await fetch(`${clusterEndpoint}/nodes`);
    if (res.ok) {
      const data = await res.json();
      return data?.data ?? [];
    }
    return [];
  };

  let nodes = getNodes();
</script>

<main>
  {#await nodes}
    <Loading msg="Receiving data" />
  {:then nodes}
    {#if nodes.length <= 0}
      <p class="text-lg text-gray-500 text-center py-20">
        Oh! It looks like you still don't have any node in your cluster :(
        <br />
        Start by creating one...
      </p>
    {:else}
      <div class="overflow-auto w-full shadow">
        <table class="table-fixed min-w-full">
          <thead class="bg-blue-500 text-white">
            <tr>
              <td class="text-center py-4">Name</td>
              <td class="text-center py-4">Architecture</td>
              <td class="text-center py-4">OS</td>
              <td class="text-center py-4">IP</td>
              <td class="text-center py-4">CPU</td>
              <td class="text-center py-4">Memory</td>
              <td class="text-center py-4">Actions</td>
            </tr>
          </thead>
          <tbody>
            {#each nodes as node}
              <tr class="hover:bg-gray-100 tr-hoverable">
                <td class="px-6 py-4 text-center">
                  <a href="/" class="hover:underline text-blue-700">
                    {node.name}
                  </a>
                </td>

                <td class="px-6 py-4 text-center">
                  {node.architecture}
                </td>

                <td class="px-6 py-4 text-center">
                  {node.osImage}
                </td>

                <td class="px-6 py-4 text-center">
                  {node.internalIP}
                </td>

                <td class="px-6 py-4 text-center">
                  {node.allocatable.cpu}/{node.capacity.cpu}
                </td>

                <td class="px-6 py-4 text-center">
                  {node.allocatable.memory}/{node.capacity.memory}
                </td>

                <td class="px-6 py-4 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    on:click={() => {}}
                    title="delete"
                    class="w-4 cursor-pointer fill-red-700 hover:fill-red-900"
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  {/await}
</main>
