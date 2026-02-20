/*
 * Design: Industrial Blueprint — Neo-Industrial
 * EmptyState: Shown when no employees match the current filter
 */

import { Users, Search } from 'lucide-react';
import type { FilterType } from '@/lib/types';

const EMPTY_IMAGE = 'https://private-us-east-1.manuscdn.com/sessionFile/0sxYxMlkBINnWNXBvTncJN/sandbox/GjMkiOLADQ2vFWSdbJgtvK_1771348581311_na1fn_ZW1wdHktc3RhdGU.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMHN4WXhNbGtCSU5uV05YQnZUbmNKTi9zYW5kYm94L0dqTWtpT0xBRFEydkZXU2RiSmd0dktfMTc3MTM0ODU4MTMxMV9uYTFmbl9aVzF3ZEhrdGMzUmhkR1UucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=l3IO9W4BgOeLY8rwN1-X233yZtLlgpYjf2muiWKRx8AzpJ58DOKMDTkbQsgzmr9k2pBaTC-eLAiTWKIX0szRKNCrjHgV20EivvfmQuEaQEpdOXzTyiTiZ27SyCh-DZJNmZQt0GBER2BNljxXe40340Eu7e354JXrXv3omThUPrLegZH8TahWPn1M3VOmQ2EqeF0JYSSgNF1lBcDwZCuQ4cI54Mywe9w2bZwa-2y2ATOoi12nJ3kmohMJYHZVQWPLe7ksZmPhw8tSaTQ69unNFx3Tu~vpNOlRnYjPZFdtvEUfNtNhY2upQ0xwC61xsGnywxv3~mPicUHmomnHeKLQbw__';

interface EmptyStateProps {
  filter: FilterType;
}

export default function EmptyState({ filter }: EmptyStateProps) {
  return (
    <div className="bg-card rounded-2xl shadow-sm p-12 text-center animate-fade-in-up">
      {filter === 'all' ? (
        <>
          <img
            src={EMPTY_IMAGE}
            alt="Nenhum colaborador"
            className="w-32 h-32 mx-auto mb-6 opacity-60"
          />
          <h3 className="text-xl font-bold text-foreground mb-2">
            Nenhum colaborador cadastrado
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Comece adicionando um novo colaborador clicando no botão "Novo Colaborador" acima.
          </p>
        </>
      ) : (
        <>
          <div className="bg-muted w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search size={36} className="text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            Nenhum resultado encontrado
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Nenhum colaborador encontrado com o filtro selecionado.
          </p>
        </>
      )}
    </div>
  );
}
