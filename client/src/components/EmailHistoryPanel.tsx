import { useState, useEffect } from 'react';
import { trpc } from '@/lib/trpc';
import { Mail, Calendar, User, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface EmailHistoryItem {
  id: string;
  trainingId: string;
  employeeId: string;
  lastSentAt: Date;
  createdAt: Date;
  trainingName: string | null;
  employeeName: string | null;
  expirationDate: string | null;
}

export default function EmailHistoryPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: history = [], isLoading, refetch } = trpc.emailHistory.list.useQuery();

  // Formatar data para exibição
  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  // Calcular dias desde o envio
  const getDaysSinceSent = (sentDate: Date | string) => {
    const sent = new Date(sentDate);
    const now = new Date();
    const diffMs = now.getTime() - sent.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoje';
    if (diffDays === 1) return 'Ontem';
    return `${diffDays} dias atrás`;
  };

  // Calcular status do treinamento
  const getTrainingStatus = (expirationDate: string | null) => {
    if (!expirationDate) return { label: 'Desconhecido', color: 'gray', icon: AlertCircle };
    
    const expDate = new Date(expirationDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    expDate.setHours(0, 0, 0, 0);
    
    const daysRemaining = Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysRemaining < 0) {
      return { label: 'Vencido', color: 'red', icon: AlertCircle };
    } else if (daysRemaining <= 30) {
      return { label: 'A vencer', color: 'yellow', icon: Clock };
    } else {
      return { label: 'Válido', color: 'green', icon: CheckCircle };
    }
  };

  return (
    <div className="w-full">
      {/* Botão para abrir/fechar painel */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="w-full mb-4 flex items-center gap-2"
      >
        <Mail className="w-4 h-4" />
        Histórico de E-mails ({history.length})
      </Button>

      {/* Painel de histórico */}
      {isOpen && (
        <Card className="p-6 bg-background border border-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Mail className="w-5 h-5 text-orange-600" />
              Histórico de Notificações por E-mail
            </h2>
            <Button
              onClick={() => refetch()}
              variant="ghost"
              size="sm"
              className="text-xs"
            >
              Atualizar
            </Button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
            </div>
          ) : history.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Mail className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Nenhuma notificação de e-mail enviada ainda.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {history.map((item) => {
                const status = getTrainingStatus(item.expirationDate);
                const StatusIcon = status.icon;
                const colorClasses = {
                  red: 'bg-red-50 border-red-200',
                  yellow: 'bg-yellow-50 border-yellow-200',
                  green: 'bg-green-50 border-green-200',
                  gray: 'bg-gray-50 border-gray-200',
                };
                const textColorClasses = {
                  red: 'text-red-700',
                  yellow: 'text-yellow-700',
                  green: 'text-green-700',
                  gray: 'text-gray-700',
                };

                return (
                  <div
                    key={item.id}
                    className={`p-4 border rounded-lg ${colorClasses[status.color as keyof typeof colorClasses]}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        {/* Cabeçalho com colaborador e treinamento */}
                        <div className="flex items-center gap-2 mb-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="font-semibold text-foreground">
                            {item.employeeName || 'Colaborador desconhecido'}
                          </span>
                        </div>

                        {/* Nome do treinamento */}
                        <div className="ml-6 mb-2">
                          <p className="text-sm text-foreground font-medium">
                            {item.trainingName || 'Treinamento desconhecido'}
                          </p>
                        </div>

                        {/* Data de expiração */}
                        {item.expirationDate && (
                          <div className="ml-6 mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>Vence em: {new Date(item.expirationDate).toLocaleDateString('pt-BR')}</span>
                          </div>
                        )}

                        {/* Status do treinamento */}
                        <div className="ml-6 flex items-center gap-2">
                          <StatusIcon className={`w-4 h-4 ${textColorClasses[status.color as keyof typeof textColorClasses]}`} />
                          <span className={`text-xs font-semibold ${textColorClasses[status.color as keyof typeof textColorClasses]}`}>
                            {status.label}
                          </span>
                        </div>
                      </div>

                      {/* Coluna de datas */}
                      <div className="text-right text-xs text-muted-foreground space-y-1">
                        <div className="flex items-center justify-end gap-1">
                          <Clock className="w-3 h-3" />
                          <span className="font-medium">{getDaysSinceSent(item.lastSentAt)}</span>
                        </div>
                        <div className="text-xs">{formatDate(item.lastSentAt)}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Resumo */}
          {history.length > 0 && (
            <div className="mt-6 pt-4 border-t border-border">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-orange-600">{history.length}</p>
                  <p className="text-xs text-muted-foreground">Total de Envios</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-600">
                    {new Set(history.map(h => h.employeeId)).size}
                  </p>
                  <p className="text-xs text-muted-foreground">Colaboradores</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-600">
                    {new Set(history.map(h => h.trainingId)).size}
                  </p>
                  <p className="text-xs text-muted-foreground">Treinamentos</p>
                </div>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
