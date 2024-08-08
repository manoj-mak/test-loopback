import {get} from '@loopback/rest';
import moment from 'moment';

const policies = [
  {
    id: 1,
    policyNumber: '2983747QWE',
    status: 'Active',
    policyType: 'Life',
    policyHolder: 'John Doe',
    startDate: '2020-01-01',
    endDate: '2025-01-01',
  },
  {
    id: 2,
    policyNumber: '3498u48448',
    status: 'Expired',
    policyType: 'Health',
    policyHolder: 'Jane Doe',
    startDate: '2019-01-01',
    endDate: '2020-01-01',
  },
  {
    id: 3,
    policyNumber: '1234567890',
    status: 'Active',
    policyType: 'Auto',
    policyHolder: 'Alice Smith',
    startDate: '2023-01-01',
    endDate: '2024-8-23', // Renewable within the next 30 days
  },
  {
    id: 4,
    policyNumber: '0987654321',
    status: 'Expired',
    policyType: 'Home',
    policyHolder: 'Bob Johnson',
    startDate: '2018-01-01',
    endDate: '2019-01-01',
  },
  {
    id: 5,
    policyNumber: '1122334455',
    status: 'Active',
    policyType: 'Life',
    policyHolder: 'Charlie Brown',
    startDate: '2022-01-01',
    endDate: '2027-01-01',
  },
  {
    id: 6,
    policyNumber: '6677889900',
    status: 'Expired',
    policyType: 'Health',
    policyHolder: 'Diana Prince',
    startDate: '2017-01-01',
    endDate: '2018-01-01',
  },
  {
    id: 7,
    policyNumber: '4455667788',
    status: 'Active',
    policyType: 'Auto',
    policyHolder: 'Eve Adams',
    startDate: '2023-01-01',
    endDate: '2024-08-20', // Renewable within the next 30 days
  },
  {
    id: 8,
    policyNumber: '2233445566',
    status: 'Active',
    policyType: 'Home',
    policyHolder: 'Frank Castle',
    startDate: '2020-01-01',
    endDate: '2024-01-01',
  },
];

export class GetPoliciesController {
  @get('/getAllPolicies')
  getPolicies() {
    return policies;
  }

  @get('/getExpiredPolicies')
  getExpiredPolicies() {
    return policies.filter(policy => policy.status === 'Expired');
  }

  @get('/getActivePolicies')
  getActivePolicies() {
    return policies.filter(policy => policy.status === 'Active');
  }

  //renewable policies are those that are active and have an end date within the next 30 days
  @get('/getRenewablePolicies')
  getRenewablePolicies() {
    const today = moment().format('YYYY-MM-DD');
    const next30Days = moment().add(30, 'days').format('YYYY-MM-DD');
    //console.log('today:', today);
    //console.log('next30Days:', next30Days);

    return policies.filter(
      policy =>
        policy.status === 'Active' &&
        moment(policy.endDate).isBetween(today, next30Days),
    );
  }
}
