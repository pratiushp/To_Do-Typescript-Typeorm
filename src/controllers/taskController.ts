import { Request, Response } from 'express';
import { Task } from '../Entities/Task';
import { User } from '../Entities/User';

export const addTask = async (req: Request, res: Response) => {
  try {
    const { taskName, assignedById, assignedToId } = req.body;

    const userRepository = (User); 
    const assignedByUser = await userRepository.findOne({ where: { id: assignedById } });
    const assignedToUser = await userRepository.findOne({ where: { id: assignedToId } });

    if (!assignedByUser || !assignedToUser) {
      return res.status(404).json({ message: 'Assigned by or assigned to user not found.' });
    }

    const task = new Task();
    task.task_name = taskName;
    task.assigned_by = assignedByUser;
    task.assigned_to = assignedToUser;

    const taskRepository = (Task);
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

export const editTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id; 
    const { taskName, assignedById, assignedToId } = req.body;

    const taskRepository = (Task);
    const userRepository = (User);

    const task = await Task.findOne(taskName);
    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    const assignedByUser = await userRepository.findOne({ where: { id: assignedById } });
    const assignedToUser = await userRepository.findOne({ where: { id: assignedToId } });

    if (!assignedByUser || !assignedToUser) {
      return res.status(404).json({ message: 'Assigned by or assigned to user not found.' });
    }

    task.task_name = taskName;
    task.assigned_by = assignedByUser;
    task.assigned_to = assignedToUser;

    await taskRepository.save(task);

    return res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      task,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};