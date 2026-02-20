import { AlertCircle, Clock } from 'lucide-react';
import type { Employee } from '@/lib/types';
import { getTrainingStatus } from '@/lib/training-utils';

interface ExpiringNotificationsProps {
  employees: Employee[];
}

export default function ExpiringNotifications({ employees }: ExpiringNotificationsProps) {
  // Find trainings expiring in the next 7 days
  const expiringTrainings: Array<{
    employeeName: string;
    trainingName: string;
    daysLeft: number;
    expirationDate: string;
  }> = [];

  employees.forEach(emp => {
    if (emp.trainings) {
      emp.trainings.forEach(training => {
        const status = getTrainingStatus(training.expirationDate);
        if (status.status === 'expiring' && status.diffDays > 0 && status.diffDays <= 7) {
          expiringTrainings.push({
            employeeName: emp.name,
            trainingName: training.name,
            daysLeft: status.diffDays,
            expirationDate: training.expirationDate,
          });
        }
      });
    }
  });

  if (expiringTrainings.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
      <div className="flex items-start gap-3">
        <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
        <div className="flex-1">
          <h3 className="font-bold text-yellow-900 mb-2 flex items-center gap-2">
            <Clock size={16} />
            {expiringTrainings.length} Treinamento{expiringTrainings.length !== 1 ? 's' : ''} Próximo{expiringTrainings.length !== 1 ? 's' : ''} de Vencer
          </h3>
          <div className="space-y-1 text-sm text-yellow-800">
            {expiringTrainings.slice(0, 5).map((item, idx) => (
              <div key={idx} className="flex justify-between">
                <span>
                  <strong>{item.employeeName}</strong> - {item.trainingName}
                </span>
                <span className="font-semibold">
                  {item.daysLeft} dia{item.daysLeft !== 1 ? 's' : ''}
                </span>
              </div>
            ))}
            {expiringTrainings.length > 5 && (
              <div className="text-yellow-700 font-semibold pt-1">
                +{expiringTrainings.length - 5} mais...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
