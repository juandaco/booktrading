import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import uuidV4 from 'uuid/v4';

const TradeChart = ({ books }) => {
  const bookRows = books.map(book => {
    return (
      <TableRow key={uuidV4()} selectable={false}>
        <TableRowColumn>{book.title}</TableRowColumn>
        <TableRowColumn>{book.userOwner}</TableRowColumn>
        <TableRowColumn>{book.status}</TableRowColumn>
      </TableRow>
    );
  });
  return (
    <Table selectable={false}>
      <TableHeader displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn>Book</TableHeaderColumn>
          <TableHeaderColumn>User</TableHeaderColumn>
          <TableHeaderColumn>Status</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {bookRows}
      </TableBody>
    </Table>
  );
};

export default connect(state => ({
  books: state.user.requestedBooks.map(trade => {
    const book = state.books.items.find(book => trade.bookID === book.bookID);
    book.userOwner = trade.owner;
    book.status = trade.status;
    return book;
  }),
}))(TradeChart);
