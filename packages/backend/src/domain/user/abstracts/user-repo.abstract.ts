export abstract class IUserRepoService {
  abstract findUser(id: number): Promise<any>;
}
