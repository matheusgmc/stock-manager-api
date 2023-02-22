import { randomUUID } from "node:crypto";
import { HistoryData } from "../../src/database/entities/";
import {
  IHistoryRepository,
  IHistoryRepositoryAppend,
  IHistoryRepositoryCreate,
} from "../../src/implements/";

export class InMemoryHistoryRepository implements IHistoryRepository {
  Logs: HistoryData[] = [];
  async create(data: IHistoryRepositoryCreate): Promise<void> {
    const newLog: HistoryData = {
      id: randomUUID(),
      sales: [
        {
          ...data.sale,
          payment_method: data.sale.payment.method as string,
          payment_status: data.sale.payment.status as string,
        },
      ],
      created_at: data.created_at,
      updated_at: data.created_at,
    };

    this.Logs.push(newLog);
  }

  async append(data: IHistoryRepositoryAppend): Promise<void> {
    const logToday = this.Logs.find((log) => log.id === data.id) as HistoryData;
    logToday.sales.push({
      ...data.sale,
      payment_method: data.sale.payment.method as string,
      payment_status: data.sale.payment.status as string,
    });
  }

  async findToday(today: string): Promise<HistoryData | null> {
    const logToday = this.Logs.find((log) => log.created_at === today);
    return logToday ? logToday : null;
  }
}
