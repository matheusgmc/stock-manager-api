import { randomUUID } from "node:crypto";
import { inMemorySaleRepository } from ".";
import { HistoryData } from "database/entities";
import {
  IHistoryRepository,
  IHistoryRepositoryAppend,
  IHistoryRepositoryCreate,
} from "repositories";

export class InMemoryHistoryRepository implements IHistoryRepository {
  Logs: HistoryData[] = [
    {
      id: "1",
      sales: [],
      created_at: "22/02/2023",
      updated_at: "22/02/2023 16:55:55",
    },
    {
      id: "2",
      sales: [inMemorySaleRepository.Sales[0]],
      created_at: "23/02/2023",
      updated_at: "24/02/2023 13:40:40",
    },
  ];

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

  async findDate(today: string): Promise<HistoryData | null> {
    const logToday = this.Logs.find((log) => log.created_at === today);
    return logToday ? logToday : null;
  }

  async findById(id: string): Promise<HistoryData | null> {
    const log = this.Logs.find((log) => log.id === id);
    return log ? log : null;
  }
}
