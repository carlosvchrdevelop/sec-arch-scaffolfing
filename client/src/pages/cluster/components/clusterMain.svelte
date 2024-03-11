<script>
  import ClusterData from "./clusterData.svelte";
  import ClusterNew from "./clusterNew.svelte";
  import { clusterEndpoint } from "../../../config/endpoints";
  import Spinner from "../../../components/Spinner.svelte";

  const getStatus = async () => {
    const res = await fetch(`${clusterEndpoint}/status`);
    if (res.ok) {
      const data = await res.json();
      return data?.data?.clusterStatus ?? "errorcito";
    }
    return "errorcitoooooo";
  };

  let status = getStatus();
</script>

{#await status}
  <h1 class="flex gap-2 w-full justify-center items-center p-8">
    Awaiting for data <Spinner />
  </h1>
{:then clusterStatus}
  {#if clusterStatus === "Started"}
    <ClusterData />
  {:else if clusterStatus === "Stopped"}
    <h1>Cluster is starting...</h1>
  {:else}
    <div class="w-full flex flex-col justify-center items-center p-8 gap-8">
      <h1 class="text-red-700 text-lg">
        Error establishing a connection with the cluster controller :&lpar;
      </h1>
      <p class="text-gray-600 text-center text-sm">
        This usually happens when Microk8s cannot be automatically installed. <br
        />Check the
        <a
          class="text-blue-600 hover:underline"
          href="https://microk8s.io/#install-microk8s">official documentation</a
        > and try to install it manually.
      </p>
    </div>
  {/if}
{/await}
