import moment from 'moment'

import getVisibleExpenses from '../../selectors/expenses'

const expenses = [
  {
    id: 1,
    description: 'Rent',
    amount: 6000,
    createdAt: 0,
  },
  {
    id: 2,
    description: 'Internet',
    amount: 300,
    createdAt: moment(0)
      .subtract(4, 'days')
      .valueOf(),
  },
  {
    id: 3,
    description: 'Groceries',
    amount: 2000,
    createdAt: moment(0)
      .add(4, 'days')
      .valueOf(),
  },
]

test('should filter by text value', () => {
  const filters = {
    text: 't',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
  }
  const result = getVisibleExpenses(expenses, filters)
  expect(result).toEqual([expenses[0], expenses[1]])
})

test('should filter by start date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: moment(0),
    endDate: undefined,
  }
  const result = getVisibleExpenses(expenses, filters)
  expect(result).toEqual([expenses[2], expenses[0]])
})

test('should filter by end date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: moment(0).add(3, 'days'),
  }
  const result = getVisibleExpenses(expenses, filters)
  expect(result).toEqual([expenses[0], expenses[1]])
})

test('should sort by date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
  }
  const result = getVisibleExpenses(expenses, filters)
  expect(result).toEqual([expenses[2], expenses[0], expenses[1]])
})

test('should sort by amount', () => {
  const filters = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined,
  }
  const result = getVisibleExpenses(expenses, filters)
  expect(result).toEqual([expenses[0], expenses[2], expenses[1]])
})
