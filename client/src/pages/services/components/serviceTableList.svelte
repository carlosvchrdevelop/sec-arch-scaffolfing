<script>
  import Loading from "../../../components/Loading.svelte";
  import { kubernetesEndpoint } from "../../../config/endpoints";
  import DeleteIcon from "../../../icons/DeleteIcon.svelte";
  import EditIcon from "../../../icons/EditIcon.svelte";
  import StartIcon from "../../../icons/StartIcon.svelte";
  import StopIcon from "../../../icons/StopIcon.svelte";

  let refreshing = false;

  const getResources = async () => {
    if (refreshing) return;
    refreshing = true;
    const res = await fetch("http://localhost:3000/kubernetes");
    const data = await res.json();
    refreshing = false;
    return data?.data ?? [];
  };

  let resources = [];
  let errors = "";

  try {
    resources = getResources();
  } catch (err) {
    errors = err;
  }

  const deleteResource = async (id) => {
    try {
      await fetch(`${kubernetesEndpoint}/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      errors = err;
    }
  };
</script>

{errors}
{#await resources}
  <Loading msg="Receiving data" />
{:then resources}
  {#if resources.length <= 0}
    <p class="text-lg text-gray-500 text-center py-20">
      Oh! It looks like you still don't have any services up :(
      <br />
      Start by creating one...
    </p>
  {:else}
    <div class="w-full flex justify-end px-4 py-2">
      <button
        class="text-blue-800 cursor-pointer"
        on:click={() => (resources = getResources())}>Refresh</button
      >
    </div>

    <div class="overflow-auto w-full shadow">
      <table class="table-fixed min-w-full">
        <thead class="bg-blue-500 text-white">
          <tr>
            <td class="text-center py-4">Name</td>
            <td class="text-center py-4">Image</td>
            <td class="text-center py-4">Status</td>
            <td class="text-center py-4">Replicas</td>
            <td class="text-center py-4">Port</td>
            <td class="text-center py-4">IP</td>
            <td class="text-center py-4">Visibility</td>
            <td class="text-center py-4">Actions</td>
          </tr>
        </thead>
        <tbody>
          {#each resources as resource}
            <tr class="hover:bg-gray-100 tr-hoverable">
              <td class="px-6 py-4 text-center">
                <a
                  href={`http://${resource.clusterIPs[0]}:${resource.externalPort}`}
                  target="_blank"
                  class="hover:underline text-blue-700"
                >
                  {resource.name}
                </a>
              </td>
              <td class="px-6 py-4 text-center">{resource.image}</td>
              <td class="px-6 py-4 text-center">{resource.status}</td>
              <td class="px-6 py-4 text-center">{resource.replicas}</td>
              <td class="px-6 py-4 text-center">
                {resource.internalPort}:{resource.externalPort}
              </td>
              <td class="px-6 py-4 text-center">{resource.ip}</td>
              <td class="px-6 py-4 text-center">
                {resource.serviceType === "ClusterIP" ? "Private" : "Public"}
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-center gap-2">
                  {#if resource.replicas !== 0}
                    <button
                      title="stop"
                      class="w-5 cursor-pointer fill-orange-600 hover:fill-orange-800"
                    >
                      <StopIcon />
                    </button>
                  {:else}
                    <button
                      title="start"
                      class="w-4 cursor-pointer fill-green-700 hover:fill-green-900"
                    >
                      <StartIcon />
                    </button>
                  {/if}
                  <a
                    href="/services/edit?name={resource.name}"
                    title="edit"
                    class="w-5 cursor-pointer fill-blue-700 hover:fill-blue-900"
                  >
                    <EditIcon />
                  </a>
                  <button
                    type="button"
                    on:click={() => deleteResource(resource.name)}
                    title="delete"
                    class="w-4 cursor-pointer fill-red-700 hover:fill-red-900"
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
{/await}
