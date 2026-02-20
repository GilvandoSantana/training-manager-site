import { X } from 'lucide-react';
import type { Employee } from '@/lib/types';

interface RoleFilterProps {
  employees: Employee[];
  selectedRole: string;
  onRoleChange: (role: string) => void;
}

export default function RoleFilter({ employees, selectedRole, onRoleChange }: RoleFilterProps) {
  // Extract unique roles from employees
  const uniqueRoles = Array.from(new Set(
    employees
      .map(emp => emp.role)
      .filter(role => role && role.trim() !== '')
  )).sort();

  return (
    <div className="mb-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-semibold text-gray-700">Filtrar por Função:</label>
        {selectedRole && (
          <button
            onClick={() => onRoleChange('')}
            className="text-xs text-orange hover:text-orange-light flex items-center gap-1 transition-colors"
          >
            <X size={14} />
            Limpar
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onRoleChange('')}
          className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
            selectedRole === ''
              ? 'bg-navy text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Todas as Funções
        </button>

        {uniqueRoles.map((role) => (
          <button
            key={role}
            onClick={() => onRoleChange(role)}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
              selectedRole === role
                ? 'bg-orange text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {role}
          </button>
        ))}
      </div>

      {uniqueRoles.length === 0 && (
        <p className="text-xs text-gray-500 italic">Nenhuma função cadastrada</p>
      )}
    </div>
  );
}
