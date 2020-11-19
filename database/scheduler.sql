USE scheduler;

SELECT * FROM tasks WHERE schedule_id = 3;

UPDATE tasks SET tasks.order = tasks.order + 1 WHERE schedule_id = 3 AND tasks.order >= 1 AND tasks.order < 3;
UPDATE tasks SET tasks.order = 1 WHERE tasks.id = 10;