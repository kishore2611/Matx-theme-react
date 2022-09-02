import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Icon,
  IconButton,
  Radio,
  RadioGroup,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { getShifts, addShift } from 'app/redux/actions/EcommerceActions';

import { SimpleCard } from 'app/components';
import { Span } from 'app/components/Typography';
import { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
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

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px',
}));

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const SimpleForm = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const [state, setState] = useState({});
  const { shiftList, message } = useSelector((state) => state.ecommerce);

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== state.password) return false;

      return true;
    });
    return () => ValidatorForm.removeValidationRule('isPasswordMatch');
  }, [state.password]);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSubmit = (event) => {
    // console.log("submitted");
    event.preventDefault();

    dispatch(addShift(state));
    dispatch(getShifts());

    setState({});

    // console.log(event);
  };
  console.log('test ============>', message);
  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
    console.log(state);
  };

  const handleDateChange = (date) => setState({ ...state, date });

  const { jobTitle, timing, hourlyRate, mobile, password, confirmPassword, gender, date, email } =
    state;

  useEffect(() => {
    dispatch(getShifts());
  }, []);

  return (
    <div>
      <Container>
        <ValidatorForm
          style={{ marginBottom: '40px' }}
          onSubmit={handleSubmit}
          onError={() => null}
        >
          <Grid container spacing={12}>
            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextField
                type="text"
                name="jobTitle"
                id="standard-basic"
                value={jobTitle || ''}
                onChange={handleChange}
                errorMessages={['this field is required']}
                label="Job Title"
                validators={['required']}
              />

              <TextField
                type="text"
                name="timing"
                label="Timing"
                onChange={handleChange}
                value={timing || ''}
                validators={['required']}
                errorMessages={['this field is required']}
              />

              <TextField
                type="text"
                name="hourlyRate"
                label="hourlyRate"
                value={hourlyRate || ''}
                onChange={handleChange}
                validators={['required']}
                // errorMessages={['this field is required', 'email is not valid']}
              />

              {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={date}
                  onChange={handleDateChange}
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      label="Date picker"
                      id="mui-pickers-date"
                      sx={{ mb: 2, width: '100%' }}
                    />
                  )}
                />
              </LocalizationProvider> */}

              {/* <TextField
                sx={{ mb: 4 }}
                type="number"
                name="creditCard"
                label="Credit Card"
                onChange={handleChange}
                value={creditCard || ''}
                errorMessages={['this field is required']}
                validators={['required', 'minStringLength:16', 'maxStringLength: 16']}
              /> */}
            </Grid>

            {/* <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextField
                type="text"
                name="mobile"
                value={mobile || ''}
                label="Mobile Nubmer"
                onChange={handleChange}
                validators={['required']}
                errorMessages={['this field is required']}
              />
              <TextField
                name="password"
                type="password"
                label="Password"
                value={password || ''}
                onChange={handleChange}
                validators={['required']}
                errorMessages={['this field is required']}
              />
              <TextField
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                label="Confirm Password"
                value={confirmPassword || ''}
                validators={['required', 'isPasswordMatch']}
                errorMessages={['this field is required', "password didn't match"]}
              />
              <RadioGroup
                row
                name="gender"
                sx={{ mb: 2 }}
                value={gender || ''}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Male"
                  label="Male"
                  labelPlacement="end"
                  control={<Radio color="secondary" />}
                />

                <FormControlLabel
                  value="Female"
                  label="Female"
                  labelPlacement="end"
                  control={<Radio color="secondary" />}
                />

                <FormControlLabel
                  value="Others"
                  label="Others"
                  labelPlacement="end"
                  control={<Radio color="secondary" />}
                />
              </RadioGroup>

              <FormControlLabel
                control={<Checkbox />}
                label="I have read and agree to the terms of service."
              />
            </Grid> */}
          </Grid>

          <Button color="primary" variant="contained" type="submit">
            <Icon>send</Icon>
            <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Post</Span>
          </Button>
        </ValidatorForm>

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
                      <TableCell align="left">
                        {subscriber?.hospitalName ? subscriber.hospitalName : 'NA'}
                      </TableCell>
                      <TableCell align="center">
                        {subscriber?.jobTitle ? subscriber.jobTitle : 'NA'}
                      </TableCell>
                      <TableCell align="center">
                        {subscriber?.timing ? subscriber.timing : 'NA'}
                      </TableCell>
                      <TableCell align="center">
                        {subscriber?.hourlyRate ? subscriber.hourlyRate : 'NA'}
                      </TableCell>
                      <TableCell align="center">
                        {subscriber?.applied === true ? 'true' : 'false'}
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
    </div>
  );
};

export default SimpleForm;
