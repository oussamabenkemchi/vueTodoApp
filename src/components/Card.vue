<template>
            <div class="w-3xl  m-auto border border-blue-200 overflow-hidden rounded-md mb-5"> 
                <div class="p-4 text-gray-700 font-bold bg-gray-200  ">
                            <slot name="header"></slot>
                </div>
                <div v-if="type!=='form'" class="bg-white p-4"   >
                           <slot name="body">

                           </slot>
                </div>

                       <div v-if="showForm"  class="bg-white p-4">
                           <slot name="form">

                           </slot>
                </div>
 

            </div>
</template>

<script>
export default {
    props:["showForm","type"],
     
}
</script>

<style>
        .hide{
          
           background-color: red
        };

</style>