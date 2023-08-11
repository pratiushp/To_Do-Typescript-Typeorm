import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Task } from '../Entities/Task';
import { User } from '../Entities/User';

export const addTask = async (req: Request, res: Response) => {
  try {
    const { taskName, assignedById, assignedToId } = req.body;

    const userRepository = getRepository(User);
    const assignedByUser = await userRepository.findOne({where:{id: assignedById}});
    const assignedToUser = await userRepository.findOne({ where: {id:assignedToId } });

    if (!assignedByUser || !assignedToUser) {
      return res.status(404).json({ message: 'Assigned by or assigned to user not found.' });
    }

    const task = new Task();
    task.task_name = taskName;
    task.assigned_by = assignedByUser;
    task.assigned_to = assignedToUser;

    const taskRepository = getRepository(Task);
    await taskRepository.save(task);

    return res.status(201).json({
      success: true,
      message: 'Task added successfully',
      task,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
