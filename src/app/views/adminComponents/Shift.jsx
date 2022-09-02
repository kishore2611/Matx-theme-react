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
    // const [page, setPage] = useState(0);
    // const [rowsPerPage, setRowsPerPage] = useState(5);
    const dispatch = useDispatch();
    const { shiftList } = useSelector((state) => state.ecommerce);
  
  //   console.log('users================', userList);
  
    // const handleChangePage = (_, newPage) => {
    //   setPage(newPage);
    // };
  
    // const handleChangeRowsPerPage = (event) => {
    //   setRowsPerPage(+event.target.value);
    //   setPage(0);
    // };
  
    useEffect(() => {
      dispatch(getShifts());
    }, []);
    // useEffect(() => {
    //   dispatch(getShifts());
    // }, []);
    // console.log("userlist",`count={userList.length}`);
    return (
      <Container>
        <SimpleCard title="Shifts">
          <p className="display-inline">Total Shifts '{shiftList.length}'</p>
          <Box width="100%" overflow="auto">
            <StyledTable>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Hospital Name</TableCell>
                  <TableCell align="center">Job Tital</TableCell>
                  <TableCell align="center">Hourly Rate</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shiftList
                  // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((subscriber, index) => (
                    <TableRow key={index} >
                      <TableCell align="left">{subscriber?.hospitalName ? subscriber.hospitalName : "NA"}</TableCell>
                      <TableCell align="center">{subscriber?.jobTitle ? subscriber.jobTitle : "NA"}</TableCell>
                      <TableCell align="center">{subscriber?.hourlyRate ? subscriber.hourlyRate : "NA"}</TableCell>
                      <TableCell align="center">
                        {subscriber?.date ? subscriber.date : "NA"}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton>
                          <Icon color="error">close</Icon>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </StyledTable>
  
            {/* <TablePagination
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
            /> */}
          </Box>
        </SimpleCard>
      </Container>
    );
  };
  
  export default PaginationTable;
  