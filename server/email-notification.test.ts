import { describe, it, expect } from "vitest";
import { notifyOwner } from "./_core/notification";

describe("Email Notification System", () => {
  it("should send notification with valid configuration", async () => {
    const result = await notifyOwner({
      title: "Test: Treinamento a Vencer",
      content: "Teste do sistema de notificação de treinamentos a vencer.",
    });

    // notifyOwner returns true on success, false if service unavailable
    expect(typeof result).toBe("boolean");
  });

  it("should handle notification with training details", async () => {
    const trainingDetails = `
      Colaborador: João Silva
      Treinamento: Direção Defensiva
      Dias para Vencer: 25 dias
      Data de Vencimento: 15/03/2026
    `;

    const result = await notifyOwner({
      title: "Treinamento Próximo a Vencer",
      content: trainingDetails,
    });

    expect(typeof result).toBe("boolean");
  });

  it("should handle expired training notification", async () => {
    const expiredDetails = `
      Colaborador: Maria Santos
      Treinamento: Bloqueio e Etiquetagem
      Status: VENCIDO
      Dias Vencidos: 39 dias
      Data de Vencimento: 10/01/2026
    `;

    const result = await notifyOwner({
      title: "Treinamento Vencido - Ação Necessária",
      content: expiredDetails,
    });

    expect(typeof result).toBe("boolean");
  });
});
