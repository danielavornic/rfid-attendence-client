export const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_BASE_URL || 'ws://localhost:8000';
export const WS_ATTENDANCE_ENDPOINT = `${WS_BASE_URL}/api/attendances/ws`;

export const WS_RECONNECT_INTERVAL = 5000;
export const WS_MAX_RETRIES = 5;
