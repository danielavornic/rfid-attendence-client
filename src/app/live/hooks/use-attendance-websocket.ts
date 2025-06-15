import { useCallback, useEffect, useRef } from 'react';
import { toast } from 'sonner';

import { WS_ATTENDANCE_ENDPOINT, WS_MAX_RETRIES, WS_RECONNECT_INTERVAL } from '@/config/websocket';
import { useAppDispatch } from '@/lib/store';

import { liveSessionApi } from '../queries';

export const useAttendanceWebSocket = () => {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();

  const dispatch = useAppDispatch();

  const connect = useCallback(() => {
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
        try {
          const jsonMatch = event.data.match(/\{.*\}/);
          if (jsonMatch) {
            const jsonData = jsonMatch[0];
            const data = JSON.parse(jsonData);
            if (data.type === 'attendance') {
              toast.success('Attendance updated');
              dispatch(liveSessionApi.util.invalidateTags(['SESSION', 'LIVE_SESSION']));
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
  }, [dispatch]);

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
  }, [connect]);
};
