import { nanoid } from "nanoid";
// ============================
// api module
// ============================
type UserDto = { id: string; name: string };

class HttpService {
  async get(url: `/user/${string}`): Promise<UserDto>;
  async get(): Promise<unknown> {
    return {
      id: nanoid(),
      name: "evgen",
    } as UserDto;
  }
}

// ============================
// user module
// ============================
class UserStore {
  private http = new HttpService();

  public isLoading = false;
  public user: UserDto | undefined;

  async fetchUser(userId: string) {
    this.isLoading = true;
    const user = await this.http.get(`/user/${userId}`);
    this.isLoading = false;
    this.user = user;
  }
}

// test("Should work", async () => {
//   const userStore = new UserStore();

//   expect(userStore.isLoading).toBe(false);
//   const res = userStore.fetchUser("user-1");
//   expect(userStore.isLoading).toBe(true);
//   await res;

//   expect(userStore.user).toEqual({
//     id: expect.any(String),
//     name: expect.any(String),
//   });
// });
