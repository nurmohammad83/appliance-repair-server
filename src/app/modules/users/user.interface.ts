export type IUser = {
  id: string;
  email: string;
  password: string;
  fullName: string;
  role: Role;
  profileImage?: string | null;
  contactNo: string;
  gender?: string | null;
  dob?: string | null;
  isPasswordReset?: boolean;
  profiles?: null;
  reviewAndRatings?: null;
  bookings?: null;
};

type Role = 'customer' | 'admin' | 'superadmin';
