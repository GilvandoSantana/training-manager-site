import { History, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface AuditEntry {
  id: string;
  employeeId: string;
  action: string;
  changes?: string;
  createdAt: Date;
}

interface AuditHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  auditLogs: AuditEntry[];
  employeeName: string;
}

export default function AuditHistory({ isOpen, onClose, auditLogs, employeeName }: AuditHistoryProps) {
  if (!isOpen) return null;

  const getActionLabel = (action: string) => {
    switch (action) {
      case 'create':
        return 'Criado';
      case 'update':
        return 'Atualizado';
      case 'delete':
        return 'Excluído';
      default:
        return action;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create':
        return 'bg-green-100 text-green-800';
      case 'update':
        return 'bg-blue-100 text-blue-800';
      case 'delete':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-navy to-navy/80 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <History size={24} />
            <div>
              <h2 className="text-xl font-bold">Histórico de Modificações</h2>
              <p className="text-white/70 text-sm">{employeeName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-6">
          {auditLogs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <History size={48} className="mx-auto mb-3 opacity-30" />
              <p>Nenhuma modificação registrada</p>
            </div>
          ) : (
            <div className="space-y-4">
              {auditLogs.map((log) => (
                <div key={log.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getActionColor(log.action)}`}>
                      {getActionLabel(log.action)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(log.createdAt), {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </span>
                  </div>
                  {log.changes && (
                    <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-700 font-mono overflow-x-auto">
                      {log.changes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
