import { Request, Response } from "express";
import { Task } from '../Entities/Task';




export const addTaskController = async (req: any, res: Response) => {
    try {
        const { task_name, assigned_to } = req.body;

        const assigned_by = req.user.id;

        const taskExist =await Task.findOne({where:{task_name: task_name}  });

        if (!taskExist) {
          return res.status(401).send("Task Already Exist")
        }



        const task = new Task();
        task.task_name = task_name;
        task.user = assigned_by;
        task.userAssignedBY = assigned_to;


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
        task.userAssignedBY = assigned_to;
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
        const taskId = req.params.Taskid;
        // const task = await Task.findOne({ where: { id: taskId } })
        // if (!task) {
        //     return res.status(404).send("Task Not Found")
        // }
        const delTask = await Task.delete({id:taskId});

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