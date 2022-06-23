<template>
  <div class="w-72   bg-white border border-gray-100  flex flex-col rounded-2xl shadow-lg mt-5"  :class="{done:task.status}"> 
                <div class="border w-min border-green-400 rounded-full p-1 m-3 mb-1 ">
                    <TagIcon class=" text-green-400 w-6 h-6" />
                </div>
                <div class="pl-5 pr-5"><span class="text-green-600 text-sm font-light" >{{task.deadline}}</span></div>
              <div class="pl-5 pr-5 mt-2"> <span class="font-bold text-xl mt-1  text-gray-600" :class="{lineThrough:task.status,noLine:!task.status}" >{{task.item}}</span ></div>
              <div class="pl-5 pr-5">         <span class="text-gray-400 " > {{task.description}} </span></div>
<!--                 <span  >{{!task.status?"Not Done":"Done"}}</span>
 -->              
                 
                 <div :class="{borderTop:task.status}" class="flex pl-3 pr-3 flex-row justify-end mt-5 p-1 border-t border-gray-200">
                   <XIcon v-if="task.status" @click="updateTaskHandler(task)" class=" rounded-md text-red-500  w-8 h-8 hover:text-white hover:bg-red-500 cursor-pointer transition-all duration-500 ease-out " />
                   <CheckIcon v-else @click="updateTaskHandler(task)" class=" rounded-md text-green-400 w-8 h-8 hover:text-white hover:bg-green-400 cursor-pointer transition-all duration-500 ease-out " />
                   <TrashIcon  @click="deleteTaskHandler(task._id)" class="  rounded-md text-red-400 w-8 h-8 ml-1  hover:text-white hover:bg-red-400 cursor-pointer transition-all duration-500 ease-out "  />
                 </div>
            </div>
</template>

<script>
    import { CheckIcon,TrashIcon,XIcon, TagIcon } from '@heroicons/vue/solid'

export default {
      props:["task","updateTaskHandler","deleteTaskHandler"],
      components:{TrashIcon,CheckIcon,XIcon,TagIcon},
     
      
  }
</script>

<style>
    .lineThrough{
      text-decoration: line-through;
      
    }
    .noLine {
      text-decoration: none;
    }
    .done{
        background-color: #f1f5f9;
        border: 1px solid #e2e8f0;
    }
    .borderTop{
        border-top: 1px solid #e2e8f0;
    }
</style>