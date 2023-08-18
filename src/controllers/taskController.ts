import { Request, Response } from "express";
import { Task } from '../Entities/Task';




export const addTaskController = async (req: any, res: Response) => {
    try {
        const { task_name, assigned_to } = req.body;

        const assigned_by = req.user?.id;

        const taskExist =await Task.find({where:{task_name: task_name}  });

        if (!taskExist) {
          return res.status(401).send("Task Already Exist")
        }



        const task = new Task();
        task.task_name = task_name;
        task.userAssignedBy = assigned_by;
        task.userAssignedTo = assigned_to;


        await task.save();



    
        res.status(201).send({
            success: true,
            message: "Task Added Successfully",
            task,
        });
    } catch (error) {
    
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error adding task",
            error,
        });
    }
};



export const editTaskController =async (req:any, res: Response) => {
    try {
        const taskId = req.params.Taskid;
        const { task_name, assigned_to } = req.body;

        const task = await Task.findOne({where: {id: taskId}});

        if (!task) {
            return res.status(404).send({
                success: false,
                message: "Task not found.",
              }); 
        }

        task.task_name = task_name;
        task.userAssignedTo = assigned_to;
        const updatedTask = await task.save();

        res.status(200).send({
            success: true,
            message: "Task updated successfully",
            task: updatedTask,
          });
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Updating Task Error",
            error,
        })
        
    }
}


export const delTask =async (req:any, res: Response) => {
    try {
        const taskId = req.params.id;
        console.log(taskId)
      
        const delTask = await Task.delete({id:taskId});

        console.log(delTask.affected===0);
        if (!delTask) {
            return res.status(404).send("Task Not Found")
        }
        
        return res.json({
            success: true,
            message: "Task deleted successfully",
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Deleting Task Error",
            error,
        })
        
    }
}


export const getSingleTaskController =async (req:any, res:Response) => {
    try {
        const taskId = req.params.id;

        const task = await Task.findOne({where: {id:taskId}})
        if (!taskId) {
            return res.status(404).send("Not Found Task");

        }

        return res.status(200).send({
            success: true,
            message: "Successfully Retrive Task",
            task,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Retrieving Task Error",
            error,
        })
    }
}

export const getAllTask = async (req:any, res: Response) => {
    try {
      
        const task = await Task.find()
        

        return res.status(200).send({
            success: true,
            message: "Successfully Retrieve All Task",
            task,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Failed to retrieve all task",
            error,
        })
    }
}

// export const getTasksAssignedByUser = async (req: Request, res: Response) => {
//     try {
//       const assignedByUserId = req.user?.id; 
  
//       if (!assignedByUserId) {
//         return res.status(401).send("Unauthorized");
//       }
  
//       const tasks = await Task.find({ user: assignedByUserId });
  
//       return res.status(200).send({
//         success: true,
//         message: "Tasks assigned by user retrieved successfully",
//         tasks,
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({
//         success: false,
//         message: "Error while fetching tasks assigned by user",
//         error,
//       });
//     }
//   };

//api for my task

//api for getting task that i assigned

//add search, pagination and sort in above api

// export const paginationController =async (req:any, res:Response) => {
//     try {
//         const limitValue = req.query.limit || 2;
//         const currentPage = req.query.page || 1;

//         const skipValue = (currentPage - 1) * limitValue;
//         const tasks = await Task.find().limit(limitValue).skip(skipValue);


//     } catch (error) {
//         console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error while fetching tasks",
//       error,
//     });
//     }
// }