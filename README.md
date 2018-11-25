# Carta Investor Services Fellowship - Portfolio API

#### By Skye Nguyen

# Portfolio API Description

The investor services team at Carta manages investments for hundreds of venture capital firms. 

 The portfolio is a list of investments in companies, that can be viewed historically. Over time, investors buy and sell shares of companies, and need to view the state of their investments as of specific dates in the past for audit and accounting purposes.

Each investment should have the following data points:

  - Company: the company we invested in (set only on creation)
  - Quantity: number of shares held (this can change over time as we buy more stock from a company)
  - Cost: total amount paid (this can change over time as we buy more stock from a company)

Create an API endpoint that returns the state of all investments on a given date in the investment timeline. If no date is passed, assume we want investments data as of today.

The response should look something like the following:
```
/investments?date=2018-01-01

[
  {
    "company": "Meetly",
    "quantity": 1000,
    "cost": 1000
  },
  {
    "company": "IMIM",
    "quantity": 1000,
    "cost": 1000
  }
]
```

We will also need endpoints to create new investments, and to update existing investments as we buy/sell shares (updating the quantity and cost values for that point onward).

Bonus:

Sometimes users input data incorrectly, or forget to input data in the system when they make an investment. Allow a user to update an investment for a date in the past, and separately keep track of the date that the actual data was entered. The updated data model should support querying the state of investments on both date dimensions at once, to answer questions like: "What was the state of my portfolio on 2016-01-01 with the data that I entered up to 2017-01-01."

## Documentation

**GET getAllTransactions**
Get all transactions up until a date, providing information such as transaction id that can be used to update a transaction.
```
http://localhost:5000/carta/investments/transactions
```

**GET getInvestmentsWithoutDate**
If no date is given, today's date will be used.
```
http://localhost:5000/carta/investments
```

**GET getInvestmentWithDate**
Get all investments up until a certain date.
```
http://localhost:5000/carta/investments?date=2018-09-22
```
**GET getInvestments2DDate**
Support querying the state of investments on both date dimensions at once.
```
http://localhost:5000/carta/investments?date=2018-11-01&update_date=2018-11-20
```
**POST createInvestment**
Create a new investment by specifying the company, date, quantity and cost.
```
http://localhost:5000/carta/investments?date=2018-03-31&company=Test&quantity=200&cost=200
```
**PUT updateInvestment**
Find an investment in the past using the transaction id and update the quantity and/or the cost.
```
http://localhost:5000/carta/investments/7?quantity=1999&cost=10000
```

## Contact and Support

Skye Nguyen - skye@dames.es
