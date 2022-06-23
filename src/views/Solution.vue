<template>
        <div class="h-10  w-full mb-5 flex flex-row justify-end items-center ">
              <div v-if="tasksList.length>1 && !listView" @click="deleteAllTasksRequest">
                 
                      <span class="  text-xs font-light border border-red-400 bg-red-100 rounded-md p-2 hover:text-white hover:bg-red-500 transition-all duration-300 ease-out cursor-pointer">Delete All Taks</span>
             

              </div>
              <ViewGridIcon @click="toggleViewHandler" v-if="listView" class="rounded-md text-blue-400 w-8 h-8 hover:text-white hover:bg-blue-400 cursor-pointer transition-all duration-500 ease-out " />

                <ViewListIcon  @click="toggleViewHandler"  v-else   class="rounded-md text-blue-400 w-8 h-8 hover:text-white hover:bg-blue-400 cursor-pointer transition-all duration-500 ease-out ml-2" />

        </div>
      <Card :showForm="showForm" type="form" >
      <template v-slot:header>
          <div class="flex flex-row justify-between pr-2 ">
              <div>Add Task</div>
              <div @click="toggleFormHandler" class="hover:bg-blue-300 rounded-full w-6 h-6 flex justify-center cursor-pointer transition-all duration-300 ease-out">
                 
                 <MinusIcon v-if="showForm"  class="w-5" />
                  <PlusIcon v-else  class="w-5" />

              </div>
          </div>
      </template>
       <template v-if="showForm" v-slot:form>
           <div>
             <form @submit.prevent="addTaskRequest" >
               <div class="flex flex-row mb-5"> 
                 <div  class="flex flex-col w-full mr-5 ">
                   <label class="mb-2" >Item</label>
                    <input v-model="item" required class="p-2 rounded-md border-none ring-1 ring-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-200 " type="text" placeholder="Type a task to do" />
                  
                  </div>
                  <div class="flex flex-col w-full ">
                       <label class="mb-2" >Deadline</label>
                        <input v-model="deadline" required type="datetime-local" class="p-2 rounded-md border-none ring-1 ring-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-200 "  />
                  
                  </div> 
                </div>
           
               <div> 
                 <div class="flex flex-col">
                   <label class="mb-2">Dscription</label>
               <input v-model="description" required class="p-2 rounded-md border-none ring-1 ring-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-200 " type="text" placeholder="Type a task to do" />
                  
              </div>
                </div>
                
                 <div class="p-2 text-sm mt-3 rounded-md text-white bg-blue-500 max-w-min hover:bg-blue-600 hover:shadow-md cursor-pointer transition-all duration-300 ease-out  ">
                    <button type="submit">Submit</button>
                   </div>   
            </form>

           </div>

      </template>
  </Card>
  
    <Card v-if="listView" type="list">
      <template v-slot:header>
        <div class="flex flex-row justify-between pr-2 ">
              <div>My Tasks</div>
              <div v-if="tasksList.length>1" @click="deleteAllTasksRequest">
                 
                      <span class="  text-xs font-light border border-red-400 bg-red-100 rounded-md p-2 hover:text-white hover:bg-red-500 transition-all duration-300 ease-out cursor-pointer">Delete All Taks</span>
             

              </div>
          </div>
      </template>
       <template v-slot:body>
           <div v-if="tasksList.length">
              <div class="grid grid-cols-5 border-b border-blue-100 pb-2">
                <span class="font-bold ">Item</span >
                <span  class="font-bold ">Status</span>
                 <span class="font-bold "> Deadline</span>
                 <span class="font-bold ">Description</span>
                 <span class="font-bold ">Actions</span>
            </div>
            <div  >
                <div v-for="task in tasksList" :key="task._id">
                      <TaskItem :task="task" :updateTaskHandler="updateTaskRequest" :deleteTaskHandler="deleteTaskRequest" />

                </div>
            
            </div>
           </div>
           <div v-else class="text-center ">
                  <p class="text-gray-500">Your Tasks List is Empty </p>
           </div>
      </template>
 
 
    </Card>


 <div v-else class="w-3xl  m-auto mt-5 ">
      <div v-if="tasksList.length" class="grid grid-cols-4" >
        <div v-for="task in tasksList" :key="task._id" >
          <TaskItemGrid :task="task" :updateTaskHandler="updateTaskRequest" :deleteTaskHandler="deleteTaskRequest" />
        </div>
      </div>
     <div v-else class="text-center mt-5">
                 <p class="text-gray-500">Your Tasks List is Empty </p>
       </div>
        
 </div>
   
</template>

<script>
import Card from "../components/Card.vue"
import TaskItem from "../components/TaskItem.vue"
import TaskItemGrid from "../components/TaskItemGrid.vue"

import {PlusIcon,MinusIcon,TrashIcon,ViewGridIcon,ViewListIcon} from "@heroicons/vue/solid"
import { onMounted, ref } from "vue"
import getTasks from "../compasables/getTasks"
import addTask from "../compasables/addTask"
import updateTask from "../compasables/updateTask"
import deleteTask from '../compasables/deleteTask'
import deleteTasks from "../compasables/deleteTasks"

export default {
        components:{Card,TaskItem,PlusIcon,MinusIcon,TrashIcon,ViewListIcon,ViewGridIcon,TaskItemGrid},
        setup(){
            const tasksList = ref([])
            const showForm = ref(false)
            const item =ref("")
            const deadline = ref("")
            const description = ref("")
            const listView = ref(true)
           
           //GET_REQUEST: FETCH ALL TASKS
           onMounted(async()=>{
               const {tasks,error,load} =  getTasks()
               await load()
               if(!error.value){
                    tasksList.value = tasks.value

               }
            })  
                    

            //TOGGLE FORM
            const toggleFormHandler = () => {
                showForm.value=!showForm.value
            }

            const toggleViewHandler = () =>{
                  listView.value = !listView.value
            }  

            const clearFields = () =>{
                     item.value=""
                     deadline.value=""
                     description.value=""   
                     showForm.value=false
            }


            //POST REQUEST: CREATE A NEW TASK AND ADD IT TO THE LIST OF TASKS
            const addTaskRequest =  async() =>{
              let newTask = {item:item.value,status:false,deadline:deadline.value,description:description.value}
              const {task,error,load} =  addTask(newTask)  
              await load()
              if(!error.value){
                
                tasksList.value.push(task.value)
                clearFields()
              }
            
            }  

            //PATCH REQUEST: TO CHANGE A TASK STATUS => DONE TO NOT DONE AND REVERSE
            const updateTaskRequest= async(task) =>{
              const {success,load} = updateTask(task)
              await load() 
              if(success.value){
                let taskIndex = tasksList.value.findIndex(item =>item._id===task._id)   
                tasksList.value[taskIndex].status = !task.status
                  
                }
            }

            //DELETE REQUEST
            const deleteTaskRequest = async(id) =>{
                  const {success,load} = deleteTask(id)
                  await load() 
                  if(success.value){
                       tasksList.value = tasksList.value.filter(task =>task._id !== id)
                  }
                  
            }

            const deleteAllTasksRequest = async () =>{
              console.log("delete all tasks");
                  const {success,load} = deleteTasks()
                  await load() 
                    if(success.value){
                       tasksList.value = []
                  }
            }

            return {showForm,toggleFormHandler,item,deadline,description,addTaskRequest,tasksList,updateTaskRequest,deleteTaskRequest,deleteAllTasksRequest,toggleViewHandler,listView}
        }
}
</script>

<style>

</style>