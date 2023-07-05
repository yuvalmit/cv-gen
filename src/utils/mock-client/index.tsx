import React from "react";
import mockData from "../../mock/rendom_data.json"
import {ItemType} from "../../components/Item";

type ItemsRequest = {
  path: string,
  page: number,
}

type ItemsResponse = {
  items: ItemType[],
  totalCount: number,
}

export type ItemsRequestContextType = {
  getItems: (req: ItemsRequest) => ItemsResponse;
};

export const ItemsRequestContext = React.createContext<ItemsRequestContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

const PAGE_SIZE = 10
export const LEVELS: string[] = ['Connection', 'Database', 'Schema', 'Table', 'Column']

const totals: { [path: string]: number } = {}
const ItemsRequestProvider = ({children}: Props) => {
  const randomNumberInRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const getItems = ({path, page}: ItemsRequest) => {
    const pathLevel = path.split('/').length - 1
    if (!totals?.[path]) {
      totals[path] = randomNumberInRange(1, 50)
    }
    const totalCount: number = totals[path]
    const pagesCount: number = totalCount < PAGE_SIZE ? 1 : Math.ceil(totalCount / PAGE_SIZE);
    if (page <= pagesCount) {
      const pageSize: number = page !== pagesCount ? PAGE_SIZE : totalCount % PAGE_SIZE || PAGE_SIZE
      const data = mockData.splice(randomNumberInRange(0, mockData.length - pageSize), pageSize)
        .map((dataItem) => {
          return {
            name: dataItem.first_name + dataItem.last_name,
            type: LEVELS[pathLevel - 1],
            path: path,
            hasItems: randomNumberInRange(0, 7) ? pathLevel < LEVELS.length : false,
            hasPermissions: !!randomNumberInRange(0, 7),
          }
        })
      return {
        items: data,
        totalCount
      }
    }
    return {
      items: [],
      totalCount
    }
  }
  return <ItemsRequestContext.Provider value={{getItems}}>{children}</ItemsRequestContext.Provider>;
};

export default ItemsRequestProvider