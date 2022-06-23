<template>
  <div class="grid grid-cols-5 pt-3 pb-3">
                <span :class="{lineThrough:task.status,noLine:!task.status}" >{{task.item}}</span >
                <span  >{{!task.status?"Not Done":"Done"}}</span>
                 <span > {{task.deadline}}</span>
                 <span >{{task.description}}</span>
                 <div class="flex flex-row">
                   <XIcon v-if="task.status" @click="updateTaskHandler(task)" class=" rounded-md text-red-500  w-8 h-8 hover:text-white hover:bg-red-500 cursor-pointer transition-all duration-500 ease-out " />
                   <CheckIcon v-else @click="updateTaskHandler(task)" class=" rounded-md text-green-400 w-8 h-8 hover:text-white hover:bg-green-400 cursor-pointer transition-all duration-500 ease-out " />
                   <TrashIcon  @click="deleteTaskHandler(task._id)" class="  rounded-md text-red-400 w-8 h-8 ml-4  hover:text-white hover:bg-red-400 cursor-pointer transition-all duration-500 ease-out "  />
                 </div>
            </div>
</template>

<script>
    import { CheckIcon } from '@heroicons/vue/solid'
    import { TrashIcon } from '@heroicons/vue/solid'
    import { XIcon } from '@heroicons/vue/solid'
export default {
      props:["task","updateTaskHandler","deleteTaskHandler"],
      components:{TrashIcon,CheckIcon,XIcon},
     
      
  }
</script>

<style>
    .lineThrough{
      text-decoration: line-through;
      
    }
    .noLine {
      text-decoration: none;
    }
</style>