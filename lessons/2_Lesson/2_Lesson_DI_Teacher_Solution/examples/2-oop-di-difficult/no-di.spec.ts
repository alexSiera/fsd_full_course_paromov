import { expect, test } from "vitest";

// ============================
// prmission module

import { nanoid } from "nanoid";

// =============================
class UnAuthorizedError extends Error {
  constructor() {
    super("UnAuthorizedError");
  }
}

class PermissionService {
  private dbService: DbService;
  constructor(private userId: string) {
    this.dbService = new DbService();
  }

  async can(action: string, subject: string) {
    const persmissions = await this.dbService.getPermissions(this.userId);
    return !!persmissions.find(
      (p) => p.action === action && p.subject === subject
    );
  }
}

// ============================
// db module
// =============================
class DbService {
  private tasks = [] as Array<{ id: string; title: string }>;
  async getTask(id: string) {
    return this.tasks.find((t) => t.id === id);
  }

  async createTask(title: string) {
    const task = { title, id: nanoid() };
    this.tasks.push(task);
    return task;
  }

  async delete(id: string) {
    this.tasks.splice(this.tasks.findIndex((v) => v.id === id));
  }

  async getPermissions(userId: string) {
    if (userId === "user-1") {
      return [
        { action: "view", subject: "task" },
        { action: "create", subject: "task" },
        { action: "delete", subject: "task" },
      ];
    }

    return [];
  }
}

// ============================
// tasks module
// ============================
class TaskService {
  private dbService: DbService;
  private permissionsService: PermissionService;

  constructor(private userId: string) {
    this.dbService = new DbService();
    this.permissionsService = new PermissionService(this.userId);
  }

  async get(id: string) {
    if (await this.permissionsService.can("view", "task")) {
      return this.dbService.getTask(id);
    }

    throw new UnAuthorizedError();
  }

  async create(task: string) {
    if (await this.permissionsService.can("create", "task")) {
      return this.dbService.createTask(task);
    }

    throw new UnAuthorizedError();
  }

  async delete(id: string) {
    if (await this.permissionsService.can("create", "task")) {
      return this.dbService.delete(id);
    }

    throw new UnAuthorizedError();
  }
}

test("should work if user has rights", async () => {
  const taskService = new TaskService("user-1");

  const newTask = await taskService.create("task");

  const foundTask = await taskService.get(newTask.id);

  expect(foundTask).toEqual({ id: expect.any(String), title: "task" });

  await taskService.delete(newTask.id);

  const foundTask2 = await taskService.get(newTask.id);
  expect(foundTask2).toBeUndefined();
});

test("should throw UnAuthorizedError", async () => {
  const taskService = new TaskService("user-2");

  expect(taskService.create("task")).rejects.toThrowError();
});
