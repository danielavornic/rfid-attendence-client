// todo: use enums
export const STATUS_OPTIONS = ['present', 'absent', 'late'] as const;

export type AttendanceStatus = (typeof STATUS_OPTIONS)[number];

export interface Attendee {
  attendance_id: number;
  student: {
    student_id: number;
    name: string;
    group: {
      group_id: number;
      code: string;
    };
  };
  status: AttendanceStatus;
  time?: string; // ISO string for when they checked in
}

export interface SessionStats {
  total: number;
  present: number;
  absent: number;
  late: number;
}

export interface Session {
  session_id: string;
  course: {
    name: string;
    course_id: string;
  };
  date: string;
  start_time: string;
  end_time: string;
  room: string;
  status: string;
  attendances: Attendee[];
  attendance_stats: SessionStats;
}
