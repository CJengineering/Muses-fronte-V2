import { DashBoardGateway, DashboardData } from 'src/app/interfaces';

export class InMemoryDashBoardGateway implements DashBoardGateway {
  async fetchDashboard(): Promise<DashboardData[]> {
    return [
      {
        count: 1,
        name: 'gogle alerts',
      },
      {
        count: 12,
        name: 'bing alertts',
      },
      {
        count: 13,
        name: 'search alerts',
      },
    ];
  }
}
