import { User } from '../models/User';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const userService = {
  async getUsers(): Promise<User[]> {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Error al obtener usuarios');
      }
      return await response.json();
    } catch (error) {
      throw new Error('Error en el servicio de usuarios');
    }
  },

  async getUserById(id: number): Promise<User> {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) {
        throw new Error('Error al obtener usuario');
      }
      return await response.json();
    } catch (error) {
      throw new Error('Error en el servicio de usuario');
    }
  }
}; 