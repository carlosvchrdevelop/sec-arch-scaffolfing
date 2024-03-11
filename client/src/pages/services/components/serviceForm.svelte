<script>
  import Spinner from "../../../components/Spinner.svelte";
  import Alert from "../../../components/Alert.svelte";
  const urlParams = new URLSearchParams(window.location.search);
  let editMode = false;
  let id = undefined;

  if (urlParams.has("name")) {
    editMode = true;
    id = urlParams.get("name");
  }

  let name = "";
  let image = "";
  let internalPort = "";
  let externalPort = "";
  let replicas = 1;
  let maxCpu = 250;
  let maxMemory = 128;
  let envars = "";
  let serviceType = "private";
  let errors = "";
  let sending = false;

  if (id !== undefined) {
    fetch(`http://localhost:3000/kubernetes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const resource = data.data;
        name = resource.name;
        image = resource.image;
        internalPort = resource.internalport;
        externalPort = resource.externalport;
        replicas = resource.replicas;
        serviceType = resource.serviceType;
        maxCpu = resource.maxcpu;
        maxMemory = resource.maxmemory;
      });
  }

  const prepareBody = () => {
    return JSON.stringify({
      name,
      image,
      internalPort: parseInt(internalPort),
      externalPort: parseInt(externalPort),
      replicas,
      maxCpu,
      maxMemory,
      serviceType,
      envars,
    });
  };

  const update = () => {
    try {
      sending = true;
      fetch(`http://localhost:3000/kubernetes/${id}`, {
        method: "PUT",
        body: prepareBody(),
        headers: {
          "content-type": "application/json;charset=utf-8",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          sending = false;
          console.log(data);
          if (data.status === "ok") {
            window.location.href = "/services";
          } else {
            errors = data.error;
          }
        });
    } catch (err) {
      errors = err;
      sending = false;
    }
  };

  const create = () => {
    sending = true;

    fetch(`http://localhost:3000/kubernetes`, {
      method: "POST",
      body: prepareBody(),
      headers: {
        "content-type": "application/json;charset=utf-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        sending = false;
        if (data.status === "ok") {
          window.location.href = "/services";
        } else {
          errors = data.error;
        }
      })
      .catch((err) => {
        errors = err;
        sending = false;
      });
  };

  const closeAlert = () => {
    errors = "";
  };
</script>

{#if errors}
  <Alert msg={errors} kind="error" close={closeAlert} />
{/if}

<form
  action="/services/create"
  method="GET"
  class="flex flex-col w-full items-center gap-6 border rounded-xl p-8 mt-6 mb-16"
>
  <div class="flex gap-6 w-full">
    <label for="name" class="w-full">
      Name
      <input
        class="w-full px-3 py-2 border rounded"
        type="text"
        id="name"
        name="name"
        placeholder="my-app"
        bind:value={name}
      />
    </label>
    <label for="image" class="w-full">
      Image
      <input
        class="w-full px-3 py-2 border rounded"
        type="text"
        id="image"
        name="image"
        placeholder="user/image:tag"
        bind:value={image}
      />
    </label>
    <label for="type" class="w-full">
      Visibility
      <select
        id="type"
        name="type"
        class="w-full px-3 py-2 border rounded"
        bind:value={serviceType}
      >
        <option
          value="private"
          selected={serviceType === "private" ? "true" : "false"}
          >Private</option
        >
        <option
          value="public"
          selected={serviceType === "public" ? "true" : "false"}>Public</option
        >
      </select>
    </label>
  </div>

  <div class="flex gap-6 w-full">
    <div class="flex gap-3 w-full">
      <label for="internalport" class="w-full">
        Internal port
        <input
          class="w-full px-3 py-2 border rounded text-center"
          type="text"
          id="internalport"
          name="internalport"
          placeholder="80"
          bind:value={internalPort}
        />
      </label>
      <label for="externalport" class="w-full">
        External port
        <input
          class="w-full px-3 py-2 border rounded text-center"
          type="text"
          id="externalport"
          name="externalport"
          placeholder="8080"
          bind:value={externalPort}
        />
      </label>
    </div>
  </div>

  <div class="flex gap-6 w-full">
    <label for="envars" class="w-full h-[17rem]">
      Environment Variables
      <textarea
        class="w-full h-full border p-4 rounded leading-relaxed"
        name="envars"
        id="envars"
        bind:value={envars}
        placeholder="POSTGRESS_USER=johndoe\nPOSTGRESS_DB=testdb\nPOSTGRESS_PASSWORD=secret"
      ></textarea>
    </label>

    <label class="w-full">
      Specs
      <div class="flex flex-col gap-3 w-full border rounded p-6">
        <label for="replicas" class="w-full">
          Replicas
          <input
            class="w-full px-3 py-2 border rounded text-center"
            min="1"
            max="50"
            type="number"
            id="replicas"
            name="replicas"
            bind:value={replicas}
          />
        </label>
        <label for="cpu" class="w-full">
          CPU (1000 = 1 core)
          <input
            class="w-full px-3 py-2 border rounded text-center"
            min="250"
            type="number"
            id="cpu"
            name="cpu"
            bind:value={maxCpu}
          />
        </label>
        <label for="memory" class="w-full">
          Memory (MiB)
          <input
            class="w-full px-3 py-2 border rounded text-center"
            min="128"
            type="number"
            id="memory"
            name="memory"
            bind:value={maxMemory}
          />
        </label>
      </div>
    </label>
  </div>

  <div class="flex gap-6 items-center mt-2">
    <a href="/services" class="text-red-700 hover:text-red-900">Cancel</a>
    {#if editMode}
      <button
        class="bg-blue-700 text-white rounded px-6 py-2 flex justify-center items-center gap-2"
        type="button"
        on:click={update}
      >
        Update
        {#if sending}
          <Spinner />
        {/if}
      </button>
    {:else}
      <button
        class="bg-blue-700 text-white rounded px-6 py-2 flex justify-center items-center gap-2"
        type="button"
        on:click={create}
      >
        Create
        {#if sending}
          <Spinner />
        {/if}
      </button>
    {/if}
  </div>
</form>
