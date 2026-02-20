import { FileText, Download } from 'lucide-react';
import { generateEmployeePDF, generateComprehensivePDF } from '@/lib/pdf-export';
import type { Employee } from '@/lib/types';
import { useState } from 'react';
import { toast } from 'sonner';

interface PDFExportButtonProps {
  employees: Employee[];
  singleEmployee?: Employee;
}

export default function PDFExportButton({ employees, singleEmployee }: PDFExportButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleExportSingle = async () => {
    if (!singleEmployee) return;
    
    try {
      setIsGenerating(true);
      await generateEmployeePDF(singleEmployee);
      toast.success('Relatório individual gerado com sucesso!');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      toast.error('Erro ao gerar relatório PDF');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportComprehensive = async () => {
    try {
      setIsGenerating(true);
      await generateComprehensivePDF(employees);
      toast.success('Relatório geral gerado com sucesso!');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      toast.error('Erro ao gerar relatório PDF');
    } finally {
      setIsGenerating(false);
    }
  };

  if (singleEmployee) {
    return (
      <button
        onClick={handleExportSingle}
        disabled={isGenerating}
        className="inline-flex items-center gap-2 px-3 py-2 bg-orange hover:bg-orange/90 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
        title="Exportar relatório em PDF"
      >
        <FileText className="w-4 h-4" />
        {isGenerating ? 'Gerando...' : 'PDF'}
      </button>
    );
  }

  return (
    <button
      onClick={handleExportComprehensive}
      disabled={isGenerating}
      className="inline-flex items-center gap-2 px-4 py-2 bg-orange hover:bg-orange/90 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
      title="Exportar relatório geral em PDF"
    >
      <Download className="w-5 h-5" />
      {isGenerating ? 'Gerando PDF...' : 'Exportar PDF'}
    </button>
  );
}
