import { NextFunction, Request, Response } from "express";
import { Task } from '../Entities/Task';
import { User } from "../Entities/User";
import successMiddleware from './../helper/successResponse';
import ErrorHandler from "../utils/ErrorHandler";




export const addTaskController = async (req: any, res: Response, next: NextFunction) => {
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
        successMiddleware({
            message: "Task Added Successfully",
            data: task,
          }, req, res, next);
    } catch (error) {
    
        console.log(error);
        return next(new ErrorHandler("Error adding task", 500));
    }
};



export const editTaskController =async (req:any, res: Response, next: NextFunction) => {
    try {
        const taskId = req.params.Taskid;
        const { task_name, assigned_to } = req.body;

        const task = await Task.findOne({where: {id: taskId}});

        if (!task) {
            return next(new ErrorHandler("not Found Task", 404));
        }

        task.task_name = task_name;
        task.userAssignedTo = assigned_to;
        const updatedTask = await task.save();

        successMiddleware({
            message: "Task Updated Successfully",
            data: updatedTask,
          }, req, res, next);
        
    } catch (error) {
        console.log(error)
        return next(new ErrorHandler(error.message, 500))
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


export const getSingleTaskController =async (req:any, res:Response, next: NextFunction) => {
    try {
        const taskId = req.params.id;

        const task = await Task.findOne({where: {id:taskId}})
        if (!taskId) {
            const err = ("Task Not Found")
            return res.status(404).send(err);

        }

        successMiddleware({
            message: "Succesfully Single Get Task",
            data: task,
          }, req, res, next);
        
    } catch (error) {
        console.log(error)
        return next(new ErrorHandler(error.message, 500))
    }
}

export const getAllTask = async (req: any, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 3;
    const skip = (page - 1) * limit;
    const search = req.query.search as string;

    const task = Task.createQueryBuilder('task')
      .select(['task.id', 'task.task_name', 'task.userAssignedBy', 'task.userAssignedTo'])
      .leftJoinAndSelect('task.userAssignedBy', 'userAssignedBy')
      .leftJoinAndSelect('task.userAssignedTo', 'userAssignedTo');

    if (search) {
      task.andWhere('task.task_name LIKE :search', { search: `%${search}%` });
    }

    task.orderBy('task.task_name', 'ASC'); 

    const [tasks, totalCount] = await task
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalCount / limit);

    successMiddleware(
      {
        message: 'Task Retrieve Successfully with pagination, search, and alphabetical sort',
        data: {
          tasks,
          page,
          totalCount,
          totalPages,
        },
      },
      req,
      res,
      next
    );
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 500));
  }
};


export const getAllAdminTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
        const Admintask = await Task.find({
            relations: ["userAssignedBy"], });
  
      const result = Admintask.map(task => {
        return {
          task_name: task.task_name,
          admin_name: task.userAssignedBy.name,
        };
      });
  
      successMiddleware({
        message: "Retrieve All Task and Admin",
        data: result,
      }, req, res, next);
    } catch (error) {
      console.error(error);
      return next(new ErrorHandler(error.message, 500))
    }
};
  


export const getTasksAssignedByLoggedInAdmin = async (req: any, res: Response, next:NextFunction) => {
    try {
        const adminId = req.user?.id; 
        
        // console.log(adminId)
  
        if (!adminId) {
          return next(new ErrorHandler("unauthorized Access", 401))
      }
  
      
      const tasksAssignedByAdmin = await Task.find({  relations: ["userAssignedBy"], where: {userAssignedBy:{id:adminId}}});

        
        // console.log(tasksAssignedByAdmin)
        successMiddleware({
          message: "Succesfully get Task Assigned by Admin",
          data: tasksAssignedByAdmin,
        }, req, res, next);
    } catch (error) {
      console.error(error); 
      return next(new ErrorHandler(error.message, 500))
    }
  };

//api for my task

//api for getting task that i assigned

//add search, pagination and sort in above api

//fileHandling (fs module of node js)
//insert photo of user
//if user update the photo, delete the previous photo from uploaded folder
//add task file to task repo
//accept pdf,docx,excel,images
//same, if deleted remove the file
//arrange the files destination directory as per its user id
// meaning: folder structure be like {user_id}/user_photo or {user_id}/task_file
//do this all without using multer path
//while getting the file and removing the file, use fs module

//readFile vs readFileSync


//Need to create Separate API for Image Upload 