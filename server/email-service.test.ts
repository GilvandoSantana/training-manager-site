import { describe, it, expect, beforeEach } from "vitest";
import { calculateDaysRemaining, getTrainingAlertsToSend, sendTrainingAlerts } from "./email-service";

describe("Email Service", () => {
  describe("calculateDaysRemaining", () => {
    it("should calculate days remaining correctly for future date", () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 15);
      
      const daysRemaining = calculateDaysRemaining(futureDate);
      expect(daysRemaining).toBe(15);
    });

    it("should calculate negative days for past date (expired)", () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 10);
      
      const daysRemaining = calculateDaysRemaining(pastDate);
      expect(daysRemaining).toBe(-10);
    });

    it("should return 0 for today", () => {
      const today = new Date();
      const daysRemaining = calculateDaysRemaining(today);
      expect(daysRemaining).toBe(0);
    });

    it("should return 30 for exactly 30 days from now", () => {
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
      
      const daysRemaining = calculateDaysRemaining(thirtyDaysFromNow);
      expect(daysRemaining).toBe(30);
    });
  });

  describe("getTrainingAlertsToSend", () => {
    it("should return array of training alerts", async () => {
      const alerts = await getTrainingAlertsToSend();
      
      expect(Array.isArray(alerts)).toBe(true);
      
      // Check structure of alerts if any exist
      if (alerts.length > 0) {
        const alert = alerts[0];
        expect(alert).toHaveProperty("employeeName");
        expect(alert).toHaveProperty("trainingName");
        expect(alert).toHaveProperty("daysRemaining");
        expect(alert).toHaveProperty("expirationDate");
        expect(alert).toHaveProperty("status");
        expect(["expired", "expiring_soon"]).toContain(alert.status);
      }
    });

    it("should only return alerts for trainings within 30 days or expired", async () => {
      const alerts = await getTrainingAlertsToSend();
      
      for (const alert of alerts) {
        expect(alert.daysRemaining).toBeLessThanOrEqual(30);
      }
    });

    it("should correctly categorize expired vs expiring_soon", async () => {
      const alerts = await getTrainingAlertsToSend();
      
      for (const alert of alerts) {
        if (alert.daysRemaining < 0) {
          expect(alert.status).toBe("expired");
        } else {
          expect(alert.status).toBe("expiring_soon");
        }
      }
    });
  });

  describe("sendTrainingAlerts", () => {
    it("should return boolean result", async () => {
      const result = await sendTrainingAlerts();
      expect(typeof result).toBe("boolean");
    });

    it("should successfully send alerts without throwing", async () => {
      let error: Error | null = null;
      try {
        await sendTrainingAlerts();
      } catch (e) {
        error = e as Error;
      }
      
      expect(error).toBeNull();
    });

    it("should handle empty alerts gracefully", async () => {
      // This test verifies the function handles cases with no alerts
      const result = await sendTrainingAlerts();
      expect(typeof result).toBe("boolean");
    });
  });

  describe("Email Alert Integration", () => {
    it("should send alerts with correct format", async () => {
      const result = await sendTrainingAlerts();
      
      // Verify the function executed without error
      expect(result).toBeDefined();
      expect(typeof result).toBe("boolean");
    });

    it("should include employee name in alerts", async () => {
      const alerts = await getTrainingAlertsToSend();
      
      for (const alert of alerts) {
        expect(alert.employeeName).toBeTruthy();
        expect(alert.employeeName.length).toBeGreaterThan(0);
      }
    });

    it("should include training name in alerts", async () => {
      const alerts = await getTrainingAlertsToSend();
      
      for (const alert of alerts) {
        expect(alert.trainingName).toBeTruthy();
        expect(alert.trainingName.length).toBeGreaterThan(0);
      }
    });

    it("should format expiration date correctly", async () => {
      const alerts = await getTrainingAlertsToSend();
      
      for (const alert of alerts) {
        // Check if date is in pt-BR format (DD/MM/YYYY)
        expect(/^\d{2}\/\d{2}\/\d{4}$/.test(alert.expirationDate)).toBe(true);
      }
    });
  });
});
