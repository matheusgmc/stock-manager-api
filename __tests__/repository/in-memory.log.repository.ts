import { randomUUID } from "node:crypto";
import { LogData } from "../../src/database/entities/log.data.entity";
import {
  ILogRepository,
  ILogRepositoryAppend,
  ILogRepositoryCreate,
} from "../../src/implements/";

export class InMemoryLogRepository implements ILogRepository {
  Logs: LogData[] = [];
  async create(data: ILogRepositoryCreate): Promise<void> {
    const newLog: LogData = {
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

  async append(data: ILogRepositoryAppend): Promise<void> {
    const logToday = this.Logs.find((log) => log.id === data.id) as LogData;
    logToday.sales.push({
      ...data.sale,
      payment_method: data.sale.payment.method as string,
      payment_status: data.sale.payment.status as string,
    });
  }

  async findToday(today: string): Promise<LogData | null> {
    const logToday = this.Logs.find((log) => log.created_at === today);
    return logToday ? logToday : null;
  }
}
