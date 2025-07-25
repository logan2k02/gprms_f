import { staffBackend } from "@/backend";
import type { DiningArea } from "@/interfaces/dining-area";
import type { StaffUser } from "@/interfaces/staff-user";
import type { WaiterAssignment } from "@/interfaces/waiter-assignment";

export class DiningAreasService {
  static async create(name: string, description: string, imageFile: File) {
    const formData = new FormData();
    formData.append("data", JSON.stringify({ name, description }));
    formData.append("image", imageFile);

    const { data } = await staffBackend.post<DiningArea>(
      "/admin/dining-areas",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  }

  static async getAll() {
    const { data } = await staffBackend.get<DiningArea[]>(
      "/admin/dining-areas"
    );
    return data;
  }

  static async update(
    id: number,
    name: string,
    description: string,
    imageFile: File | null
  ) {
    const formData = new FormData();
    formData.append("data", JSON.stringify({ name, description }));

    if (imageFile) {
      formData.append("image", imageFile);
    }

    const { data } = await staffBackend.put<DiningArea>(
      `/admin/dining-areas/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  }

  static async delete(id: number) {
    await staffBackend.delete(`/admin/dining-areas/${id}`);
  }

  static async getAssignedWaiters(diningTableId: number) {
    const { data } = await staffBackend.get<StaffUser[]>(
      `/admin/dining-areas/assigned-waiters/${diningTableId}`
    );
    return data;
  }

  static async assignWaiter(diningAreaId: number, waiterId: number) {
    const { data } = await staffBackend.post<WaiterAssignment>(
      `/admin/dining-areas/assign-waiter`,
      {
        waiterId,
        diningAreaId,
      }
    );
    return data;
  }

  static async unAssignWaiter(diningAreaId: number, waiterId: number) {
    const { data } = await staffBackend.post<WaiterAssignment>(
      `/admin/dining-areas/unassign-waiter`,
      {
        waiterId,
        diningAreaId,
      }
    );
    return data;
  }
}
