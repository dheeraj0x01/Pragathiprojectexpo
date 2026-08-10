import { Role, User } from "@/types";

// Simulated default active user session (Can be switched dynamically by role switcher component)
export const DEFAULT_CURRENT_USER: User = {
  id: "usr_superadmin_01",
  name: "Dr. K. Srinivas",
  email: "convener.pragathi@sru.edu.in",
  phone: "+91 9876543210",
  role: "SUPER_ADMIN",
  college: "SR University",
  department: "School of Computer Science & Artificial Intelligence",
  rollNo: "FAC-SRU-1002",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const MOCK_USERS: User[] = [
  DEFAULT_CURRENT_USER,
  {
    id: "usr_admin_02",
    name: "Prof. Rajesh Varma",
    email: "rajesh.v@sru.edu.in",
    role: "ADMIN",
    college: "SR University",
    department: "Electronics & Communication Engineering",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "usr_coord_03",
    name: "Ananya Rao",
    email: "ananya.coord@sru.edu.in",
    role: "COORDINATOR",
    college: "SR University",
    department: "CSE - AI & ML",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "usr_judge_04",
    name: "Dr. Vikram Sethi",
    email: "vikram.judge@techpartner.io",
    role: "JUDGE",
    college: "Tech Partner Industry",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "usr_vol_05",
    name: "Rahul Sharma",
    email: "rahul.vol@sru.edu.in",
    role: "VOLUNTEER",
    college: "SR University",
    rollNo: "21SRU01CS105",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "usr_part_06",
    name: "Priya Patel",
    email: "priya.part@gmail.com",
    role: "PARTICIPANT",
    college: "SR University",
    rollNo: "22SRU01EC044",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function hasPermission(userRole: Role, requiredRole: Role): boolean {
  const roleHierarchy: Record<Role, number> = {
    SUPER_ADMIN: 100,
    ADMIN: 80,
    COORDINATOR: 60,
    JUDGE: 40,
    VOLUNTEER: 30,
    PARTICIPANT: 10,
  };

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}

export function getRoleBadgeColor(role: Role): string {
  switch (role) {
    case 'SUPER_ADMIN':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-purple-300';
    case 'ADMIN':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-300';
    case 'COORDINATOR':
      return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-300';
    case 'JUDGE':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-300';
    case 'VOLUNTEER':
      return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 border-indigo-300';
    case 'PARTICIPANT':
    default:
      return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-300';
  }
}
