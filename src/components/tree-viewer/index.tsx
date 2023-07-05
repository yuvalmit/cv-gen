import React, {useCallback, useEffect, useState} from "react";
import type {ItemType} from "../Item";
import {Item} from "../Item";
import {ItemsRequestContext, ItemsRequestContextType} from "../../utils/mock-client";
import styled from "styled-components";

const ListWrapper = styled.ul`
  list-style: none;
  padding-inline-start: 20px;
`
const ShowMoreButton = styled.button`
  background: rgba(142, 68, 173, 0.7);
  color: white;
  font-weight: bold;
  border-radius: 4px;
  margin-left: 18px;
  margin-top: 4px;
  cursor: pointer;
  padding: 5px 10px;
  border: none;

  &:hover {
    background: rgba(142, 68, 173, 1.0);
  }
`
type Props = {
  path: string,
}

const TreeViewer = ({path}: Props) => {
  const {getItems} = React.useContext(ItemsRequestContext) as ItemsRequestContextType;
  const [items, setItems] = useState<ItemType[]>([])
  const [showMore, setShowMore] = useState<boolean>(false)
  const [pageNumber, setPageNumber] = useState<number>(1)

  const getPageItems = useCallback(() => {
    const pageData = getItems({path: path, page: pageNumber})
    setPageNumber(pageNumber + 1)
    if (pageData.items.length) {
      setItems([...items, ...pageData.items])
    }
    setShowMore(pageNumber * 10 < pageData.totalCount)
  }, [getItems, items, pageNumber, path])
  const handlePageSize = () => {
    getPageItems()
  }
  useEffect(() => {
    if (!items.length) {
      getPageItems()
    }
  }, [items, getItems, path, pageNumber, getPageItems]);

  return (
    <ListWrapper>
      {
        items && items.map(item => {
          return (<Item key={item.name} {...item} />)
        })
      }
      {
        showMore && <ShowMoreButton onClick={handlePageSize}>show more</ShowMoreButton>
      }
    </ListWrapper>
  )
}

export default TreeViewer
