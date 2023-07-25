// Hooks and Types React
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
// React Router DOM
import { useNavigate } from 'react-router-dom';
// Services
// Components
import { Search } from '../layout/search.component';
// React tables
import { CellProps, CellValue, Column, useTable } from 'react-table';
// Material UI
import { Pagination, Select, MenuItem, SelectChangeEvent } from '@mui/material';
// Sweet Alert
import Swal from 'sweetalert2';
import { getAllItem, removeItem } from '../../services/book.service';
import { IBookData, IBookDataTable } from '../../types/book.type';
import { API_Params } from '../../types/common.type';
import ConfirmModal from './confirm-modal';

export const BooksList = () => {
  const [books, setBooks] = useState<Array<IBookData>>([]);
  const [searchName, setSearchName] = useState<string>('');

  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [bookId, setBookId] = useState<string>('');
  const [pageSize, setPageSize] = useState<number>(3);
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const pageSizes = [3, 6, 9];

  const booksRef = useRef<Array<IBookData>>([]);
  let navigate = useNavigate();

  booksRef.current = books;

  useEffect(() => {
    callGetAllItem();
    // eslint-disable-next-line
  }, [page, pageSize, searchName]);

  const getRequestParams = (
    searchTitle: string,
    page: number,
    pageSize: number
  ) => {
    let params: API_Params = {};

    if (searchTitle) {
      params['search'] = searchTitle;
    }

    if (page) {
      params['page'] = page;
    }

    if (pageSize) {
      params['pageSize'] = pageSize;
    }

    return params;
  };

  const callGetAllItem = async () => {
    const params = getRequestParams(searchName, page, pageSize);
    const res = await getAllItem(params);
    const { data, totalPage } = res.data;
    setBooks(data);
    setCount(totalPage);
  };

  const findByTitle = () => {
    setPage(1);
    callGetAllItem();
  };

  const onChangeSearchTitle = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const searchTitle = target.value;
    setSearchName(searchTitle);
  };

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    console.log(page);
    setPage(page);
  };

  const handlePageSizeChange = ({ target }: SelectChangeEvent<number>) => {
    setPageSize(target.value as number);
    setPage(1);
  };

  const openTutorial = (rowIndex: any) => {
    const id = booksRef.current[rowIndex]['_id'];
    navigate('/books/' + id);
  };
  const handleOpenModal = (id: string) => {
    setOpenConfirmModal(true);
    setBookId(id);
  };
  const deleteTutorial = (rowIndex: any) => {
    console.log(booksRef.current[rowIndex]);
    const id = booksRef.current[rowIndex]['_id'];
    removeItem(id)
      .then(() => {
        Swal.fire(
          `${booksRef.current[rowIndex].title} Successfully Deleted.`,
          '',
          'success'
        );

        let newBooks = [...booksRef.current];
        newBooks.splice(rowIndex, 1);

        setBooks(newBooks);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns: Column<IBookDataTable>[] = useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title' as keyof IBookData,
      },
      {
        Header: 'Author',
        accessor: 'author' as keyof IBookData,
      },
      {
        Header: 'Publication Year',
        accessor: 'publicationYear' as keyof IBookData,
      },
      {
        Header: 'Genre',
        accessor: 'genre' as keyof IBookData,
      },
      {
        Header: 'Description',
        accessor: 'description' as keyof IBookData,
      },
      {
        Header: 'CreatedBy',
        accessor: 'createdBy' as keyof IBookData,
      },
      {
        Header: 'Actions',
        accessor: 'actions' as CellValue,
        Cell: ({ row }: CellProps<IBookDataTable>): JSX.Element => {
          console.log(row);
          const rowIdx = row.id;
          return (
            <div className="d-flex justify-content-center">
              <span
                onClick={() => openTutorial(rowIdx)}
                style={{ cursor: 'pointer' }}
              >
                <i className="fa fa-edit action mx-2"></i>
              </span>
              <span
                onClick={() => handleOpenModal(rowIdx)}
                style={{ cursor: 'pointer' }}
              >
                <i className="fa fa-trash action mx-2"></i>
              </span>
            </div>
          );
        },
      },
      // eslint-disable-next-line
    ],
    []
  );

  const booksDataTable = books.map((item) => ({
    ...item,
    createdBy: item.author,
  }));
  const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
    useTable<IBookDataTable>({ columns, data: booksDataTable });

  return (
    <div className="list row">
      <Search
        searchName={searchName}
        onChangeSearchTitle={onChangeSearchTitle}
        findByTitle={findByTitle}
      />

      <div className="col-md-12 list">
        {'Items per Page: '}
        <Select onChange={handlePageSizeChange} value={pageSize}>
          {pageSizes.map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
        <ConfirmModal
          isOpen={openConfirmModal}
          onHandleClose={setOpenConfirmModal}
          title={'Are you sure you want to delete this book?'}
          onHandleClick={() => deleteTutorial(bookId)}
        />
        <table
          className="table table-striped table-bordered table-hover mt-3"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup: any) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row: any, i: any) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell: any) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <Pagination
          className="my-3"
          count={count}
          page={page}
          siblingCount={1}
          boundaryCount={1}
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};
