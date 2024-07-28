import { nanoid } from "nanoid";
import { expect, test } from "vitest";

// ============================
// api module
// =============================
type UserDto = { id: string; title: string };

// Изменчивый сервис
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
class UserStore {
    private http = new HttpService();
    public isLoading = false;
    public user: UserDto | undefined;
    async fetchUser(userId: string) {
        this.isLoading = true;
        this.user = await this.http.get(`/user/${userId}`);
        this.isLoading = false;
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