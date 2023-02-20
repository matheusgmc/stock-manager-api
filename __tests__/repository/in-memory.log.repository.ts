import { randomUUID } from "node:crypto";
import { LogData } from "../../src/database/entities/log.data.entity";
import { ILogRepository, ILogRepositoryCreate } from "../../src/implements/";

const Logs: LogData[] = [];

export class InMemoryLogRepository implements ILogRepository {
  async create(data: ILogRepositoryCreate): Promise<LogData> {
    const newLog: LogData = {
      customer: data.customer,
      product: data.product,
      id: randomUUID(),
    };

    Logs.push(newLog);
    return new LogData(newLog);
  }
}
