// src/lib/repositories/userRepository.ts
import { db } from '@/lib/db';
import { Prisma, PrismaClient, User } from '@prisma/client';
import "server-only";

export class UserRepository {
  private database: PrismaClient;

  constructor() {
    this.database = db;
  }

  // Busca todos os usuários
  async findAll(): Promise<User[]> {
    return this.database.user.findMany();
  }

  // Cria um novo usuário
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.database.user.create({ data });
  }

  // Busca um usuário pelo ID
  async findUserById(id: string): Promise<User | null> {
    return this.database.user.findUnique({
      where: { id },
    });
  }

  // Busca um usuário pelo email
  async findUserByEmail(email: string): Promise<User | null> {
    return this.database.user.findUnique({
      where: { email },
    });
  }

  // Atualiza um usuário
  async updateUser(id: string, data: { name?: string; emailVerified?: boolean; image?: string }): Promise<User> {
    return this.database.user.update({
      where: { id },
      data,
    });
  }

  // Deleta um usuário
  async deleteUser(id: string): Promise<User> {
    return this.database.user.delete({
      where: { id },
    });
  }
}