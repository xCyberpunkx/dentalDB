export interface Specialty {
  id: number;
  name: string;
}

export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  specialty: Specialty;
  avatarUrl?: string; // Optional field for the avatar URL
} 