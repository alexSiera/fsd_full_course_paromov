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
        return !!persmissions.find(p => p.action === action && p.subject === subject);
    }
}

// ============================
// db module
// =============================
class DbService {
    private tasks = [] as Array<{id: string, title: string}>;
    async getTask(id: string) {
        return this.tasks.find(t => t.id === id);
    }

    async createTask(title: string) {
        const task = {title, id: nanoid()};
        this.tasks.push(task);
        return task;
    }
}