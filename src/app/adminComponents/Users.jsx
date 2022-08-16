import {
  Box,
  Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { getAllUsers, getShifts } from 'app/redux/actions/EcommerceActions';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } },
  },
}));

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const PaginationTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.ecommerce);
  const { shiftList } = useSelector((state) => state.ecommerce);

//   console.log('users================', userList);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  useEffect(() => {
    dispatch(getShifts());
  }, []);

  return (
    <Container>
      <SimpleCard title="Users">
        <Box width="100%" overflow="auto">
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Created At</TableCell>
                <TableCell align="center">Verified</TableCell>
                <TableCell align="center">Position</TableCell>
                <TableCell align="center">SSN</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((subscriber, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{subscriber?.name ? subscriber.name : "NA"}</TableCell>
                    <TableCell align="center">{subscriber?.email ? subscriber.email : "NA"}</TableCell>
                    <TableCell align="center">{subscriber?.createdAt ? subscriber.createdAt : "NA"}</TableCell>
                    <TableCell align="center">
                      {subscriber?.verified === 1 ? 'Yes' : 'No'}
                    </TableCell>
                    <TableCell align="center">{subscriber?.position ? subscriber.position : "NA"}</TableCell>
                    <TableCell align="center">{subscriber?.ssn ? subscriber.ssn : "NA"}</TableCell>
                    <TableCell align="right">
                      <IconButton>
                        <Icon color="error">close</Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </StyledTable>

          <TablePagination
            sx={{ px: 2 }}
            page={page}
            component="div"
            rowsPerPage={rowsPerPage}
            count={userList.length}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
            nextIconButtonProps={{ 'aria-label': 'Next Page' }}
            backIconButtonProps={{ 'aria-label': 'Previous Page' }}
          />
        </Box>
      </SimpleCard>
      <SimpleCard title="Shifts">
        <Box width="100%" overflow="auto">
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell align="left">Hospital Name</TableCell>
                <TableCell align="center">Job Title</TableCell>
                <TableCell align="center">Timing</TableCell>
                <TableCell align="center">Hourly Rate</TableCell>
                <TableCell align="center">Applied</TableCell>
                {/* <TableCell align="center">SSN</TableCell> */}
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shiftList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((subscriber, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{subscriber?.hospitalName ? subscriber.hospitalName : "NA"}</TableCell>
                    <TableCell align="center">{subscriber?.jobTitle ? subscriber.jobTitle : "NA"}</TableCell>
                    <TableCell align="center">{subscriber?.timing ? subscriber.timing : "NA"}</TableCell>
                    <TableCell align="center">{subscriber?.hourlyRate ? subscriber.hourlyRate : "NA"}</TableCell>
                    <TableCell align="center">
                      {subscriber?.applied === true ? "true": "false"}
                    </TableCell>
                    {/* <TableCell align="center">{subscriber?.ssn ? subscriber.ssn : null}</TableCell> */}
                    <TableCell align="right">
                      <IconButton>
                        <Icon color="error">close</Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </StyledTable>

          <TablePagination
            sx={{ px: 2 }}
            page={page}
            component="div"
            rowsPerPage={rowsPerPage}
            count={shiftList.length}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
            nextIconButtonProps={{ 'aria-label': 'Next Page' }}
            backIconButtonProps={{ 'aria-label': 'Previous Page' }}
          />
        </Box>
      </SimpleCard>
    </Container>
  );
};

export default PaginationTable;
