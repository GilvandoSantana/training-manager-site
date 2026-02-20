import { useState, useEffect } from 'react';
import { AlertCircle, Clock, X, CheckCircle } from 'lucide-react';
import type { Employee } from '@/lib/types';
import { getTrainingStatus } from '@/lib/training-utils';

interface Notification {
  id: string;
  type: 'expired' | 'expiring';
  employeeName: string;
  trainingName: string;
  daysUntilExpiry?: number;
  expirationDate: string;
}

interface TrainingNotificationsProps {
  employees: Employee[];
}

export default function TrainingNotifications({ employees }: TrainingNotificationsProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [dismissedNotifications, setDismissedNotifications] = useState<Set<string>>(new Set());

  // Load dismissed notifications from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem('dismissedNotifications');
    if (stored) {
      try {
        setDismissedNotifications(new Set(JSON.parse(stored)));
      } catch (e) {
        console.error('Failed to parse dismissed notifications:', e);
      }
    }
  }, []);

  // Generate notifications for expired and expiring trainings
  useEffect(() => {
    const newNotifications: Notification[] = [];

    employees.forEach((employee) => {
      if (!employee.trainings) return;

      employee.trainings.forEach((training) => {
        const trainingStatus = getTrainingStatus(training.expirationDate);
        const status = trainingStatus.status;
        const daysUntilExpiry = trainingStatus.diffDays;

        if (status === 'expired') {
          newNotifications.push({
            id: `${employee.id}-${training.name}-expired`,
            type: 'expired',
            employeeName: employee.name,
            trainingName: training.name,
            expirationDate: training.expirationDate,
          });
        } else if (status === 'expiring') {
          newNotifications.push({
            id: `${employee.id}-${training.name}-expiring`,
            type: 'expiring',
            employeeName: employee.name,
            trainingName: training.name,
            daysUntilExpiry: Math.abs(daysUntilExpiry),
            expirationDate: training.expirationDate,
          });
        }
      });
    });

    setNotifications(newNotifications);
  }, [employees]);

  const dismissNotification = (id: string) => {
    const newDismissed = new Set(dismissedNotifications);
    newDismissed.add(id);
    setDismissedNotifications(newDismissed);
    // Save to sessionStorage so it persists during the session
    sessionStorage.setItem('dismissedNotifications', JSON.stringify(Array.from(newDismissed)));
  };

  if (notifications.length === 0) return null;

  // Filter out dismissed notifications
  const visibleNotifications = notifications.filter((n) => !dismissedNotifications.has(n.id));

  if (visibleNotifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md space-y-3 max-h-96 overflow-y-auto">
      {visibleNotifications.map((notification) => {
        const isExpired = notification.type === 'expired';
        const bgColor = isExpired
          ? 'bg-red-50 border-red-200'
          : 'bg-yellow-50 border-yellow-200';
        const iconColor = isExpired ? 'text-red-600' : 'text-yellow-600';
        const titleColor = isExpired ? 'text-red-900' : 'text-yellow-900';
        const textColor = isExpired ? 'text-red-700' : 'text-yellow-700';

        return (
          <div
            key={notification.id}
            className={`border rounded-lg p-4 shadow-lg ${bgColor} animate-in fade-in slide-in-from-right-4`}
          >
            <div className="flex items-start gap-3">
              {isExpired ? (
                <AlertCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${iconColor}`} />
              ) : (
                <Clock className={`w-5 h-5 mt-0.5 flex-shrink-0 ${iconColor}`} />
              )}

              <div className="flex-1 min-w-0">
                <h3 className={`font-semibold text-sm ${titleColor}`}>
                  {isExpired ? 'Treinamento Vencido' : 'Treinamento a Vencer'}
                </h3>
                <p className={`text-sm mt-1 ${textColor}`}>
                  <strong>{notification.employeeName}</strong> - {notification.trainingName}
                </p>
                <p className={`text-xs mt-1 ${textColor} opacity-75`}>
                  {isExpired ? (
                    <>Vencido em {new Date(notification.expirationDate).toLocaleDateString('pt-BR')}</>
                  ) : (
                    <>Vence em {notification.daysUntilExpiry} dia{notification.daysUntilExpiry !== 1 ? 's' : ''}</>
                  )}
                </p>
                <button
                  onClick={() => dismissNotification(notification.id)}
                  className={`mt-2 text-xs font-medium px-2 py-1 rounded flex items-center gap-1 transition-colors ${
                    isExpired
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                  }`}
                  aria-label="Marcar como lida"
                >
                  <CheckCircle className="w-3 h-3" />
                  Marcar como Lida
                </button>
              </div>

              <button
                onClick={() => dismissNotification(notification.id)}
                className={`flex-shrink-0 p-1 hover:bg-white/50 rounded transition-colors`}
                aria-label="Fechar notificação"
              >
                <X className={`w-3 h-3 ${iconColor}`} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
