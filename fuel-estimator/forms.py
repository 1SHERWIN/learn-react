import datetime

from click import DateTime
from flask import Flask, render_template, request
# from flask_mysqldb import MySQL
import pymysql
import yaml
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, DecimalField, SubmitField, PasswordField, BooleanField, \
  DateTimeField
from datetime import datetime
from wtforms.validators import DataRequired, Length, Email, ValidationError, InputRequired


# class required to represent form. inherits from FlaskForm
class LoginForm(FlaskForm):
  username = StringField('username', validators=[InputRequired(), Length(min=4, max=15)])
  password = PasswordField('password', validators=[InputRequired(), Length(min=8, max=80)])
  remember = BooleanField('remember me')


class RegisterForm(FlaskForm):
  email = StringField('email', validators=[InputRequired(), Email(message='Invalid email'), Length(max=50)])
  username = StringField('username', validators=[InputRequired(), Length(min=4, max=15)])
  password = PasswordField('password', validators=[InputRequired(), Length(min=8, max=80)])


class ClientInformationForm(FlaskForm):
  # gallons = Regexp(regex
  clientid = IntegerField('clientid')
  fullName = StringField('Name', validators=[DataRequired(),
                                             Length(min=6, max=20)])  # where 'Username' label in HTML
  address = StringField('Address', validators=[DataRequired()])
  city = StringField('City', validators=[DataRequired()])
  state = StringField('State', validators=[DataRequired()])
  zipcode = StringField('Zip Code', validators=[DataRequired()])
  phone = IntegerField('Phone', validators=[DataRequired()])
  email = StringField('Email', validators=[DataRequired()])


class RequestQuoteForm(FlaskForm):
  clientId = DecimalField("Client ID", places=2, validators=[DataRequired()])
  gallonsRequested = DecimalField("Gallons Requested", places=2, default=0, validators=[DataRequired()])
  requestDate = DateTimeField("Request Date", validators=[DataRequired()], format='%m/%d/%Y', default=datetime.today())
  deliveryDate = DateField("Delivery Date", validators=[DataRequired()], format='%m/%d/%Y')
  deliveryAddress = StringField("Delivery Street Address", validators=[DataRequired()])
  deliveryCity = StringField("Delivery City", validators=[DataRequired()])
  deliveryState = StringField("Delivery State", validators=[DataRequired()])
  deliveryZipCode = IntegerField("Delivery Zip Code", validators=[DataRequired()])
  deliveryContactName = StringField("Delivery Contact Name", validators=[DataRequired()])
  deliveryContactPhone = StringField("Delivery Contact Phone", validators=[DataRequired()])
  deliveryContactEmail = StringField('Email', validators=[DataRequired()])
  suggestedPrice = DecimalField("Suggested Price", places=2, default=2.19)
  totalAmountDue = DecimalField('Total Amount Due', places=2, default=0.00)
