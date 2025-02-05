import { Prisma, User } from '@prisma/client';
import { UserRepository } from '@/repositories/UserRepository';
import "server-only";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  // Busca todos os usuários
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  // Cria um novo usuário
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    // Verifica se já existe um usuário com o mesmo email
    const existingUser = await this.userRepository.findUserByEmail(data.email);
    if (existingUser) {
      throw new Error('Já existe um usuário com este email');
    }

    return this.userRepository.createUser(data);
  }

  // Busca um usuário pelo email
  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findUserByEmail(email);
  }

  // Atualiza um usuário
  async updateUser(id: string, data: { name?: string; emailVerified?: boolean; image?: string }): Promise<User> {
    // Verifica se o usuário existe
    const user = await this.userRepository.findUserByEmail(id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return this.userRepository.updateUser(id, data);
  }

  // Remove um usuário
  async deleteUser(id: string): Promise<User> {
    // Verifica se o usuário existe
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return this.userRepository.deleteUser(id);
  }
}
