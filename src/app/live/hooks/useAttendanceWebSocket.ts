import { useCallback, useEffect, useRef } from 'react';
import { toast } from 'sonner';

import { WS_ATTENDANCE_ENDPOINT, WS_MAX_RETRIES, WS_RECONNECT_INTERVAL } from '@/config/websocket';
import { useAppDispatch } from '@/lib/store';

import { liveSessionApi } from '../queries';

interface AttendanceMessage {
  type: 'attendance';
  student: string;
  room: string;
  status: string;
  timestamp: string;
}

export const useAttendanceWebSocket = () => {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();

  const dispatch = useAppDispatch();

  const connect = () => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    try {
      const ws = new WebSocket(WS_ATTENDANCE_ENDPOINT);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('Connected to WebSocket');
        reconnectAttemptsRef.current = 0;
      };

      ws.onmessage = (event) => {
        console.log('Raw received message:', event.data);

        try {
          const jsonMatch = event.data.match(/\{.*\}/);
          if (jsonMatch) {
            const jsonData = jsonMatch[0];
            const data = JSON.parse(jsonData);
            console.log('Parsed message:', data);

            if (data.type === 'attendance') {
              toast.success('Attendance updated');
              dispatch(
                liveSessionApi.util.invalidateTags(['SESSION', 'LIVE_SESSION', 'SESSION_STATS'])
              );
            }
          } else {
            console.log('Text message received:', event.data);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      ws.onclose = () => {
        console.log('WebSocket connection closed');

        if (reconnectAttemptsRef.current < WS_MAX_RETRIES) {
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectAttemptsRef.current += 1;
            console.log(
              `Attempting to reconnect (${reconnectAttemptsRef.current}/${WS_MAX_RETRIES})`
            );
            connect();
          }, WS_RECONNECT_INTERVAL);
        } else {
          console.log('Max reconnection attempts reached');
        }
      };
    } catch (error) {
      console.error('Error creating WebSocket connection:', error);
    }
  };

  const sendTestMessage = useCallback(() => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.error('WebSocket is not connected');
      return;
    }

    const testMessage: AttendanceMessage = {
      type: 'attendance',
      student: 'Test Student',
      room: '2000',
      status: 'present',
      timestamp: new Date().toISOString(),
    };
    wsRef.current.send(JSON.stringify(testMessage));
    console.log('Test message sent:', testMessage);
  }, []);

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }

      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, []);

  return { sendTestMessage };
};
