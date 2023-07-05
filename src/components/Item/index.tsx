import React, {useState} from "react";
import TreeViewer from "../tree-viewer";
import {FaAngleDown, FaAngleRight, FaColumns, FaConnectdevelop, FaDatabase, FaDiceD20, FaTable} from "react-icons/fa";

import styled from "styled-components";

const ConnectionIcon = styled(FaConnectdevelop)`
  color: #2ecc71;
`
const DatabaseIcon = styled(FaDatabase)`
  color: #3498db;
`
const SchemaIcon = styled(FaDiceD20)`
  color: #e74c3c;
`
const TableIcon = styled(FaTable)`
  color: #e67e22;
`
const ColumnIcon = styled(FaColumns)`
  color: #16a085;
`
const typeToIcon: { [key: string]: React.ReactElement } = {
  'Connection': <ConnectionIcon/>,
  'Database': <DatabaseIcon/>,
  'Schema': <SchemaIcon/>,
  'Table': <TableIcon/>,
  'Column': <ColumnIcon/>,
}

export type ItemType = {
  type: string,
  name: string,
  path: string,
  hasItems: boolean,
  hasPermissions: boolean,
}

const OpenButton = styled.span<{ $disabled: boolean }>`
  ${props => props.$disabled ? 'color: #7f8c8d;' : ''};
`
const ListItem = styled.li<{ $disabled: boolean }>`
  cursor: ${props => props.$disabled ? 'default' : 'pointer'};
  display: flex;
  column-gap: 4px;
  font-size: 14px;

  span {
    min-width: 14px;
  }

  &:hover {
    font-weight: bold;
  }
`
export const Item = ({name, type, path, hasItems, hasPermissions}: ItemType) => {
  const [isOpen, setOpen] = useState<boolean>(false)
  const handleClick = () => {
    if (hasItems && hasPermissions) {
      setOpen(!isOpen)
    }
  }

  return (
    <>
      <ListItem $disabled={!hasPermissions || !hasItems} className="item-display" onClick={handleClick}>
        {
          hasItems
            ? <OpenButton $disabled={!hasPermissions}>
              {isOpen ? <FaAngleDown/> : <FaAngleRight/>}
            </OpenButton>
            : <span/>
        }

        <span>{typeToIcon[type]}</span>
        <span>{name}</span>
      </ListItem>
      {isOpen && <TreeViewer path={path + name + '/'}/>}
    </>
  );
}
