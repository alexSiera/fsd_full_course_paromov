import { nanoid } from "nanoid";
import { expect, test } from "vitest";

// ============================
// api module
// =============================
type UserDto = { id: string; title: string };

class HttpService {
    async get(url: `/user/${string}`): Promise<UserDto>;
    async get(): Promise<unknown> {
        return {
            id: nanoid(),
            title: "evgen",
        } as UserDto;
    };
}

// ============================
// user module
// =============================
type User = { id: string; name: string };

// Мы делаем фасад с постоянным интерфейсом
class UserApi {
    private http = new HttpService();

    getUser(userId: string): Promise<User> {
        return this.http
            .get(`/user/${userId}`)
            .then((r) => ({ ...r, name: r.title }));
    }
}

class UserStore {
    private api = new UserApi();

    public isLoading = false;
    public user: User | undefined;

    async fetchUser(userId: string) {
        this.isLoading = true;
        const user = await this.api.getUser(userId);
        this.isLoading = false;
        this.user = user;
    }
}

test('Should work', async () => {
    const userStore = new UserStore();
    expect(userStore.isLoading).toBe(false);
    const res = userStore.fetchUser('user-1');
    expect(userStore.isLoading).toBe(true);
    await res;
    expect(userStore.user).toEqual({
        id: expect.any(String),
        name: expect.any(String),
    });
})