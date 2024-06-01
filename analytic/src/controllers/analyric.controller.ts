// analytics-service/src/controllers/analyticsController.ts
import { Request, Response } from 'express';
import axios from 'axios';

export class AnalyticsController {
  public async generateReport(req: Request, res: Response): Promise<void> {
    const { type } = req.params;

    try {
      let data;
      switch (type) {
        case 'user-activity':
          data = await this.fetchUserActivity();
          break;
        case 'resource-usage':
          data = await this.fetchResourceUsage();
          break;
        default:
          res.status(400).json({ error: 'Invalid report type' });
          return;
      }

      const report = this.createReport(data);
      res.json(report);
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate report' });
    }
  }

  private async fetchUserActivity(): Promise<any> {
    // Виклик іншого мікросервісу для отримання даних про активність користувачів
    const response = await axios.get('http://user-service/api/users/activity');
    return response.data;
  }

  private async fetchResourceUsage(): Promise<any> {
    // Виклик іншого мікросервісу для отримання даних про використання ресурсів
    const response = await axios.get('http://resource-service/api/resources/usage');
    return response.data;
  }

  private createReport(data: any): any {
    // Логіка для створення звіту на основі отриманих даних
    return {
      timestamp: new Date(),
      data,
    };
  }
}

