/*
 * Design: Industrial Blueprint — Neo-Industrial
 * Header: Application header with hero banner, title, and action buttons
 */

import { Plus, Download, Upload, Shield, FileText } from 'lucide-react';

interface HeaderProps {
  onNewEmployee: () => void;
  onExport: () => void;
  onImport: () => void;
  onExportPDF: () => void;
  onExcelImport: () => void;
  isSyncing: boolean;
  employeeCount: number;
}

const HERO_IMAGE = 'https://private-us-east-1.manuscdn.com/sessionFile/0sxYxMlkBINnWNXBvTncJN/sandbox/GjMkiOLADQ2vFWSdbJgtvK-img-1_1771348556000_na1fn_aGVyby1iYW5uZXI.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMHN4WXhNbGtCSU5uV05YQnZUbmNKTi9zYW5kYm94L0dqTWtpT0xBRFEydkZXU2RiSmd0dkstaW1nLTFfMTc3MTM0ODU1NjAwMF9uYTFmbl9hR1Z5YnkxaVlXNXVaWEkuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=e-BPZiMwj5eq4SfRADsAIH2sR1zY3DocWIco-kfjdltyLzLXztqW-PUDVYs63SrcEnJEaOtjZoLBSYe8FrrpZZDBbx4bABbITOoHWlO2jAdeKcKq1mBobJSdX8OsF5LbId6lpMIy3cEAXySccYx46Uvtatu0Un514z6WM-FgWh-ub9tsYkg5zf-otk3gKXhwo6ZKijEFbOZkn4zcXbDtnhgfEGQ1S~X6uFRNZHfWwpXn0VNqxqM1lMNWAfwSy7DeqNS4mm4an86TtKBvXjcFlOLuZy5i~CXV4YV9ICmLv77mgd5vtHvYHyYWky~F9dHNIHAxg2N7E1A5weQHlQ1FsA__';

export default function Header({ onNewEmployee, onExport, onImport, onExportPDF, onExcelImport, isSyncing, employeeCount }: HeaderProps) {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg mb-8 animate-fade-in-up">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/60" />
      </div>

      {/* Content */}
      <div className="relative p-6 md:p-8 lg:p-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-orange p-2.5 rounded-xl shadow-lg">
                <Shield size={28} className="text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Gestão de Treinamentos do Conjunto Mecanizado
              </h1>
            </div>
            <p className="text-white/70 text-base mt-2 max-w-lg">
              Criado por Gilvando Santana.
              {employeeCount > 0 && (
                <span className="text-orange-light font-semibold"> {employeeCount} colaborador{employeeCount !== 1 ? 'es' : ''} cadastrado{employeeCount !== 1 ? 's' : ''}.</span>
              )}
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">

            <button
              onClick={onExportPDF}
              disabled={isSyncing}
              className="bg-orange hover:bg-orange-light disabled:opacity-50 text-white px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg hover:shadow-xl font-semibold text-sm"
              title="Exportar relatório em PDF"
            >
              <FileText size={18} />
              PDF
            </button>

            <button
              onClick={onExcelImport}
              disabled={isSyncing}
              className="bg-white/15 hover:bg-white/25 border border-white/20 disabled:opacity-50 text-white px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg hover:shadow-xl font-semibold text-sm"
              title="Importar dados do Excel"
            >
              <Upload size={18} />
              Excel
            </button>

            <button
              onClick={onNewEmployee}
              className="bg-orange hover:bg-orange-light text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg hover:shadow-xl font-bold text-sm"
            >
              <Plus size={18} />
              Novo Colaborador
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
