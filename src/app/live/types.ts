// todo: use enums
export const STATUS_OPTIONS = ['present', 'absent', 'late'] as const;

export type AttendanceStatus = (typeof STATUS_OPTIONS)[number];

export interface Attendee {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  groupCode: string;
  status: AttendanceStatus;
  checkInTime?: string; // ISO string for when they checked in
}

export interface SessionStats {
  total: number;
  present: number;
  absent: number;
  late: number;
  attendanceRate: number; // percentage
}

export interface Session {
  id: string;
  name: string;
  courseCode: string;
  date: string; // ISO string
  startTime: string;
  endTime: string;
  location: string;
  attendees: Attendee[];
  stats: SessionStats;
}
