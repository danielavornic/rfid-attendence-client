import { Attendee, Session, SessionStats, STATUS_OPTIONS } from '../types';

const getRandomCheckInTime = (): string => {
  const now = new Date();
  const randomMinutes = Math.floor(Math.random() * 60);
  now.setMinutes(now.getMinutes() - randomMinutes);
  return now.toISOString();
};

const generateAttendees = (count: number): Attendee[] => {
  const groupCodes = ['FAF-221', 'FAF-222', 'TI-221', 'TI-222', 'SI-221', 'SI-222'];

  return Array.from({ length: count }, (_, i) => {
    const status = STATUS_OPTIONS[Math.floor(Math.random() * STATUS_OPTIONS.length)];

    return {
      id: `attendee-${i + 1}`,
      studentId: `ST${String(10000 + i).padStart(5, '0')}`,
      firstName: ['Alex', 'Maria', 'Ion', 'Ana', 'Andrei', 'Elena', 'Mihai', 'Cristina'][
        Math.floor(Math.random() * 8)
      ],
      lastName: [
        'Popescu',
        'Ionescu',
        'Dumitrescu',
        'Popa',
        'Radu',
        'Stanescu',
        'Munteanu',
        'Nistor',
      ][Math.floor(Math.random() * 8)],
      groupCode: groupCodes[Math.floor(Math.random() * groupCodes.length)],
      status,
      checkInTime: status === 'present' || status === 'late' ? getRandomCheckInTime() : undefined,
    };
  });
};

const mockAttendees = generateAttendees(50);

const calculateStats = (attendees: Attendee[]): SessionStats => {
  const total = attendees.length;
  const present = attendees.filter((a) => a.status === 'present').length;
  const absent = attendees.filter((a) => a.status === 'absent').length;
  const late = attendees.filter((a) => a.status === 'late').length;
  const attendanceRate = ((present + late) / total) * 100;

  return {
    total,
    present,
    absent,
    late,
    attendanceRate,
  };
};

export const mockCurrentSession: Session = {
  id: 'session-1',
  name: 'Embedded Systems',
  courseCode: 'ES-221',
  date: new Date().toISOString(),
  startTime: '9:45',
  endTime: '11:15',
  location: '3-101',
  attendees: mockAttendees,
  stats: calculateStats(mockAttendees),
};

export const fetchCurrentSession = (): Promise<Session> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockCurrentSession), 500);
  });
};
