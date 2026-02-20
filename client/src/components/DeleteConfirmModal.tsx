/*
 * Design: Industrial Blueprint — Neo-Industrial
 * DeleteConfirmModal: Confirmation dialog for employee deletion
 */

import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmModal({ isOpen, onConfirm, onCancel }: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fade-in-up">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-danger/10 p-3 rounded-full">
            <AlertTriangle className="text-danger" size={24} />
          </div>
          <h3 className="text-xl font-bold text-foreground">Confirmar Exclusão</h3>
        </div>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Tem certeza que deseja excluir este colaborador e todos os seus treinamentos? Esta ação não pode ser desfeita.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 bg-danger hover:bg-danger-light text-white py-3 rounded-xl font-bold transition-all text-sm"
          >
            Sim, Excluir
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-muted hover:bg-warm-gray-dark text-foreground py-3 rounded-xl font-bold transition-all text-sm"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
